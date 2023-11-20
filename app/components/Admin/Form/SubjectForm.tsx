'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import { Faculty, PrismaClient, Subject } from '@prisma/client'
import { useFormState } from 'react-dom'
import InputHidden from './utils/InputHidden'
import Combobox from './utils/Combobox'
import { useState } from 'react'
import { SEMESTER_OPTIONS, YEAR_OPTIONS, isEqualInsensitiveStrings } from '@/utilities/utils'
import InputCombobox from './utils/InputCombobox'
import { SubmitButton } from './utils/SubmitButton'
import FormNotification from './utils/FormNotification'
import InputSelect from './utils/InputSelect'

const initialState = {
  title: null,
  description: null,
  faculty: null,
}

const SubjectForm = ({
  subject = null,
  faculties,
  defaultFaculty = null,
  method,
}: {
  subject?: Subject | null
  faculties: Faculty[]
  defaultFaculty?: Faculty | null
  method: (prevState: any, formData: FormData) => Promise<any>
}) => {
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

  const semesterOptions = Object.values(SEMESTER_OPTIONS).map((semester) => ({
    label: semester,
    value: semester,
    id: semester,
  }))

  const [state, formAction] = useFormState(method, initialState)
  const [faculty, setFaculty] = useState(defaultFaculty?.name ?? '')
  const [year, setYear] = useState(subject?.year ?? YEAR_OPTIONS.ONE)
  const [semester, setSemester] = useState(subject?.semester ?? SEMESTER_OPTIONS.ONE)
  return (
    <form id="subjects-form" action={formAction}>
      {state && <FormNotification state={state} />}
      {subject?.id && <InputHidden name="id" id="id" value={subject?.id} />}
      <InputText
        label="Title"
        name="title"
        id="title"
        value={subject?.title}
        error={state?.title?.[0]}
      />
      <InputText
        label="Abbreviation"
        name="abbreviation"
        id="abbreviation"
        value={subject?.abbreviation}
        error={state?.abbreviation?.[0]}
      />
      <InputTextArea
        label="Description"
        name="description"
        id="description"
        value={subject?.description}
        error={state?.description?.[0]}
      />
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultyOptions}
        name="facultyId"
        defaultValue={subject?.facultyId}
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
      <SubmitButton />
    </form>
  )
}

export default SubjectForm
