import prisma from '../../../../lib/prisma';

export async function POST(req) {
    try {
      const body = await req.json();
      const { latitude, longitude } = body;
  
      if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return new Response(JSON.stringify({ error: 'Invalid coordinates' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const library = await prisma.library.create({
        data: { latitude, longitude },
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
