import SubjectCard from '@/components/Subjects/SubjectCard'
import { getSubjects } from '@/actions/subject'
import { $Enums, Faculty, Subject } from '@prisma/client'
import SubjectsSection from './SubjectsSection'
import prisma from '@/utilities/db'

export const revalidate = 0

export type FilterSubjectsProps = {
  faculty: {
    abbreviation: string | null
    id: number
  } | null
  id: number
  title: string | null
  description: string | null
  semester: $Enums.Semester
  facultyId: number | null
}

export default async function Subjects() {
  const subjects = await prisma.subject.findMany({
    select: {
      id: true,
      title: true,
      semester: true,
      description: true,
      facultyId: true,
      faculty: {
        select: {
          id: true,
          abbreviation: true,
        },
      },
    },
  })

  return (
    <main className="">
      <section className="py-8 lg:py-14">
        <div className="px-4">
          <h1 className="mb-6 text-3xl font-bold">
            Check out all of our UVT optional subjects:
          </h1>
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
