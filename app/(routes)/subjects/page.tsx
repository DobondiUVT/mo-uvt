import SubjectCard from '@/components/Subjects/SubjectCard'
import { getSubjects } from '@/actions/subject'
import { Subject } from '@prisma/client'

export const revalidate = 0

const SubjectsSection = ({ subjects }: { subjects: Subject[] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  )
}

export default async function Subjects() {
  const subjects = await getSubjects()

  return (
    <main className="">
      <section className="lg:py-14 py-8">
        <div className="container px-4  ">
          <h1 className='text-3xl font-bold mb-6'>Check out all of our UVT optional subjects:</h1>
          <div className="flex flex-col gap-4">
            {subjects && subjects.length ? (
              <SubjectsSection subjects={subjects} />
            ) : (
              <h1 className="mb-4 text-lg">
                There are no optional subjects available. If that is an error,
                please contact us at{' '}
                <a
                  className="font-bold underline"
                  href="mailto:info.uvt@e-uvt.ro"
                >
                  info.uvt@e-uvt.ro
                </a>
              </h1>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
