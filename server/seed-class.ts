import { userModel } from "./src/models/User";
import { productModel } from "./src/models/Product";
import { productStatModel } from "./src/models/ProductStat";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./sample";
import {
  Affiliate,
  OverallStat,
  Product,
  ProductStat,
  Transactions,
  User,
} from "./src/types";
import { transactionsModel } from "./src/models/Transactions";
import { overallStatsModel } from "./src/models/Stats";
import { affiliateModel } from "./src/models/Affiliate";

interface Data<T> {
  save(data: T): Promise<void>;
  upsert(): Promise<void>;
  populate(): Promise<void>;
}

export class UserData implements Data<User> {
  async save(data: User) {
    await userModel.findOneAndUpdate(
      {
        email: data.email,
      },
      data,
      {
        upsert: true,
      },
    );
  }

  async upsert() {
    const user = await userModel.findOne({
      email: "kranstead0@narod.ru",
    });

    if (user) {
      console.warn("User Data already exists");
    } else {
      console.info("UPSERTING DATA");
      await this.populate();
      console.info("DONE");
    }
  }

  async populate(): Promise<void> {
    for (let userData of dataUser) {
      const user = {
        name: userData["name"],
        email: userData["email"],
        password: userData["password"],
        city: userData["city"],
        state: userData["state"],
        country: userData["country"],
        occupation: userData["occupation"],
        phoneNumber: userData["phoneNumber"],
        transactions: userData["transactions"],
        role: userData["role"],
        _id: userData["_id"],
      };
      await this.save(user);
    }
  }
}

export class ProductData implements Data<Product> {
  async save(data: Product) {
    await productModel.findOneAndUpdate(
      {
        _id: data._id,
      },
      data,
      {
        upsert: true,
      },
    );
  }

  async upsert() {
    const product = await productModel.findOne({
      _id: "63701d24f03239c72c00018e",
    });

    if (product) {
      console.warn("Product data exists");
    } else {
      console.info("Upserting product data");
      await this.populate();
      console.info("DONE");
    }
  }

  async populate() {
    for (let productData of dataProduct) {
      const product: Product = {
        name: productData["name"],
        _id: productData["_id"],
        price: productData["price"],
        rating: productData["rating"],
        supply: productData["supply"],
        category: productData["category"],
        description: productData["description"],
      };
      await this.save(product);
    }
  }
}

export class ProductStatData implements Data<ProductStat> {
  async save(data: ProductStat) {
    await productStatModel.findOneAndUpdate(
      {
        _id: data._id,
      },
      data,
      {
        upsert: true,
      },
    );
  }

  async upsert() {
    const product = await productStatModel.findOne({
      _id: "6371259df03239e680000035",
    });

    if (product) {
      console.warn("ProductStat data exists");
    } else {
      console.info("Upserting productStat data");
      await this.populate();
      console.info("DONE");
    }
  }

  async populate() {
    for (let productStat of dataProductStat) {
      const product: ProductStat = {
        _id: productStat["_id"],
        productId: productStat["productId"],
        dailyData: productStat["dailyData"],
        monthlyData: productStat["monthlyData"],
        yearlyTotalSoldUnits: productStat["yearlyTotalSoldUnits"],
        yearlySalesTotal: productStat["yearlySalesTotal"],
      };
      await this.save(product);
    }
  }
}

export class TransactionData implements Data<Transactions> {
  async save(data: Transactions) {
    await transactionsModel.findOneAndUpdate(
      {
        _id: data._id,
      },
      data,
      {
        upsert: true,
      },
    );
  }

  async upsert() {
    const transaction = await transactionsModel.findOne({
      _id: "63701d74f03239c72c000192",
    });

    if (transaction) {
      console.warn("Transactions data exists");
    } else {
      console.info("Upserting transactions data");
      await this.populate();
      console.info("DONE");
    }
  }

  async populate() {
    for (let transactions of dataTransaction) {
      const transaction: Transactions = {
        _id: transactions["_id"],
        products: transactions["products"],
        cost: transactions["cost"],
        userId: transactions["userId"],
      };
      await this.save(transaction);
    }
  }
}

export class SaveStatsData implements Data<OverallStat> {
  async save(data: OverallStat) {
    await overallStatsModel.findOneAndUpdate(
      {
        _id: data._id,
      },
      data,
      {
        upsert: true,
      },
    );
  }

  async upsert() {
    const stat = await overallStatsModel.findOne({
      _id: "636ffd4fc7195768677097d7",
    });

    if (stat) {
      console.warn("Stat data exists");
    } else {
      console.info("Upserting stat data");
      await this.populate();
      console.info("DONE");
    }
  }

  async populate() {
    for (let stat of dataOverallStat) {
      const stats: OverallStat = {
        _id: stat["_id"],
        yearlySalesTotal: stat["yearlySalesTotal"],
        salesByCategory: stat["salesByCategory"],
        year: 2021,
        dailyData: stat["dailyData"],
        monthlyData: stat["monthlyData"],
        totalCustomers: stat["totalCustomers"],
        yearlyTotalSoldUnits: stat["yearlyTotalSoldUnits"],
      };
      await this.save(stats);
    }
  }
}

export class AffiliateData implements Data<Affiliate> {
  async save(data: Affiliate): Promise<void> {
    await affiliateModel.findOneAndUpdate(
      {
        _id: data._id,
      },
      data,
      {
        upsert: true,
      },
    );
  }

  async populate() {
    for (let stat of dataAffiliateStat) {
      const stats: Affiliate = {
        _id: stat["_id"],
        userId: stat["userId"],
        affiliateSales: stat["affiliateSales"],
      };
      await this.save(stats);
    }
  }

  async upsert() {
    const stat = await affiliateModel.findOne({
      _id: "6371251df03239e680000033",
    });

    if (stat) {
      console.warn("Affiliate data exists");
    } else {
      console.info("Upserting Affiliate data");
      await this.populate();
      console.info("DONE");
    }
  }
}
