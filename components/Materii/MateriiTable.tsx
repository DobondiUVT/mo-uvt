'use client'

import { Container } from '@mantine/core'
import type { Materie } from '@prisma/client'
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

const columnHelper = createColumnHelper<Materie>()
let columns: Array<ColumnDef<Materie, any>> = []

const MateriiTable = ({ materii }: { materii: Materie[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [materiiData, setMateriiData] = useState<Materie[]>(materii)
  const keys = Object.keys(materiiData[0]) as (keyof Materie)[]

  keys.forEach((key) => {
    columns.push(
      columnHelper.accessor(key, {
        sortingFn: 'basic',
        enableSorting: true,
      }),
    )
  })
  const table = useReactTable({
    data: materiiData,
    columns,
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <Container className='py-16' size={'xl'}>
      <h1 className='text-gray-700 font-bold text-3xl mb-4'>Materii</h1>
      <Table table={table}/>
    </Container>
  )
}

export default MateriiTable
