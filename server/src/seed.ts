import {
  UserData,
  ProductData,
  AffiliateData,
  SaveStatsData,
  ProductStatData,
  TransactionData,
} from "./seed-class";
import connect from "./utils/database";

const userData = new UserData();
const productData = new ProductData();
const affiliateData = new AffiliateData();
const saveStatsData = new SaveStatsData();
const productStatData = new ProductStatData();
const transactionData = new TransactionData();

export function seed() {
  connect()
    .then(async () => {
      await transactionData.upsert();
      await productData.upsert();
      await affiliateData.upsert();
      await saveStatsData.upsert();
      await productStatData.upsert();
      await userData.upsert();
    })
    .catch((e) => console.error(e));
}
