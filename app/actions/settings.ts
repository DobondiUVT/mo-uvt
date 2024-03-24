'use server'

import prisma from '@/utilities/db'
import { revalidatePath } from 'next/cache'

export async function saveDates(prevState: any, formData: FormData) {
  const dateStart = new Date(formData.get('dateStart') as string)
  const dateEnd = new Date(formData.get('dateEnd') as string)
  const settings = await prisma.settings.update({
    where: {
      id: 1,
    },
    data: {
      dateStart,
      dateEnd
    },
  })
  revalidatePath('/admin')
}
