'use client'

import {
  IconAdjustmentsAlt,
  IconBooks,
  IconHome,
  IconPencil,
  IconSchool,
  IconTable,
  IconUser,
} from '@tabler/icons-react'
import { Link, usePathname } from '%/i18n/navigation'
import { useTranslations } from 'next-intl'
import { User } from '@prisma/client'

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
  const isActive =
    href !== '/admin' ? pathName.includes(href) : pathName === href
  const t = useTranslations('Admin')
  return (
    <Link
      href={href}
      className={`flex items-center gap-1 rounded-xl p-3 hover:bg-zinc-800 hover:text-zinc-100 sm:p-4 xl:py-3 ${
        isActive ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-800'
      }`}
    >
      {icon}
      <span className="hidden xl:block">{t(title)}</span>
    </Link>
  )
}

const Sidebar = ({ user }: { user: User }) => {
  const t = useTranslations('Admin')
  const links = [
    {
      title: user.role === 'ADMIN' ? 'Settings' : 'Statistics',
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
      title: 'Students',
      href: '/admin/students',
      icon: <IconSchool />,
    },
  ]

  if (user.role === 'ADMIN') {
    links.push({
      title: 'Users',
      href: '/admin/users',
      icon: <IconUser />,
    })
  }

  return (
    <div
      className={`sticky top-[64px] w-full overflow-y-auto border-r border-zinc-300 bg-zinc-200 px-4 py-2 sm:block sm:h-[calc(100vh-64px)] sm:px-4 sm:py-8`}
    >
      <h1 className="mb-4 hidden text-lg font-bold text-zinc-800 xl:block">
        Admin
      </h1>
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
