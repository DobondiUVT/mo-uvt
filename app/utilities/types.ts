import { Subject, Faculty } from "@prisma/client"

export type finalSubjectData = Pick<
  Subject,
  'id' | 'title' | 'description' | 'facultyId'
> & {
  faculty: Pick<Faculty, 'id' | 'abbreviation'> | null
}