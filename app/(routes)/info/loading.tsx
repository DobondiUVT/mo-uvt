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
