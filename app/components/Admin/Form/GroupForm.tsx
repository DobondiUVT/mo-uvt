'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import {
  Faculty,
  PrismaClient,
  Group,
  Subject,
  Specialization,
} from '@prisma/client'
import { useFormState } from 'react-dom'
import InputHidden from './utils/InputHidden'
import Combobox from './utils/Combobox'
import { useEffect, useState } from 'react'
import {
  ENUM_TO_NUMBER,
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
import { useTranslations } from 'next-intl'

const initialState = {
  title: null,
  description: null,
  faculty: null,
}

const GroupForm = ({
  group = null,
  faculties,
  specializations,
  defaultFaculty = null,
  subjects,
  selectedSubjects = [],
  defaultSpecializations = null,
  method,
}: {
  group?: Group | null
  faculties: Faculty[]
  specializations: Specialization[]
  subjects: Subject[]
  selectedSubjects?: Subject[]
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
  const [year, setYear] = useState(group?.year ?? YEAR_OPTIONS.ONE)
  const [semester, setSemester] = useState(
    group?.semester ?? SEMESTER_OPTIONS.ONE,
  )

  const facultyId = facultyOptions.find((option) =>
    isEqualInsensitiveStrings(option.value, faculty),
  )?.id

  const filteredSubjects = subjects.filter((subject) => {
    const facultyMatch = subject.facultyId === facultyId
    const yearMatch = subject.year === year
    const semesterMatch = subject.semester === semester
    return facultyMatch && yearMatch && semesterMatch
  })

  const specializationOptions = specializations
    .filter((s) => s.facultyId === facultyId)
    .map((specialization) => ({
      label: specialization.title ?? '',
      value: specialization.title ?? '',
      id: specialization.id ?? 0,
    }))

  return (
    <form id="groups-form" action={formAction}>
      {state && <FormNotification state={state} />}
      {group?.id && <InputHidden name="id" id="id" value={group?.id} />}
      <div className="mb-4 italic">
        {t("The subjects you can choose are based on the faculty, year and semester you choose")}
      </div>
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultyOptions}
        name="facultyId"
        defaultValue={group?.facultyId}
        id="facultyId"
        label={t("Faculty")}
        error={state?.facultyId?.[0]}
      />
      <InputSelect
        value={year}
        setValue={setYear}
        options={yearOptions}
        name="year"
        id="year"
        label={t("Year")}
        error={state?.year?.[0]}
      />
      <InputSelect
        value={semester}
        setValue={setSemester}
        options={semesterOptions}
        name="semester"
        id="semester"
        label={t("Semester")}
        error={state?.semester?.[0]}
      />
      {filteredSubjects.length > 0 ? (
        <InputMultipleCheckbox label="Subjects" error={state?.subjects?.[0]}>
          {filteredSubjects.map((subject) => (
            <InputCheckbox
              key={subject.id}
              label={subject.title ?? ''}
              name="subjects"
              value={subject.id}
              id={subject.id.toString()}
              defaultChecked={selectedSubjects?.some(
                ({ id }) => id === subject.id,
              )}
            />
          ))}
        </InputMultipleCheckbox>
      ) : (
        <div className="mb-6 italic">
          {t("There are no subjects available for the selected faculty, year and semester")}
        </div>
      )}
      {specializationOptions.length > 0 ? (
        <InputMultipleCheckbox
          label={t("Specializations")}
          error={state?.specializations?.[0]}
        >
          {specializationOptions.map((specialization) => (
            <InputCheckbox
              key={'specializations-' + specialization.id}
              label={specialization.label ?? ''}
              name="specializations"
              value={specialization.id}
              id={'specializations-' + specialization.id.toString()}
              defaultChecked={defaultSpecializations?.some(
                ({ id }) => id === specialization.id,
              )}
            />
          ))}
        </InputMultipleCheckbox>
      ) : (
        <div className="mb-6 italic">
          {t("There are no specializations available for the selected faculty")}
        </div>
      )}
      <SubmitButton />
    </form>
  )
}

export default GroupForm
