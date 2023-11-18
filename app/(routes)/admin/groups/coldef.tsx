'use client'

import { Button } from '@/components/ui/button'
import { PrismaClient, Group } from '@prisma/client'
import { Column, ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown, Edit, Trash } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { deleteGroup } from '@/actions/group'
import { getFaculty } from '@/actions/faculty'
import { finalGroupData } from '@/utilities/types'

const SortButton = ({
  column,
  title,
}: {
  column: Column<finalGroupData>
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

type ColumnArray = {
  id: keyof finalGroupData
  title: string
  sortable: boolean
}

const columnArray: ColumnArray[] = [
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
]

const createColumnDefs = () => {
  return columnArray.map((columnItem) => {
    return {
      accessorKey: columnItem.id,
      header: ({ column }: { column: Column<finalGroupData> }) => {
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
      cell: ({ row }: { row: Row<finalGroupData> }) => {
        return <div>{row.original[columnItem.id]?.toString()}</div>
      },
    }
  })
}

const createSpecialDefs = () => {
  return {
    accessorKey: 'Faculty',
    header: ({ column }: { column: Column<finalGroupData> }) => {
      return <SortButton column={column} title="Faculty" />
    },
    cell: ({ row }: { row: Row<finalGroupData> }) => {
      return <div>{row.original.faculty?.abbreviation}</div>
    },
  }
}

const DropdownAction = ({ group }: { group: finalGroupData }) => {
  const { toast } = useToast()
  const handleDelete = async (id: number) => {
    const response = await deleteGroup(id)
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
        <Link href={`/admin/groups/edit/${group.id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-1 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer text-red-400 focus:bg-red-600 focus:text-zinc-100"
          onClick={(_e) => {
            handleDelete(group.id)
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
    cell: ({ row }: { row: Row<finalGroupData> }) => {
      const group = row.original

      return <DropdownAction group={group} />
    },
  }
}

export const columns: ColumnDef<finalGroupData>[] = [
  ...createColumnDefs(),
  createSpecialDefs(),
  createActionCell(),
]
