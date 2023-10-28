import Sidebar from '@/components/Admin/Navigation/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex-shrink-0 xl:w-96">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 sm:p-8">{children}</div>
    </div>
  )
}
