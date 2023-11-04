import React from 'react'
import InputGroup from './InputGroup'
import { isEqualInsensitiveStrings } from '@/utilities/utils'
import InputHidden from './InputHidden'
import Combobox from './Combobox'

type ComboboxOption = {
  label: string
  value: string | number
  id: number | string
}

type InputTextProps = {
  label: string
  name: string
  id: string
  value?: string | number
  required?: boolean
  error?: string
  options: ComboboxOption[]
  setValue: (value: any) => void
  defaultValue?: string | number | null
}

const InputCombobox = ({
  label,
  name,
  id,
  value = '',
  error,
  options,
  setValue,
  defaultValue,
}: InputTextProps) => {
  return (
    <InputGroup label={label} error={error}>
      <Combobox value={value} setValue={setValue} options={options} />
      <InputHidden
        name={name}
        id={id}
        value={
          defaultValue ??
          options.find((option) =>
            isEqualInsensitiveStrings(option.value, value),
          )?.id ??
          ''
        }
      />
    </InputGroup>
  )
}

export default InputCombobox
