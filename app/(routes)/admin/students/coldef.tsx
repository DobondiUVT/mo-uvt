'use client'

import { deleteStudent } from '@/actions/student'
import { deleteSubject } from '@/actions/subject'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { StudentData, SubjectData } from '@/utilities/types'
import { ENUM_TO_NUMBER } from '@/utilities/utils'
import { Column, ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
      accessorKey: 'Specialization',
      header: ({ column }: { column: Column<NonNullable<StudentData>> }) => {
        return <SortButton column={column} title="Specialization" />
      },
      cell: ({ row }: { row: Row<NonNullable<StudentData>> }) => {
        return <div>{row.original.specialization?.title}</div>
      },
    },
    {
      accessorKey: 'Year',
      header: ({ column }: { column: Column<NonNullable<StudentData>> }) => {
        return <SortButton column={column} title="Year" />
      },
      cell: ({ row }: { row: Row<NonNullable<StudentData>> }) => {
        return <div>{ENUM_TO_NUMBER[row.original.year]}</div>
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

const DropdownAction = ({ student }: { student: StudentData }) => {
  const { toast } = useToast()
  const handleDelete = async (id: number) => {
    const response = await deleteStudent(id)
    toast({
      variant: response.status as 'success' | 'error',
      title: response.title,
      description: response.description,
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/admin/students/edit/${student!.id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-1 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer text-red-400 focus:bg-red-600 focus:text-zinc-100"
          onClick={(_e) => {
            handleDelete(student!.id)
          }}
        >
          <Trash className="mr-1 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
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
