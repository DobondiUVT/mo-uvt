import { getGroups, getGroupsForStudent } from '@/actions/group'
import { getSpecializations } from '@/actions/specialization'
import { getStudent } from '@/actions/student'
import { getSubjects } from '@/actions/subject'
import { ColumnDef } from '@tanstack/react-table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
}

export type GroupData = Awaited<ReturnType<typeof getGroups>>[0]
export type GroupsStudentData = Awaited<ReturnType<typeof getGroupsForStudent>>
export type StudentData = Awaited<ReturnType<typeof getStudent>>
export type SubjectsData = Awaited<ReturnType<typeof getSubjects>>
export type SubjectData = SubjectsData[0]
export type SpecializationData = Awaited<
  ReturnType<typeof getSpecializations>
>[0]
