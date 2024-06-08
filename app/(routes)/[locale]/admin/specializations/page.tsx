import { getSpecializations } from '@/actions/specialization'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '%/i18n/navigation'
import { DataTable } from '../../../../components/Admin/Tables/DataTable'
import { columns } from './coldef'
import Table from '@/(routes)/[locale]/admin/specializations/Table'
import prisma from '@/utilities/db'

export const revalidate = 0

const TopHeader = () => (
  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
    <h1 className="text-2xl font-semibold">Specializations</h1>
    <Link
      href="/admin/specializations/new"
      className={buttonVariants({ variant: 'ghost' })}
    >
      <Plus className="mr-2 h-4 w-4" />
      <span className="hidden sm:block">Add a new specialization</span>
      <span className="sm:hidden">New</span>
    </Link>
  </div>
)

export default async function SpecializationsAdmin() {
  const specializations = await getSpecializations()
  const faculties = await prisma.faculty.findMany()

  return (
    <>
      <TopHeader />
      <Table faculties={faculties} columns={columns} data={specializations} />
    </>
  )
}
