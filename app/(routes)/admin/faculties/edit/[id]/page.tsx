import { updateFaculty } from '@/actions/faculty'
import FacultiesForm from '@/components/Admin/Form/FacultyForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import { PrismaClient } from '@prisma/client'
import React from 'react'

const EditFaculty = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  const prisma = new PrismaClient()
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
      <FacultiesForm faculty={faculty} method={updateFaculty}/>
    </>
  )
}

export default EditFaculty
