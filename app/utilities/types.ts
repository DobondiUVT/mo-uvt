import { Subject, Faculty, Group, Student, User } from "@prisma/client"

export type finalSubjectData = Pick<
  Subject,
  'id' | 'title' | 'description' | 'facultyId'
> & {
  faculty: Pick<Faculty, 'id' | 'abbreviation'> | null
}

export type finalGroupData = Pick<
  Group,
  'id' | 'title' | 'facultyId'
> & {
  faculty: Pick<Faculty, 'id' | 'abbreviation'> | null
}

export type finalStudentData = Pick<
  Student,
  'id' | 'userId' | 'facultyId'
> & {
  user: Pick<User, 'id' | 'name' | 'email'> | null
  faculty: Pick<Faculty, 'id' | 'abbreviation'> | null
  subjects: Pick<Subject, 'id' | 'abbreviation'>[] | null
}
