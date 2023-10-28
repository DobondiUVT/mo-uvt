import React from 'react'
import SubjectsForm from '../../../../components/Admin/Form/SubjectsForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'

const NewSubject = () => {
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
  return (
    <>
      <Breadcrumb links={breadcrumbLinks}/>
      <SubjectsForm/>
    </>
  )
}

export default NewSubject
