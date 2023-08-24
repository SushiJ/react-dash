import { ProductStat } from "./shared";

export type ProductsResponse = {
  category: string;
  description: string;
  name: string;
  price: number;
  rating: number;
  supply: number;
  productStats: ProductStat;
};

export type UserResponse = {
  email: string;
  city: string;
  country: string;
  createdAt: string;
  name: string;
  occupation: string;
  password: string;
  phoneNumber: string;
  role: string;
  state: null;
  transactions: Array<string>;
  updatedAt: string;
};

export type CustomerResponse = {
  _id: string;
  city: string;
  country: string;
  email: string;
  name: string;
  occupation: string;
  phoneNumber: string;
  state: null;
  transactions: Array<string>;
  role: string;
};

export type TransactionsResponse = {
  _id: string;
  userId: string;
  cost: number;
  products: Array<string>;
};

export type TransactionsTypeArg = {
  page: number;
  pageSize: number;
  sort: string;
  search: string;
};
