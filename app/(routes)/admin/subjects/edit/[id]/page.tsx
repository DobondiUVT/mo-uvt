import SubjectsForm from '@/components/Admin/Form/SubjectsForm';
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb';
import { PrismaClient } from '@prisma/client'
import React from 'react'

const EditSubject = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  const prisma = new PrismaClient();
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
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SubjectsForm subject={subject}/>
    </>
  )
}

export default EditSubject
