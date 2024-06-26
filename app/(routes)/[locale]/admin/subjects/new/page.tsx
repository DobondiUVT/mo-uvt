import SubjectsForm from '../../../../../components/Admin/Form/SubjectForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import { saveSubject } from '@/actions/subject'
import prisma from '@/utilities/db'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

const NewSubject = async () => {
  const t = await getTranslations('Admin')
  const breadcrumbLinks = [
    {
      title: t('Subjects'),
      href: '/admin/subjects',
    },
    {
      title: t('New'),
      href: '/admin/subjects/new',
    },
  ]

  const faculties = await prisma.faculty.findMany()
  const specializations = await prisma.specialization.findMany()
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SubjectsForm
        method={saveSubject}
        faculties={faculties}
        specializations={specializations}
      />
    </>
  )
}

export default NewSubject
