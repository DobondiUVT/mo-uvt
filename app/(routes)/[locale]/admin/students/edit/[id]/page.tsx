import { getStudent, updateStudent } from '@/actions/student'
import StudentsForm from '@/components/Admin/Form/StudentForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import prisma from '@/utilities/db'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

const EditStudent = async ({ params }: { params: { id: number } }) => {
  const { id } = params

  const t = await getTranslations('Admin')

  const student = await getStudent(Number(id))

  if (!student) {
    return 'No student found'
  }

  const breadcrumbLinks = [
    {
      title: t('Students'),
      href: '/admin/students',
    },
    {
      title: `Edit ${student?.user.name}`,
    },
  ]

  const faculties = await prisma.faculty.findMany()
  const specializations = await prisma.specialization.findMany()

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <StudentsForm
        student={student}
        method={updateStudent}
        faculties={faculties}
        specializations={specializations}
      />
    </>
  )
}

export default EditStudent
