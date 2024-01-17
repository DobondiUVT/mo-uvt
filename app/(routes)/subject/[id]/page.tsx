import { buttonVariants } from '@/components/ui/button'
import prisma from '@/utilities/db'
import {
  IconFile,
  IconFileText,
  IconFileTypePdf,
  IconPdf,
} from '@tabler/icons-react'
import { notFound } from 'next/navigation'

const SubjectPage = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  const subject = await prisma.subject.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!subject) {
    notFound()
  }

  return (
    <section className="lg:py-14 py-8">
      <div className="container px-4  ">
        <h1 className="title-font mb-3 text-4xl font-bold text-zinc-900">
          {subject.title} ({subject.abbreviation})
        </h1>
        <div className="mb-6 h-1 w-32 rounded bg-uvt-blue"></div>
        {subject.description && (
          <>
            <div className='text-xl font-bold text-zinc-700 mb-2'>Descrierea materiei</div>
            <div className="mb-4 w-full leading-loose text-zinc-700 lg:w-3/4" dangerouslySetInnerHTML={{ __html: subject.description }}/>
          </>
        )}
        {subject.file && (
          <>
            <div className='text-xl font-bold text-zinc-700 mb-4'>Fisa disciplinei</div>
            <div className='max-w-full h-[calc(100vh-120px)]'>
              <iframe src={subject.file} width={"100%"} height={"100%"}></iframe>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default SubjectPage
