'use client'

import { Student, Subject } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getStudent } from '@/actions/student'
import { joinStudent, unJoinStudent } from '@/actions/student'
import { SubjectData } from '@/utilities/types'

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
    <div
      className={`text-md mt-auto self-end rounded-xl border px-2 py-1 font-medium ${statusClass}`}
    >
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
  subject: SubjectData
  joinable?: boolean
  joined?: boolean
  student: StudentData
  groupId: number
}) => {
  return (
    <Link
      className="flex flex-col rounded-lg border bg-white p-5 shadow transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:border-black"
      href={`/subject/${subject.id}`}
    >
      <div className="mb-1 text-xl font-bold">{subject.title}</div>
      <div
        dangerouslySetInnerHTML={{ __html: subject.description ?? '' }}
        className="mb-6 line-clamp-3 text-sm leading-relaxed text-zinc-500"
      />
      <div className="mt-auto">
        <div className="flex w-full items-center justify-between">
          <SubjectStatus
            numberOfStudents={subject.students.length}
            maxCount={30}
          />
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
          {!joinable && joined && (
            <div className="group">
              <Button
                onClick={(e) => {
                  e.preventDefault()
                }}
                size="sm"
                disabled={joined || !joinable}
                className="group-hover:hidden"
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
                className="hidden group-hover:block"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ChoiceCard
