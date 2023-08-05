import React from 'react'
import InputGroup from './InputGroup'

type InputTextProps = {
  label: string,
  name: string,
  id: string,
  value: string,
  setValue: (value: string) => void
}

const InputText = ({label, name, id, value, setValue}: InputTextProps) => {
  return (
    <InputGroup label={label}>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        id={id}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </InputGroup>
  )
}

export default InputText