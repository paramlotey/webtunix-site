import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    adminSignup: builder.mutation({
      query: (body) => ({
        url: `api/admin/signup`,
        body,
        method: "POST",
      }),
    }),
    adminLogin: builder.mutation({
      query: (body) => ({
        url: `api/admin/login`,
        body,
        method: "POST",
      }),
    }),
    adminAuth: builder.query({
      query: () => ({
        url: `api/admin/auth/refresh`,
        method: "GET",
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `api/admin/auth/logout`,
        method: "POST",
      }),
    }),
    adminVerify: builder.mutation({
      query: ({ body }) => ({
        url: `api/admin/signup`,
        method: "PATCH",
        body,
      }),
    }),
    adminResetPassword: builder.mutation({
      query: ({ body }) => ({
        url: `api/admin/signup`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminAuthQuery,
  useAdminLogoutMutation,
  useAdminResetPasswordMutation,
  useAdminVerifyMutation,
  useAdminSignupMutation,
} = adminApi;
