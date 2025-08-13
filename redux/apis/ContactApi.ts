import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
  }),
  tagTypes: ["Contact"], // helps with cache invalidation
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => ({
        url: `api/contact`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),

    getSingleContact: builder.query({
      query: ({ id }) => ({
        url: `api/contact/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [{ type: "Contact", id: arg.id }],
    }),

    createEnquiry: builder.mutation({
      query: (newEnquiry) => ({
        url: "api/contact",
        method: "POST",
        body: newEnquiry,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteEnquiry: builder.mutation({
      query: ({ id }) => ({
        url: `api/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Contact",
        { type: "Contact", id: arg.id },
      ],
    }),
  }),
});

export const {
  useCreateEnquiryMutation,
  useDeleteEnquiryMutation,
  useGetAllContactsQuery,
  useGetSingleContactQuery,
} = contactApi;
