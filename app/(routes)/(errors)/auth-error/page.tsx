'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const AuthError = () => {
  const { data: session } = useSession()
  if (session) {
    redirect('/')
  }

  return (
    <section className="py-8 lg:py-14">
      <div className="container px-4  ">
        <div className="flex w-full items-center justify-center">
          <div className="inline-block rounded-md border-red-400 bg-red-200 px-6 py-4 text-red-800 shadow">
            <h1 className="mb-1 text-lg font-bold">Login error :(</h1>
            <div className="mb-4">
              Unfortunately, you are not allowed to login using that email
              address.
              <br />
              Make sure you are logging in using your institutional UVT email
              address.
              <br />
              If you are still having issues, please contact us at{' '}
              <a
                className="font-bold underline"
                href="mailto:laszlo.dobondi02@e-uvt.ro"
              >
                laszlo.dobondi02@e-uvt.ro
              </a>
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Link href={'/'} className={buttonVariants({ variant: 'ghost' })}>
                Go home
              </Link>
              <Button onClick={() => signIn('google')} variant={'outline'}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthError
