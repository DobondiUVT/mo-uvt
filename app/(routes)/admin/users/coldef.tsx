'use client'

import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { Column, ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown, Edit, Trash } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { deleteUser } from '@/actions/user'

const SortButton = ({
  column,
  title,
}: {
  column: Column<User>
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
  id: keyof User
  title: string
  sortable: boolean
}

const columnArray: ColumnArray[] = [
  {
    id: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    id: 'email',
    title: 'Email',
    sortable: true,
  },
  {
    id: 'role',
    title: 'Role',
    sortable: false,
  },
]

const createColumnDefs = () => {
  return columnArray.map((columnItem) => {
    return {
      accessorKey: columnItem.id,
      header: ({ column }: { column: Column<User> }) => {
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
      cell: ({ row }: { row: Row<User> }) => {
        return <div>{row.original[columnItem.id]?.toString()}</div>
      },
    }
  })
}

const DropdownAction = ({ user }: { user: User }) => {
  const { toast } = useToast()
  const handleDelete = async (id: number) => {
    const response = await deleteUser(id)
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
        <Link href={`/admin/users/edit/${user.id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-1 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer text-red-400 focus:bg-red-600 focus:text-zinc-100"
          onClick={(_e) => {
            handleDelete(user.id)
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
    cell: ({ row }: { row: Row<User> }) => {
      const user = row.original

      return <DropdownAction user={user} />
    },
  }
}

export const columns: ColumnDef<User>[] = [
  ...createColumnDefs(),
  createActionCell(),
]
