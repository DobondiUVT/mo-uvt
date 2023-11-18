"use server";

import prisma from '@/utilities/db'

import { finalGroupData } from '@/utilities/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function getGroupsTableData() {
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      title: true,
      facultyId: true,
      faculty: {
        select: {
          id: true,
          abbreviation: true,
        },
      },
    },
  })

  return groups as finalGroupData[]
}

export async function getGroups() {
  const groups = await prisma.group.findMany()
  return groups
}

export async function getGroup(id: number | null) {
  if (!id) return

  const group = await prisma.group.findUnique({ where: { id } })
  return group
}

export async function deleteGroup(id: number) {
  try {
    await prisma.group.delete({ where: { id } })
    return {
      title: 'Hooray!',
      description: 'Successfully deleted group',
      status: 'success',
    }
  } catch (e) {
    console.error(e)
    return {
      title: `Error deleting group`,
      description: `${e}`,
      status: 'error',
    }
  } finally {
    revalidatePath('/admin/groups')
  }
}

export async function saveGroup(prevState: any, formData: FormData) {
  

  const schema = z.object({
    title: z.string().min(1, 'Title must be at least 1 character'),
    description: z.string().min(1, 'Description must be at least 1 character'),
    facultyId: z.coerce.number().positive('Faculty must be selected'),
  })

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return parsed.error.flatten().fieldErrors
  }

  let savedGroup

  try {
    savedGroup = await prisma.group.create({ data: parsed.data })
  } catch (e) {
    console.error(e)
    return { serverError: `Error saving group: ${e}` }
  }
  if (savedGroup) {
    redirect(`/admin/groups/edit/${savedGroup.id}`)
  }
}