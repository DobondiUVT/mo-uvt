'use server'

import { PrismaClient, Faculty } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function getFaculties() {
  const prisma = new PrismaClient()
  const faculties = await prisma.faculty.findMany()
  return faculties
}

export async function getFaculty(id: number | null) {
  if (!id) return
  const prisma = new PrismaClient()
  const faculty = await prisma.faculty.findUnique({ where: { id } })
  return faculty
}

export async function deleteFaculty(id: number) {
  const prisma = new PrismaClient()
  try {
    await prisma.faculty.delete({ where: { id } })
    return {
      title: 'Hooray!',
      description: 'Successfully deleted faculty',
      status: 'success',
    }
  } catch (e) {
    console.error(e)
    return {
      title: `Error deleting faculty`,
      description: `${e}`,
      status: 'error',
    }
  } finally {
    revalidatePath('/admin/faculties')
  }
}

export async function saveFaculty(prevState: any, formData: FormData) {
  const prisma = new PrismaClient()

  const schema = z.object({
    name: z.string().min(1, 'Name must be at least 1 character'),
    abbreviation: z.string().min(1, 'Abbreviation must be at least 1 character'),
  })

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let savedFaculty

  try {
    savedFaculty = await prisma.faculty.create({ data: parsed.data })
  } catch (e) {
    console.error(e)
    return { serverError: `Error saving faculty: ${e}` }
  }
  if (savedFaculty) redirect(`/admin/faculties/edit/${savedFaculty.id}`)
}

export async function updateFaculty(prevState: any, formData: FormData) {
  const prisma = new PrismaClient()

  const schema = z.object({
    id: z.coerce.number(),
    name: z.string().min(1, 'Name must be at least 1 character'),
    abbreviation: z.string().min(1, 'Abbreviation must be at least 1 character'),
  })

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let updatedFaculty

  try {
    updatedFaculty = await prisma.faculty.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error updating faculty: ${e}` }
  }

  if (updatedFaculty) {
    revalidatePath(`/admin/faculties/edit/${updatedFaculty.id}`)
  }
}
