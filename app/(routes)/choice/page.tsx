import SubjectCard from '@/components/Subjects/SubjectCard'
import { getSubjects } from '@/actions/subject'
import { getServerSession } from 'next-auth'
import { getGroupsData, getGroupsForStudent } from '@/actions/group'
import { Group, Semester, Student, Subject } from '@prisma/client'
import { getCurrentUser, hasUserInfo } from '@/actions/user'
import { redirect } from 'next/navigation'
import { getStudent } from '@/actions/student'

export const revalidate = 0

type GroupsData = Awaited<ReturnType<typeof getGroupsData>>[0]

const SubjectsSection = ({ subjects }: { subjects: Subject[] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} joinable />
      ))}
    </div>
  )
}

const GroupSection = ({
  group,
  last,
}: {
  group: GroupsData
  last: boolean
}) => {
  return (
    <div>
      <h1 className="text-md mb-4 font-semibold">
        Choose 1 out of {group.subjects.length} subjects
      </h1>
      <SubjectsSection key={group.id} subjects={group.subjects} />
      {!last && <div className="mt-8 mb-8 -mx-7 h-px bg-black"></div>}
    </div>
  )
}

const SemesterSection = ({
  semester,
  groups,
}: {
  semester: Semester
  groups: GroupsData[]
}) => {
  return (
    <div className="relative mb-10 rounded-lg border border-black p-7">
      <h1 className="absolute top-0 -ms-4 mb-4 -translate-y-1/2 bg-zinc-100 px-4 py-2 text-xl font-bold">
        Semester {semester.toLowerCase()}
      </h1>
      <div>
        {groups.map((group, index) => (
          <GroupSection key={group.id} group={group} last={index == groups.length - 1} />
        ))}
      </div>
    </div>
  )
}

const getAuthInfo = async () => {
  const session = await getServerSession()
  const user = session ? await getCurrentUser(session) : null
  const student = user ? await getStudent(user) : null
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

  let semesters: GroupsData[][] = []

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
              <SemesterSection semester={'ONE'} groups={semesters[0]} />
            )}
            {semesters[1] && (
              <SemesterSection semester={'TWO'} groups={semesters[1]} />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
