import SubjectCard from '@/components/Subjects/SubjectCard'
import { getSubjects } from '@/actions/subject'
import { getServerSession } from 'next-auth'
import { getGroupsData } from '@/actions/group'
import { Group, Subject } from '@prisma/client'

export const revalidate = 0


type GroupsData = Awaited<ReturnType<typeof getGroupsData>>[0]

const SubjectsSection = ({ subjects }: { subjects: Subject[] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  )
}

const GroupSection = ({ group }: { group: GroupsData }) => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{group.title}</h1>
      <SubjectsSection key={group.id} subjects={group.subjects} />
    </div>
  )

}

export default async function Home() {
  const session = await getServerSession()
  const groups = await getGroupsData()

  return (
    <main className="">
      <section className="py-14">
        <div className="container">
          {session && (
            <h1 className="mb-4 text-2xl font-bold">
              Welcome {session.user?.name}
            </h1>
          )}
          <div className='flex flex-col gap-4'>
            {groups &&
              groups.map((group) => (
                <GroupSection key={group.id} group={group} />
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
