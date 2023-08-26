export type User = {
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
  transactions: string[];
  updatedAt: string;
};

export type NavbarProps = {
  user: User | undefined;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SidebarProps = {
  user: User | undefined;
  drawerWidth: string;
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DailyData = {
  date: string;
  totalSales: string;
  totalUnits: string;
};

export interface MonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

export type ProductStat = {
  dailyData: Array<DailyData>;
  monthlyData: Array<MonthlyData>;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
};
