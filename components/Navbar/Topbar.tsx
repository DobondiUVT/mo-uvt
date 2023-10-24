'use client'

import {
  IconAdjustmentsAlt,
  IconBooks,
  IconSettings,
} from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TopbarItem = ({
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
      className={`flex items-center gap-1 rounded-xl p-3 text-white hover:bg-gray-100 hover:text-gray-900 ${
        isActive && 'bg-gray-100 text-gray-900'
      }`}
    >
      {icon}
      <span className="hidden xl:block">{title}</span>
    </Link>
  )
}

const Topbar = () => {
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
    <nav
      aria-label="Main"
      className="bg-uvt-dark-blue px-2 py-2 flex gap-4 overflow-y-hidden hover:overflow-y-auto sm:hidden"
    >
      {links.map((link) => (
        <TopbarItem
          key={link.href}
          title={link.title}
          href={link.href}
          icon={link.icon}
        />
      ))}
    </nav>
  )
}

export default Topbar
