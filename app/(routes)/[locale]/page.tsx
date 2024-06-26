import { buttonVariants } from '@/components/ui/button'
import {
  IconActivityHeartbeat,
  IconBook,
  IconSchool,
} from '@tabler/icons-react'
import { Link } from '%/i18n/navigation'
import Footer from './Footer'
import { getAuthInfo } from '@/actions/auth'
import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const { session, user, student } = await getAuthInfo()
  const t = await getTranslations('Index')
  return (
    <>
      <section className="overflow-y-hidden bg-gray-100 py-8 lg:py-14">
        <div className="w-full px-4">
          <div className="container relative mx-auto flex flex-col items-center rounded-lg bg-uvt-blue py-12 sm:py-24">
            <img
              className="absolute right-0 top-0 mr-2 mt-2 lg:mr-12 lg:mt-12"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg"
              alt="bg"
            />
            <img
              className="absolute bottom-0 left-0 mb-2 ml-2 lg:mb-12 lg:ml-12"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg"
              alt="bg"
            />
            <div className="mb-4 w-11/12 sm:mb-10 sm:w-2/3">
              <h1 className="mb-4 text-center text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                {t('Optional subjects UVT')}
              </h1>
              <p className="text-center text-lg text-white sm:text-xl">
                {t('Personalize your student experience one course at a time')}
              </p>
            </div>
            <Link
              href="/subjects"
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              {t('Explore our curriculum')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-14">
        <div className="container">
          <h2 className="title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl">
            {t('Fast & Easy process')}
          </h2>
          <div className="mb-20 h-1 w-16 rounded bg-uvt-blue"></div>
          <div className="-mx-4 flex flex-wrap space-y-6 sm:-m-4 lg:space-y-0">
            <div className="flex p-4 lg:w-1/3">
              <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-uvt-blue bg-opacity-10 text-uvt-blue">
                <IconBook size={28} />
              </div>
              <div className="flex-grow pl-6">
                <h3 className="title-font mb-2 text-lg font-medium text-gray-900">
                  {t('See all our curriculum')}
                </h3>
                <p className="text-base leading-relaxed">
                  {t(
                    'You can find valuable information about all the subjects we offer Find out more about the teachers, the course content and the evaluation method',
                  )}
                </p>
                <a
                  href="/subjects"
                  className="mt-3 inline-flex items-center text-uvt-blue"
                >
                  {t('Explore')}
                </a>
              </div>
            </div>
            <div className="flex p-4 lg:w-1/3">
              <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-uvt-blue bg-opacity-10 text-uvt-blue">
                <IconSchool size={28} />
              </div>
              <div className="flex-grow pl-6">
                <h3 className="title-font mb-2 text-lg font-medium text-gray-900">
                  {t('Choose your own path')}
                </h3>
                <p className="text-base leading-relaxed">
                  {t(
                    'Pick the subjects you like and create your own path to success You can choose from a wide variety of subjects of your liking offered by our university',
                  )}
                </p>
                <a
                  href={
                    session && user?.role === 'STUDENT'
                      ? `/choice`
                      : '/subjects'
                  }
                  className="mt-3 inline-flex items-center text-uvt-blue"
                >
                  {t('Pick')}
                </a>
              </div>
            </div>
            <div className="flex p-4 lg:w-1/3">
              <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-uvt-blue bg-opacity-10 text-uvt-blue">
                <IconActivityHeartbeat size={28} />
              </div>
              <div className="flex-grow pl-6">
                <h3 className="title-font mb-2 text-lg font-medium text-gray-900">
                  {t('See status updates in real time')}
                </h3>
                <p className="text-base leading-relaxed">
                  {t(
                    'Find out the status of your choices in real time You can see the number of available places for each subject Hurry up Places are limited',
                  )}
                </p>
                <a
                  href="/subjects"
                  className="mt-3 inline-flex items-center text-uvt-blue"
                >
                  {t('Find out more')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
