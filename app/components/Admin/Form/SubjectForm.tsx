'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import { Faculty, PrismaClient, Subject } from '@prisma/client'
import { useFormState } from 'react-dom'
import InputHidden from './utils/InputHidden'
import Combobox from './utils/Combobox'
import { useState } from 'react'
import { isEqualInsensitiveStrings } from '@/utilities/utils'
import InputCombobox from './utils/InputCombobox'
import { SubmitButton } from './utils/SubmitButton'
import FormNotification from './utils/FormNotification'

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
  const options = faculties.map((faculty) => ({
    label: faculty.abbreviation ?? '',
    value: faculty.name ?? '',
    id: faculty.id ?? 0,
  }))

  const [state, formAction] = useFormState(method, initialState)
  const [faculty, setFaculty] = useState(defaultFaculty?.name ?? '')
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
        options={options}
        name="facultyId"
        defaultValue={subject?.facultyId}
        id="facultyId"
        label="Faculty"
        error={state?.facultyId?.[0]}
      />
      <SubmitButton />
    </form>
  )
}

export default SubjectForm
