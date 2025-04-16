import prisma from '../../../../lib/prisma';

export async function GET(req) {
  const users = await prisma.library.findMany();
  return Response.json(users);
}

export async function POST(req) {
  const body = await req.json();
  const { latitude, longitude } = body;

  const library = await prisma.library.create({
    data: { latitude, longitude },
  });

  return Response.json(library, { status: 201 });
}