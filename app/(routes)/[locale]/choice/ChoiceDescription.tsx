import { StudentData } from '@/utilities/types'
import { ENUM_TO_NUMBER } from '@/utilities/utils'
import { User } from '@prisma/client'
import { getTranslations } from 'next-intl/server'

const ChoiceDescription = async ({
  user,
  student,
  dateStart,
  dateEnd,
}: {
  user: User
  student: StudentData
  dateStart: Date
  dateEnd: Date
}) => {
  const t = await getTranslations('Choice Page')
  const dateNow = new Date()
  const isJoinPeriod = dateNow >= dateStart && dateNow <= dateEnd
  const willBeJoinPeriod = dateNow < dateStart
  const hasJoinPeriodPassed = dateNow > dateEnd

  const renderJoinPeriod = () => {
    if (isJoinPeriod) {
      return (
        <h3 className="mb-6 text-lg font-semibold">
          {t('Registrations live', {
            dateStart: dateStart.toLocaleDateString(),
            dateEnd: dateEnd.toLocaleDateString(),
          })}
        </h3>
      )
    } else if (willBeJoinPeriod) {
      return (
        <h3 className="mb-6 text-lg font-semibold">
          {t('Registrations will start soon', {
            dateStart: dateStart.toLocaleDateString(),
            dateEnd: dateEnd.toLocaleDateString(),
          })}
        </h3>
      )
    } else if (hasJoinPeriodPassed) {
      return (
        <h3 className="mb-6 text-lg font-semibold">
          {t('Registrations have ended', {
            dateStart: dateStart.toLocaleDateString(),
            dateEnd: dateEnd.toLocaleDateString(),
          })}
        </h3>
      )
    }
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        {t('Hi')} {user.name} 👋
      </h1>
      <h2 className="mb-2 text-xl font-semibold">
        {student!.faculty.name} - {student!.specialization.title} -{' '}
        {`${t('Year')} ${ENUM_TO_NUMBER[student!.year]}`}
      </h2>
      {renderJoinPeriod()}
    </div>
  )
}

export default ChoiceDescription
