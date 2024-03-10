import { getServerSession } from 'next-auth'
import { getGroupsForStudent } from '@/actions/group'
import { getCurrentUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { getStudent } from '@/actions/student'
import ChoiceSection from './ChoiceSection'
import { getAuthInfo } from '@/actions/auth'

export const revalidate = 0

type GroupsStudentData = Awaited<ReturnType<typeof getGroupsForStudent>>

export default async function Choice() {
  const { session, user, student } = await getAuthInfo()
  if (!user) {
    redirect('/')
  }

  if (!student?.verified) {
    redirect('/info')
  }
  const groups = await getGroupsForStudent(student)

  let semesters: GroupsStudentData[] = [];

  if (groups) {
    semesters = [
      groups.filter((group) => group.semester === 'ONE'),
      groups.filter((group) => group.semester === 'TWO'),
    ]
  }

  return (
    <main className="">
      <section className="lg:py-14 py-8">
        <div className="container px-4  ">
          <h1 className="mb-2 text-3xl font-bold">Hi {user.name} 👋</h1>
          <h2 className="text-xl font-semibold mb-3">{student.faculty.name} - {student.specialization.title} - {`Year ${student.year.toLowerCase()}`}</h2>
          <p className="text-lg">
            We have gathered all the optional subjects that fit you.
          </p>
          <p className="text-lg">
            Please choose <strong>only one</strong> subject from each group that
            you think fits your interests best.
          </p>
          <p className="mb-12 text-lg">
            For any questions, please contact us at{' '}
            <a className="font-bold underline" href="mailto:info.uvt@e-uvt.ro">
              info.uvt@e-uvt.ro
            </a>
          </p>
          <div className="flex flex-col gap-4">
            {!semesters.length && (
              <h1 className="mb-4 text-lg">
                There are no optional subjects available that fit your faculty
                and year. If that is an error, please contact us at{' '}
                <a
                  className="font-bold underline"
                  href="mailto:info.uvt@e-uvt.ro"
                >
                  info.uvt@e-uvt.ro
                </a>
              </h1>
            )}
            {semesters[0] && (
              <ChoiceSection semester={'ONE'} groups={semesters[0]} student={student} />
            )}
            {semesters[1] && (
              <ChoiceSection semester={'TWO'} groups={semesters[1]} student={student} />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
