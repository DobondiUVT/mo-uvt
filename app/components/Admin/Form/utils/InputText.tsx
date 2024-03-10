import React from 'react'
import InputGroup from './InputGroup'

type InputTextProps = {
  label: string
  name: string
  id: string
  value?: string | number | null
  required?: boolean
  error?: string
  readonly?: boolean
  disabled?: boolean
  placeholder?: string
}

const InputText = ({
  label,
  name,
  id,
  value = '',
  required = false,
  error,
  readonly = false,
  disabled = false,
  placeholder,
}: InputTextProps) => {
  return (
    <InputGroup label={label} error={error}>
      <input
        type="text"
        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-400 sm:text-sm sm:leading-6"
        name={name}
        id={id}
        defaultValue={value?.toString()}
        required={required}
        readOnly={readonly}
        disabled={disabled}
        placeholder={placeholder}
      />
    </InputGroup>
  )
}

export default InputText
