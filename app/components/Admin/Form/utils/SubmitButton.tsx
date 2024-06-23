'use client'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

export const SubmitButton = ({
  title = 'Submit',
}) => {
  const { pending } = useFormStatus()
  return (
    <Button className="flex" aria-disabled={pending} disabled={pending}>
      {title}
      {pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}
