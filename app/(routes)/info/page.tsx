import prisma from '@/utilities/db'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import InfoForm from './InfoForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getStudent } from '@/actions/student'
import { getCurrentUser } from '@/actions/user'
import { getAuthInfo } from '@/actions/auth'

const MoreInfo = async () => {
  const { session, user, student } = await getAuthInfo()

  if (!user) redirect('/')

  if (student?.verified) redirect('/')

  const faculties = await prisma.faculty.findMany()
  const specializations = await prisma.specialization.findMany()

  return (
    <div className="container mx-auto   px-4 py-8 lg:py-14">
      <div className="rounded-lg border bg-white p-6 shadow">
        <h1 className="text-3xl font-bold">More Info</h1>
        <p className="mb-6">
          In order to choose your optional subjects, please provide us with some
          more information regarding your academic status.
        </p>
        <InfoForm
          user={user}
          faculties={faculties}
          specializations={specializations}
        />
      </div>
    </div>
  )
}

export default MoreInfo
