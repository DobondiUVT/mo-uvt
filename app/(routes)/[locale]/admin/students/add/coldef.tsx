'use client'

import { ColumnDef, Row } from '@tanstack/react-table'
import { FileStudent } from './page'
import { useTranslations } from 'next-intl'

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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const t = useTranslations('Admin')
        return <div>{t('Name')}</div>
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const t = useTranslations('Admin')
        return <div>Faculty</div>
      },
      cell: ({ row }: { row: Row<NonNullable<FileStudent>> }) => {
        return <div>{row.original.faculty}</div>
      },
    },
    {
      accessorKey: 'specialization',
      header: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const t = useTranslations('Admin')
        return <div>{t('Specialization')}</div>
      },
      cell: ({ row }: { row: Row<NonNullable<FileStudent>> }) => {
        return <div>{row.original.specialization}</div>
      },
    },
    {
      accessorKey: 'year',
      header: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const t = useTranslations('Admin')
        return <div>{t('Year')}</div>
      },
      cell: ({ row }: { row: Row<NonNullable<FileStudent>> }) => {
        return <div>{row.original.year}</div>
      },
    },
  ]
}

export const columns: ColumnDef<NonNullable<FileStudent>>[] = [
  ...createSpecialDefs(),
]
