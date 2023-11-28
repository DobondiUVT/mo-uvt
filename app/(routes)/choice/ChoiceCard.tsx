'use client'

import { Subject } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getStudent } from '@/actions/student'
import { joinStudent, unJoinStudent } from '@/actions/student'

type StudentData = Awaited<ReturnType<typeof getStudent>>

const ChoiceCard = ({
  subject,
  joinable = false,
  joined = false,
  student,
  groupId,
}: {
  subject: Pick<Subject, 'title' | 'abbreviation' | 'id' | 'description'>
  joinable?: boolean
  joined?: boolean
  student: StudentData
  groupId: number
}) => {
  return (
    <Link
      className="rounded-lg border bg-white p-5 shadow transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:border-black"
      href={`/subject/${subject.id}`}
    >
      <div className="text-xl font-bold">{subject.title}</div>
      <div className="mb-6 text-zinc-500">{subject.description}</div>
      <div>
        <div className="flex w-full items-center justify-between">
          <div className="text-sm">4 / 80 joined</div>
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
