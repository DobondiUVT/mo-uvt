'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Session } from 'next-auth'
import { User } from '@prisma/client'

const AuthSection = ({ session }: { session: Session | null }) => {
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
          <Avatar className="hidden md:block">
            <AvatarImage
              alt={session.user?.name ?? ''}
              src={session.user?.image ?? ''}
            />
            <AvatarFallback className="bg-uvt-yellow">
              {getInitials(session.user?.name ?? '')}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Button
          onClick={() => signIn('google', { callbackUrl: '/redirect' })}
          variant={'outline'}
        >
          Log in
        </Button>
      )}
    </div>
  )
}

export default AuthSection
