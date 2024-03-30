import { getAuthInfo } from '@/actions/auth'
import { getGroupsForStudent } from '@/actions/group'
import prisma from '@/utilities/db'
import { StudentData } from '@/utilities/types'
import { redirect } from 'next/navigation'
import ChoiceDescription from './ChoiceDescription'
import ChoiceSection from './ChoiceSection'

export const revalidate = 0

type GroupsStudentData = Awaited<ReturnType<typeof getGroupsForStudent>>

async function Subjects({ student }: { student: StudentData }) {
  const groups = await getGroupsForStudent(student!)

  let semesters: GroupsStudentData[] = []

  if (groups) {
    semesters = [
      groups.filter((group) => group.semester === 'ONE'),
      groups.filter((group) => group.semester === 'TWO'),
    ]
  }
  return (
    <div className="flex flex-col gap-4">
      {!semesters.length && (
        <h1 className="mb-4 text-lg">
          There are no optional subjects available that fit your faculty and
          year. If that is an error, please contact us at{' '}
          <a className="font-bold underline" href="mailto:info.uvt@e-uvt.ro">
            info.uvt@e-uvt.ro
          </a>
        </h1>
      )}
      {semesters[0] && (
        <ChoiceSection
          semester={'ONE'}
          groups={semesters[0]}
          student={student}
        />
      )}
      {semesters[1] && (
        <ChoiceSection
          semester={'TWO'}
          groups={semesters[1]}
          student={student}
        />
      )}
    </div>
  )
}

export default async function Choice() {
  const { session, user, student } = await getAuthInfo()
  const dates = await prisma.settings.findFirst({
    select: { dateStart: true, dateEnd: true },
  })
  const dateStart = new Date(dates!.dateStart)
  const dateEnd = new Date(dates!.dateEnd)
  const dateNow = new Date()
  const isJoinPeriod = dateNow >= dateStart && dateNow <= dateEnd

  if (!user) {
    redirect('/')
  }

  if (!student?.verified) {
    redirect('/info')
  }

  return (
    <main className="">
      <section className="py-8 lg:py-14">
        <div className="container px-4  ">
          <ChoiceDescription
            user={user}
            student={student}
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
          {isJoinPeriod && <Subjects student={student} />}
        </div>
      </section>
    </main>
  )
}
