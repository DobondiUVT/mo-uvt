'use server'

import prisma from '@/utilities/db'

import { finalGroupData } from '@/utilities/types'
import { SEMESTER_OPTIONS } from '@/utilities/utils'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getSubjects } from './subject'
import { Student, User } from '@prisma/client'

export async function getGroupsTableData() {
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      title: true,
      facultyId: true,
      faculty: {
        select: {
          id: true,
          abbreviation: true,
        },
      },
    },
  })

  return groups as finalGroupData[]
}

export async function getGroups() {
  const groups = await prisma.group.findMany()
  return groups
}

export async function getGroup(id: number | null) {
  if (!id) return

  const group = await prisma.group.findUnique({ where: { id } })
  return group
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

export async function getGroupsData() {
  const group = await prisma.group.findMany({
    include: {
      subjects: true,
      faculty: true,
    },
  })
  return group
}

export async function getGroupsForStudent(student: Student) {
  if (!student) return null
  const groups = await prisma.group.findMany({
    where: {
      facultyId: student.facultyId,
      year: student.year,
    },
    select: {
      id: true,
      title: true,
      semester: true,
      year: true,
      subjects: {
        select: {
          id: true,
          title: true,
          abbreviation: true,
          description: true,
          student: {
            select: {
              id: true
            }
          }
        },
      },
    },
  })
  return groups
}
