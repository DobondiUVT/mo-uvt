'use client'
import { Table, flexRender } from '@tanstack/react-table'

const Table = ({ table }: { table: Table<any> }) => {
  return (
    <div className='shadow-md rounded-lg border overflow-x-auto'>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
          {table.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl.id}>
              {headerEl.headers.map((element) => (
                <th
                  className="px-6 py-3 text-left cursor-pointer"
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
            <tr className='bg-white border-b' key={row.id}>
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
