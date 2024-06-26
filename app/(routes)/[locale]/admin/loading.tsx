import { Skeleton } from '@/components/ui/skeleton'

const AdminLoading = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48 bg-zinc-200" />
      <Skeleton className="h-96 w-full bg-zinc-200" />
    </div>
  )
}

export default AdminLoading
