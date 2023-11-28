import prisma from '@/utilities/db'
import { Student } from '@prisma/client'
import React from 'react'

type SubjectCardProps = {
  title: string
  students: Pick<Student, 'sn'>[]
}

const SubjectCard = ({ title, students }: SubjectCardProps) => (
  <div className="rounded-lg border p-4 bg-white shadow">
    <div className="text-xl font-bold mb-2">{title}</div>
    <ul className="flex flex-col gap-4 items-center justify-center">
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

const Admin = async () => {
  const subjects = await prisma.subject.findMany({
    select: {
      title: true,
      id: true,
      student: {
        select: {
          sn: true,
        },
      },
    },
  })

  return (
    <div>
      <div className="text-xl font-bold">Statistics</div>
      <div className="text-lg mb-4">Subjects & Students</div>
      <div className="grid grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={`subject-${subject.id}`}
            title={subject.title ?? ''}
            students={subject.student}
          />
        ))}
      </div>
    </div>
  )
}

export default Admin
