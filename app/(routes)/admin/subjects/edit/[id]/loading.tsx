import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const EditSubjectLoading = () => {
  const breadcrumbLinks = [
    {
      title: 'Subjects',
      href: '/admin/subjects',
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
