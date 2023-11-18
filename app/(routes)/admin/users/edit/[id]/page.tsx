import { updateUser } from '@/actions/user'
import UsersForm from '@/components/Admin/Form/UserForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { PrismaClient } from '@prisma/client'
import React from 'react'

export const revalidate = 0

const EditUser = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  })

  const breadcrumbLinks = [
    {
      title: 'Users',
      href: '/admin/users',
    },
    {
      title: `Edit ${user?.name}`,
    },
  ]

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <UsersForm
        user={user}
        method={updateUser}
      />
    </>
  )
}

export default EditUser
