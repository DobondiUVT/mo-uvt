'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { isEqualInsensitiveStrings } from '@/utilities/utils'
import { useTranslations } from 'next-intl'

type ComboboxOption = {
  label: string
  value: string | number
  id: number | string
}

type ComboboxProps = {
  value: string | number
  setValue: (value: any) => void
  options: ComboboxOption[]
}

export default function Combobox({ value, setValue, options }: ComboboxProps) {
  const t = useTranslations('General')
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) =>
                isEqualInsensitiveStrings(option.value, value),
              )?.label
            : t('Select option')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[16rem] w-[200px] overflow-y-auto p-0">
        <Command>
          <CommandInput placeholder={t('Search option')} />
          <CommandEmpty>{t('No option found')}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value.toString()}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    isEqualInsensitiveStrings(option.value, value)
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
