'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import {
  ENUM_TO_NUMBER,
  SEMESTER_OPTIONS,
  YEAR_OPTIONS,
  isEqualInsensitiveStrings,
} from '@/utilities/utils'
import { Faculty, Specialization, Subject } from '@prisma/client'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import FormNotification from './utils/FormNotification'
import InputCombobox from './utils/InputCombobox'
import InputHidden from './utils/InputHidden'
import InputSelect from './utils/InputSelect'
import { SubmitButton } from './utils/SubmitButton'
import InputCheckbox from './utils/InputCheckbox'
import InputMultipleCheckbox from './utils/InputMultipleCheckbox'
import { useTranslations } from 'next-intl'

const initialState = {
  title: null,
  description: null,
  faculty: null,
  year: null,
  semester: null,
  specialization: null,
}

const SubjectForm = ({
  subject = null,
  faculties,
  specializations,
  defaultFaculty = null,
  defaultSpecializations = null,
  method,
}: {
  subject?: Subject | null
  faculties: Faculty[]
  specializations: Specialization[]
  defaultFaculty?: Faculty | null
  defaultSpecializations?: Specialization[] | null
  method: (prevState: any, formData: FormData) => Promise<any>
}) => {
  const t = useTranslations('Admin')
  const facultyOptions = faculties.map((faculty) => ({
    label: faculty.abbreviation ?? '',
    value: faculty.name ?? '',
    id: faculty.id ?? 0,
  }))

  const yearOptions = Object.values(YEAR_OPTIONS).map((year) => ({
    label: ENUM_TO_NUMBER[year].toString(),
    value: year,
    id: year,
  }))

  const semesterOptions = Object.values(SEMESTER_OPTIONS).map((semester) => ({
    label: ENUM_TO_NUMBER[semester].toString(),
    value: semester,
    id: semester,
  }))

  const [state, formAction] = useFormState(method, initialState)
  const [faculty, setFaculty] = useState(defaultFaculty?.name ?? '')
  const [year, setYear] = useState(subject?.year ?? YEAR_OPTIONS.ONE)
  const [semester, setSemester] = useState(
    subject?.semester ?? SEMESTER_OPTIONS.ONE,
  )

  const selectedFacultyId = facultyOptions.find((option) =>
    isEqualInsensitiveStrings(option.value, faculty),
  )?.id

  const specializationOptions = specializations
    .filter((s) => s.facultyId === selectedFacultyId)
    .map((specialization) => ({
      label: specialization.title ?? '',
      value: specialization.title ?? '',
      id: specialization.id ?? 0,
    }))
  return (
    <form id="subjects-form" action={formAction}>
      {state && <FormNotification state={state} />}
      {subject?.id && <InputHidden name="id" id="id" value={subject?.id} />}
      <InputText
        label={t('Title')}
        name="title"
        id="title"
        value={subject?.title}
        error={state?.title?.[0]}
      />
      <InputText
        label={t('Abbreviation')}
        name="abbreviation"
        id="abbreviation"
        value={subject?.abbreviation}
        error={state?.abbreviation?.[0]}
      />
      <InputTextArea
        label={t('Description')}
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
        label={t('Faculty')}
        error={state?.facultyId?.[0]}
      />
      {specializationOptions.length > 0 ? (
        <InputMultipleCheckbox
          label={t('Specializations')}
          error={state?.specializations?.[0]}
        >
          {specializationOptions.map((specialization) => (
            <InputCheckbox
              key={specialization.id}
              label={specialization.label ?? ''}
              name="specializations"
              value={specialization.id}
              id={specialization.id.toString()}
              defaultChecked={defaultSpecializations?.some(
                ({ id }) => id === specialization.id,
              )}
            />
          ))}
        </InputMultipleCheckbox>
      ) : (
        <div className="mb-6 italic">
          {t('No specializations available for this faculty')}
        </div>
      )}
      <InputSelect
        value={year}
        setValue={setYear}
        options={yearOptions}
        name="year"
        id="year"
        label={t('Year')}
        error={state?.year?.[0]}
      />
      <InputSelect
        value={semester}
        setValue={setSemester}
        options={semesterOptions}
        name="semester"
        id="semester"
        label={t('Semester')}
        error={state?.semester?.[0]}
      />
      {/* create text input for file url name file */}
      <InputText
        label={t('Subject description file URL')}
        name="file"
        id="file"
        value={subject?.file}
        error={state?.file?.[0]}
        placeholder="https://example.com/file.pdf"
      />
      <SubmitButton />
    </form>
  )
}

export default SubjectForm
