"use client"

import { Subject } from '@prisma/client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const SubjectCard = ({
  subject,
  joinable = false,
}: {
  subject: Subject
  joinable?: boolean
}) => {
  return (
    <Link
      className="rounded-lg border bg-white p-5 shadow transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:border-black"
      href={`/subject/${subject.id}`}
    >
      <div className="text-xl font-bold">{subject.title}</div>
      <div className="text-zinc-500 mb-6">{subject.description}</div>
      <div>
        <div className="flex w-full items-center justify-between">
          <div className='text-sm'>4 / 80 joined</div>
          {joinable && (
            <Button onClick={(e) => {e.preventDefault();}} size="sm" color="blue">
              Join
            </Button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default SubjectCard
