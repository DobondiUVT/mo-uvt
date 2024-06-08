'use server'

import prisma from '@/utilities/db'
import { revalidatePath } from 'next/cache'
import { redirect } from '%/i18n/navigation'
import { z } from 'zod'

export async function getSubject(id: number) {
  const subject = await prisma.subject.findUnique({
    where: { id },
    include: {
      faculty: true,
      specializations: true,
      students: true,
      groups: true,
    },
  })
  return subject
}

export async function getSubjects() {
  const subjects = await prisma.subject.findMany({
    include: {
      faculty: true,
      specializations: true,
      students: {
        include: {
          user: true,
        }
      },
      groups: true,
    },
  })
  return subjects
}

export async function getSubjectsForGroup(groupId: number) {
  const subjects = await prisma.subject.findMany({
    where: {
      groups: {
        some: {
          id: groupId,
        },
      },
    },
    include: {
      faculty: true,
      specializations: true,
      students: true,
      groups: true,
    },
  })
  return subjects
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
  const adjustedFormData = {
    title: formData.get('title'),
    description: formData.get('description'),
    facultyId: formData.get('facultyId'),
    year: formData.get('year'),
    semester: formData.get('semester'),
    abbreviation: formData.get('abbreviation'),
    file: formData.get('file'),
    specializations: formData.getAll('specializations'),
  }
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
    file: z.string().optional(),
    specializations: z
      .array(z.coerce.number())
      .min(1, 'At least one specialization must be selected'),
  })

  const parsed = schema.safeParse(adjustedFormData)
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  const { specializations: parsedSpecializations, ...parsedGroup } = parsed.data
  let specializations = await prisma.specialization.findMany({
    where: {
      id: {
        in: parsedSpecializations,
      },
    },
  })

  let savedSubject

  try {
    savedSubject = await prisma.subject.create({
      data: {
        ...parsedGroup,
        specializations: {
          connect: specializations.map((s) => ({ id: s.id })),
        },
      },
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error saving subject: ${e}` }
  }
  if (savedSubject) {
    redirect(`/admin/subjects/edit/${savedSubject.id}`)
  }
}

export async function updateSubject(prevState: any, formData: FormData) {
  const adjustedFormData = {
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    facultyId: formData.get('facultyId'),
    year: formData.get('year'),
    semester: formData.get('semester'),
    abbreviation: formData.get('abbreviation'),
    file: formData.get('file'),
    specializations: formData.getAll('specializations'),
  }

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
    file: z.string().optional(),
    specializations: z
      .array(z.coerce.number())
      .min(1, 'At least one specialization must be selected'),
  })

  const parsed = schema.safeParse(adjustedFormData)
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  const { specializations: parsedSpecializations, ...parsedGroup } = parsed.data
  let specializations = await prisma.specialization.findMany({
    where: {
      id: {
        in: parsedSpecializations,
      },
    },
  })

  try {
    await prisma.subject.update({
      where: { id: parsedGroup.id },
      data: {
        ...parsedGroup,
        specializations: {
          set: specializations.map((s) => ({ id: s.id })),
        },
      },
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error updating subject: ${e}` }
  }
}
