"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useToggleBlogVisibilityMutation,
} from "@/redux/apis/BlogApi";
import { toast } from "sonner";
import { Pencil, Trash2, Copy, Eye, EyeClosed } from "lucide-react"; // ✅ icons

// shadcn/ui components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Blogs } from "@/lib/generated/prisma";

const BlogEditPage = () => {
  const router = useRouter();
  const {
    data: allBlogs,
    isLoading,
    isFetching,
    isError,
  } = useGetAllBlogsQuery({ limit: 30 });
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const [toggleVisibilty] = useToggleBlogVisibilityMutation();

  const [query, setQuery] = React.useState("");

  const blogs = React.useMemo(() => {
    if (!allBlogs?.data) return [];
    const list = allBlogs.data;
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter(
      (b: Blogs) =>
        (b.title && b.title.toLowerCase().includes(q)) ||
        (b.authorName && b.authorName.toLowerCase().includes(q)) ||
        (b.tags && b.tags.join(" ").toLowerCase().includes(q))
    );
  }, [allBlogs, query]);

  const handleEdit = (slug: string) => {
    router.push(`/admin/blogs/edit/${slug}`);
  };

  const handleDelete = async (slug: string) => {
    const ok = confirm(
      "Are you sure you want to delete this blog? This cannot be undone."
    );
    if (!ok) return;
    try {
      await deleteBlog({ slug }).unwrap();
      toast.success("✅ Blog deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete blog. Try again.");
    }
  };

  const handleCopy = async (slug: string) => {
    const url = window.location.origin + `/admin/blogs/${slug}`;
    await navigator.clipboard.writeText(url);
    toast.success("🔗 Blog URL copied!");
  };

  const handleShow = async (slug: string) => {
    try {
      await toggleVisibilty({ slug }).unwrap();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error?.message);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-black">Blog Management</h1>
          <p className="text-gray-600 text-lg">
            View, edit, and manage your published & draft blogs in one place.
          </p>
        </div>

        {/* Search & Actions */}
        <Card className="shadow-lg border border-gray-100">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              All Blogs
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Input
                placeholder="🔍 Search by title, author or tag..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="sm:max-w-xs shadow-sm"
              />
              <Button variant="secondary" onClick={() => setQuery("")}>
                Clear
              </Button>
              <Button onClick={() => router.push("/admin/blogs/create")}>
                + New Blog
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              {isLoading || isFetching ? (
                <div className="p-10 text-center text-gray-500 animate-pulse">
                  Loading blogs...
                </div>
              ) : isError ? (
                <div className="p-6 text-red-600 font-medium text-center">
                  Failed to load blogs.
                </div>
              ) : !blogs || blogs.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  No blogs found.
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-gray-100/80">
                    <TableRow>
                      <TableHead className="font-semibold">Title</TableHead>
                      <TableHead className="font-semibold">Author</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Created</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.map((b: Blogs) => (
                      <TableRow
                        key={b.id}
                        className="hover:bg-indigo-50/40 transition-colors"
                      >
                        <TableCell className="max-w-[36ch] truncate">
                          <span className="font-medium text-gray-900">
                            {b.title || "Untitled"}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span className="text-gray-700">
                            {b.authorName || "—"}
                          </span>
                        </TableCell>

                        <TableCell>
                          {b.show ? (
                            <Badge className="bg-green-500/90 text-white shadow-sm w-28">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="w-28">
                              Unpublished
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell className="text-sm text-gray-600">
                          {b.createdAt
                            ? new Date(b.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "—"}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center  gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleShow(b.slug)}
                              className="w-20"
                            >
                              {b.show ? (
                                <>
                                  <EyeClosed className="w-4 h-4 mr-1" />
                                  Hide
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-1" />
                                  Show
                                </>
                              )}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(b.slug)}
                            >
                              <Pencil className="w-4 h-4 mr-1" />
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(b.slug)}
                              disabled={isDeleting}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>

                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleCopy(b.slug)}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption className="text-gray-500">
                    Showing {blogs.length} blog
                    {blogs.length > 1 ? "s" : ""} out of{" "}
                    {allBlogs?.total ?? "unknown"}
                  </TableCaption>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogEditPage;
