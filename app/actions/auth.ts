import { getServerSession } from "next-auth"
import { getCurrentUser } from "./user"
import { getStudent } from "./student"

export async function getAuthInfo() {
  const session = await getServerSession()
  const user = session ? await getCurrentUser(session) : null
  const student = user ? await getStudent(user.id) : null
  return { session, user, student }
}