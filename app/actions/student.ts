'use server'

import prisma from '@/utilities/db'
import { Year } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function getStudent(userId: number) {
  if (!userId) return null
  const student = await prisma.student.findUnique({
    where: { userId: userId },
    include: {
      subjects: true,
      faculty: true,
      specialization: true,
      user: true,
    },
  })
  return student
}

export async function getStudents() {
  const students = await prisma.student.findMany({
    include: {
      subjects: true,
      faculty: true,
      specialization: true,
      user: true,
    },
  })
  return students
}

export async function createStudent(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const schema = z.object({
    userId: z.coerce.number().positive(),
    facultyId: z.coerce.number().positive('This field is required'),
    specializationId: z.coerce.number().positive('This field is required'),
    sn: z.string().min(1, 'This field is required').max(10),
    year: z.nativeEnum(Year, {
      errorMap: (_i, _c) => {
        return { message: 'This field is required' }
      },
    }),
    verified: z.coerce.boolean(),
  })

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  try {
    await prisma.student.create({
      data: parsed.data,
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error updating student: ${e}` }
  } finally {
    redirect('/choice')
  }
}

export const joinStudent = async (
  studentId: number,
  subjectId: number,
  groupId: number,
) => {
  'use server'
  // check if student joined any other subject in the group
  const joinedSubjects = await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    include: {
      subjects: {
        include: {
          groups: true,
        },
      },
    },
  })

  const hasAlreadyJoined = joinedSubjects?.subjects.some(
    (subject) => subject.id === subjectId,
  )

  if (hasAlreadyJoined) {
    console.log('Has already joined')
    return
  }

  const hasAnyJoinedSubjectsInGroup =
    joinedSubjects?.subjects.some((subject) =>
      subject.groups.some((group) => group.id === groupId),
    ) ?? false

  if (hasAnyJoinedSubjectsInGroup) {
    console.log('Has already joined another in group')
    return
  }

  await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      subjects: {
        connect: {
          id: subjectId,
        },
      },
    },
  })
  revalidatePath('/choice')
}
export const unJoinStudent = async (studentId: number, subjectId: number) => {
  'use server'
  await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      subjects: {
        disconnect: {
          id: subjectId,
        },
      },
    },
  })
  revalidatePath('/choice')
}
