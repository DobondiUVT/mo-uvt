import Link from 'next/link'
import Image from 'next/image'
import UVTLogo from 'public/logo_simple.png'
import { Button, buttonVariants } from '../ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getCurrentUser } from '@/actions/user'
import { getServerSession } from 'next-auth'
import AuthSection from './AuthSection'

type NavItemProps = {
  link: string
  title: string
}

const NavItem = ({ link, title }: NavItemProps) => {
  return (
    <li>
      <Link
        href={link}
        className="flex h-full items-center px-4 py-4 hover:bg-zinc-100"
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

const Navbar = async () => {
  const session = await getServerSession()
  let user
  if (session) {
    user = await getCurrentUser(session)
  } else {
    user = null
  }
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
          <div className="flex gap-6">
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
        </div>
      </div>
    </header>
  )
}

export default Navbar
