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
      specialization: true,
    },
  })

  return groups
}

export async function getGroup(id: number | null) {
  if (!id) return

  const group = await prisma.group.findUnique({ where: { id } })
  return group
}

export async function getGroupsForStudent(student: Student) {
  if (!student) return null
  const groups = await prisma.group.findMany({
    where: {
      year: student.year,
      facultyId: student.facultyId,
      specializationId: student.specializationId,
    },
    include: {
      faculty: true,
      subjects: {
        include: {
          faculty: true,
          specializations: true,
          students: true,
          groups: true,
        },
      },
      specialization: true,
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
  }

  const schema = z.object({
    facultyId: z.coerce.number().positive('Faculty must be selected'),
    semester: z.enum(['ONE', 'TWO']),
    year: z.enum(['ONE', 'TWO', 'THREE']),
    specializationId: z.coerce.number().positive('Specialization must be selected'),
    subjects: z
      .array(z.coerce.number())
      .min(1, 'At least one subject must be selected'),
  })

  const parsed = schema.safeParse(adjustedFormData)
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  const { subjects: parsedSubjects, ...parsedGroup } = parsed.data
  let subjects = await prisma.subject.findMany({
    where: {
      id: {
        in: parsedSubjects,
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
