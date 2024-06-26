import { getFaculty } from '@/actions/faculty'
import { updateSpecialization } from '@/actions/specialization'
import SpecializationsForm from '@/components/Admin/Form/SpecializationForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import prisma from '@/utilities/db'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

const EditSpecialization = async ({ params }: { params: { id: number } }) => {
  const { id } = params

  const t = await getTranslations('Admin')

  const specialization = await prisma.specialization.findUnique({
    where: {
      id: Number(id),
    },
  })

  const breadcrumbLinks = [
    {
      title: t('Specializations'),
      href: '/admin/specializations',
    },
    {
      title: `Edit ${specialization?.title}`,
    },
  ]

  const faculties = await prisma.faculty.findMany()
  const faculty = (await getFaculty(specialization?.facultyId ?? null)) ?? null
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <SpecializationsForm
        specialization={specialization}
        method={updateSpecialization}
        faculties={faculties}
        defaultFaculty={faculty}
      />
    </>
  )
}

export default EditSpecialization
