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
