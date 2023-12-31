import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AdminsResponse,
  CustomerResponse,
  DashboardResponse,
  GeographyResponse,
  PerformanceResponse,
  ProductsResponse,
  SalesResponse,
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
    getGeography: builder.query<GeographyResponse[], void>({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: builder.query<SalesResponse, void>({
      query: () => "sales",
      providesTags: ["Sales"],
    }),
    getAdmins: builder.query<AdminsResponse[], void>({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: builder.query<PerformanceResponse[], string>({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => "dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
