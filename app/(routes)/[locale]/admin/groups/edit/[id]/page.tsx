import { getFaculty } from '@/actions/faculty'
import { getGroup, updateGroup } from '@/actions/group'
import GroupsForm from '@/components/Admin/Form/GroupForm'
import Breadcrumb from '@/components/Admin/Navigation/Breadcrumb'
import prisma from '@/utilities/db'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

const EditGroup = async ({ params }: { params: { id: number } }) => {
  const { id } = params

  const t = await getTranslations("Admin")

  const group = await getGroup(Number(id))

  const breadcrumbLinks = [
    {
      title: t("Packets"),
      href: '/admin/groups',
    },
    {
      title: `Edit ${group?.title}`,
    },
  ]
  const subjects = await prisma.subject.findMany()
  const selectedSubjects = subjects.filter((s) =>
    group?.subjects?.some((ss) => ss.id === s.id),
  )
  const faculties = await prisma.faculty.findMany()
  const faculty = (await getFaculty(group?.facultyId ?? null)) ?? null
  const specializations = await prisma.specialization.findMany()
  const selectedSpecializations = specializations.filter((s) =>
    group?.specializations?.some((ss) => ss.id === s.id),
  )
  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />
      <GroupsForm
        group={group}
        method={updateGroup}
        faculties={faculties}
        subjects={subjects}
        specializations={specializations}
        defaultFaculty={faculty}
        defaultSpecializations={selectedSpecializations}
        selectedSubjects={selectedSubjects}
      />
    </>
  )
}

export default EditGroup
