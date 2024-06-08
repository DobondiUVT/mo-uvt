'use server'

import prisma from '@/utilities/db'
import { revalidatePath } from 'next/cache'
import { redirect } from '%/i18n/navigation'
import { z } from 'zod'

export async function getSpecializations() {
  return prisma.specialization.findMany({
    select: {
      id: true,
      title: true,
      abbreviation: true,
      facultyId: true,
      faculty: {
        select: {
          id: true,
          name: true,
          abbreviation: true,
        },
      },
    },
  })
}

export async function saveSpecialization(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1, 'Title must be at least 1 character'),
    abbreviation: z
      .string()
      .min(1, 'Abbreviation must be at least 1 character'),
    facultyId: z.coerce.number().positive('Faculty must be selected'),
  })

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let savedSpecialization

  try {
    savedSpecialization = await prisma.specialization.create({
      data: parsed.data,
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error saving specialization: ${e}` }
  }
  if (savedSpecialization) {
    redirect(`/admin/specializations/edit/${savedSpecialization.id}`)
    return
  }
}

export async function updateSpecialization(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.coerce.number(),
    title: z.string().min(1, 'Title must be at least 1 character'),
    abbreviation: z
      .string()
      .min(1, 'Abbreviation must be at least 1 character'),
    facultyId: z.coerce.number().positive('Faculty must be selected'),
  })

  console.log(formData)

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  try {
    await prisma.specialization.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    })
    revalidatePath(`/admin/specializations/edit/${parsed.data.id}`)
  } catch (e) {
    console.error(e)
    return { serverError: `Error updating specialization: ${e}` }
  }
}

export async function deleteSpecialization(id: number) {
  try {
    await prisma.specialization.delete({ where: { id } })
    return {
      title: 'Hooray!',
      description: 'Successfully deleted specialization',
      status: 'success',
    }
  } catch (e) {
    return {
      title: 'Oops!',
      description: 'Failed to delete specialization',
      status: 'error',
    }
  }
}
