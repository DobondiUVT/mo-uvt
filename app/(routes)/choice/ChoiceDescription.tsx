import { StudentData } from '@/utilities/types'
import { User } from '@prisma/client'

const ChoiceDescription = ({
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
  const dateNow = new Date()
  const isJoinPeriod = dateNow >= dateStart && dateNow <= dateEnd
  const willBeJoinPeriod = dateNow < dateStart
  const hasJoinPeriodPassed = dateNow > dateEnd

  const renderJoinPeriod = () => {
    if (isJoinPeriod) {
      return (
        <h3 className="mb-6 text-lg font-semibold">
          Registrations are live! Please choose your optional subjects between{' '}
          {dateStart.toLocaleDateString()} and {dateEnd.toLocaleDateString()}
        </h3>
      )
    } else if (willBeJoinPeriod) {
      return (
        <h3 className="mb-6 text-lg font-semibold">
          Registrations will start soon! Please check back between{' '}
          {dateStart.toLocaleDateString()} and {dateEnd.toLocaleDateString()}
        </h3>
      )
    } else if (hasJoinPeriodPassed) {
      return (
        <h3 className="mb-6 text-lg font-semibold">
          Registrations have ended!<br/>Last registration period was between{' '}
          {dateStart.toLocaleDateString()} and {dateEnd.toLocaleDateString()}.
          <br/>Please contact us at{' '}
          <a href="mailto:info@e-uvt.ro" className="underline">
            info@e-uvt.ro
          </a>{' '}
          for more information.
        </h3>
      )
    }
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Hi {user.name} 👋</h1>
      <h2 className="mb-2 text-xl font-semibold">
        {student!.faculty.name} - {student!.specialization.title} -{' '}
        {`Year ${student!.year.toLowerCase()}`}
      </h2>
      {renderJoinPeriod()}
    </div>
  )
}

export default ChoiceDescription
