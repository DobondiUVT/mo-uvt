import React from 'react'
import SubjectsForm from '../SubjectsForm'

const NewSubject = () => {
  return (
    <div className="container mx-auto py-6 sm:py-12">
      <div className="mx-auto max-w-lg rounded-md border p-6 shadow">
        <SubjectsForm />
      </div>
    </div>
  )
}

export default NewSubject
