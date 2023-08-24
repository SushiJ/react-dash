import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CustomerResponse,
  ProductsResponse,
  TransactionsResponse,
  TransactionsTypeArg,
  UserResponse,
} from "../types/api";

const BASE_URL = "http://localhost:42069";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  reducerPath: "adminAPI",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, string>({
      query: (id: string) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: builder.query<ProductsResponse[], void>({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: builder.query<CustomerResponse[], void>({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: builder.query<TransactionsResponse[], TransactionsTypeArg>(
      {
        query: ({ page, pageSize, sort, search }) => ({
          url: "client/transactions",
          method: "GET",
          params: { page, pageSize, sort, search },
        }),
        providesTags: ["Transactions"],
      }
    ),
    // getGeography: builder.query({
    //   query: () => "client/geography",
    //   providesTags: ["Geography"],
    // }),
    // getSales: builder.query({
    //   query: () => "sales/sales",
    //   providesTags: ["Sales"],
    // }),
    // getAdmins: builder.query({
    //   query: () => "management/admins",
    //   providesTags: ["Admins"],
    // }),
    // getUserPerformance: builder.query({
    //   query: (id) => `management/performance/${id}`,
    //   providesTags: ["Performance"],
    // }),
    // getDashboard: builder.query({
    //   query: () => "general/dashboard",
    //   providesTags: ["Dashboard"],
    // }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
} = api;
