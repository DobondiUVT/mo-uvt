import prisma from '@/utilities/db'
import { PrismaClient } from '@prisma/client'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const getEmailDomain = (email: string) => {
  return email.split('@')[1]
}

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!profile || !profile.email || !profile.name) return '/ro/auth-error'

      if (getEmailDomain(profile.email ?? '') != 'e-uvt.ro')
        return '/ro/auth-error'

      let dbUser

      try {
        dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
        })
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              role: 'STUDENT',
            },
          })
        }
      } catch (e) {
        console.error(e)
        return '/ro/auth-error'
      }

      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
