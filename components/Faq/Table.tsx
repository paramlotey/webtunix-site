"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditDialog } from "./Edit_Dialog";
import { toast } from "sonner";

type FaqTable = {
  id: string;
  question: string;
  answer: string;
  status: boolean;
};

export function DataTableDemo({ data }: { data: FaqTable[] }) {
  const [tableData, setTableData] = React.useState(data);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const deleteFaq = async (id: string) => {
    try {
      const res = await fetch(`/api/faq`, {
        body: JSON.stringify({ id }),
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const resData = await res.json();
      if (resData.success) {
        setTableData((prev) => prev.filter((faq) => faq.id !== id));
        toast.success("FAQ deleted successfully");
      } else {
        toast.error(resData.message || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  const columns: ColumnDef<FaqTable>[] = [
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
              row.toggleSelected(false);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (row.original as any).status = value;
              table.options.meta?.updateData?.(id, "status", value);

              try {
                await fetch("/api/faq", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id, status: value }),
                });
              } catch (error: unknown) {
                console.error("Failed to update FAQ status", error);
                if (error instanceof Error) {
                  toast.error(error.message);
                } else {
                  toast.error("An unexpected error occurred");
                }
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
            <Button
              variant={"destructive"}
              onClick={() => deleteFaq(data.id)}
            >
              <Trash2 />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    meta: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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