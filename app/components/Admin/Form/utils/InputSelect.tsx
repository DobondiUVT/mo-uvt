'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import InputHidden from './InputHidden'
import InputGroup from './InputGroup'
import { useTranslations } from 'next-intl'

type InputSelectProps = {
  options: { label: string; value: string }[]
  label: string
  name: string
  id: string
  value?: string | number | null
  setValue: (value: any) => void
  required?: boolean
  error?: string
  readonly?: boolean
  disabled?: boolean
}

const InputSelect = ({
  label,
  name,
  value = '',
  setValue,
  required = false,
  error,
  disabled = false,
  options,
}: InputSelectProps) => {
  const t = useTranslations('General')

  return (
    <InputGroup label={label} error={error}>
      <Select
        value={value?.toString()}
        onValueChange={setValue}
        required={required}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t('Select option')} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </InputGroup>
  )
}

export default InputSelect
