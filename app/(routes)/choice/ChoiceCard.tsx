'use client'

import { Student, Subject } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getStudent } from '@/actions/student'
import { joinStudent, unJoinStudent } from '@/actions/student'

type StudentData = Awaited<ReturnType<typeof getStudent>>

const SubjectStatus = async ({
  numberOfStudents,
  maxCount,
}: {
  numberOfStudents: number
  maxCount: number
}) => {

  let statusClass = ''
  if (numberOfStudents < maxCount / 3) {
    statusClass = 'bg-green-400 text-white'
  } else if (numberOfStudents < (maxCount * 2) / 3) {
    statusClass = 'bg-yellow-400 text-white'
  } else {
    statusClass = 'bg-red-400 text-white'
  }

  return (
    <div className={`text-md mt-auto self-end rounded-xl border px-2 py-1 font-medium ${statusClass}`}>
      {numberOfStudents} / {maxCount} joined
    </div>
  )
}

const ChoiceCard = ({
  subject,
  joinable = false,
  joined = false,
  student,
  groupId,
}: {
  subject: Pick<Subject, 'title' | 'abbreviation' | 'id' | 'description'> & {
    student: Pick<Student, 'id'>[]
  }
  joinable?: boolean
  joined?: boolean
  student: StudentData
  groupId: number
}) => {
  return (
    <Link
      className="rounded-lg border bg-white p-5 shadow transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:border-black flex flex-col"
      href={`/subject/${subject.id}`}
    >
      <div className="text-xl mb-1 font-bold">{subject.title}</div>
      <div dangerouslySetInnerHTML={{ __html: subject.description ?? "" }} className="mb-6 text-zinc-500 text-sm line-clamp-3 leading-relaxed"/>
      <div className='mt-auto'>
        <div className="flex w-full items-center justify-between">
          <SubjectStatus numberOfStudents={subject.student.length} maxCount={30} />
          {joinable && (
            <Button
              onClick={(e) => {
                e.preventDefault()
                joinStudent(student!.id, subject.id, groupId)
              }}
              size="sm"
            >
              Join
            </Button>
          )}
          {
            (!joinable && joined) && (
              <div className='group'>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                  size="sm"
                  disabled={joined || !joinable}
                  className='group-hover:hidden'
                >
                  Joined
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    unJoinStudent(student!.id, subject.id)
                  }}
                  size="sm"
                  variant={'destructive'}
                  className='hidden group-hover:block'
                >
                  Cancel
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </Link>
  )
}

export default ChoiceCard
