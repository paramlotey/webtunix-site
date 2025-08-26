"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditDialog } from "./Edit_Dialog";

type FaqTable = {
  id: string;
  question: string;
  answer: string;
  status: boolean;
};

export const columns: ColumnDef<FaqTable>[] = [
  {
    accessorKey: "question",
    header: () => "Question",
    cell: ({ row }) => <div>{row.getValue("question")}</div>,
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => <div>{row.getValue("answer")}</div>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, table }) => {
      const status = row.getValue("status") as boolean;
      const id = row.original.id;

      return (
        <Switch
          checked={status}
          onCheckedChange={async (value) => {
            // ✅ update local table data immediately
            row.toggleSelected(false); // just to avoid warning
            (row.original as any).status = value;
            table.options.meta?.updateData?.(id, "status", value);

            // ✅ call API
            try {
              await fetch("/api/faq", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: value }),
              });
            } catch (error) {
              console.error("Failed to update FAQ status", error);
            }
          }}
        />
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex gap-2">
          <EditDialog data={data}></EditDialog>
          <Button variant={"destructive"}>
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];

export function DataTableDemo({ data }: { data: FaqTable[] }) {
  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const [tableData, setTableData] = React.useState(data);
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: (id: string, columnId: string, value: any) => {
        setTableData((old) =>
          old.map((row) =>
            row.id === id ? { ...row, [columnId]: value } : row
          )
        );
      },
    },
  });

  return (
    <div className="w-full mx-auto text-black my-10">
      <div className="overflow-hidden rounded-md border">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="whitespace-normal break-words"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
