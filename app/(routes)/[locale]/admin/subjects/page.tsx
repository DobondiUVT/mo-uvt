import { columns } from './coldef'
import { DataTable } from '../../../../components/Admin/Tables/DataTable'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '%/i18n/navigation'
import { Faculty, PrismaClient, Subject } from '@prisma/client'
import { Suspense } from 'react'
import { getSubjects } from '@/actions/subject'
import Table from './Table'
import prisma from '@/utilities/db'

export const revalidate = 0

const TopHeader = () => (
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
)

export default async function SubjectsAdmin() {
  const subjects = await getSubjects()
  const faculties = await prisma.faculty.findMany()
  const specializations = await prisma.specialization.findMany()
  return (
    <>
      <TopHeader />
      <Table
        columns={columns}
        data={subjects}
        faculties={faculties}
        specializations={specializations}
      />
    </>
  )
}
