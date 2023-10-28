'use client'

import {
  IconAdjustmentsAlt,
  IconBooks,
  IconSettings,
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
        isActive ? 'bg-zinc-800 text-zinc-100' : 'text-gray-800'
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
      title: 'Settings',
      href: '/admin/settings',
      icon: <IconSettings />,
    },
  ]
  return (
    <div
      className={`w-full overflow-y-auto border-r border-gray-300 bg-zinc-200 px-4 py-2 sm:block sm:h-[calc(100vh-64px)] sticky sm:px-4 sm:py-8 top-[64px]`}
    >
      <div className="mb-4 hidden text-lg font-bold text-gray-800 xl:block">
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
