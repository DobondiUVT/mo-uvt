import { columns } from './coldef'
import { DataTable } from '../../../components/Admin/Tables/DataTable'
import { getSubjects } from '@/actions/subject'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Row } from '@tanstack/react-table'
import { Faculty, PrismaClient, Subject } from '@prisma/client'
import { getFaculty } from '@/actions/faculty'

export const revalidate = 0

export type finalSubjectData = Pick<
  Subject,
  'id' | 'title' | 'description' | 'facultyId'
> & {
  faculty: Pick<Faculty, 'id' | 'abbreviation'> | null
}

export default async function SubjectsAdmin() {
  const prisma = new PrismaClient()
  const subjects = await prisma.subject.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      facultyId: true,
      faculty: {
        select: {
          id: true,
          abbreviation: true,
        },
      },
    },
  })

  const finalData: finalSubjectData[] = subjects

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Subjects</h1>
        <Link
          href="/admin/subjects/new"
          className={buttonVariants({ variant: 'ghost' })}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:block">Add a new subject</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>
      <DataTable columns={columns} data={finalData} />
    </>
  )
}
