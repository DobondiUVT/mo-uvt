'use client'
import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import { Faculty } from '@prisma/client'
import { useFormState } from 'react-dom'
import InputHidden from './utils/InputHidden'
import { SubmitButton } from './utils/SubmitButton'
import FormNotifiction from './utils/FormNotification'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('Admin')
  const [state, formAction] = useFormState(method, initialState)
  return (
    <form id="facultys-form" action={formAction}>
      {state && <FormNotifiction state={state} />}
      {faculty?.id && <InputHidden name="id" id="id" value={faculty?.id} />}
      <InputText
        label={t('Name')}
        name="name"
        id="name"
        value={faculty?.name}
        error={state?.name?.[0]}
      />
      <InputTextArea
        label={t('Abbreviation')}
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
