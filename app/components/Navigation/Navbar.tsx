'use client'

import Link from 'next/link'
import defaultColors from '@/utilities/colors'
import Image from 'next/image'
import UVTLogo from 'public/logo_simple.png'
import { buttonVariants } from '../ui/button'

type NavItemProps = {
  link: string
  title: string
  closeDrawer?: () => void
}

const NavItem = ({ link, title, closeDrawer = () => {} }: NavItemProps) => {
  return (
    <li>
      <Link
        href={link}
        className="flex h-full items-center px-4 py-4 hover:bg-gray-100"
        onClick={closeDrawer}
      >
        {title}
      </Link>
    </li>
  )
}

const HeaderLogo = ({
  closeDrawer = () => {},
}: {
  closeDrawer?: () => void
}) => {
  return (
    <Link
      className="transition-all delay-100 hover:rotate-3"
      href={'/'}
      onClick={closeDrawer}
    >
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

const HeaderMegaMenu = () => {
  const navItems = [
    { title: 'Subjects', link: '/subjects' },
    { title: 'About', link: '/about' },
  ]

  return (
    <header className="sticky top-0 z-10 h-16 border-b border-gray-300 bg-zinc-100 bg-opacity-80 px-4 backdrop-blur-sm">
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
          <div className="flex gap-6">
            {/* <Link
              href="/login"
              className={buttonVariants({ variant: 'outline' })}
            >
              Log in
            </Link> */}
            <Link
              href="/admin"
              className={`${buttonVariants({ variant: 'default' })}`}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderMegaMenu
