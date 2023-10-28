import { columns } from './coldef'
import { DataTable } from '../../../components/Admin/Tables/DataTable'
import { getSubjects } from '@/actions'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function SubjectsAdmin() {
  const subjects = await getSubjects()

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
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
      <DataTable columns={columns} data={subjects} />
    </>
  )
}
