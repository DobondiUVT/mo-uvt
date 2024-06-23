'use client'

import InputCombobox from '@/components/Admin/Form/utils/InputCombobox'
import { DataTable } from '@/components/Admin/Tables/DataTable'
import { SubjectData } from '@/utilities/types'
import { isEqualInsensitiveStrings } from '@/utilities/utils'
import { Faculty, Specialization } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo, useState } from 'react'

function Table({
  columns,
  data,
  faculties,
  specializations,
}: {
  columns: ColumnDef<SubjectData>[]
  data: SubjectData[]
  faculties: Faculty[]
  specializations: Specialization[]
}) {
  const [faculty, setFaculty] = useState('All')
  const [specialization, setSpecialization] = useState('All')
  const [semester, setSemester] = useState('All')
  const [year, setYear] = useState('All')
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

  const specializationsOptions = useMemo(
    () => [
      {
        label: 'All',
        value: 'All',
        id: 0,
      },
      ...specializations.map((specialization) => ({
        label: specialization.abbreviation,
        value: specialization.title,
        id: specialization.id,
      })),
    ],
    [specializations],
  )

  const semesterOptions = [
    {
      label: 'All',
      value: 'All',
      id: 0,
    },
    {
      label: 'ONE',
      value: 'ONE',
      id: 1,
    },
    {
      label: 'TWO',
      value: 'TWO',
      id: 2,
    },
  ]

  const yearOptions = [
    {
      label: 'All',
      value: 'All',
      id: 0,
    },
    {
      label: 'ONE',
      value: 'ONE',
      id: 1,
    },
    {
      label: 'TWO',
      value: 'TWO',
      id: 2,
    },
    {
      label: 'THREE',
      value: 'THREE',
      id: 3,
    },
  ]
  const selectedFaculty = isEqualInsensitiveStrings(faculty, 'all')
    ? ''
    : faculty
  const selectedSpecialization = isEqualInsensitiveStrings(
    specialization,
    'all',
  )
    ? ''
    : specialization
  const selectedSemester = isEqualInsensitiveStrings(semester, 'all')
    ? ''
    : semester
  const selectedYear = isEqualInsensitiveStrings(year, 'all') ? '' : year

  let filteredSubjects = data
  filteredSubjects = selectedFaculty
    ? filteredSubjects.filter((subject) =>
        isEqualInsensitiveStrings(subject.faculty.name, selectedFaculty),
      )
    : filteredSubjects
  filteredSubjects = selectedSpecialization
    ? filteredSubjects.filter((subject) =>
        subject.specializations.some((specialization) =>
          isEqualInsensitiveStrings(
            specialization.title,
            selectedSpecialization,
          ),
        ),
      )
    : filteredSubjects
  filteredSubjects = selectedSemester
    ? filteredSubjects.filter((subject) =>
        isEqualInsensitiveStrings(subject.semester, selectedSemester),
      )
    : filteredSubjects
  filteredSubjects = selectedYear
    ? filteredSubjects.filter((subject) =>
        isEqualInsensitiveStrings(subject.year, selectedYear),
      )
    : filteredSubjects
  return (
    <Fragment>
      <div className="flex flex-wrap gap-4">
        <InputCombobox
          value={faculty}
          setValue={setFaculty}
          options={facultiesOptions}
          name="facultyId"
          id="facultyId"
          label="Faculty"
        />
        <InputCombobox
          value={specialization}
          setValue={setSpecialization}
          options={specializationsOptions}
          name="specializationId"
          id="specializationId"
          label="Specialization"
        />
        <InputCombobox
          value={semester}
          setValue={setSemester}
          options={semesterOptions}
          name="semester"
          id="semester"
          label="Semester"
        />
        <InputCombobox
          value={year}
          setValue={setYear}
          options={yearOptions}
          name="year"
          id="year"
          label="Year"
        />
      </div>
      <DataTable columns={columns} data={filteredSubjects} />
    </Fragment>
  )
}

export default Table