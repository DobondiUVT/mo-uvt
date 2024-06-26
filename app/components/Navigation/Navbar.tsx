import { getCurrentUser } from '@/actions/user'
import { getServerSession } from 'next-auth'
import Navigation from './Navigation'

const Navbar = async () => {
  const session = await getServerSession()
  let user
  if (session) {
    user = await getCurrentUser(session)
  } else {
    user = null
  }

  return <Navigation session={session} user={user} />
}

export default Navbar
