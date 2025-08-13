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
  tagTypes: ["Blogs"], // helps with cache invalidation
  endpoints: (builder) => ({
    // GET: Fetch all blogs with optional filters
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
          searchParams.append("show", show.toString()); // 🆕

        return {
          url: `api/blog?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Blogs"],
    }),

    // GET: Single blog by ID
    getSingleBlog: builder.query({
      query: ({ id }) => ({
        url: `api/blog/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [{ type: "Blogs", id: arg.id }],
    }),

    // POST: Create a new blog
    createBlog: builder.mutation({
      query: (newBlogData) => ({
        url: "api/blog",
        method: "POST",
        body: newBlogData,
      }),
      invalidatesTags: ["Blogs"],
    }),

    // PUT: Update blog details by ID
    updateBlog: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `api/blog?id=${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Blogs",
        { type: "Blogs", id: arg.id },
      ],
    }),

    // PATCH: Toggle blog `show` status
    toggleBlogVisibility: builder.mutation({
      query: (id) => ({
        url: `api/blog?id=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        "Blogs",
        { type: "Blogs", id },
      ],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useToggleBlogVisibilityMutation,
  useUpdateBlogMutation,
} = blogApi;
