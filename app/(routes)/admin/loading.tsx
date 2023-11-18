import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const AdminLoading = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="bg-gray-200 h-12 w-full" />
      <Skeleton className="bg-gray-200 h-12 w-full" />
      <Skeleton className="bg-gray-200 h-12 w-full" />
      <Skeleton className="bg-gray-200 h-12 w-full" />
    </div>
  )
}

export default AdminLoading
