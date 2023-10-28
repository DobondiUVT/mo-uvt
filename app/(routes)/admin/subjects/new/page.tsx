import React from 'react'
import SubjectsForm from '../../../../components/Admin/Form/SubjectForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { saveSubject } from '@/actions/subject'
import { PrismaClient } from '@prisma/client'

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
  const prisma = new PrismaClient()
  const faculties = await prisma.faculty.findMany()
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SubjectsForm method={saveSubject} faculties={faculties} />
    </>
  )
}

export default NewSubject
