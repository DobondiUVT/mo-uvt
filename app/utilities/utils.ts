import { Role, Semester, Year } from "@prisma/client"

export function isEqualInsensitiveStrings(a: any, b: any) {
  return a.toString().toLowerCase() === b.toString().toLowerCase()
}

export const USER_ROLES: Role[] = [
  'ADMIN',
  'STUDENT',
  'EDITOR',
]

export const YEAR_OPTIONS: Year[] = [
  'ONE',
  'TWO',
  'THREE'
]

export const SEMESTER_OPTIONS: Semester[] = [
  'ONE',
  'TWO'
]
