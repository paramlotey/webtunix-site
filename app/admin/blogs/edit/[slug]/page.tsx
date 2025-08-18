"use client";

import UploadWidget from "@/components/Extra/CloudinaryWidget";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { useGetCategoryQuery } from "@/redux/apis/Category";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/apis/BlogApi";
import { isApiError } from "@/components/Common/ApiError";

const QuillEditor = dynamic(() => import("@/components/Extra/QuillEditor"), {
  ssr: false,
});

const SingleBlogEdit = () => {
  const { slug } = useParams();
  const { data: blogData, isLoading: blogLoading } = useGetSingleBlogQuery({
    slug,
  });

  const { data: allCategory, isLoading: categoryLoading } =
    useGetCategoryQuery(undefined);

  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  // Prefill state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Populate form when blog data loads
  useEffect(() => {
    if (blogData?.data) {
      setTitle(blogData.data.title || "");
      setDescription(blogData.data.description || "");
      setContent(blogData.data.content || "");
      setThumbnailImg(blogData.data.thumbnailImg || "");
      setImages(blogData.data.images || []);
      setTags(blogData.data.tags || []);
      setSelectedCategories(blogData.data.category || []);
    }
  }, [blogData]);

  const handleToggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((item) => item !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleUpdate = async () => {
    try {
      const result = await updateBlog({
        slug,
        title,
        description,
        content,
        thumbnailImg,
        images,
        tags,
        category: selectedCategories,
      }).unwrap();

      toast.success(result.message || "Blog Updated Successfully");
    } catch (err: unknown) {
      if (isApiError(err)) {
        toast.error(err.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    }
  };

  if (blogLoading || categoryLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen text-gray-900 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          ✏️ Edit Blog
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 border border-gray-200">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
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
                setThumbnailImg(url);
              }}
            />

            {thumbnailImg && (
              <>
                <img
                  src={thumbnailImg}
                  alt="Thumbnail Preview"
                  className="mt-2 max-w-full h-auto rounded"
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
              value={images.join(", ")}
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
              value={tags.join(", ")}
              onChange={(e) =>
                setTags(e.target.value.split(",").map((i) => i.trim()))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          {allCategory?.categories?.length > 0 ? (
            <div>
              <label className="block font-medium mb-1">Categories</label>
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
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2 space-y-2">
                  {allCategory.categories.map(
                    (cat: { category_name: string; id: string }) => (
                      <div
                        key={cat.id}
                        className="flex items-center space-x-2 cursor-pointer min-w-full"
                        onClick={() => handleToggleCategory(cat.category_name)}
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
          ) : (
            <p className="text-red-500 font-bold">No categories available</p>
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
              onClick={handleUpdate}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogEdit;
