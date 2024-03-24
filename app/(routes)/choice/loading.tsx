import { Skeleton } from '@/components/ui/skeleton'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const ChoiceLoading = async () => {
  const session = await getServerSession()
  if (!session) {
    redirect('/subjects')
  }

  return (
    <main className="">
      <section className="py-8 lg:py-14">
        <div className="container px-4  ">
          <h1 className="mb-2 text-3xl font-bold">
            Hi {session.user?.name} 👋
          </h1>
          <p className="text-lg">
            We have gathered all the optional subjects that fit you
          </p>
          <p className="text-lg">
            Please choose <strong>only one</strong> subject from each group that
            you think fits your interests best.
          </p>
          <p className="mb-12 text-lg">
            For any questions, please contact us at{' '}
            <a className="font-bold underline" href="mailto:info.uvt@e-uvt.ro">
              info.uvt@e-uvt.ro
            </a>
          </p>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-48 w-full bg-zinc-200" />
            <Skeleton className="h-96 w-full bg-zinc-200" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ChoiceLoading
