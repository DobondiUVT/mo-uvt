import React from 'react'

type InputGroupProps = {
  label: string
  children: React.ReactNode
  error?: string
}

const InputGroup = ({ label, children, error }: InputGroupProps) => {
  return (
    <div className="mb-6">
      <label
        className="mb-2 block text-sm font-bold text-zinc-700"
        htmlFor="title"
      >
        {label}
      </label>
      {children}
      <div className="mt-1 text-sm italic text-red-400">{error}</div>
    </div>
  )
}

export default InputGroup
