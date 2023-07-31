import { PrismaClient } from '@prisma/client'

export async function POST(request: Request) {
  const body = await request.json();
  const prisma = new PrismaClient();
  try {
    const res = await prisma.note.create({
      data: {
        title: body.title,
        content: body.content,
      }
    });
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
}
