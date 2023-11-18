import React from 'react'
import InputGroup from './InputGroup'
import { Checkbox } from '@/components/ui/checkbox'

type InputCheckboxProps = {
  label: string
  name: string
  id: string
  required?: boolean
  error?: string
  readonly?: boolean
  disabled?: boolean
  defaultChecked?: boolean
}

const InputCheckbox = ({
  label,
  name,
  id,
  defaultChecked = false,
  required = false,
  disabled = false,
}: InputCheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        defaultChecked={defaultChecked}
        required={required}
        disabled={disabled}
        name={name}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default InputCheckbox
