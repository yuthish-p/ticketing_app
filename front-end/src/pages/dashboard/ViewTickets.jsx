import { useEffect, useMemo, useState } from 'react';
import {
  useReactTable,getCoreRowModel,
  getSortedRowModel,flexRender,
} from '@tanstack/react-table';
import axiosInstance from '../../utlis/axiosInstance';

export default function ViewTickets() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [availableStatus, setAvailableStatus] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/ticket?page=${pageIndex + 1}`);
        const { tickets = [], available_status = [], total_pages = 1 } = res.data || {};

        const enriched = tickets.map((t) => ({
          ...t,
          available_status,
        }));

        setData(enriched);
        setAvailableStatus(available_status);
        setPageCount(total_pages || 1);
      } catch (err) {
        console.error('Failed to fetch tickets', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [pageIndex]);

const updateStatus = async (id) => {
  const ticket = data.find((t) => t.id === id);
  if (!ticket) return;

  const currentIndex = availableStatus.indexOf(ticket.status);
  const nextStatus = availableStatus[currentIndex + 1];

  if (!nextStatus) {
    console.warn('No next status available');
    return;
  }

  try {
    const res = await axiosInstance.post(`/ticket/${id}`);
    if (res.status === 200) {
      setData((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: res.data.current_status,
                last_updated: res.data.last_updated,
              }
            : t
        )
      );
    }
  } catch (err) {
    console.error('Failed to update status', err);
  }
};



  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        enableSorting: true,
        cell: ({ getValue }) => {
          const fullId = getValue();
          const shortId = fullId?.slice(0, 12);
          return <span title={fullId}>{shortId}</span>;
        },
      },
      {
        header: 'Title',
        accessorKey: 'title',
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Priority',
        accessorKey: 'priority',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableSorting: true,
      },
      {
        header: 'Last Updated',
        accessorKey: 'last_updated',
        enableSorting: true,
        cell: ({ getValue }) => {
          const isoString = getValue();
          if (!isoString) return '-';

          const date = new Date(isoString);
          const pad = (n) => n.toString().padStart(2, '0');

          const year = date.getFullYear();
          const month = pad(date.getMonth() + 1);
          const day = pad(date.getDate());
          const hour = pad(date.getHours());
          const minute = pad(date.getMinutes());
          const second = pad(date.getSeconds());

          return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        },

      },
      {
        header: 'Created',
        accessorKey: 'created_at',
        enableSorting: true,
        cell: ({ getValue }) => {
          const isoString = getValue();
          if (!isoString) return '-';

          const date = new Date(isoString);
          const pad = (n) => n.toString().padStart(2, '0');

          const year = date.getFullYear();
          const month = pad(date.getMonth() + 1);
          const day = pad(date.getDate());
          const hour = pad(date.getHours());
          const minute = pad(date.getMinutes());
          const second = pad(date.getSeconds());

          return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        },

      },
      {
        header: 'Action',
        cell: ({ row }) => (
          <button
            onClick={() => updateStatus(row.original.id)}
            disabled={row.original.status === 'closed' }
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Next Status
          </button>
        ),
      },
    ],
    [availableStatus]
  );

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true, 
    state: {
      pagination: {
        pageIndex,
        pageSize: 5, 
      },
      sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const newPage = typeof updater === 'function' ? updater({ pageIndex }) : updater;
      setPageIndex(newPage.pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

 return (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-4">
      <h2 className="text-xl font-bold mb-4">Tickets</h2>

      {loading ? (
        <p className="text-gray-500">Loading tickets...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-center">No tickets found</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm md:text-base border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-3 border text-sm break-words whitespace-normal max-w-[180px] sm:max-w-[250px]"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' ▲',
                          desc: ' ▼',
                        }[header.column.getIsSorted()] ?? ''}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 border text-sm break-words whitespace-normal max-w-[180px] sm:max-w-[250px]">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 text-sm">
            <div>
              Page <span className="font-medium">{pageIndex + 1}</span> of{' '}
              <span className="font-medium">{pageCount}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={pageIndex === 0}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={pageIndex + 1 >= pageCount}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);

}
