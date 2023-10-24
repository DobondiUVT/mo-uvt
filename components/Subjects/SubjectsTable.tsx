'use client'

import type { Subject } from '@prisma/client'
import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import Table from '../Tables/Table'

const columnHelper = createColumnHelper<Subject>()
let columns: Array<ColumnDef<Subject, any>> = []

const SubjectsTable = ({ subjects }: { subjects: Subject[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [subjectsData, setSubjectsData] = useState<Subject[]>(subjects)
  const keys = Object.keys(subjectsData[0] ?? []) as (keyof Subject)[]

  keys.forEach((key) => {
    columns.push(
      columnHelper.accessor(key, {
        sortingFn: 'basic',
        enableSorting: true,
      }),
    )
  })
  const table = useReactTable({
    data: subjectsData,
    columns,
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return <Table table={table} />
}

export default SubjectsTable
