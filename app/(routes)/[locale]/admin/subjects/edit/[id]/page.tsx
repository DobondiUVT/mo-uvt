import { getFaculty } from '@/actions/faculty'
import { getSubject, updateSubject } from '@/actions/subject'
import SubjectsForm from '@/components/Admin/Form/SubjectForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import prisma from '@/utilities/db'
import { PrismaClient } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export const revalidate = 0

const EditSubject = async ({ params }: { params: { id: number } }) => {
  const { id } = params

  const t = await getTranslations("Admin")

  const subject = await getSubject(Number(id))

  const breadcrumbLinks = [
    {
      title: t('Subjects'),
      href: '/admin/subjects',
    },
    {
      title: `Edit ${subject?.title}`,
    },
  ]

  const faculties = await prisma.faculty.findMany()
  const faculty = (await getFaculty(subject?.facultyId ?? null)) ?? null
  const specializations = await prisma.specialization.findMany()
  const selectedSpecializations = specializations.filter((s) =>
    subject?.specializations?.some((ss) => ss.id === s.id),
  )
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SubjectsForm
        subject={subject}
        method={updateSubject}
        faculties={faculties}
        defaultFaculty={faculty}
        specializations={specializations}
        defaultSpecializations={selectedSpecializations}
      />
    </>
  )
}

export default EditSubject
