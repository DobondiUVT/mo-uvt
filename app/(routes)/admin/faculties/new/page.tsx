import React from 'react'
import FacultiesForm from '../../../../components/Admin/Form/FacultyForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { saveFaculty } from '@/actions/faculty'

export const revalidate = 0

const NewFaculty = () => {
  const breadcrumbLinks = [
    {
      title: 'Faculties',
      href: '/admin/faculties',
    },
    {
      title: 'New Faculty',
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
