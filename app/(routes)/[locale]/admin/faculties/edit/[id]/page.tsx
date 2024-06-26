import { updateFaculty } from '@/actions/faculty'
import FacultiesForm from '@/components/Admin/Form/FacultyForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import prisma from '@/utilities/db'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

const EditFaculty = async ({ params }: { params: { id: number } }) => {
  const { id } = params

  const t = await getTranslations('Admin')

  const faculty = await prisma.faculty.findUnique({
    where: {
      id: Number(id),
    },
  })

  const breadcrumbLinks = [
    {
      title: t('Faculties'),
      href: '/admin/faculties',
    },
    {
      title: `Edit ${faculty?.name}`,
    },
  ]
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <FacultiesForm faculty={faculty} method={updateFaculty} />
    </>
  )
}

export default EditFaculty
