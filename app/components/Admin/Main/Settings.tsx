'use client'

import { Button } from '@/components/ui/button'
import type { Settings } from '@prisma/client'
import { addDays } from 'date-fns'
import { Fragment, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useFormState } from 'react-dom'
import InputHidden from '../Form/utils/InputHidden'
import { DatePickerWithRange } from './DatePickerWithRange'
import { useTranslations } from 'next-intl'

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
  const dateMatch =
    date?.from?.toLocaleString() === settings?.dateStart?.toLocaleString() &&
    date?.to?.toLocaleString() === settings?.dateEnd?.toLocaleString()
  return (
    <form action={formAction}>
      <div className="mb-6">
        <div className="text-xl font-bold">{t("Settings")}</div>
        <div className="text-lg">{t("Time range")}</div>
        <p className="mb-4">
          {t("Set up a time range when students can join the subjects")}
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
          <div className="mb-4 text-green-700">{t("Dates are saved")}</div>
        ) : (
          <Fragment>
            <div className="mb-4 text-red-700">{t("Dates are not saved")}</div>
            <Button className="mb-6 flex items-center gap-1">{t("Save dates")}</Button>
          </Fragment>
        )}
      </div>
    </form>
  )
}

export default Settings
