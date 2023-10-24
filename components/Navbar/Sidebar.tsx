"use client"

import { IconAdjustmentsAlt, IconBooks, IconSettings } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const SidebarItem = ({
  title,
  href,
  icon,
}: {
  title: string
  href: string
  icon: React.ReactNode,
}) => {
  const pathName = usePathname()
  let isActive;
  if (href == "/admin") {
    isActive = pathName == "/admin"
  } else {
    isActive = pathName.includes(href)
  }
  return (
    <Link
      href={href}
      className={`flex items-center gap-1 rounded-xl px-4 py-4 xl:py-3 hover:bg-gray-100 hover:text-gray-900 ${isActive ? 'bg-gray-100 text-gray-900' : 'text-white'}`}
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
      icon: <IconAdjustmentsAlt/>,
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
    }
  ]
  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-y-auto bg-uvt-dark-blue px-2 py-4 hidden sm:block">
      <div className="hidden xl:block text-lg px-4 py-3 mb-2 font-bold text-white">
        Administration dashboard
      </div>
      <nav
        aria-label="Main"
        className="flex-1 space-y-2 overflow-y-hidden hover:overflow-y-auto"
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
