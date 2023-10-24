'use client'
import InputText from '@/components/Form/InputText'
import InputTextArea from '@/components/Form/InputTextArea'
import { useState } from 'react'

const SubjectsForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await fetch('/api/subjects/new', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()).catch((err) => console.log(err))

    

    // window.location.href = '/admin/subjects'
  }

  return (
    <form id="subjects-form" onSubmit={handleSubmit}>
      <InputText
        label="Numele subjecti"
        name="title"
        id="title"
        value={title}
        setValue={setTitle}
      />
      <InputTextArea
        label="Descrierea subjecti"
        name="description"
        id="description"
        value={description}
        setValue={setDescription}
      />
      <button>Submit</button>
    </form>
  )
}

export default SubjectsForm
