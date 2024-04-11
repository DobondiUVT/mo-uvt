'use client'

import InputCombobox from '@/components/Admin/Form/utils/InputCombobox'
import { DataTable } from '@/components/Admin/Tables/DataTable'
import { SpecializationData } from '@/utilities/types'
import { isEqualInsensitiveStrings } from '@/utilities/utils'
import { Faculty } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo, useState } from 'react'

function Table({
  columns,
  data,
  faculties,
}: {
  columns: ColumnDef<SpecializationData>[]
  data: SpecializationData[]
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

  const selectedFaculty = isEqualInsensitiveStrings(faculty, 'all')
    ? ''
    : faculty

  const filteredSpecializations = selectedFaculty
    ? data.filter((specialization) =>
        isEqualInsensitiveStrings(specialization.faculty.name, selectedFaculty),
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
      <DataTable columns={columns} data={filteredSpecializations} />
    </Fragment>
  )
}

export default Table
