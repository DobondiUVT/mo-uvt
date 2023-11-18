'use client'

import Link from 'next/link'
import Image from 'next/image'
import UVTLogo from 'public/logo_simple.png'
import { Button, buttonVariants } from '../ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type NavItemProps = {
  link: string
  title: string
}

const NavItem = ({ link, title }: NavItemProps) => {
  return (
    <li>
      <Link
        href={link}
        className="flex h-full items-center px-4 py-4 hover:bg-gray-100"
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

const AuthSection = () => {
  const { data: session } = useSession()
  const getInitials = (name: string) => {
    const names = name.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase()
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
    return initials
  }

  return (
    <div>
      {session ? (
        <div className="flex items-center gap-4">
          <Button onClick={() => signOut()} variant={'outline'}>
            Sign out
          </Button>
          <Avatar>
            <AvatarImage src={session.user?.image ?? ''} />
            <AvatarFallback className="bg-uvt-yellow">
              {getInitials(session.user?.name ?? '')}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Button onClick={() => signIn('google')} variant={'outline'}>
          Log in
        </Button>
      )}
    </div>
  )
}

const Navbar = () => {
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
            <AuthSection />

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

export default Navbar
