import React from 'react'

type InputHiddenProps = {
  name: string
  id: string
  value?: string | number | null
}

const InputHidden = ({ name, id, value }: InputHiddenProps) => {
  return <input name={name} id={id} defaultValue={value?.toString()} hidden />
}

export default InputHidden
