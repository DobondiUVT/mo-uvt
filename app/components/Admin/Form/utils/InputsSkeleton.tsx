import { Skeleton } from '@/components/ui/skeleton'

const InputsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-24 bg-zinc-200" />
        <Skeleton className="h-8 w-64 bg-zinc-200" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-24 bg-zinc-200" />
        <Skeleton className="h-8 w-64 bg-zinc-200" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-24 bg-zinc-200" />
        <Skeleton className="h-8 w-64 bg-zinc-200" />
      </div>
    </div>
  )
}

export default InputsSkeleton
