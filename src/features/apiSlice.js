import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://platform.krishibharat.site:8855/api",
  // baseUrl:
  //   "https://5e25-2401-4900-8815-d21d-909c-f82a-8c06-dcca.ngrok-free.app/api",
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
    getCropById: builder.query({
      query: (id) => `/crops/getcropById/${id}`,
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
    getContracts: builder.query({
      query: () => "/contracts",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useFetchCropsQuery,
  useGetCropByIdQuery,
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
  useGetContractsQuery,
} = apiSlice;
