'use client'

import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { Session } from 'next-auth'
import { User } from '@prisma/client'
import { useState } from 'react'
import AuthSection from './AuthSection'
import Image from 'next/image'
import UVTLogo from '/public/logo_simple.png'

type NavItemProps = {
  link: string
  title: string
}

const NavItem = ({ link, title }: NavItemProps) => {
  return (
    <li>
      <Link
        href={link}
        className="flex h-full items-center hover:bg-zinc-100 md:px-4 md:py-4"
      >
        {title}
      </Link>
    </li>
  )
}

const HeaderLogo = () => {
  return (
    <Link className="transition-all delay-100 hover:rotate-3" href={'/'}>
      <div className="flex items-center">
        <div className="max-w-[50px]">
          <Image
            src={UVTLogo}
            alt="UVT Logo"
            width={226}
            height={165}
            className="object-contain"
          />
        </div>
        <div className="text-2xl font-bold text-uvt-blue">
          MO<span className="text-uvt-yellow">-</span>UVT
        </div>
      </div>
    </Link>
  )
}

const Navigation = ({
  session,
  user,
}: {
  session: Session | null
  user: User | null
}) => {
  const [showDrawer, setShowDrawer] = useState(false)

  let navItems = []
  if (user?.role === 'STUDENT') {
    navItems.push({ title: 'My choices', link: '/choice' })
  }
  navItems.push({ title: 'Subjects', link: '/subjects' })
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-zinc-300 bg-zinc-100 bg-opacity-80 px-4 backdrop-blur-sm">
      <div className="h-full">
        <div className="flex h-full items-center justify-between">
          <HeaderLogo />
          <nav className="h-full">
            <ul className="hidden h-full md:flex">
              {navItems.map((item) => (
                <NavItem key={item.title} title={item.title} link={item.link} />
              ))}
            </ul>
          </nav>
          <div className="hidden gap-6 md:flex">
            <AuthSection session={session} />
            {user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                className={`${buttonVariants({ variant: 'default' })}`}
              >
                Admin
              </Link>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={(e) => setShowDrawer(!showDrawer)}
          >
            {showDrawer ? (
              <IconX className="text-uvt-blue" size={32} />
            ) : (
              <IconMenu2 className="text-uvt-blue" size={32} />
            )}
          </button>
        </div>
      </div>
      {showDrawer && (
        <div
          onClick={(e) => setShowDrawer(!showDrawer)}
          className="-mx-4 flex flex-col gap-4 border-b border-t border-b-zinc-300 bg-zinc-100 px-4 py-6 md:hidden"
        >
          <nav>
            <ul className="flex flex-col items-start gap-6">
              {navItems.map((item) => (
                <NavItem key={item.title} title={item.title} link={item.link} />
              ))}
              {user?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className={`${buttonVariants({ variant: 'default' })}`}
                >
                  Admin
                </Link>
              )}
              <AuthSection session={session} />
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navigation
