import { PrismaClient } from '@prisma/client'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const getEmailDomain = (email: string) => {
  return email.split('@')[1]
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!profile || !profile.email || !profile.name) return '/auth-error'

      if (getEmailDomain(profile.email ?? '') != 'e-uvt.ro')
        return '/auth-error'

      try {
        const prisma = new PrismaClient()
        const dbUser = await prisma.user.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email: profile.email,
            name: profile.name,
          },
        })
        const dbStudent = await prisma.student.upsert({
          where: { userId: dbUser.id },
          update: {},
          create: {
            userId: dbUser.id,
          },
        })
      } catch (e) {
        console.error(e)
        return '/auth-error'
      }

      return true
    },
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
