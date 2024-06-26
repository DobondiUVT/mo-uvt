'use server'
import prisma from '@/utilities/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { Session } from 'next-auth'

export async function getCurrentUser(session: Session) {
  if (!session?.user?.email) return null
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  return user
}

export async function getUsers() {
  const users = await prisma.user.findMany()
  return users
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({ where: { id } })
    return {
      title: 'Hooray!',
      description: 'Successfully deleted',
      status: 'success',
    }
  } catch (e) {
    console.error(e)
    return {
      title: `Error deleting`,
      description: `${e}`,
      status: 'error',
    }
  } finally {
    revalidatePath('/admin/users')
  }
}

export async function updateUser(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.coerce.number(),
    role: z.enum(['ADMIN', 'STUDENT', 'EDITOR']),
  })

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let updatedUser

  try {
    updatedUser = await prisma.user.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    })
  } catch (e) {
    console.error(e)
    return { serverError: `Error updating user: ${e}` }
  }

  if (updatedUser) {
    revalidatePath(`/admin/users/edit/${updatedUser.id}`)
    return { success: `Succesfully updated user` }
  }
}
