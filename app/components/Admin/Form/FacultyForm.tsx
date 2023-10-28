'use client'

import InputText from '@/components/Admin/Form/InputText'
import InputTextArea from '@/components/Admin/Form/InputTextArea'
import { Button } from '@/components/ui/button'
import { Faculty } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import InputHidden from './InputHidden'
import Combobox from './Combobox'
import { SubmitButton } from './SubmitButton'

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
      {state?.serverError && (
        <div className="mb-6 rounded-md border-red-400 bg-red-200 px-6 py-4 text-red-800 shadow">
          {state.serverError}
        </div>
      )}
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
