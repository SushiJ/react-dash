import { DailyData, MonthlyData, ProductStat } from "./shared";

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

export type GeographyResponse = {
  id: string;
  value: number;
};

interface MonthlyDataWithId extends MonthlyData {
  _id: string;
}

export type SalesResponse = {
  _id: string;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: Array<MonthlyDataWithId>;
  dailyData: Array<DailyData>;
  salesByCategory: {
    shoes: number;
    clothing: number;
    accessories: number;
    misc: number;
  };
};

export type AdminsResponse = {
  _id: string;
  city: string;
  country: string;
  createdAt: string;
  email: string;
  name: string;
  occupation: string;
  phoneNumber: string;
  role: string;
  state: null;
  transactions: Array<string>;
  updatedAt: string;
};

export type PerformanceResponse = {
  _id: string;
  cost: number;
  createdAt: string;
  products: Array<string>;
  updatedAt: string;
  userId: string;
};

export type DashboardResponse = {
  monthStat: MonthlyData;
  salesByCategory: Pick<SalesResponse, "salesByCategory">;
  todayStat: DailyData;
  totalCustomers: number;
  transactions: Array<TransactionsResponse>;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
};
