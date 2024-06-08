import Navbar from '@/components/Navigation/Navbar'
import { Toaster } from '@/components/ui/toaster'
import '@/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/Auth/SessionProvider'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MO-UVT',
  description: 'Find the subjects you want to study at UVT',
}

const theme = {
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const session = await getServerSession()
  const messages = await getMessages()
  return (
    <html lang="en">
      <head>
        {/* favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className={`${inter.className} bg-zinc-100`}>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
            <Navbar />
            {children}
            <Toaster />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
