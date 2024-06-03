import { Role, Semester, Year } from '@prisma/client'

export function isEqualInsensitiveStrings(a: any, b: any) {
  return a.toString().toLowerCase() === b.toString().toLowerCase()
}

export const USER_ROLES: Record<Role, Role> = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  EDITOR: 'EDITOR',
}

export const YEAR_OPTIONS: Record<Year, Year> = {
  ONE: 'ONE',
  TWO: 'TWO',
  THREE: 'THREE',
}

export const SEMESTER_OPTIONS: Record<Semester, Semester> = {
  ONE: 'ONE',
  TWO: 'TWO',
}

export const ENUM_TO_NUMBER: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
}

export const NUMBER_TO_ENUM: Record<number, Year> = {
  1: 'ONE',
  2: 'TWO',
  3: 'THREE',
}
