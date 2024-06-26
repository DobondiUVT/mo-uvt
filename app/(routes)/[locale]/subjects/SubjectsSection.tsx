'use client'
import SubjectCard from '@/components/Subjects/SubjectCard'
import { SubjectsData } from '@/utilities/types'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const SubjectsSection = ({ subjects }: { subjects: SubjectsData }) => {
  const t = useTranslations('Subjects Page')
  const defaultFaculties = Array.from(
    new Set(subjects.map((subject) => subject.faculty?.abbreviation ?? '')),
  )
  let uniqueSpecializations = new Set<string>()
  subjects.forEach((subject) => {
    subject.specializations.forEach((specialization) => {
      uniqueSpecializations.add(specialization.abbreviation)
    })
  })

  let defaultSpecializations = Array.from(uniqueSpecializations)

  let groupedSpecializations = [] as {
    faculty: string
    specializations: string[]
  }[]

  defaultSpecializations.forEach((specialization) => {
    let faculty =
      subjects.find((subject) => {
        return subject.specializations.some(
          (s) => s.abbreviation === specialization,
        )
      })?.faculty?.abbreviation ?? ''

    if (!groupedSpecializations.some((group) => group.faculty === faculty)) {
      groupedSpecializations.push({
        faculty: faculty,
        specializations: [specialization],
      })
    } else {
      groupedSpecializations
        .find((group) => group.faculty === faculty)
        ?.specializations.push(specialization)
    }
  })

  const [year, setYear] = useState<string[]>(['ONE', 'TWO', 'THREE'])
  const [semesters, setSemesters] = useState<string[]>(['ONE', 'TWO'])
  const [faculties, setFaculties] = useState<string[]>(defaultFaculties)
  const [specializations, setSpecializations] = useState<string[]>(
    defaultSpecializations,
  )
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

  filteredSubjects = filteredSubjects.filter((subject) => {
    return specializations.some((specialization) =>
      subject.specializations.some((s) => s.abbreviation === specialization),
    )
  })

  filteredSubjects = filteredSubjects.filter((subject) => {
    return year.includes(subject.year)
  })

  return (
    <section>
      {/* create a search bar */}
      <div className="mb-6 flex items-center justify-center">
        <input
          type="text"
          placeholder={t('Search for a subject')}
          className="w-full rounded-md border border-zinc-300 px-4 py-2 text-lg focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="lg:flex-shrink-0 lg:basis-64">
          <div className="flex flex-col gap-4 rounded-sm border border-zinc-200 bg-white p-4 sm:gap-12 lg:block">
            <div className="text-lg">{t('Filters')}</div>
            <div className="-mx-4 my-4 hidden h-px bg-zinc-200 lg:block"></div>
            <div>
              <div className="text-md">{t('Year')}</div>
              <div className="flex flex-row gap-3 lg:flex-col lg:gap-1">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={year.includes('ONE')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!year.includes('ONE')) setYear([...year, 'ONE'])
                      } else {
                        setYear(year.filter((y) => y !== 'ONE'))
                      }
                    }}
                  />
                  1
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={year.includes('TWO')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!year.includes('TWO')) setYear([...year, 'TWO'])
                      } else {
                        setYear(year.filter((y) => y !== 'TWO'))
                      }
                    }}
                  />
                  2
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={year.includes('THREE')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!year.includes('THREE')) setYear([...year, 'THREE'])
                      } else {
                        setYear(year.filter((y) => y !== 'THREE'))
                      }
                    }}
                  />
                  3
                </label>
              </div>
            </div>
            <div className="-mx-4 my-4 hidden h-px bg-zinc-200 lg:block"></div>
            <div>
              <div className="text-md">{t('Semester')}</div>
              <div className="flex flex-row gap-3 lg:flex-col lg:gap-1">
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
                  1
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
                  2
                </label>
              </div>
            </div>
            <div className="-mx-4 my-4 hidden h-px bg-zinc-200 lg:block"></div>
            <div>
              <div className="text-md">{t('Faculties')}</div>
              <div className="flex flex-row gap-3 lg:flex-col lg:gap-1">
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
            <div className="-mx-4 my-4 hidden h-px bg-zinc-200 lg:block"></div>
            <div>
              <div className="text-md">{t('Specializations')}</div>
              <div className="flex flex-row gap-3 lg:flex-col lg:gap-1">
                {groupedSpecializations.map((group) => (
                  <div key={group.faculty}>
                    <div className="mt-1 text-sm text-gray-500">
                      {group.faculty}
                    </div>
                    {group.specializations.map((specialization) => (
                      <label
                        key={specialization}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={specializations.includes(specialization)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (!specializations.includes(specialization))
                                setSpecializations([
                                  ...specializations,
                                  specialization,
                                ])
                            } else {
                              setSpecializations(
                                specializations.filter(
                                  (spec) => spec !== specialization,
                                ),
                              )
                            }
                          }}
                        />
                        {specialization}
                      </label>
                    ))}
                  </div>
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
            {t(
              'There are no optional subjects available If that is an error,please contact us at',
            )}{' '}
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
