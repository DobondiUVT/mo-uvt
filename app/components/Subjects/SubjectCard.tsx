'use client'
import { SubjectData } from '@/utilities/types'
import { Link } from '%/i18n/navigation'
import { Badge } from '../ui/badge'
import { ENUM_TO_NUMBER, SEMESTER_OPTIONS } from '@/utilities/utils'
import { useLocale } from 'next-intl'

const Tags = (subject: SubjectData) => {
  const locale = useLocale() as 'en' | 'ro'

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {subject.faculty && (
        <Badge variant={'secondary'}>{subject.faculty.abbreviation}</Badge>
      )}
      {subject.specializations.map((specialization) => (
        <Badge variant={'secondary'} key={specialization.id}>
          {specialization.abbreviation}
        </Badge>
      ))}
      {subject.year && (
        <Badge
          variant={'secondary'}
        >{`${locale == 'en' ? 'Y' : 'A'}${ENUM_TO_NUMBER[subject.year]}`}</Badge>
      )}
      {subject.semester && (
        <Badge
          variant={'secondary'}
        >{`S${ENUM_TO_NUMBER[subject.semester]}`}</Badge>
      )}
    </div>
  )
}

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
      <div className="mb-2 text-lg font-bold">{subject.title}</div>
      <Tags {...subject} />
      <div
        dangerouslySetInnerHTML={{ __html: subject.description ?? '' }}
        className="line-clamp-3 text-xs leading-relaxed text-zinc-500"
      />
      {/* <SubjectStatus subject={subject} maxCount={30} /> */}
    </Link>
  )
}

export default SubjectCard
