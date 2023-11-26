'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import { Faculty, PrismaClient, Role, User } from '@prisma/client'
import { useFormState } from 'react-dom'
import InputHidden from './utils/InputHidden'
import Combobox from './utils/Combobox'
import { useState } from 'react'
import { USER_ROLES, isEqualInsensitiveStrings } from '@/utilities/utils'
import InputCombobox from './utils/InputCombobox'
import { SubmitButton } from './utils/SubmitButton'
import InputSelect from './utils/InputSelect'
import Banner from './utils/Banner'
import FormNotifiction from './utils/FormNotification'

const initialState = {
  title: null,
  description: null,
  faculty: null,
}

const UserForm = ({
  user = null,
  method,
}: {
  user?: User | null
  method: (prevState: any, formData: FormData) => Promise<any>
}) => {
  const options = Object.values(USER_ROLES).map((role) => ({
    label: role,
    value: role,
    id: role,
  }))

  const [state, formAction] = useFormState(method, initialState)
  const [role, setRole] = useState(user?.role ?? '')
  return (
    <form id="users-form" action={formAction}>
      {state && <FormNotifiction state={state} />}
      {user?.id && <InputHidden name="id" id="id" value={user?.id} />}
      <InputText
        label="Name"
        name="name"
        id="name"
        value={user?.name}
        error={state?.name?.[0]}
        disabled
      />
      <InputTextArea
        label="Email"
        name="email"
        id="email"
        value={user?.email}
        error={state?.email?.[0]}
        disabled
      />
      <InputSelect
        label="Role"
        name="role"
        id="role"
        value={role}
        setValue={setRole}
        options={options}
        error={state?.role?.[0]}
      />
      <SubmitButton />
    </form>
  )
}

export default UserForm
