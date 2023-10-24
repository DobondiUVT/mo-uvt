import { PrismaClient } from '@prisma/client'

export const revalidate = 0

export async function GET(request: Request) {
  const prisma = new PrismaClient()
  const subjects = await prisma.subject.findMany()
  return new Response(JSON.stringify(subjects), { status: 200 })
}
