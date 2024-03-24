'use client'
import SubjectCard from '@/components/Subjects/SubjectCard'
import { SubjectsData } from '@/utilities/types'
import { useState } from 'react'

const SubjectsSection = ({ subjects }: { subjects: SubjectsData }) => {
  const defaultFaculties = Array.from(
    new Set(subjects.map((subject) => subject.faculty?.abbreviation ?? '')),
  )
  const [semesters, setSemesters] = useState<string[]>(['ONE', 'TWO'])
  const [faculties, setFaculties] = useState<string[]>(defaultFaculties)
  const [search, setSearch] = useState<string>('')

  let filteredSubjects = subjects.filter((subject) => {
    return semesters.includes(subject.semester)
  })

  filteredSubjects = filteredSubjects.filter((subject) => {
    return faculties.includes(subject.faculty?.abbreviation ?? '')
  })

  filteredSubjects = filteredSubjects.filter((subject) => {
    return subject.title?.toLowerCase().includes(search.toLowerCase()) ?? false
  })

  return (
    <section>
      {/* create a search bar */}
      <div className="mb-6 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search for a subject"
          className="w-full rounded-md border border-zinc-300 px-4 py-2 text-lg focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="lg:flex-shrink-0 lg:basis-64">
          <div className="flex gap-6 rounded-sm border border-zinc-200 bg-white p-4 sm:gap-12 lg:block">
            <div className="text-lg">Filters</div>
            <div className="-mx-4 my-4 hidden h-px bg-zinc-200 lg:block"></div>
            <div>
              <div className="text-md">Semester</div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={semesters.includes('ONE')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!semesters.includes('ONE'))
                          setSemesters([...semesters, 'ONE'])
                      } else {
                        setSemesters(
                          semesters.filter((semester) => semester !== 'ONE'),
                        )
                      }
                    }}
                  />
                  ONE
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={semesters.includes('TWO')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!semesters.includes('TWO'))
                          setSemesters([...semesters, 'TWO'])
                      } else {
                        setSemesters(
                          semesters.filter((semester) => semester !== 'TWO'),
                        )
                      }
                    }}
                  />
                  TWO
                </label>
              </div>
            </div>
            <div className="-mx-4 my-4 hidden h-px bg-zinc-200 lg:block"></div>
            <div>
              <div className="text-md">Faculties</div>
              <div className="flex flex-col gap-2">
                {defaultFaculties.map((faculty) => (
                  <label key={faculty} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={faculties.includes(faculty)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (!faculties.includes(faculty))
                            setFaculties([...faculties, faculty])
                        } else {
                          setFaculties(
                            faculties.filter((fac) => fac !== faculty),
                          )
                        }
                      }}
                    />
                    {faculty}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        {filteredSubjects.length ? (
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        ) : (
          <h1 className="mb-4 text-lg">
            There are no optional subjects available. If that is an error,
            please contact us at{' '}
            <a className="font-bold underline" href="mailto:info.uvt@e-uvt.ro">
              info.uvt@e-uvt.ro
            </a>
          </h1>
        )}
      </div>
    </section>
  )
}

export default SubjectsSection
