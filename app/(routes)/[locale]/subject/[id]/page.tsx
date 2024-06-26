import { getSubject } from '@/actions/subject'
import { ENUM_TO_NUMBER } from '@/utilities/utils'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

const SubjectPage = async ({ params }: { params: { id: number } }) => {
  const t = await getTranslations('Subject Page')

  const { id } = params
  const subject = await getSubject(Number(id))

  if (!subject) {
    notFound()
  }

  return (
    <section className="py-8 lg:py-14">
      <div className="container px-4  ">
        <h1 className="title-font mb-3 text-4xl font-bold text-zinc-900">
          {subject.title} ({subject.abbreviation})
        </h1>
        <div className="mb-6 h-1 w-32 rounded bg-uvt-blue"></div>
        <div className="mb-2 text-xl font-bold text-zinc-700">
          {t('General information')}
        </div>
        <div className="mb-4">
          {subject.faculty && (
            <div className="text-zinc-700">{subject.faculty.name}</div>
          )}
          {subject.specializations.length > 0 && (
            <div className="text-zinc-700">
              {subject.specializations.map((spec) => spec.title).join(', ')}
            </div>
          )}
          {subject.year && (
            <div className="text-zinc-700">
              {t('Year')} {ENUM_TO_NUMBER[subject.year]}
            </div>
          )}
          {subject.semester && (
            <div className="text-zinc-700">
              {t('Semester')} {ENUM_TO_NUMBER[subject.semester]}
            </div>
          )}
        </div>
        {subject.description && (
          <>
            <div className="mb-2 text-xl font-bold text-zinc-700">
              {t('Subject description')}
            </div>
            <div
              className="mb-4 w-full leading-loose text-zinc-700 lg:w-3/4"
              dangerouslySetInnerHTML={{ __html: subject.description }}
            />
          </>
        )}
        {subject.file ? (
          <>
            <div className="mb-4 text-xl font-bold text-zinc-700">
              {t('Subject document')}
            </div>
            <div className="h-[calc(100vh-120px)] max-w-full">
              <iframe
                src={subject.file}
                width={'100%'}
                height={'100%'}
              ></iframe>
            </div>
          </>
        ) : (
          <div className="mb-4 text-xl font-bold text-zinc-700">
            {t('The subject document is not available')}
          </div>
        )}
      </div>
    </section>
  )
}

export default SubjectPage
