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

interface MonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

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

interface MonthlyDataWithId extends MonthlyData {
  _id: string;
}

export type OverallStat = {
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

export type Transactions = {
  _id: string;
  userId: string;
  cost: number;
  products: Array<string>;
};

export type Affiliate = {
  _id: string;
  userId: string;
  affiliateSales: Array<string>;
};
