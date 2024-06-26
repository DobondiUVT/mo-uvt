'use client'
import { Button } from '@/components/ui/button'
import { Column, ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown, Edit, Trash } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from '%/i18n/navigation'
import { useToast } from '@/components/ui/use-toast'
import { deleteSubject } from '@/actions/subject'
import { SubjectData } from '@/utilities/types'
import { useTranslations } from 'next-intl'
import { ENUM_TO_NUMBER } from '@/utilities/utils'

const SortButton = ({
  column,
  title,
}: {
  column: Column<SubjectData>
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
  id: keyof SubjectData
  title: string
  sortable: boolean
}

const columnArray: ColumnArray[] = [
  {
    id: 'title',
    title: 'Title',
    sortable: true,
  },
  {
    id: 'semester',
    title: 'Semester',
    sortable: true,
  },
  {
    id: 'year',
    title: 'Year',
    sortable: true,
  },
]

const createColumnDefs = () => {
  return columnArray.map((columnItem) => {
    return {
      accessorKey: columnItem.id,
      header: ({ column }: { column: Column<SubjectData> }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const t = useTranslations('Admin')
        return (
          <>
            {columnItem.sortable ? (
              <SortButton column={column} title={t(columnItem.title)} />
            ) : (
              <div>{t(columnItem.title)}</div>
            )}
          </>
        )
      },
      cell: ({ row }: { row: Row<SubjectData> }) => {
        let value = row.original[columnItem.id]?.toString()
        if (value && ['ONE', 'TWO', 'THREE'].includes(value)) {
          value = ENUM_TO_NUMBER[value].toString()
        }
        return <div>{value}</div>
      },
    }
  })
}

const createSpecialDefs = () => {
  return [
    {
      accessorKey: 'Faculty',
      header: ({ column }: { column: Column<SubjectData> }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const t = useTranslations('Admin')
        return <SortButton column={column} title={t('Faculty')} />
      },
      cell: ({ row }: { row: Row<SubjectData> }) => {
        return <div>{row.original.faculty?.abbreviation}</div>
      },
    },
    {
      accessorKey: 'Specializations',
      header: ({ column }: { column: Column<SubjectData> }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const t = useTranslations('Admin')
        return <div>{t('Specializations')}</div>
      },
      cell: ({ row }: { row: Row<SubjectData> }) => {
        return (
          <div>
            {row.original.specializations
              .map((specialization) => specialization.abbreviation)
              .join(', ')}
          </div>
        )
      },
    },
  ]
}

const DropdownAction = ({ subject }: { subject: SubjectData }) => {
  const t = useTranslations('Admin')
  const { toast } = useToast()
  const handleDelete = async (id: number) => {
    const response = await deleteSubject(id)
    toast({
      variant: response.status as 'success' | 'error',
      title: t(response.title),
      description:
        response.status == 'success'
          ? t(response.description)
          : response.description,
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
        <Link href={`/admin/subjects/edit/${subject.id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-1 h-4 w-4" />
            {t('Edit')}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer text-red-400 focus:bg-red-600 focus:text-zinc-100"
          onClick={(_e) => {
            handleDelete(subject.id)
          }}
        >
          <Trash className="mr-1 h-4 w-4" />
          {t('Delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const createActionCell = () => {
  return {
    id: 'actions',
    cell: ({ row }: { row: Row<SubjectData> }) => {
      const subject = row.original

      return <DropdownAction subject={subject} />
    },
  }
}

export const columns: ColumnDef<SubjectData>[] = [
  ...createColumnDefs(),
  ...createSpecialDefs(),
  createActionCell(),
]
