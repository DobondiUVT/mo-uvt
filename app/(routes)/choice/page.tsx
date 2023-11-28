import { getServerSession } from 'next-auth'
import { getGroupsForStudent } from '@/actions/group'
import { getCurrentUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { getStudent } from '@/actions/student'
import ChoiceSection from './ChoiceSection'

export const revalidate = 0

type GroupsData = Awaited<ReturnType<typeof getGroupsForStudent>>

const getAuthInfo = async () => {
  const session = await getServerSession()
  const user = session ? await getCurrentUser(session) : null
  const student = user ? await getStudent(user.id) : null
  return { session, user, student }
}

export default async function Choice() {
  const { session, user, student } = await getAuthInfo()
  if (!student || !user) {
    redirect('/subjects')
  }

  if (!student.verified) {
    redirect('/info')
  }
  const groups = await getGroupsForStudent(student)

  let semesters: GroupsData[] = [];

  if (groups) {
    semesters = [
      groups.filter((group) => group.semester === 'ONE'),
      groups.filter((group) => group.semester === 'TWO'),
    ]
  }

  return (
    <main className="">
      <section className="py-14">
        <div className="container">
          {session && (
            <h1 className="mb-2 text-3xl font-bold">Hi {user.name} 👋</h1>
          )}
          <p className="text-lg">
            We have gathered all the optional subjects that fit your faculty and
            year.
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
