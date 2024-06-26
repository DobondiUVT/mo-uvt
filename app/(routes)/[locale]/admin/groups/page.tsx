import { columns } from './coldef'
import { DataTable } from '../../../../components/Admin/Tables/DataTable'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '%/i18n/navigation'
import { getGroups } from '@/actions/group'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

export default async function SubjectsAdmin() {
  const t = await getTranslations('Admin')
  const groups = await getGroups()

  const TopHeader = () => (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold">{t('Packets')}</h1>
      <Link
        href="/admin/groups/new"
        className={buttonVariants({ variant: 'ghost' })}
      >
        <Plus className="mr-2 h-4 w-4" />
        <span className="hidden sm:block">
          {t('Add')} {t('Packet').toLowerCase()}
        </span>
        <span className="sm:hidden">{t('New')}</span>
      </Link>
    </div>
  )

  return (
    <>
      <TopHeader />
      <DataTable columns={columns} data={groups} />
    </>
  )
}
