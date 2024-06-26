import { updateUser } from '@/actions/user'
import UsersForm from '@/components/Admin/Form/UserForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import prisma from '@/utilities/db'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

const EditUser = async ({ params }: { params: { id: number } }) => {
  const { id } = params

  const t = await getTranslations('Admin')

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  })

  const breadcrumbLinks = [
    {
      title: t('Users'),
      href: '/admin/users',
    },
    {
      title: `Edit ${user?.name}`,
    },
  ]

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <UsersForm user={user} method={updateUser} />
    </>
  )
}

export default EditUser
