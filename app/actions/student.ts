'use server'

import { FileStudent } from '@/(routes)/[locale]/admin/students/add/page'
import prisma from '@/utilities/db'
import { NUMBER_TO_ENUM } from '@/utilities/utils'
import { Year } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from '%/i18n/navigation'
import { z } from 'zod'
import { getAuthInfo } from './auth'

export async function getStudent(id: number) {
  if (!id) return null
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      subjects: true,
      faculty: true,
      specialization: true,
      user: true,
    },
  })
  return student
}

export async function getStudentFromUserId(userId: number) {
  if (!userId) return null
  const student = await prisma.student.findFirst({
    where: { userId },
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
    return
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

export const saveStudentsFromFile = async (students: FileStudent[]) => {
  'use server'
  for (const student of students) {
    const dbFaculty = await prisma.faculty.findFirst({
      where: { abbreviation: student.faculty },
    })
    const dbSpecialization = await prisma.specialization.findFirst({
      where: { abbreviation: student.specialization },
    })
    if (!dbFaculty || !dbSpecialization) return
    const user = await prisma.user.upsert({
      where: { email: student.email },
      create: {
        name: student.name,
        email: student.email,
        role: 'STUDENT',
      },
      update: {
        name: student.name,
      },
    })
    const newStudent = await prisma.student.upsert({
      where: { sn: student.sn },
      create: {
        sn: student.sn,
        userId: user.id,
        facultyId: dbFaculty.id,
        specializationId: dbSpecialization.id,
        year: NUMBER_TO_ENUM[student.year],
        verified: true,
      },
      update: {
        facultyId: dbFaculty.id,
        specializationId: dbSpecialization.id,
        year: NUMBER_TO_ENUM[student.year],
        verified: true,
      },
    })
  }

  const { user } = await getAuthInfo()

  const importSettings = await prisma.settings.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
      lastImportAuthorName: user?.name,
      lastImportDate: new Date(),
    },
    update: {
      lastImportAuthorName: user?.name,
      lastImportDate: new Date(),
    },
  })

  redirect('/admin/students')
  return
}

export async function deleteStudent(id: number) {
  try {
    await prisma.student.delete({ where: { id } })
    return {
      title: 'Hooray!',
      description: 'Successfully deleted',
      status: 'success',
    }
  } catch (e) {
    console.error(e)
    return {
      title: `Error deleting`,
      description: `${e}`,
      status: 'error',
    }
  } finally {
    revalidatePath('/admin/students')
  }
}

export async function updateStudent(prevState: any, formData: FormData) {
  const adjustedFormData = {
    id: formData.get('id'),
    facultyId: formData.get('facultyId'),
    specializationId: formData.get('specializationId'),
    sn: formData.get('sn'),
    year: formData.get('year'),
  }

  const schema = z.object({
    id: z.coerce.number(),
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

  const parsed = schema.safeParse(adjustedFormData)
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let faculty = await prisma.faculty.findFirst({
    where: { id: parsed.data.facultyId },
  })

  let specialization = await prisma.specialization.findFirst({
    where: { id: parsed.data.specializationId },
  })

  console.log(specialization, faculty)

  try {
    await prisma.student.update({
      where: { id: parsed.data.id },
      data: {
        faculty: {
          connect: {
            id: faculty?.id,
          },
        },
        specialization: {
          connect: {
            id: specialization?.id,
          },
        },
        sn: parsed.data.sn,
        year: parsed.data.year,
        verified: parsed.data.verified,
      },
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error updating student: ${e}` }
  } finally {
    redirect('/admin/students')
    return
  }
}
