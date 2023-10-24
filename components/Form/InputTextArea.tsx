import React from 'react'
import InputGroup from './InputGroup'

type InputTextAreaProps = {
  label: string
  name: string
  id: string
  value: string
  setValue: (value: string) => void
}

const InputTextArea = ({
  label,
  name,
  id,
  value,
  setValue,
}: InputTextAreaProps) => {
  return (
    <InputGroup label={label}>
      <textarea
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        name={name}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputGroup>
  )
}

export default InputTextArea
