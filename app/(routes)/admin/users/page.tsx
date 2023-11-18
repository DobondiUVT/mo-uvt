import { columns } from './coldef'
import { DataTable } from '../../../components/Admin/Tables/DataTable'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getUsers } from '@/actions/user'
import { Suspense } from 'react'

export const revalidate = 0

const TopHeader = () => (
  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
    <h1 className="text-2xl font-semibold">Users</h1>
    <Link
      href="/admin/users/new"
      className={buttonVariants({ variant: 'ghost' })}
    >
      <Plus className="mr-2 h-4 w-4" />
      <span className="hidden sm:block">Add a new user</span>
      <span className="sm:hidden">New</span>
    </Link>
  </div>
)

const SubjectsTable = async () => {
  const users = await getUsers()
  return <DataTable columns={columns} data={users} />
}

export default function SubjectsAdmin() {
  return (
    <>
      <TopHeader />
      <SubjectsTable />
    </>
  )
}
