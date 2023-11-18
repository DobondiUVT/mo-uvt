import React from 'react'
import InputGroup from './InputGroup'

type InputMultipleCheckboxProps = {
  label: string
  error?: string
  children: React.ReactNode
}

const InputMultipleCheckbox = ({
  label,
  error,
  children,
}: InputMultipleCheckboxProps) => {
  return (
    <InputGroup label={label} error={error}>
      <div className="space-y-2">{children}</div>
    </InputGroup>
  )
}

export default InputMultipleCheckbox
