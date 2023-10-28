import SubjectCard from '@/components/Subjects/SubjectCard'
import { getSubjects } from '@/actions'

export const revalidate = 0

export default async function Home() {
  const subjects = await getSubjects()
  return (
    <main className="">
      <section className="py-14">
        <div className="container">
          <div className="grid grid-cols-3 gap-12">
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
