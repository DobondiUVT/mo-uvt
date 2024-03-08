'use server'

import prisma from '@/utilities/db'
import { finalStudentData } from '@/utilities/types'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function getStudent(userId: number) {
  if (!userId) return null
  const student = await prisma.student.findUnique({
    where: { userId: userId },
    include: {
      subjects: {
        select: {
          id: true,
          title: true,
        }
      },
    },
  })
  return student
}

export async function getStudentsTableData(): Promise<finalStudentData[]> {
  const students = await prisma.student.findMany({
    select: {
      id: true,
      userId: true,
      facultyId: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      faculty: {
        select: {
          id: true,
          abbreviation: true,
        },
      },
      subjects: {
        select: {
          id: true,
          abbreviation: true,
        },
      },
    },
  })
  return students
}

export async function updateStudent(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const schema = z.object({
    userId: z.coerce.number().positive(),
    facultyId: z.coerce.number().positive('You must select a faculty'),
    sn: z.string().min(1).max(10),
    year: z.enum(['ONE', 'TWO', 'THREE']),
    verified: z.coerce.boolean(),
  })

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let updatedStudent

  try {
    updatedStudent = await prisma.student.update({
      where: { userId: parsed.data.userId },
      data: parsed.data,
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error updating student: ${e}` }
  }

  if (updatedStudent) {
    redirect(`/`)
    return { success: `Succesfully updated student` }
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
    console.log("Has already joined")
    return
  }

  const hasAnyJoinedSubjectsInGroup =
    joinedSubjects?.subjects.some((subject) =>
      subject.groups.some((group) => group.id === groupId),
    ) ?? false

  if (hasAnyJoinedSubjectsInGroup) {
    console.log("Has already joined another in group")
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
export const unJoinStudent = async (
  studentId: number,
  subjectId: number,
) => {
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
