import { columns } from './coldef'
import { DataTable } from '../../../../components/Admin/Tables/DataTable'
import { getFaculties } from '@/actions/faculty'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '%/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

export default async function FacultiesAdmin() {
  const faculties = await getFaculties()
  const t = await getTranslations('Admin')

  const TopHeader = () => (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold">{t('Faculties')}</h1>
      <Link
        href="/admin/faculties/new"
        className={buttonVariants({ variant: 'ghost' })}
      >
        <Plus className="mr-2 h-4 w-4" />
        <span className="hidden sm:block">
          {t('Add')} {t('Faculty').toLowerCase()}
        </span>
        <span className="sm:hidden">{t('New')}</span>
      </Link>
    </div>
  )
  return (
    <>
      <TopHeader />
      <DataTable columns={columns} data={faculties} />
    </>
  )
}
