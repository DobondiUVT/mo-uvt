import { saveGroup } from '@/actions/group'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import prisma from '@/utilities/db'
import GroupsForm from '../../../../../components/Admin/Form/GroupForm'

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
  const subjects = await prisma.subject.findMany()
  const faculties = await prisma.faculty.findMany()
  const specializations = await prisma.specialization.findMany()
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <GroupsForm
        method={saveGroup}
        faculties={faculties}
        subjects={subjects}
        specializations={specializations}
      />
    </>
  )
}

export default NewGroup
