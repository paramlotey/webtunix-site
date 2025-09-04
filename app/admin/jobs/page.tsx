import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FilePlus, Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 text-black text-center">
          Jobs Dashboard
        </h1>
        <p className="text-gray-600 mb-10 text-center">
          Manage, create, and update your vacancies and categories from a
          central dashboard.
        </p>
      </div>

      <div className="flex flex-wrap justify-evenly gap-6">
        {/* Add Blog */}
        <Card className="w-full max-w-sm hover:shadow-md transition">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2 text-teal-600">
              <FilePlus className="w-6 h-6" />
              <CardTitle>Add Job</CardTitle>
            </div>
            <CardDescription>Publish new jobs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/jobs/create"
              className="text-blue-600 hover:underline text-sm"
            >
              Go to Create Jobs →
            </Link>
          </CardContent>
        </Card>

        {/* Edit Blog */}
        <Card className="w-full max-w-sm hover:shadow-md transition">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2 text-teal-600">
              <Pencil className="w-6 h-6" />
              <CardTitle>Edit & Delete Jobs</CardTitle>
            </div>
            <CardDescription>
              View, update or delete your existing job posts easily.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/jobs/edit"
              className="text-blue-600 hover:underline text-sm"
            >
              Go to Manage Jobs →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
