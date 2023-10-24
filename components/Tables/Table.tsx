'use client'
import { Skeleton } from '@mantine/core'
import { Table, flexRender } from '@tanstack/react-table'

const Table = ({ table }: { table: Table<any> | null }) => {
  if (!table) {
    return (
      <div className="overflow-x-auto rounded-lg border shadow-md">
        <Skeleton height="50vh" />
      </div>
    )
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          {table.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl.id}>
              {headerEl.headers.map((element) => (
                <th
                  className="cursor-pointer px-6 py-3 text-left"
                  key={element.id}
                  colSpan={element.colSpan}
                  onClick={element.column.getToggleSortingHandler()}
                >
                  {element.isPlaceholder
                    ? null
                    : flexRender(
                        element.column.columnDef.header,
                        element.getContext(),
                      )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[element.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="border-b border-gray-200 bg-white" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="px-6 py-4" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
