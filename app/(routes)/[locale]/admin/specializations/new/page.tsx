import React from 'react'
import SpecializationsForm from '../../../../../components/Admin/Form/SpecializationForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { saveSpecialization } from '@/actions/specialization'
import { PrismaClient } from '@prisma/client'
import prisma from '@/utilities/db'

export const revalidate = 0

const NewSpecialization = async () => {
  const breadcrumbLinks = [
    {
      title: 'Specializations',
      href: '/admin/specializations',
    },
    {
      title: 'New Specialization',
      href: '/admin/specializations/new',
    },
  ]

  const faculties = await prisma.faculty.findMany()
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SpecializationsForm method={saveSpecialization} faculties={faculties} />
    </>
  )
}

export default NewSpecialization
