import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ChoiceLoading = () => {
  return (
    <main className="">
      <section className="py-14">
        <div className="container">
          <h1 className="mb-2 text-3xl font-bold">Hi 👋</h1>
          <p className="text-lg">
            We have gathered all the optional subjects that fit your faculty and
            year.
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
              <Skeleton className='bg-zinc-200 w-full h-48'/>
              <Skeleton className='bg-zinc-200 w-full h-96'/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ChoiceLoading