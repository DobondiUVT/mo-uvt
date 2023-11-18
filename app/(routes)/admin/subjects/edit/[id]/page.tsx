import { getFaculty } from '@/actions/faculty'
import { updateSubject } from '@/actions/subject'
import SubjectsForm from '@/components/Admin/Form/SubjectForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/utilities/db'
import { PrismaClient } from '@prisma/client'
import React from 'react'

export const revalidate = 0

const EditSubject = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  
  const subject = await prisma.subject.findUnique({
    where: {
      id: Number(id),
    },
  })

  const breadcrumbLinks = [
    {
      title: 'Subjects',
      href: '/admin/subjects',
    },
    {
      title: `Edit ${subject?.title}`,
    },
  ]

  const faculties = await prisma.faculty.findMany()
  const faculty = (await getFaculty(subject?.facultyId ?? null)) ?? null
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SubjectsForm
        subject={subject}
        method={updateSubject}
        faculties={faculties}
        defaultFaculty={faculty}
      />
    </>
  )
}

export default EditSubject
