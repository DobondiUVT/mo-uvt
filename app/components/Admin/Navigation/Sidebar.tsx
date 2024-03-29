'use client'

import {
  IconAdjustmentsAlt,
  IconBooks,
  IconHome,
  IconPencil,
  IconSchool,
  IconTable,
  IconUser
} from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SidebarItem = ({
  title,
  href,
  icon,
}: {
  title: string
  href: string
  icon: React.ReactNode
}) => {
  const pathName = usePathname()
  let isActive
  if (href == '/admin') {
    isActive = pathName == '/admin'
  } else {
    isActive = pathName.includes(href)
  }
  return (
    <Link
      href={href}
      className={`flex items-center gap-1 rounded-xl p-3 hover:bg-zinc-800 hover:text-zinc-100 sm:p-4 xl:py-3 ${
        isActive ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-800'
      }`}
    >
      {icon}
      <span className="hidden xl:block">{title}</span>
    </Link>
  )
}

const Sidebar = () => {
  const links = [
    {
      title: 'General',
      href: '/admin',
      icon: <IconAdjustmentsAlt />,
    },
    {
      title: 'Subjects',
      href: '/admin/subjects',
      icon: <IconBooks />,
    },
    {
      title: 'Packets',
      href: '/admin/groups',
      icon: <IconTable />,
    },
    {
      title: 'Faculty',
      href: '/admin/faculties',
      icon: <IconHome />,
    },
    {
      title: 'Specializations',
      href: '/admin/specializations',
      icon: <IconPencil />,
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: <IconUser />,
    },
    {
      title: 'Students',
      href: '/admin/students',
      icon: <IconSchool />,
    },
  ]
  return (
    <div
      className={`sticky top-[64px] w-full overflow-y-auto border-r border-zinc-300 bg-zinc-200 px-4 py-2 sm:block sm:h-[calc(100vh-64px)] sm:px-4 sm:py-8`}
    >
      <div className="mb-4 hidden text-lg font-bold text-zinc-800 xl:block">
        Administration dashboard
      </div>
      <nav
        aria-label="Main"
        className="flex flex-1 gap-3 overflow-y-hidden hover:overflow-y-auto sm:block sm:space-y-2"
      >
        {links.map((link) => (
          <SidebarItem
            key={link.href}
            title={link.title}
            href={link.href}
            icon={link.icon}
          />
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
