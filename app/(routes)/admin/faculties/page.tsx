import { columns } from './coldef'
import { DataTable } from '../../../components/Admin/Tables/DataTable'
import { getFaculties } from '@/actions/faculty'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export const revalidate = 0

const TopHeader = () => (
  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
    <h1 className="text-2xl font-semibold">Faculties</h1>
    <Link
      href="/admin/faculties/new"
      className={buttonVariants({ variant: 'ghost' })}
    >
      <Plus className="mr-2 h-4 w-4" />
      <span className="hidden sm:block">Add a new faculty</span>
      <span className="sm:hidden">New</span>
    </Link>
  </div>
)

const FacultiesTable = async () => {
  const faculties = await getFaculties()
  return <DataTable columns={columns} data={faculties} />
}

export default function FacultiesAdmin() {
  return (
    <>
      <TopHeader />
      <FacultiesTable />
    </>
  )
}
