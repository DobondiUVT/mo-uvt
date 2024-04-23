'use client'

import { createStudent } from '@/actions/student'
import InputCombobox from '@/components/Admin/Form/utils/InputCombobox'
import InputHidden from '@/components/Admin/Form/utils/InputHidden'
import InputSelect from '@/components/Admin/Form/utils/InputSelect'
import InputText from '@/components/Admin/Form/utils/InputText'
import { SubmitButton } from '@/components/Admin/Form/utils/SubmitButton'
import { YEAR_OPTIONS } from '@/utilities/utils'
import { Faculty, Specialization, User } from '@prisma/client'
import { IconInfoCircle } from '@tabler/icons-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

const initialState = {
  userId: null,
  facultyId: null,
  specializationId: null,
  year: null,
  sn: null,
  verified: null,
}
const InfoForm = ({
  user,
  faculties,
  specializations,
}: {
  user: User
  faculties: Faculty[]
  specializations: Specialization[]
}) => {
  const facultyOptions = faculties.map((faculty) => ({
    label: faculty.abbreviation ?? '',
    value: faculty.name ?? '',
    id: faculty.id ?? 0,
  }))

  const specializationOptions = specializations.map((specialization) => ({
    label: specialization.abbreviation ?? '',
    value: specialization.title ?? '',
    id: specialization.id ?? 0,
  }))

  const yearOptions = Object.values(YEAR_OPTIONS).map((year) => ({
    label: year,
    value: year,
    id: year,
  }))

  const [state, formAction] = useFormState(createStudent, initialState)
  const [faculty, setFaculty] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [year, setYear] = useState(YEAR_OPTIONS.ONE)
  return (
    <form id="info-form" action={formAction}>
      <InputHidden name="userId" id="userId" value={user.id} />
      <InputHidden name="verified" id="verified" value={1} />
      <InputCombobox
        value={faculty}
        setValue={setFaculty}
        options={facultyOptions}
        name="facultyId"
        id="facultyId"
        label="Faculty"
        error={state?.facultyId?.[0]}
      />
      <InputCombobox
        value={specialization}
        setValue={setSpecialization}
        options={specializationOptions}
        name="specializationId"
        id="specializationId"
        label="Specialization"
        error={state?.specializationId?.[0]}
      />
      <div className="max-w-xs">
        <InputText
          name="sn"
          id="sn"
          label="Student Number"
          placeholder="I000"
          error={state?.sn?.[0]}
        />
      </div>
      <div className="mb-4 p-4 bg-uvt-yellow rounded-lg inline-block">
        <div className='inline-flex gap-2 text-gray-700'>
          <IconInfoCircle size={24} />
          Please select the year for which you want to choose the optional subjects (not the one you are currently in)
        </div>
        <div className="-mb-6">
          <InputSelect
            value={year}
            setValue={setYear}
            options={yearOptions}
            name="year"
            id="year"
            label=''
            error={state?.year?.[0]}
          />
        </div>
      </div>
      <SubmitButton />
    </form>
  )
}

export default InfoForm
