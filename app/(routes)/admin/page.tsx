import prisma from '@/utilities/db'
import { Student, Subject } from '@prisma/client'
import React from 'react'
import PrintButton from './PrintButton'

type SubjectCardProps = {
  title: string
  students: Pick<Student, 'sn'>[]
}

const SubjectCard = ({ title, students }: SubjectCardProps) => (
  <div className="rounded-lg border bg-white p-4 shadow">
    <div className="mb-2 text-xl font-bold">{title}</div>
    <ul className="flex flex-col items-center justify-center gap-4">
      {students.length ? (
        students.map((student) => (
          <li key={student.sn} className="text-lg">
            {student.sn}
          </li>
        ))
      ) : (
        <div className="text-zinc-500">No students yet</div>
      )}
    </ul>
  </div>
)

export type subjectsStudentsType = {
  title: string | null
  id: number
  students: {
    sn: string
  }[]
}

const Admin = async () => {
  const subjects = await prisma.subject.findMany({
    select: {
      title: true,
      id: true,
      students: {
        select: {
          sn: true,
        },
      },
    },
  })

  return (
    <div>
      <div className="text-xl font-bold">Statistics</div>
      <div className="mb-4 text-lg">Subjects & Students</div>
      <PrintButton subjects={subjects} />
      <div className="grid grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={`subject-${subject.id}`}
            title={subject.title ?? ''}
            students={subject.students}
          />
        ))}
      </div>
    </div>
  )
}

export default Admin
