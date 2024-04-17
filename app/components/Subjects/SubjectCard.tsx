'use client'
import { SubjectData } from '@/utilities/types'
import Link from 'next/link'

const SubjectCard = ({
  subject,
  joinable = false,
}: {
  subject: SubjectData
  joinable?: boolean
}) => {
  return (
    <Link
      className="flex flex-col rounded-lg border bg-white p-5 shadow transition-transform hover:border-black"
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
