'use server'

import { PrismaClient, Subject } from '@prisma/client'
import { redirect } from 'next/navigation'

export async function getSubjects() {
  const prisma = new PrismaClient()
  const subjects = await prisma.subject.findMany()
  return subjects
}

type MySub = {
  title: string
  description: string
}

export async function saveSubject(formData: FormData) {
  const prisma = new PrismaClient()
  const subject: MySub = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  }
  const savedSubject = await prisma.subject.create({ data: subject })
  redirect(`/admin/subjects/edit/${savedSubject.id}`)
}
