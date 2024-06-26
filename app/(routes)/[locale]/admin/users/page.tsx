import { columns } from './coldef'
import { DataTable } from '../../../../components/Admin/Tables/DataTable'
import { getUsers } from '@/actions/user'
import { getTranslations } from 'next-intl/server'
import { getAuthInfo } from '@/actions/auth'
import { redirect } from '%/i18n/navigation'

export const revalidate = 0

export default async function UsersAdmin() {
  const { user } = await getAuthInfo()
  if (!user || !['ADMIN'].includes(user.role)) {
    redirect('/admin')
    return
  }
  const t = await getTranslations('Admin')
  const users = await getUsers()
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{t('Users')}</h1>
      </div>
      <DataTable columns={columns} data={users} />
    </>
  )
}
