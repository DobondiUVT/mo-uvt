import { columns } from './coldef'
import { DataTable } from '../../../components/Admin/Tables/DataTable'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Faculty, PrismaClient, Subject } from '@prisma/client'
import { Suspense } from 'react'
import { getSubjectsTableData } from '@/actions/subject'
import { getGroupsTableData } from '@/actions/group'

export const revalidate = 0

const TopHeader = () => (
  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
    <h1 className="text-2xl font-semibold">Groups</h1>
    <Link
      href="/admin/groups/new"
      className={buttonVariants({ variant: 'ghost' })}
    >
      <Plus className="mr-2 h-4 w-4" />
      <span className="hidden sm:block">Add a new group</span>
      <span className="sm:hidden">New</span>
    </Link>
  </div>
)

const SubjectsTable = async () => {
  const groups = await getGroupsTableData()
  return <DataTable columns={columns} data={groups} />
}

export default function SubjectsAdmin() {
  return (
    <>
      <TopHeader />
      <SubjectsTable />
    </>
  )
}
