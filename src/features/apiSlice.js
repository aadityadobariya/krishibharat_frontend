import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://platform.krishibharat.tech:8855/api",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    fetchCrops: builder.query({
      query: () => "/crops/",
    }),
    addCropDetails: builder.mutation({
      query: (cropDetails) => ({
        url: "/crops/",
        method: "POST",
        body: cropDetails,
      }),
    }),
    updateCrop: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/crops/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    removeCrop: builder.mutation({
      query: (id) => ({
        url: `/crops/${id}`,
        method: "DELETE",
      }),
    }),
    publishCrop: builder.mutation({
      query: (id) => ({
        url: `/crops/publish/${id}`,
        method: "POST",
      }),
    }),
    cropsCount: builder.query({
      query: () => "/crops/counts",
    }),
    publishedCrops: builder.query({
      query: () => "/crops/published",
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/users/update",
        method: "POST",
        body: userData,
      }),
    }),
    fetchProfile: builder.query({
      query: () => "/auth/profile",
    }),
    getUserData: builder.query({
      query: () => "/users/profile",
    }),
    getWalletBalance: builder.query({
      query: () => "wallat/balance",
    }),
    topUpPayment: builder.mutation({
      query: (amount) => ({
        url: "/payment/topup",
        method: "POST",
        body: amount,
      }),
    }),
    sendOrderId: builder.mutation({
      query: (order_id) => ({
        url: "/payment/success",
        method: "POST",
        body: order_id,
      }),
    }),
    paymentHistory: builder.query({
      query: () => "/payment",
    }),
    transactionHistory: builder.query({
      query: () => "/wallat",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useFetchCropsQuery,
  useAddCropDetailsMutation,
  useUpdateCropMutation,
  useRemoveCropMutation,
  usePublishCropMutation,
  useCropsCountQuery,
  usePublishedCropsQuery,
  useFetchProfileQuery,
  useUpdateUserMutation,
  useGetUserDataQuery,
  useGetWalletBalanceQuery,
  useTopUpPaymentMutation,
  useSendOrderIdMutation,
  usePaymentHistoryQuery,
  useTransactionHistoryQuery,
} = apiSlice;
