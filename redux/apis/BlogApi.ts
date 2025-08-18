type GetAllBlogsParams = {
  page?: number;
  limit?: number;
  tag?: string;
  category?: string;
  show?: boolean;
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: ({
        page = 1,
        limit = 10,
        tag = "",
        category = "",
        show,
      }: GetAllBlogsParams = {}) => {
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        if (tag) searchParams.append("tag", tag);
        if (category) searchParams.append("category", category);
        if (typeof show === "boolean")
          searchParams.append("show", show.toString());

        return {
          url: `api/blogs?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Blogs"],
    }),

    getSingleBlog: builder.query({
      query: ({ slug }) => ({
        url: `api/blogs/${slug}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [{ type: "Blogs", id: arg.id }],
    }),

    createBlog: builder.mutation({
      query: (newBlogData) => ({
        url: "api/blogs",
        method: "POST",
        body: newBlogData,
      }),
      invalidatesTags: ["Blogs"],
    }),

    updateBlog: builder.mutation({
      query: ({ slug, ...updateData }) => ({
        url: `api/blogs/${slug}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Blogs"],
    }),

    toggleBlogVisibility: builder.mutation({
      query: ({ slug }) => ({
        url: `api/blogs/${slug}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation<void, { slug: string }>({
      query: ({ slug }) => ({
        url: `api/blogs/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useToggleBlogVisibilityMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
