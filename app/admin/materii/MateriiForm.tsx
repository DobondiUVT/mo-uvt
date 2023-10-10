'use client'
import InputText from '@/components/Form/InputText'
import InputTextArea from '@/components/Form/InputTextArea'
import { useState } from 'react'

const MateriiForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch('/api/materii/new', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    headers: {
        'Content-Type': 'application/json',
      },
    })
    window.location.href = '/admin/materii'
  }

  return (
    <form id="materii-form" onSubmit={handleSubmit}>
      <InputText
        label="Numele materiei"
        name="title"
        id="title"
        value={title}
        setValue={setTitle}
      />
      <InputTextArea
        label="Descrierea materiei"
        name="description"
        id="description"
        value={description}
        setValue={setDescription}
      />
      <button>Submit</button>
    </form>
  )
}

export default MateriiForm
