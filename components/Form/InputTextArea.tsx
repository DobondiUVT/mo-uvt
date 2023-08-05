import React from 'react'
import InputGroup from './InputGroup'

type InputTextAreaProps = {
  label: string,
  name: string,
  id: string,
  value: string,
  setValue: (value: string) => void
}

const InputTextArea = ({label, name, id, value, setValue}: InputTextAreaProps) => {
  return (
    <InputGroup label={label}>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        id={id}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </InputGroup>
  )
}

export default InputTextArea