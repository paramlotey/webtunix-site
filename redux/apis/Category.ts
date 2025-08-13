import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
  }),
  tagTypes: ["Category"], // helps with cache invalidation
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: `api/category`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "api/category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: "api/category",
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;
