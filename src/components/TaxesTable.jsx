import React, { useMemo } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import EditModal from './EditModal'
import useTaxes from '../hooks/useTaxes'

export default function TaxesTable() {
  const { taxes, countries, loading, error, isModalOpen, editingTax, openEdit, closeEdit, saveEdit, successMessage, refetch } = useTaxes()

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
      },
      {
        header: 'Country',
        accessorFn: (row) => row.country || row.countryName || row.country_code || '',
        id: 'country',
      },
      {
        header: 'Rate',
        id: 'rate',
        cell: (info) => {
          const row = info.row.original
          return row.rate ?? row.tax ?? row.taxPercentage ?? row.value ?? '—'
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: (info) => {
          return (
            <button
              onClick={() => openEdit(info.row.original)}
              aria-label={`Edit ${info.row.original.name}`}
              className="p-2 rounded hover:bg-gray-100"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-7l7 7" />
              </svg>
            </button>
          )
        },
      },
    ],
    [openEdit],
  )

  const table = useReactTable({ data: taxes || [], columns, getCoreRowModel: getCoreRowModel() })

  if (loading) return <div className="p-4">Loading…</div>
  if (error) return <div className="p-4 text-red-600">Error loading data</div>

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Taxes</h1>
      </div>

      {successMessage ? (
        <div className="mb-4 p-3 rounded border border-green-200 bg-green-50 text-green-800">
          {successMessage}
        </div>
      ) : null}

      {(!loading && taxes.length === 0) ? (
        <div className="p-8 text-center text-gray-600">
          <div className="text-xl font-semibold mb-2">No taxes found</div>
          <div className="mb-4">There are no tax entries to display. Try refreshing the list.</div>
          <div>
            <button onClick={refetch} className="px-4 py-2 rounded bg-blue-600 text-white">Refresh</button>
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className={`px-4 py-3 text-sm text-gray-600 ${header.id === 'rate' ? 'text-right' : 'text-left'}`}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={`px-4 py-3 text-sm text-gray-800 ${cell.column.id === 'rate' ? 'text-right font-mono' : ''} ${cell.column.id === 'name' || cell.column.id === 'country' ? 'max-w-[220px] truncate' : ''}`}>
                    {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onRequestClose={closeEdit}
        tax={editingTax}
        countries={countries}
        onSave={saveEdit}
      />
    </div>
  )
}
