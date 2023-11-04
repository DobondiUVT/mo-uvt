import { Role } from "@prisma/client"

export function isEqualInsensitiveStrings(a: any, b: any) {
  return a.toString().toLowerCase() === b.toString().toLowerCase()
}

export const USER_ROLES: Role[] = [
  'ADMIN',
  'STUDENT',
  'EDITOR',
]
