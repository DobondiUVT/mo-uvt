'use client'

import InputText from '@/components/Admin/Form/InputText'
import InputTextArea from '@/components/Admin/Form/InputTextArea'
import { Button } from '@/components/ui/button'
import { Subject } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import InputHidden from './InputHidden'

const initialState = {
  title: null,
  description: null,
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button aria-disabled={pending} disabled={pending}>
      Submit
      {pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}

const SubjectsForm = ({
  subject = null,
  method,
}: {
  subject?: Subject | null
  method: (prevState: any, formData: FormData) => Promise<any>
}) => {
  const [state, formAction] = useFormState(method, initialState)
  return (
    <form id="subjects-form" action={formAction}>
      {state && state.serverError && (
        <div className="mb-6 rounded-md border-red-400 bg-red-200 px-6 py-4 text-red-800 shadow">
          {state.serverError}
        </div>
      )}
      {subject?.id && <InputHidden name="id" id="id" value={subject?.id} />}
      <InputText
        label="Title"
        name="title"
        id="title"
        value={subject?.title}
        error={state && state.title && state.title[0]}
      />
      <InputTextArea
        label="Description"
        name="description"
        id="description"
        value={subject?.description}
        error={state && state.description && state.description[0]}
      />
      <SubmitButton />
    </form>
  )
}

export default SubjectsForm
