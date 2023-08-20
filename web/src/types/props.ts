import { ProductStat } from "./shared";

export type ProductProps = {
  category: string;
  description: string;
  name: string;
  price: number;
  rating: number;
  supply: number;
  productStats: ProductStat;
};
