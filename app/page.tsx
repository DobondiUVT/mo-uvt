import Image from 'next/image'
import { Prisma, PrismaClient } from '@prisma/client'
import Form from './Form';

export default async function Home() {
  const prisma = new PrismaClient()
  let note: Prisma.NoteCreateInput;
  const allNotes = await prisma.note.findMany()
  return (
    <main className="">
      <div>
        {allNotes?.map((note) => (
          <div key={note.id}>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
          </div>
        ))}
        <Form/>
      </div>
      
    </main>
  )
}
