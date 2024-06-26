import { getSubjects } from '@/actions/subject'
import SubjectsSection from './SubjectsSection'
import { getTranslations } from 'next-intl/server'

export const revalidate = 0

export default async function Subjects() {
  const subjects = await getSubjects()
  const t = await getTranslations('Subjects Page')

  return (
    <main className="">
      <section className="py-8 lg:py-14">
        <div className="px-4">
          <h1 className="mb-6 text-3xl font-bold">
            {t('Check out all of our UVT optional subjects:')}
          </h1>
          <div className="flex flex-col gap-4">
            {subjects && subjects.length ? (
              <SubjectsSection subjects={subjects} />
            ) : (
              <h1 className="mb-4 text-lg">
                {t(
                  'There are no optional subjects available If that is an error, please contact us at',
                )}{' '}
                <a
                  className="font-bold underline"
                  href="mailto:info.uvt@e-uvt.ro"
                >
                  info.uvt@e-uvt.ro
                </a>
              </h1>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
