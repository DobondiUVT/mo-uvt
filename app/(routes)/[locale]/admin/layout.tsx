import { getAuthInfo } from '@/actions/auth'
import Sidebar from '@/components/Admin/Navigation/Sidebar'
import { redirect } from '%/i18n/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, user } = await getAuthInfo()
  if (!session || !user || !['ADMIN', 'EDITOR'].includes(user.role)) {
    redirect('/')
    return
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex-shrink-0 xl:w-96">
        <Sidebar user={user} />
      </div>
      <div className="flex-1 p-4 sm:p-8">{children}</div>
    </div>
  )
}
