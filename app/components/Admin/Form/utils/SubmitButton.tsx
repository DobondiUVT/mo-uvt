'use client'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const SubmitButton = ({ title = 'Save' }) => {
  const { pending } = useFormStatus()
  const t = useTranslations('Admin')
  return (
    <Button className="flex" aria-disabled={pending} disabled={pending}>
      {t(title)}
      {pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}
