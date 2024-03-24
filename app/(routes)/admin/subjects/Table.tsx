'use client'

import InputCombobox from '@/components/Admin/Form/utils/InputCombobox'
import { DataTable } from '@/components/Admin/Tables/DataTable'
import { SubjectData } from '@/utilities/types'
import { isEqualInsensitiveStrings } from '@/utilities/utils'
import { Faculty } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo, useState } from 'react'

function Table({
  columns,
  data,
  faculties,
}: {
  columns: ColumnDef<SubjectData>[]
  data: SubjectData[]
  faculties: Faculty[]
}) {
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

  const filteredSubjects = selectedFaculty
    ? data.filter((subject) =>
        isEqualInsensitiveStrings(subject.faculty.name, selectedFaculty),
      )
    : data
  return (
    <Fragment>
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultiesOptions}
        name="facultyId"
        id="facultyId"
        label="Faculty"
      />
      <DataTable columns={columns} data={filteredSubjects} />
    </Fragment>
  )
}

export default Table
