'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import { Faculty, PrismaClient, Group, Subject } from '@prisma/client'
import { useFormState } from 'react-dom'
import InputHidden from './utils/InputHidden'
import Combobox from './utils/Combobox'
import { useEffect, useState } from 'react'
import {
  SEMESTER_OPTIONS,
  YEAR_OPTIONS,
  isEqualInsensitiveStrings,
} from '@/utilities/utils'
import InputCombobox from './utils/InputCombobox'
import { SubmitButton } from './utils/SubmitButton'
import FormNotification from './utils/FormNotification'
import InputSelect from './utils/InputSelect'
import InputMultipleCheckbox from './utils/InputMultipleCheckbox'
import InputCheckbox from './utils/InputCheckbox'

const initialState = {
  title: null,
  description: null,
  faculty: null,
}

const GroupForm = ({
  group = null,
  faculties,
  defaultFaculty = null,
  subjects,
  selectedSubjects = [],
  method,
}: {
  group?: Group | null
  faculties: Faculty[]
  subjects: Subject[]
  selectedSubjects?: Subject[]
  defaultFaculty?: Faculty | null
  method: (prevState: any, formData: FormData) => Promise<any>
}) => {
  const facultyOptions = faculties.map((faculty) => ({
    label: faculty.abbreviation ?? '',
    value: faculty.name ?? '',
    id: faculty.id ?? 0,
  }))

  const yearOptions = YEAR_OPTIONS.map((year) => ({
    label: year,
    value: year,
    id: year,
  }))

  const semesterOptions = SEMESTER_OPTIONS.map((semester) => ({
    label: semester,
    value: semester,
    id: semester,
  }))

  const [state, formAction] = useFormState(method, initialState)
  const [faculty, setFaculty] = useState(defaultFaculty?.name ?? '')
  const [year, setYear] = useState(group?.year ?? '')
  const [semester, setSemester] = useState(group?.semester ?? '')

  const facultyId = facultyOptions.find((option) =>
    isEqualInsensitiveStrings(option.value, faculty),
  )?.id

  const filteredSubjects = subjects.filter((subject) => {
    const equalFacultyId =
      facultyId && subject.facultyId ? subject.facultyId === facultyId : true
    const equalYear = year && subject.year ? subject.year === year : true
    const equalSemester =
      semester && subject.semester ? subject.semester === semester : true
    return equalFacultyId && equalYear && equalSemester
  })

  return (
    <form id="groups-form" action={formAction}>
      {state && <FormNotification state={state} />}
      {group?.id && <InputHidden name="id" id="id" value={group?.id} />}
      <div className="mb-4 italic">
        The subjects you can choose are based on the faculty, year and semester
        you choose.
      </div>
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultyOptions}
        name="facultyId"
        defaultValue={group?.facultyId}
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
      <InputSelect
        value={semester}
        setValue={setSemester}
        options={semesterOptions}
        name="semester"
        id="semester"
        label="Semester"
        error={state?.semester?.[0]}
      />
      <InputMultipleCheckbox label="Subjects" error={state?.subjects?.[0]}>
        {filteredSubjects.map((subject) => (
          <InputCheckbox
            key={subject.id}
            label={subject.title ?? ''}
            name="subjects"
            id={subject.id.toString()}
            defaultChecked={selectedSubjects?.some(
              ({ id }) => id === subject.id,
            )}
          />
        ))}
      </InputMultipleCheckbox>
      <SubmitButton />
    </form>
  )
}

export default GroupForm
