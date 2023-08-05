import React from 'react'

type InputGroupProps = {
  label: string,
  children: React.ReactNode
}

const InputGroup = ({label, children}: InputGroupProps) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="title"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export default InputGroup
