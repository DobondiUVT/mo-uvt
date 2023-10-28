import SubjectCard from '@/components/Subjects/SubjectCard'
import { getSubjects } from '@/actions/subject'

export const revalidate = 0

export default async function Home() {
  const subjects = await getSubjects()
  return (
    <main className="">
      <section className="py-14">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
            {subjects &&
              subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
