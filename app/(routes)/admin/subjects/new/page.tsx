import React from 'react'
import SubjectsForm from '../../../../components/Admin/Form/SubjectForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { saveSubject } from '@/actions/subject'
import { PrismaClient } from '@prisma/client'
import prisma from '@/utilities/db'

export const revalidate = 0

const NewSubject = async () => {
  const breadcrumbLinks = [
    {
      title: 'Subjects',
      href: '/admin/subjects',
    },
    {
      title: 'New Subject',
      href: '/admin/subjects/new',
    },
  ]

  const faculties = await prisma.faculty.findMany()
  const specializations = await prisma.specialization.findMany()
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SubjectsForm
        method={saveSubject}
        faculties={faculties}
        specializations={specializations}
      />
    </>
  )
}

export default NewSubject
