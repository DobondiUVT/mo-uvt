import { getAuthInfo } from '@/actions/auth'
import Sidebar from '@/components/Admin/Navigation/Sidebar'
import { redirect } from '%/i18n/navigation'

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, user } = await getAuthInfo()
  if (!session || !user || user.role !== 'ADMIN') {
    redirect('/admin')
    return
  }

  return children
}
