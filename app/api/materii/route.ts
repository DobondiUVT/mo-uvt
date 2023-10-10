import { PrismaClient } from '@prisma/client'

export const revalidate = 0;

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  const materii = await prisma.materie.findMany()
  return new Response(JSON.stringify(materii), { status: 200 });
}
