'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import { Button } from '@/components/ui/button'
import { Faculty } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import InputHidden from './utils/InputHidden'
import Combobox from './utils/Combobox'
import { SubmitButton } from './utils/SubmitButton'
import FormNotifiction from './utils/FormNotification'

const initialState = {
  title: null,
  description: null,
}

const FacultyForm = ({
  faculty = null,
  method,
}: {
  faculty?: Faculty | null
  method: (prevState: any, formData: FormData) => Promise<any>
}) => {
  const [state, formAction] = useFormState(method, initialState)
  return (
    <form id="facultys-form" action={formAction}>
      {state && <FormNotifiction state={state} />}
      {faculty?.id && <InputHidden name="id" id="id" value={faculty?.id} />}
      <InputText
        label="Name"
        name="name"
        id="name"
        value={faculty?.name}
        error={state?.name?.[0]}
      />
      <InputTextArea
        label="Abbreviation"
        name="abbreviation"
        id="abbreviation"
        value={faculty?.abbreviation}
        error={state?.abbreviation?.[0]}
      />
      <SubmitButton />
    </form>
  )
}

export default FacultyForm
