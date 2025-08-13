"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  useDeleteEnquiryMutation,
  useGetAllContactsQuery,
} from "@/redux/apis/ContactApi";

const AdminContact = () => {
  const { data, isLoading, isError } = useGetAllContactsQuery({});
  const [deleteEnquiry, { isLoading: isDeleting }] = useDeleteEnquiryMutation();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      await deleteEnquiry({ id }).unwrap();
      toast.success("Contact deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete contact.");
      console.error("Error deleting contact:", error);
    }
  };

  if (isLoading) return <p className="p-4">Loading contacts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Failed to load contacts.</p>;

  const contacts = data?.allContactResponses ?? [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>

      {contacts.length === 0 ? (
        <p>No contact submissions found.</p>
      ) : (
        <div className="border rounded-md shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map(
                (contact: {
                  first_name: string;
                  last_name: string;
                  email: string;
                  phone: string;
                  contact_method: string;
                  message: string;
                  id: string;
                }) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      {contact.first_name} {contact.last_name}
                    </TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell className="capitalize">
                      {contact.contact_method}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {contact.message}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDelete(contact.id)}
                        disabled={isDeleting}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
