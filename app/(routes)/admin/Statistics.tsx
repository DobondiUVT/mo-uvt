'use client'

import { SubjectsData } from '@/utilities/types'
import { isEqualInsensitiveStrings } from '@/utilities/utils'
import { Faculty, Student } from '@prisma/client'
import { useMemo, useState } from 'react'
import PrintButton from './PrintButton'
import InputCombobox from '@/components/Admin/Form/utils/InputCombobox'

type SubjectCardProps = {
  title: string
  students: Pick<Student, 'sn'>[]
}

const SubjectCard = ({ title, students }: SubjectCardProps) => (
  <div className="rounded-lg border bg-white p-4 shadow">
    <div className="mb-2 text-xl font-bold">{title}</div>
    <ul className="flex flex-col items-center justify-center gap-4">
      {students.length ? (
        students.map((student) => (
          <li key={student.sn} className="text-lg">
            {student.sn}
          </li>
        ))
      ) : (
        <div className="text-zinc-500">No students yet</div>
      )}
    </ul>
  </div>
)

const Statistics = ({
  subjects,
  faculties,
}: {
  subjects: SubjectsData
  faculties: Faculty[]
}) => {
  const [faculty, setFaculty] = useState('All')
  const facultiesOptions = useMemo(
    () => [
      {
        label: 'All',
        value: 'All',
        id: 0,
      },
      ...faculties.map((faculty) => ({
        label: faculty.abbreviation,
        value: faculty.name,
        id: faculty.id,
      })),
    ],
    [faculties],
  )

  const selectedFaculty = isEqualInsensitiveStrings(faculty, 'all') ? '' : faculty

  const selectedFacultyEntity = faculties.find((f) =>
    isEqualInsensitiveStrings(f.name, selectedFaculty),
  )

  const filteredSubjects = selectedFaculty
    ? subjects.filter((subject) =>
        isEqualInsensitiveStrings(subject.faculty.name, selectedFaculty),
      )
    : subjects
  return (
    <div>
      <div className="text-xl font-bold">Statistics</div>
      <div className="mb-4 text-lg">Subjects & Students</div>
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultiesOptions}
        name="facultyId"
        id="facultyId"
        label="Faculty"
      />
      <PrintButton subjects={filteredSubjects} faculty={selectedFacultyEntity}/>
      <div className="grid grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <SubjectCard
            key={`subject-${subject.id}`}
            title={subject.title ?? ''}
            students={subject.students}
          />
        ))}
      </div>
    </div>
  )
}

export default Statistics
