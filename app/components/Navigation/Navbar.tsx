import Link from 'next/link'
import Image from 'next/image'
import { Button, buttonVariants } from '../ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getCurrentUser } from '@/actions/user'
import { getServerSession } from 'next-auth'
import AuthSection from './AuthSection'
import { IconMenu2 } from '@tabler/icons-react'
import Navigation from './Navigation'

const Navbar = async () => {
  const session = await getServerSession()
  let user
  if (session) {
    user = await getCurrentUser(session)
  } else {
    user = null
  }

  return (
    <Navigation
      session={session}
      user={user}
    />
  )
}

export default Navbar
