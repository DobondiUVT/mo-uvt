import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const InputsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="bg-zinc-200 h-8 w-24" />
        <Skeleton className="bg-zinc-200 h-8 w-64" />
      </div>
      <div className="space-y-4">
        <Skeleton className="bg-zinc-200 h-8 w-24" />
        <Skeleton className="bg-zinc-200 h-8 w-64" />
      </div>
      <div className="space-y-4">
        <Skeleton className="bg-zinc-200 h-8 w-24" />
        <Skeleton className="bg-zinc-200 h-8 w-64" />
      </div>
    </div>
  )
}

export default InputsSkeleton
