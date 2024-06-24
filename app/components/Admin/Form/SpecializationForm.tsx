'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import { Faculty, Specialization } from '@prisma/client'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import FormNotification from './utils/FormNotification'
import InputCombobox from './utils/InputCombobox'
import InputHidden from './utils/InputHidden'
import { SubmitButton } from './utils/SubmitButton'
import { useTranslations } from 'next-intl'

const initialState = {
  title: null,
  description: null,
  faculty: null,
}

const SpecializationForm = ({
  specialization = null,
  faculties,
  defaultFaculty = null,
  method,
}: {
  specialization?: Specialization | null
  faculties: Faculty[]
  defaultFaculty?: Faculty | null
  method: (prevState: any, formData: FormData) => Promise<any>
}) => {
  const t = useTranslations('Admin')
  const facultyOptions = faculties.map((faculty) => ({
    label: faculty.abbreviation ?? '',
    value: faculty.name ?? '',
    id: faculty.id ?? 0,
  }))

  const [state, formAction] = useFormState(method, initialState)
  const [faculty, setFaculty] = useState(defaultFaculty?.name ?? '')
  return (
    <form id="specializations-form" action={formAction}>
      {state && <FormNotification state={state} />}
      {specialization?.id && (
        <InputHidden name="id" id="id" value={specialization?.id} />
      )}
      <InputText
        label={t("Title")}
        name="title"
        id="title"
        value={specialization?.title}
        error={state?.title?.[0]}
      />
      <InputText
        label={t("Abbreviation")}
        name="abbreviation"
        id="abbreviation"
        value={specialization?.abbreviation}
        error={state?.abbreviation?.[0]}
      />
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultyOptions}
        name="facultyId"
        defaultValue={specialization?.facultyId}
        id="facultyId"
        label={t("Faculty")}
        error={state?.facultyId?.[0]}
      />
      <SubmitButton />
    </form>
  )
}

export default SpecializationForm
