"use client";

import { isApiError } from "@/components/Common/ApiError";
import UploadWidget from "@/components/Extra/CloudinaryWidget";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateBlogMutation } from "@/redux/apis/BlogApi";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/redux/apis/Category";
import { ChevronDown, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const QuillEditor = dynamic(() => import("@/components/Extra/QuillEditor"), {
  ssr: false,
});



const AdminBlogPage = () => {
  const [category_name, setCategory_name] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((item) => item !== categoryName)
        : [...prev, categoryName]
    );
  };

  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateCategoryMutation();
  const {
    data: allCategory,
    isLoading: categoryLoading,
    refetch,
  } = useGetCategoryQuery(undefined);
  const [deleteCateory] = useDeleteCategoryMutation();

  if (categoryLoading) return null;

  const handleSubmit = async () => {
    try {
      const result = await createBlog({
        title,
        description,
        content,
        thumbnailImg,
        images,
        tags,
        category: selectedCategories,
      }).unwrap();

      toast.success(result.message || "Blog Created");
      setTitle("");
      setDescription("");
      setThumbnailImg("");
      setContent("");
      setImages([]);
      setTags([]);
    } catch (err: unknown) {
      if (isApiError(err)) {
        toast.error(err.data?.message || "Failed to create blog");
      } else {
        toast.error("Failed to create blog");
      }
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createCategory({
        category_name,
      }).unwrap();
      refetch();
      toast.success(response.message || "Category Created");
      setCategory_name("");
    } catch (err: unknown) {
      if (isApiError(err)) {
        toast.error(err.data?.message || "Failed to create category");
      } else {
        toast.error("Failed to create category");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCateory({
        id,
      }).unwrap();

      toast.success(response.message || "Category Deleted");
      refetch();
    } catch (err: unknown) {
      if (isApiError(err)) {
        toast.error(err.data?.message || "Failed to delete category");
      } else {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div className="min-h-screen text-gray-900 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          📝 Create New Blog
        </h1>
        <div className="mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] text-black h-full max-h-3/4 overflow-auto" style={{scrollbarWidth:"none"}}>
              <form onSubmit={handleAddCategory}>
                <DialogHeader className="my-5">
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="category_name">Add New Category</Label>
                    <Input
                      id="category_name"
                      name="category_name"
                      type="text"
                      value={category_name}
                      onChange={(e) => setCategory_name(e.target.value)}
                    />
                  </div>
                </div>
                <div className="my-5 space-x-4">
                   <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Category</Button>
                </div>
                <DialogHeader className="my-5">
                  <DialogTitle>All Categories</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  {allCategory?.categories?.length > 0 ? (
                    <table className="min-w-full table-auto border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border">ID</th>
                          <th className="px-4 py-2 border">Category Name</th>
                          <th className="px-4 py-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCategory.categories.map(
                          (
                            category: { category_name: string; id: string },
                            index: number
                          ) => (
                            <tr key={index}>
                              <td className="px-4 py-2 border text-center">
                                {index + 1}
                              </td>
                              <td className="px-4 py-2 border text-center capitalize">
                                {category.category_name}
                              </td>
                              <td className="px-4 py-2 border text-center">
                                <Trash
                                  size={18}
                                  color="red"
                                  onClick={() => handleDelete(category.id)}
                                />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-red-500">No categories available.</p>
                  )}
                </div>

                <DialogFooter className="my-5">
                 
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div
          className={`bg-white p-8 rounded-lg shadow-lg space-y-6 border border-gray-200 ${
            allCategory.categories.length > 0 ? "" : "pointer-events-none"
          }`}
        >
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter blog Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block font-medium mb-1">
              Upload Thumbnail Image
            </label>
            <UploadWidget
              onUpload={(url) => {
                setThumbnailImg(url); // ✅ Directly sets thumbnail image
              }}
            />

            {thumbnailImg && (
              <>
                <Image
                  src={thumbnailImg}
                  alt="Thumbnail Preview"
                  className="mt-2 max-w-full h-auto rounded"
                  height={300}
                  width={300}
                />
                <input
                  type="text"
                  readOnly
                  value={thumbnailImg}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black"
                />
              </>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block font-medium mb-1">
              Additional Images (comma-separated)
            </label>
            <input
              type="text"
              placeholder="https://image1.jpg, https://image2.jpg"
              onChange={(e) =>
                setImages(e.target.value.split(",").map((i) => i.trim()))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. react, nextjs"
              onChange={(e) =>
                setTags(e.target.value.split(",").map((i) => i.trim()))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          {allCategory.categories.length > 0 ? (
            <div>
              <label className="block font-medium mb-1">Categories</label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full justify-between flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {selectedCategories.length > 0
                        ? selectedCategories.join(", ")
                        : "Select categories"}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-2 space-y-2"
                    align="start"
                  >
                    {allCategory.categories.map(
                      (cat: { category_name: string; id: string }) => (
                        <div
                          key={cat.id}
                          className="flex items-center space-x-2 cursor-pointer min-w-full"
                          onClick={() =>
                            handleToggleCategory(cat.category_name)
                          }
                        >
                          <Checkbox
                            id={cat.id.toString()}
                            checked={selectedCategories.includes(
                              cat.category_name
                            )}
                            onCheckedChange={() =>
                              handleToggleCategory(cat.category_name)
                            }
                          />
                          <label
                            htmlFor={cat.id.toString()}
                            className="text-sm font-medium"
                          >
                            {cat.category_name}
                          </label>
                        </div>
                      )
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ) : (
            <>
              <label className="block font-medium mb-1">Categories</label>
              <p className="text-red-500 font-bold">
                Please Add Categories First
              </p>
            </>
          )}

          {/* Editor */}
          <div>
            <label className="block font-medium mb-2">Content</label>
            <div className="border border-gray-300 rounded-md bg-white">
              <QuillEditor value={content} onChange={setContent} />
            </div>
          </div>

          {/* Submit */}
          <div className="text-right pt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Publish Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPage;