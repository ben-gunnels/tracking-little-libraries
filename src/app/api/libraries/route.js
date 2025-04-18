import prisma from '../../../../lib/prisma';
import words from "../../../data/word_generator.json";
import { getRandomWord, checkNameExists } from '../../../../lib/utils';

export async function GET(req) {
  try {
    const libraries = await prisma.libraries.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(libraries), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error fetching libraries:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { latitude, longitude, token } = body;


    let name;
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure that a unique name has been generated
    do {
      const adjective = getRandomWord(words.adjectives);
      const noun = getRandomWord(words.nouns);
      name = `${adjective}-${noun}`;
      attempts++;
    } while (await checkNameExists(prisma, name) && attempts < maxAttempts);

    if (attempts === maxAttempts) {
      throw new Error("Unable to generate a unique name after multiple attempts.");
    }

    const record = await prisma.qrToken.findUnique({ where: {token} })

    if (!record || record.used) {
      return new Response('Invalid token', { status: 403 });
    }

    if (typeof latitude !== 'number' || typeof longitude !== 'number' || typeof name !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid coordinates or name' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const library = await prisma.library.create({
      data: { name, latitude, longitude },
    });

    await prisma.qrToken.update({
      where: { token },
      data: { used: true, usedAt: new Date() }
    });

    return new Response(JSON.stringify(library), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('❌ API Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
