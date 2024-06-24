import React from 'react'
import FacultiesForm from '../../../../../components/Admin/Form/FacultyForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { saveFaculty } from '@/actions/faculty'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

const NewFaculty = async () => {
  const t = await getTranslations('Admin')
  const breadcrumbLinks = [
    {
      title: t('Faculties'),
      href: '/admin/faculties',
    },
    {
      title: t('New'),
      href: '/admin/faculties/new',
    },
  ]
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <FacultiesForm method={saveFaculty} />
    </>
  )
}

export default NewFaculty
