import prisma from '@/utilities/db'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import InfoForm from './InfoForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const MoreInfo = async () => {
  const session = await getServerSession()

  if (!session?.user?.email) redirect('/')

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      student: true,
    },
  })

  if (!user?.student) redirect('/')

  if (user.student.verified) redirect('/')

  const faculties = await prisma.faculty.findMany()

  return (
    <div className="container mx-auto py-12">
      <div className="rounded-lg border bg-white p-6 shadow">
        <h1 className="text-3xl font-bold">More Info</h1>
        <p className="mb-6">
          In order to choose your optional subjects, please provide us with some
          more information regarding your academic status.
        </p>
        <InfoForm student={user.student} faculties={faculties} />
      </div>
    </div>
  )
}

export default MoreInfo
