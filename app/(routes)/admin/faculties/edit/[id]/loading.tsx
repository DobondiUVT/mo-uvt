import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const EditSubjectLoading = () => {
  const breadcrumbLinks = [
    {
      title: 'Faculties',
      href: '/admin/faculties',
    },
    {
      title: `Edit`,
    },
  ]
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
    </>
  )
}

export default EditSubjectLoading
