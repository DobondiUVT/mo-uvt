import SpecializationsForm from '../../../../../components/Admin/Form/SpecializationForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { saveSpecialization } from '@/actions/specialization'
import prisma from '@/utilities/db'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

const NewSpecialization = async () => {
  const t = await getTranslations('Admin')
  const breadcrumbLinks = [
    {
      title: t('Specializations'),
      href: '/admin/specializations',
    },
    {
      title: t('New'),
      href: '/admin/specializations/new',
    },
  ]

  const faculties = await prisma.faculty.findMany()
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SpecializationsForm method={saveSpecialization} faculties={faculties} />
    </>
  )
}

export default NewSpecialization
