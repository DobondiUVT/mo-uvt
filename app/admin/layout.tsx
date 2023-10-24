import Sidebar from '@/components/Navbar/Sidebar'
import Topbar from '@/components/Navbar/Topbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Topbar/>
      <div className="flex">
        <div className="xl:w-96 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
