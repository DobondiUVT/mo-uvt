'use client'

import { updateStudent } from '@/actions/student'
import InputCombobox from '@/components/Admin/Form/utils/InputCombobox'
import InputHidden from '@/components/Admin/Form/utils/InputHidden'
import InputSelect from '@/components/Admin/Form/utils/InputSelect'
import InputText from '@/components/Admin/Form/utils/InputText'
import { SubmitButton } from '@/components/Admin/Form/utils/SubmitButton'
import { YEAR_OPTIONS } from '@/utilities/utils'
import { Student, Faculty } from '@prisma/client'
import { useState } from 'react'
import { useFormState } from 'react-dom'
const initialState = {
  userId: null,
  facultyId: null,
  year: null,
  sn: null,
  verified: null
}
const InfoForm = ({
  student,
  faculties,
}: {
  student: Student
  faculties: Faculty[]
}) => {
  'use client'
  const facultyOptions = faculties.map((faculty) => ({
    label: faculty.abbreviation ?? '',
    value: faculty.name ?? '',
    id: faculty.id ?? 0,
  }))
  const yearOptions = Object.values(YEAR_OPTIONS).map((year) => ({
    label: year,
    value: year,
    id: year,
  }))

  const studentsFaculty = faculties.find(
    (faculty) => faculty.id === student.facultyId
  )

  const [state, formAction] = useFormState(updateStudent, initialState)
  const [faculty, setFaculty] = useState(studentsFaculty?.name ?? '')
  const [year, setYear] = useState(student.year ?? YEAR_OPTIONS.ONE)
  const [sn, setSn] = useState(student.sn ?? 0)
  return (
    <form id="info-form" action={formAction}>
      <InputHidden name="userId" id="userId" value={student.userId} />
      <InputHidden name="verified" id="verified" value={1} />
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultyOptions}
        name="facultyId"
        id="facultyId"
        label="Faculty"
        error={state?.facultyId?.[0]}
      />
      <InputSelect
        value={year}
        setValue={setYear}
        options={yearOptions}
        name="year"
        id="year"
        label="Year"
        error={state?.year?.[0]}
      />
      <div className="max-w-xs">
        <InputText
          value={sn}
          name="sn"
          id="sn"
          label="Student Number"
          error={state?.sn?.[0]}
        />
      </div>
      <SubmitButton />
    </form>
  )
}

export default InfoForm
