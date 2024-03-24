import prisma from '@/utilities/db'
import { Student, Subject } from '@prisma/client'
import React from 'react'
import PrintButton from './PrintButton'
import Statistics from './Statistics'
import { getSubjects } from '@/actions/subject'


export type subjectsStudentsType = {
  title: string | null
  id: number
  students: {
    sn: string
  }[]
}

const Admin = async () => {
  const subjects = await getSubjects()
  const faculties = await prisma.faculty.findMany()

  return (
    <Statistics subjects={subjects} faculties={faculties}/>
  )
}

export default Admin
