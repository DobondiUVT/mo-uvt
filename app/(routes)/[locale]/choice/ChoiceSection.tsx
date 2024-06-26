import { GroupsStudentData, StudentData } from '@/utilities/types'
import { Semester } from '@prisma/client'
import ChoiceCard from './ChoiceCard'
import { getTranslations } from 'next-intl/server'
import { ENUM_TO_NUMBER } from '@/utilities/utils'

const ChoiceSection = async ({
  semester,
  groups,
  student,
}: {
  semester: Semester
  groups: GroupsStudentData
  student: StudentData
}) => {
  const t = await getTranslations('Choice Page')
  const actionGroups = groups!.map((group) => {
    return {
      joined:
        group.subjects.find((subject) =>
          student!.subjects.find(
            (studentSubject) => studentSubject.id === subject.id,
          ),
        ) ?? null,
      subjects: group.subjects,
      id: group.id,
    }
  })

  if (!actionGroups.length) return

  return (
    <div className="relative mb-10 rounded-lg border border-black p-7">
      <h1 className="absolute top-0 -ms-4 mb-4 -translate-y-1/2 bg-zinc-100 px-4 py-2 text-xl font-bold">
        {t('Semester')} {ENUM_TO_NUMBER[semester]}
      </h1>
      <div>
        {actionGroups.map((actionGroup, index) => (
          <div key={`group-${index}`}>
            <h1 className="text-md mb-4 font-semibold">
              {actionGroup.joined
                ? t('Joined n', {
                    title: actionGroup.joined.title,
                  })
                : t('Choose n', {
                    count: actionGroup.subjects.length,
                  })}
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {actionGroup.subjects.map((subject) => (
                <ChoiceCard
                  key={subject.id}
                  subject={subject}
                  joinable={!actionGroup.joined}
                  joined={actionGroup.joined?.id === subject.id}
                  student={student}
                  groupId={actionGroup.id}
                />
              ))}
            </div>
            {index != groups!.length - 1 && (
              <div className="-mx-7 mb-8 mt-8 h-px bg-black"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChoiceSection
