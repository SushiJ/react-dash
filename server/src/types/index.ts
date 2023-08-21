export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string | null;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: string;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
};

type MonthlyData = {
  month: string;
  totalSales: number;
  totalUnits: number;
};

type DailyData = {
  date: string;
  totalSales: number;
  totalUnits: number;
};

export type ProductStat = {
  _id: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  monthlyData: Array<MonthlyData>;
  dailyData: Array<DailyData>;
};
export type Transactions = {
  _id: string;
  userId: string;
  cost: number;
  products: Array<string>;
};
