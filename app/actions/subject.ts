'use server'

import prisma from '@/utilities/db'
import { finalSubjectData } from '@/utilities/types'
import { PrismaClient, Subject } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function getSubjects() {
  const subjects = await prisma.subject.findMany()
  return subjects
}

export async function getSubjectsTableData() {
  const subjects = await prisma.subject.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      facultyId: true,
      faculty: {
        select: {
          id: true,
          abbreviation: true,
        },
      },
    },
  })

  return subjects as finalSubjectData[]
}

export async function deleteSubject(id: number) {
  try {
    await prisma.subject.delete({ where: { id } })
    return {
      title: 'Hooray!',
      description: 'Successfully deleted subject',
      status: 'success',
    }
  } catch (e) {
    console.error(e)
    return {
      title: `Error deleting subject`,
      description: `${e}`,
      status: 'error',
    }
  } finally {
    revalidatePath('/admin/subjects')
  }
}

export async function saveSubject(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1, 'Title must be at least 1 character'),
    description: z.string().min(1, 'Description must be at least 1 character'),
    facultyId: z.coerce.number().positive('Faculty must be selected'),
    year: z.enum(['ONE', 'TWO', 'THREE']),
    semester: z.enum(['ONE', 'TWO']),
    abbreviation: z
      .string()
      .min(1, 'Abbreviation must be at least 1 character')
      .max(10, 'Abbreviation must be less than 10 characters'),
  })

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let savedSubject

  try {
    savedSubject = await prisma.subject.create({ data: parsed.data })
  } catch (e) {
    console.error(e)
    return { serverError: `Error saving subject: ${e}` }
  }
  if (savedSubject) {
    redirect(`/admin/subjects/edit/${savedSubject.id}`)
  }
}

export async function updateSubject(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.coerce.number(),
    title: z.string().min(1, 'Title must be at least 1 character'),
    description: z.string().min(1, 'Description must be at least 1 character'),
    facultyId: z.coerce.number().positive('Faculty must be selected'),
    year: z.enum(['ONE', 'TWO', 'THREE']),
    semester: z.enum(['ONE', 'TWO']),
    abbreviation: z
      .string()
      .min(1, 'Abbreviation must be at least 1 character')
      .max(10, 'Abbreviation must be less than 10 characters'),
  })

  console.log(formData)

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let updatedSubject

  try {
    updatedSubject = await prisma.subject.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error updating subject: ${e}` }
  }

  if (updatedSubject) {
    revalidatePath(`/admin/subjects/edit/${updatedSubject.id}`)
  }
}
