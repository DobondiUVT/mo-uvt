import { usePathname, useRouter } from '%/i18n/navigation'
import { useLocale } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export default function LocaleSwitcher() {
  const locale = useLocale() as 'en' | 'ro'
  const otherLocale = locale === 'en' ? 'ro' : 'en'
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Select
      value={locale}
      onValueChange={(newLocale: 'en' | 'ro') =>
        router.replace(pathname, {
          locale: newLocale,
        })
      }
    >
      <SelectTrigger className="w-auto">
        <SelectValue placeholder={locale.toUpperCase()} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={locale}>{locale.toUpperCase()}</SelectItem>
          <SelectItem value={otherLocale}>
            {otherLocale.toUpperCase()}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
