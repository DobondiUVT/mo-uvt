'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { Link } from '%/i18n/navigation'
import { redirect } from '%/i18n/navigation'
import { useTranslations } from 'next-intl'

const AuthError = () => {
  const t = useTranslations('Login error')

  const { data: session } = useSession()
  if (session) {
    redirect('/')
    return
  }

  return (
    <section className="py-8 lg:py-14">
      <div className="container px-4  ">
        <div className="flex w-full items-center justify-center">
          <div className="inline-block rounded-md border-red-400 bg-red-200 px-6 py-4 text-red-800 shadow">
            <h1 className="mb-1 text-lg font-bold">{t('Login error')} :(</h1>
            <div className="mb-4">
              {t(
                'Unfortunately, you are not allowed to login using that email address',
              )}
              <br />
              {t(
                'Make sure you are logging in using your institutional UVT email address',
              )}
              <br />
              {t('If you are still having issues, please contact us at')}{' '}
              <a
                className="font-bold underline"
                href="mailto:info.uvt@e-uvt.ro"
              >
                info.uvt@e-uvt.ro
              </a>
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Link href={'/'} className={buttonVariants({ variant: 'ghost' })}>
                {t('Go home')}
              </Link>
              <Button onClick={() => signIn('google')} variant={'outline'}>
                {t('Try again')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthError
