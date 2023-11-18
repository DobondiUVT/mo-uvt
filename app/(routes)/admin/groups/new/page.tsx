import React from 'react'
import GroupsForm from '../../../../components/Admin/Form/GroupForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { saveGroup } from '@/actions/group'
import { PrismaClient } from '@prisma/client'
import prisma from '@/utilities/db'

export const revalidate = 0

const NewGroup = async () => {
  const breadcrumbLinks = [
    {
      title: 'Groups',
      href: '/admin/groups',
    },
    {
      title: 'New Group',
      href: '/admin/groups/new',
    },
  ]
  const subjects  = await prisma.subject.findMany()
  const faculties = await prisma.faculty.findMany()
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <GroupsForm method={saveGroup} faculties={faculties} subjects={subjects}/>
    </>
  )
}

export default NewGroup
