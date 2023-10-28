'use client'

import { Button } from '@/components/ui/button'
import { Subject } from '@prisma/client'
import { Column, ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const SortButton = ({
  column,
  title,
}: {
  column: Column<Subject>
  title: string
}) => {
  return (
    <Button
      variant="link"
      className='px-0'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

const columnArray = [
  {
    id: 'id',
    title: 'ID',
    sortable: true,
  },
  {
    id: 'title',
    title: 'Title',
    sortable: true,
  },
  {
    id: 'description',
    title: 'Description',
    sortable: false,
  },
]

const createColumnDefs = () => {
  return columnArray.map((columnItem) => {
    return {
      accessorKey: columnItem.id,
      header: ({ column }: { column: Column<Subject> }) => {
        return (
          <>
            {columnItem.sortable ? (
              <SortButton column={column} title={columnItem.title} />
            ) : (
              <div>{columnItem.title}</div>
            )}
          </>
        )
      },
    }
  })
}

const createActionCell = () => {
  return {
    id: 'actions',
    cell: ({ row }: { row: Row<Subject> }) => {
      const subject = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText((subject.id).toString())}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
}

export const columns: ColumnDef<Subject>[] = [
  ...createColumnDefs(),
  createActionCell(),
]
