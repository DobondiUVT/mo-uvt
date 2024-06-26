'use client'
import type { Settings } from '@prisma/client'
import { addDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useFormState } from 'react-dom'
import InputHidden from '../Form/utils/InputHidden'
import { DatePickerWithRange } from './DatePickerWithRange'
import { useTranslations } from 'next-intl'
import { SubmitButton } from '../Form/utils/SubmitButton'

const initialState = {
  dateStart: null,
  dateEnd: null,
}

const Settings = ({
  settings,
  method,
}: {
  settings: Settings
  method: (prevState: any, formData: FormData) => Promise<any>
}) => {
  const t = useTranslations('Admin')
  const [state, formAction] = useFormState(method, initialState)
  const [date, setDate] = useState<DateRange | undefined>({
    from: settings?.dateStart || new Date(),
    to: settings?.dateEnd || addDays(new Date(), 7),
  })

  const fromMatch = date?.from?.getTime() == settings?.dateStart?.getTime()
  const toMatch = date?.to?.getTime() == settings?.dateEnd?.getTime()

  const dateMatch = fromMatch && toMatch

  return (
    <form action={formAction}>
      <div className="mb-6">
        <div className="text-xl font-bold">{t('Settings')}</div>
        <div className="text-lg">{t('Time range')}</div>
        <p className="mb-4">
          {t('Set up a time range when students can join the subjects')}
        </p>
        <div className="mb-4">
          <DatePickerWithRange date={date} setDate={setDate} />
          <InputHidden
            name="dateStart"
            value={date?.from?.toLocaleString()}
            id="dateStart"
          />
          <InputHidden
            name="dateEnd"
            value={date?.to?.toLocaleString()}
            id="dateEnd"
          />
        </div>
        {dateMatch ? (
          <div className="mb-4 text-green-700">{t('Dates are saved')}</div>
        ) : (
          <SubmitButton title="Save dates" />
        )}
      </div>
    </form>
  )
}

export default Settings
