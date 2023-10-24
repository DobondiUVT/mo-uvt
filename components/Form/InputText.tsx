import React from 'react'
import InputGroup from './InputGroup'

type InputTextProps = {
  label: string
  name: string
  id: string
  value: string
  setValue: (value: string) => void
}

const InputText = ({ label, name, id, value, setValue }: InputTextProps) => {
  return (
    <InputGroup label={label}>
      <input
        type="text"
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        name={name}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputGroup>
  )
}

export default InputText
