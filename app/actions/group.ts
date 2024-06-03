'use server'

import prisma from '@/utilities/db'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { Student } from '@prisma/client'

export async function getGroups() {
  const groups = await prisma.group.findMany({
    include: {
      faculty: true,
      subjects: true,
      specializations: true,
    },
  })

  return groups
}

export async function getGroup(id: number | null) {
  if (!id) return

  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      faculty: true,
      subjects: true,
      specializations: true,
    },
  })
  return group
}

export async function getGroupsForStudent(student: Student) {
  if (!student) return null
  const groups = await prisma.group.findMany({
    where: {
      year: student.year,
      facultyId: student.facultyId,
      specializations: {
        some: {
          id: student.specializationId,
        },
      },
    },
    include: {
      faculty: true,
      subjects: {
        include: {
          faculty: true,
          specializations: true,
          students: {
            include: {
              user: true,
            },
          },
          groups: true,
        },
      },
      specializations: true,
    },
  })
  return groups
}

export async function deleteGroup(id: number) {
  try {
    await prisma.group.delete({ where: { id } })
    return {
      title: 'Hooray!',
      description: 'Successfully deleted group',
      status: 'success',
    }
  } catch (e) {
    console.error(e)
    return {
      title: `Error deleting group`,
      description: `${e}`,
      status: 'error',
    }
  } finally {
    revalidatePath('/admin/groups')
  }
}

export async function saveGroup(prevState: any, formData: FormData) {
  console.log(formData)

  const adjustedFormData = {
    facultyId: formData.get('facultyId'),
    subjects: formData.getAll('subjects'),
    semester: formData.get('semester'),
    year: formData.get('year'),
    specializations: formData.getAll('specializations'),
  }

  const schema = z.object({
    facultyId: z.coerce.number().positive('Faculty must be selected'),
    semester: z.enum(['ONE', 'TWO']),
    year: z.enum(['ONE', 'TWO', 'THREE']),
    subjects: z
      .array(z.coerce.number())
      .min(1, 'At least one subject must be selected'),
    specializations: z
      .array(z.coerce.number())
      .min(1, 'At least one specialization must be selected'),
  })

  const parsed = schema.safeParse(adjustedFormData)
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  const {
    subjects: parsedSubjects,
    specializations: parsedSpecializations,
    ...parsedGroup
  } = parsed.data
  let subjects = await prisma.subject.findMany({
    where: {
      id: {
        in: parsedSubjects,
      },
    },
  })
  let specializations = await prisma.specialization.findMany({
    where: {
      id: {
        in: parsedSpecializations,
      },
    },
  })

  const groupTitle = subjects.map((subject) => subject.abbreviation).join('/')

  let savedGroup

  try {
    savedGroup = await prisma.group.create({
      data: {
        title: groupTitle,
        ...parsedGroup,
        subjects: {
          connect: parsedSubjects.map((subjectId: number) => ({
            id: subjectId,
          })),
        },
        specializations: {
          connect: specializations.map((s) => ({ id: s.id })),
        },
      },
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error saving group: ${e}` }
  }
  if (savedGroup) {
    redirect(`/admin/groups/edit/${savedGroup.id}`)
  }
}

export async function updateGroup(prevState: any, formData: FormData) {
  const adjustedFormData = {
    facultyId: formData.get('facultyId'),
    subjects: formData.getAll('subjects'),
    semester: formData.get('semester'),
    year: formData.get('year'),
    specializations: formData.getAll('specializations'),
  }

  const schema = z.object({
    id: z.coerce.number().positive(),
    facultyId: z.coerce.number().positive('Faculty must be selected'),
    semester: z.enum(['ONE', 'TWO']),
    year: z.enum(['ONE', 'TWO', 'THREE']),
    subjects: z
      .array(z.coerce.number())
      .min(1, 'At least one subject must be selected'),
    specializations: z
      .array(z.coerce.number())
      .min(1, 'At least one specialization must be selected'),
  })

  const parsed = schema.safeParse(adjustedFormData)
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  const {
    subjects: parsedSubjects,
    specializations: parsedSpecializations,
    ...parsedGroup
  } = parsed.data
  let subjects = await prisma.subject.findMany({
    where: {
      id: {
        in: parsedSubjects,
      },
    },
  })
  let specializations = await prisma.specialization.findMany({
    where: {
      id: {
        in: parsedSpecializations,
      },
    },
  })

  const groupTitle = subjects.map((subject) => subject.abbreviation).join('/')

  let updatedGroup

  try {
    updatedGroup = await prisma.group.update({
      where: { id: parsedGroup.id },
      data: {
        title: groupTitle,
        ...parsedGroup,
        subjects: {
          set: parsedSubjects.map((subjectId: number) => ({
            id: subjectId,
          })),
        },
        specializations: {
          set: specializations.map((s) => ({ id: s.id })),
        },
      },
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error saving group: ${e}` }
  }
  if (updatedGroup) {
    redirect(`/admin/groups/edit/${updatedGroup.id}`)
  }
}
