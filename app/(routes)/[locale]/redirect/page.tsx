import { getAuthInfo } from '@/actions/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Redirect = async () => {
  const { user, student } = await getAuthInfo()
  if (!user) {
    redirect('/')
  }
  if (user.role === 'ADMIN') {
    redirect('/admin')
  }
  if (user.role === 'STUDENT') {
    if (!student) {
      redirect('/info')
    }
    redirect('/choice')
  }
}

export default Redirect
