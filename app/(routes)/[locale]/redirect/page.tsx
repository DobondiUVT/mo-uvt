import { redirect } from '%/i18n/navigation'
import { getAuthInfo } from '@/actions/auth'

const Redirect = async () => {
  const { user, student } = await getAuthInfo()
  if (!user) {
    redirect('/')
    return
  }
  if (['ADMIN', 'EDITOR'].includes(user.role)) {
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
