'use client'
import { Subject } from '@prisma/client'
import React from 'react'
import Link from 'next/link'
import prisma from '@/utilities/db'
import { FilterSubjectsProps } from '@/(routes)/subjects/page'

// const SubjectStatus = async ({
//   subject,
//   maxCount,
// }: {
//   subject: Subject
//   maxCount: number
// }) => {
//   const numberOfStudents = await prisma.student.count({
//     where: {
//       subjects: {
//         some: {
//           id: subject.id,
//         },
//       },
//     },
//   })

//   let statusClass = ''
//   if (numberOfStudents < maxCount / 3) {
//     statusClass = 'bg-green-400 text-white'
//   } else if (numberOfStudents < (maxCount * 2) / 3) {
//     statusClass = 'bg-yellow-400 text-white'
//   } else {
//     statusClass = 'bg-red-400 text-white'
//   }

//   return (
//     <div className={`text-md mt-auto self-end rounded-xl border px-2 py-1 font-medium ${statusClass}`}>
//       {numberOfStudents} / {maxCount} joined
//     </div>
//   )
// }

const SubjectCard = ({
  subject,
  joinable = false,
}: {
  subject: FilterSubjectsProps
  joinable?: boolean
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
      {/* <SubjectStatus subject={subject} maxCount={30} /> */}
    </Link>
  )
}

export default SubjectCard
