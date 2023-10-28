import SubjectCard from '@/components/Subjects/SubjectCard'
import { getSubjects } from '@/actions/subject'

export const revalidate = 0

export default async function Home() {
  const subjects = await getSubjects()
  return (
    <main className="">
      <section className="py-14">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
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
