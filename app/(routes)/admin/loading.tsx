import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const AdminLoading = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="bg-gray-200 h-8 w-48" />
      <Skeleton className="bg-gray-200 h-96 w-full" />
    </div>
  )
}

export default AdminLoading
