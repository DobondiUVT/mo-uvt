'use client'

import { ColumnDef, Row } from '@tanstack/react-table'
import { FileStudent } from './page'

const createSpecialDefs = () => {
  return [
    {
      accessorKey: 'sn',
      header: () => {
        return <div>SN</div>
      },
      cell: ({ row }: { row: Row<NonNullable<FileStudent>> }) => {
        return <div>{row.original.sn}</div>
      },
    },
    {
      accessorKey: 'name',
      header: () => {
        return <div>Name</div>
      },
      cell: ({ row }: { row: Row<NonNullable<FileStudent>> }) => {
        return <div>{row.original.name}</div>
      },
    },
    {
      accessorKey: 'email',
      header: () => {
        return <div>Email</div>
      },
      cell: ({ row }: { row: Row<NonNullable<FileStudent>> }) => {
        return <div>{row.original.email}</div>
      },
    },
    {
      accessorKey: 'faculty',
      header: () => {
        return <div>Faculty</div>
      },
      cell: ({ row }: { row: Row<NonNullable<FileStudent>> }) => {
        return <div>{row.original.faculty}</div>
      },
    },
    {
      accessorKey: 'specialization',
      header: () => {
        return <div>Specialization</div>
      },
      cell: ({ row }: { row: Row<NonNullable<FileStudent>> }) => {
        return <div>{row.original.specialization}</div>
      },
    },
  ]
}

export const columns: ColumnDef<NonNullable<FileStudent>>[] = [
  ...createSpecialDefs(),
]
