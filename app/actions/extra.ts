'use server'

import prisma from '@/utilities/db'

export async function submitFeedback(feedBack: string) {
  let response = null
  let errored = false
  try {
    response = await prisma.feedback.create({
      data: {
        message: feedBack,
      },
    })
  } catch (error) {
    response = error
    errored = true
  }
  return { response, errored }
}
