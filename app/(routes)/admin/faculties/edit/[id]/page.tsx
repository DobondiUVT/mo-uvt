import { updateFaculty } from '@/actions/faculty'
import FacultiesForm from '@/components/Admin/Form/FacultyForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/utilities/db'
import { PrismaClient } from '@prisma/client'
import React from 'react'

export const revalidate = 0

const EditFaculty = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  
  const faculty = await prisma.faculty.findUnique({
    where: {
      id: Number(id),
    },
  })

  const breadcrumbLinks = [
    {
      title: 'Faculties',
      href: '/admin/faculties',
    },
    {
      title: `Edit ${faculty?.name}`,
    },
  ]
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <FacultiesForm faculty={faculty} method={updateFaculty} />
    </>
  )
}

export default EditFaculty
