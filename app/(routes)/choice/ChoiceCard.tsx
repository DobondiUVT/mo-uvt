'use client'

import { getStudent, joinStudent, unJoinStudent } from '@/actions/student'
import { Button } from '@/components/ui/button'
import { SubjectData } from '@/utilities/types'
import Link from 'next/link'
import { useEffect, useId, useState } from 'react'

type StudentData = Awaited<ReturnType<typeof getStudent>>

const SubjectStatus = ({ numberOfStudents }: { numberOfStudents: number }) => {
  return (
    <div
      className={`mt-auto self-end rounded-xl border px-2 py-1 text-sm font-medium shadow-sm`}
    >
      {numberOfStudents === 0
        ? 'No students joined yet'
        : `${numberOfStudents} student${numberOfStudents > 1 ? 's' : ''} joined`}
    </div>
  )
}

const SvgLoader = () => (
  <svg
    className="ms-2 h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.709 4H6v13.291zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291A8.001 8.001 0 0119.291 20H18V6.709z"
    ></path>
  </svg>
)

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
  const [joinLoading, setJoinLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)

  useEffect(() => {
    if (joined) {
      setJoinLoading(false)
    } else {
      setCancelLoading(false)
    }
  }, [joined])

  return (
    <Link
      className={`flex flex-col rounded-lg border bg-white p-5 shadow transition-transform hover:border-black ${joined ? 'border-2 border-uvt-blue' : ''}`}
      href={`/subject/${subject.id}`}
    >
      <div className="mb-1 text-xl font-bold">{subject.title}</div>
      <div
        dangerouslySetInnerHTML={{ __html: subject.description ?? '' }}
        className="mb-6 line-clamp-3 text-sm leading-relaxed text-zinc-500"
      />
      <div className="mt-auto">
        <div className="flex w-full items-center justify-between">
          {<SubjectStatus numberOfStudents={subject.students.length} />}
          {joinable && (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setJoinLoading(true)
                joinStudent(student!.id, subject.id, groupId)
              }}
              size="sm"
              disabled={joinLoading}
            >
              Join
              {joinLoading && <SvgLoader />}
            </Button>
          )}
          {!joinable && joined && (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setCancelLoading(true)
                unJoinStudent(student!.id, subject.id)
              }}
              size="sm"
              variant={'destructive'}
              disabled={cancelLoading}
            >
              Unjoin
              {cancelLoading && <SvgLoader />}
            </Button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ChoiceCard
