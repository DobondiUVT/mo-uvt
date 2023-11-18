import { Subject, Faculty, Group } from "@prisma/client"

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
