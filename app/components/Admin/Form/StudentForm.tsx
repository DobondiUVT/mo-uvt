'use client'

import InputText from '@/components/Admin/Form/utils/InputText'
import InputTextArea from '@/components/Admin/Form/utils/InputTextArea'
import { Button } from '@/components/ui/button'
import { Faculty, Specialization, Student } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import InputHidden from './utils/InputHidden'
import Combobox from './utils/Combobox'
import { SubmitButton } from './utils/SubmitButton'
import FormNotifiction from './utils/FormNotification'
import { StudentData } from '@/utilities/types'
import InputCombobox from './utils/InputCombobox'
import { useMemo } from 'react'

const initialState = {
    title: null,
    description: null,
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
    const [state, formAction] = useFormState(method, initialState)

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

    return (
        <form id="students-form" action={formAction}>
            {state && <FormNotifiction state={state} />}
            {student?.id && <InputHidden name="id" id="id" value={student?.id} />}
            <InputCombobox
                name="faculty"
                id="faculty"
                label="Faculty"
                options={facultiesOptions}
                value={student?.faculty.id}
                setValue={formAction}
            />
            <SubmitButton />
        </form>
    )
}

export default StudentForm
