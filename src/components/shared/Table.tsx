import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryParameter } from '../../hooks/usePageQuery';
import { divideAndRoundUp } from '../../utils/utils';
import TableSearch from '../../containers/public/TableSearch';

interface DataTableProps<T> {
  showPagination?: boolean,
  showSearch?: boolean,
  data: T[];
  totalCount: number;
  columns: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onChangePage: (page: string) => void;
  onSearch: (event: string) => void;


  search?: string
}

export function DataTable<T>({ showPagination = true, showSearch = true, data, totalCount, columns, onChangePage, onSearch, search }: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { paramValue: currentPage, updateQueryParameter: updatePageQuery } = useQueryParameter(
    'page',
    (value) => onChangePage(value || '1') // Default to page 1 if no value
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const totalPage = divideAndRoundUp(totalCount);

  return (
    <div className="w-full bg-white">
      <div className="rounded-md">
        {showSearch && <div>
          <TableSearch onChange={onSearch} search={search} />
        </div>}

        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    onClick={header.column.getToggleSortingHandler?.()} // 👈 Add this
                  >
                    {header.isPlaceholder
                      ? null
                      : (
                        <div className="flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: '↓',
                            desc: '↑',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="group hover:bg-gray-50 border-none transition-colors duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-2 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        showPagination &&
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updatePageQuery((parseInt(currentPage || '1', 10) - 1).toString())}
              className="p-1 rounded-md disabled:opacity-50"
              disabled={parseInt(currentPage || '1', 10) <= 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => updatePageQuery((parseInt(currentPage || '1', 10) + 1).toString())}
              className="p-1 rounded-md disabled:opacity-50"
              disabled={parseInt(currentPage || '1', 10) >= totalPage}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {Math.min(parseInt(currentPage || '1', 10), totalPage)} of {totalPage}
            </span>
          </div>
        </div>
      }
    </div>
  );
}
