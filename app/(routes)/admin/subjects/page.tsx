import { columns } from './coldef'
import { DataTable } from '../../../components/Admin/Tables/DataTable'
import { getSubjects } from '@/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function DemoPage() {
  const subjects = await getSubjects()

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Subjects</h1>
        <Link
          href="/admin/subjects/new"
          className={buttonVariants({ variant: 'ghost' })}
        >
          <Plus className="mr-2 h-4 w-4" /> Add a new subject
        </Link>
      </div>
      <DataTable columns={columns} data={subjects} />
    </>
  )
}
