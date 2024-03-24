import { getGroups, getGroupsForStudent } from '@/actions/group'
import { getSpecializations } from '@/actions/specialization'
import { getStudent } from '@/actions/student'
import { getSubjects } from '@/actions/subject'

export type GroupData = Awaited<ReturnType<typeof getGroups>>[0]
export type GroupsStudentData = Awaited<ReturnType<typeof getGroupsForStudent>>
export type StudentData = Awaited<ReturnType<typeof getStudent>>
export type SubjectData = Awaited<ReturnType<typeof getSubjects>>[0]
export type SpecializationData = Awaited<
  ReturnType<typeof getSpecializations>
>[0]
