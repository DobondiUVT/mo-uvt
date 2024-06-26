'use client'
import { Faculty, Specialization } from '@prisma/client'
import { useFormState } from 'react-dom'
import InputHidden from './utils/InputHidden'
import { SubmitButton } from './utils/SubmitButton'
import FormNotifiction from './utils/FormNotification'
import { StudentData } from '@/utilities/types'
import InputCombobox from './utils/InputCombobox'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import InputText from './utils/InputText'
import {
  ENUM_TO_NUMBER,
  YEAR_OPTIONS,
  isEqualInsensitiveStrings,
} from '@/utilities/utils'
import InputSelect from './utils/InputSelect'

const initialState = {
  facultyId: null,
  specializationId: null,
  year: null,
  sn: null,
}

const StudentForm = ({
  student = null,
  method,
  faculties,
  specializations,
}: {
  student: StudentData
  method: (prevState: any, formData: FormData) => Promise<any>
  faculties: Faculty[]
  specializations: Specialization[]
}) => {
  const t = useTranslations('Admin')

  const [state, formAction] = useFormState(method, initialState)
  const [faculty, setFaculty] = useState(student?.faculty.name)
  const [specialization, setSpecialization] = useState(
    student?.specialization.title,
  )
  const [year, setYear] = useState(student?.year)

  const facultiesOptions = useMemo(
    () => [
      ...faculties.map((faculty) => ({
        label: faculty.abbreviation,
        value: faculty.name,
        id: faculty.id,
      })),
    ],
    [faculties],
  )

  const selectedFacultyId = facultiesOptions.find((option) =>
    isEqualInsensitiveStrings(option.value, faculty),
  )?.id

  const specializationOptions = specializations
    .filter((s) => s.facultyId === selectedFacultyId)
    .map((specialization) => ({
      label: specialization.title ?? '',
      value: specialization.title ?? '',
      id: specialization.id ?? 0,
    }))

  const yearOptions = Object.values(YEAR_OPTIONS).map((year) => ({
    label: ENUM_TO_NUMBER[year].toString(),
    value: year,
    id: year,
  }))

  return (
    <form id="students-form" action={formAction}>
      {state && <FormNotifiction state={state} />}
      {student?.id && <InputHidden name="id" id="id" value={student?.id} />}
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultiesOptions}
        name="facultyId"
        defaultValue={student?.faculty.id}
        id="facultyId"
        label={t('Faculty')}
        error={state?.facultyId?.[0]}
      />
      {specializationOptions.length ? (
        <InputCombobox
          value={specialization}
          setValue={setSpecialization}
          options={specializationOptions}
          name="specializationId"
          defaultValue={student?.specialization.id}
          id="specializationId"
          label={t('Specialization')}
          error={state?.specializationId?.[0]}
        />
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
      <div className="w-[120px]">
        <InputText
          name="sn"
          id="sn"
          label={t('Student Number')}
          value={student?.sn}
          placeholder="I000"
          error={state?.sn?.[0]}
        />
      </div>
      <SubmitButton />
    </form>
  )
}

export default StudentForm
