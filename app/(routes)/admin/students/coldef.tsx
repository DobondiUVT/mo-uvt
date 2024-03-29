'use client'

import { Button } from '@/components/ui/button'
import { StudentData } from '@/utilities/types'
import { Column, ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

const SortButton = ({
  column,
  title,
}: {
  column: Column<NonNullable<StudentData>>
  title: string
}) => {
  return (
    <Button
      variant="link"
      className="px-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

const createSpecialDefs = () => {
  return [
    {
      accessorKey: 'User',
      header: ({ column }: { column: Column<NonNullable<StudentData>> }) => {
        return <SortButton column={column} title="Name" />
      },
      cell: ({ row }: { row: Row<NonNullable<StudentData>> }) => {
        return <div>{row.original.user?.name}</div>
      },
    },
    {
      accessorKey: 'User',
      header: ({ column }: { column: Column<NonNullable<StudentData>> }) => {
        return <SortButton column={column} title="Email" />
      },
      cell: ({ row }: { row: Row<NonNullable<StudentData>> }) => {
        return <div>{row.original.user?.email}</div>
      },
    },
    {
      accessorKey: 'Faculty',
      header: ({ column }: { column: Column<NonNullable<StudentData>> }) => {
        return <SortButton column={column} title="Faculty" />
      },
      cell: ({ row }: { row: Row<NonNullable<StudentData>> }) => {
        return <div>{row.original.faculty?.abbreviation}</div>
      },
    },
    {
      accessorKey: 'Subjects',
      header: ({ column }: { column: Column<NonNullable<StudentData>> }) => {
        return <SortButton column={column} title="Subjects" />
      },
      cell: ({ row }: { row: Row<NonNullable<StudentData>> }) => {
        return (
          <div>
            {row.original.subjects?.map((s) => s.abbreviation).join(' ')}
          </div>
        )
      },
    },
  ]
}

const DropdownAction = ({ student }: { student: NonNullable<StudentData> }) => {
  return <Link href={`/admin/students/edit/${student!.id}`}></Link>
}

const createActionCell = () => {
  return {
    id: 'actions',
    cell: ({ row }: { row: Row<NonNullable<StudentData>> }) => {
      const student = row.original

      return <DropdownAction student={student} />
    },
  }
}

export const columns: ColumnDef<NonNullable<StudentData>>[] = [
  ...createSpecialDefs(),
  createActionCell(),
]
