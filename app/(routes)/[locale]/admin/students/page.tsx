import { columns } from './coldef'
import { DataTable } from '@/components/Admin/Tables/DataTable'
import { getStudents } from '@/actions/student'
import { Link } from '%/i18n/navigation'
import prisma from '@/utilities/db'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const revalidate = 0

const TopHeader = async () => {
  const settings = await prisma.settings.findFirst({
    where: {
      id: 1,
    },
  })

  const lastImportDate = settings?.lastImportDate
  const lastImportAuthorName = settings?.lastImportAuthorName
  const hadImport = lastImportDate && lastImportAuthorName

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Students</h1>
        <Link
          href="/admin/students/add"
          className={buttonVariants({ variant: 'ghost' })}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:block">Add students</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>
      {hadImport && (
        <div className="mb-4">
          <div className="text-sm text-gray-500">
            Last import on {lastImportDate.toLocaleString()} by{' '}
            {lastImportAuthorName}
          </div>
        </div>
      )}
    </div>
  )
}

const StudentsTable = async () => {
  const students = await getStudents()
  return <DataTable columns={columns} data={students} />
}

export default function StudentsAdmin() {
  return (
    <>
      <TopHeader />
      <StudentsTable />
    </>
  )
}
