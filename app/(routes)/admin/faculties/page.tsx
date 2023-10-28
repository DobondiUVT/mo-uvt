import { columns } from './coldef'
import { DataTable } from '../../../components/Admin/Tables/DataTable'
import { getFaculties } from '@/actions/faculty'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function FacultiesAdmin() {
  const Faculties = await getFaculties()

  return (
    <>
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
      <DataTable columns={columns} data={Faculties} />
    </>
  )
}
