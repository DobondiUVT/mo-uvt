import { getSubjects } from '@/actions/subject'
import prisma from '@/utilities/db'
import Statistics from '../../components/Admin/Main/Statistics'
import { Fragment } from 'react'
import Settings from '@/components/Admin/Main/Settings'
import { saveDates } from '@/actions/settings'


export type subjectsStudentsType = {
  title: string | null
  id: number
  students: {
    sn: string
  }[]
}

const Admin = async () => {
  const subjects = await getSubjects()
  const faculties = await prisma.faculty.findMany()
  const settings = await prisma.settings.findFirst({
    where: {
      id: 1,
    },
  })

  return (
    <Fragment>
      <Settings settings={settings!} method={saveDates}/>
      <Statistics subjects={subjects} faculties={faculties}/>
    </Fragment>
  )
}

export default Admin
