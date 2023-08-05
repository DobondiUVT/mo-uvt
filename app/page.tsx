import Image from 'next/image'
import { Prisma, PrismaClient } from '@prisma/client'

export const revalidate = 0

export default async function Home() {
  const prisma = new PrismaClient()
  const materii = await prisma.materie.findMany()
  return (
    <main className="">
      <section className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materii.map((materie) => (
            <div key={materie.id} className="border rounded-md shadow p-6">
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold text-uvt-blue">
                  {materie.title}
                </div>
              </div>
              <div className="mt-4 text-gray-700">{materie.description}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
