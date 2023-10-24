import React from 'react'

type InputGroupProps = {
  label: string
  children: React.ReactNode
}

const InputGroup = ({ label, children }: InputGroupProps) => {
  return (
    <div className="mb-4">
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="title"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export default InputGroup
