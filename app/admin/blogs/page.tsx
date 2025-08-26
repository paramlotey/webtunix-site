import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, FilePlus } from "lucide-react";

export default function AdminBlogsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Blog Dashboard</h1>
      <p className="text-gray-600 mb-10">
        Manage, create, and update your blog content from a central dashboard.
      </p>

      <div className="flex flex-wrap justify-evenly gap-6">
        {/* Add Blog */}
        <Card className="w-full max-w-sm hover:shadow-md transition">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2 text-teal-600">
              <FilePlus className="w-6 h-6" />
              <CardTitle>Add Blog</CardTitle>
            </div>
            <CardDescription>
              Publish new blog articles to share insights, tutorials, or updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/blogs/create"
              className="text-blue-600 hover:underline text-sm"
            >
              Go to Create Blog →
            </Link>
          </CardContent>
        </Card>

        {/* Edit Blog */}
        <Card className="w-full max-w-sm hover:shadow-md transition">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2 text-teal-600">
              <Pencil className="w-6 h-6" />
              <CardTitle>Edit & Delete Blogs</CardTitle>
            </div>
            <CardDescription>
              View, update or delete your existing blog posts easily.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/blogs/edit"
              className="text-blue-600 hover:underline text-sm"
            >
              Go to Manage Blogs →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
