import { userModel } from "../models/User";
import { productModel } from "../models/Product";
import { productStatModel } from "../models/ProductStat";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
} from "../../sample";
import { Product, ProductStat, Transactions, User } from "../types";
import { transactionsModel } from "../models/Transactions";

// TODO: Think of a better way of doing this, instead of copy pasting,
// may be a class and interface composition

async function saveUser(user: User) {
  await userModel.findOneAndUpdate(
    {
      email: user.email,
    },
    user,
    {
      upsert: true,
    }
  );
}

export async function upsertUser() {
  const user = await userModel.findOne({
    email: "kranstead0@narod.ru",
  });

  if (user) {
    console.warn("User Data already exists");
  } else {
    console.info("UPSERTING DATA");
    await populateUser();
    console.info("DONE");
  }
}

async function populateUser() {
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
    await saveUser(user);
  }
}

async function saveProduct(product: Product) {
  await productModel.findOneAndUpdate(
    {
      _id: product._id,
    },
    product,
    {
      upsert: true,
    }
  );
}

export async function upsertProduct() {
  const product = await productModel.findOne({
    _id: "63701d24f03239c72c00018e",
  });

  if (product) {
    console.warn("Product data exists");
  } else {
    console.info("Upserting product data");
    await populateProduct();
    console.info("DONE");
  }
}

async function populateProduct() {
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
    await saveProduct(product);
  }
}

async function saveProductStat(productStat: ProductStat) {
  await productStatModel.findOneAndUpdate(
    {
      _id: productStat._id,
    },
    productStat,
    {
      upsert: true,
    }
  );
}

export async function upsertProductStat() {
  const product = await productStatModel.findOne({
    _id: "6371259df03239e680000035",
  });

  if (product) {
    console.warn("ProductStat data exists");
  } else {
    console.info("Upserting productStat data");
    await populateProductStat();
    console.info("DONE");
  }
}

async function populateProductStat() {
  for (let productStat of dataProductStat) {
    const product: ProductStat = {
      _id: productStat["_id"],
      productId: productStat["productId"],
      dailyData: productStat["dailyData"],
      monthlyData: productStat["monthlyData"],
      yearlyTotalSoldUnits: productStat["yearlyTotalSoldUnits"],
      yearlySalesTotal: productStat["yearlySalesTotal"],
    };
    await saveProductStat(product);
  }
}

async function saveTransactions(transactions: Transactions) {
  await transactionsModel.findOneAndUpdate(
    {
      _id: transactions._id,
    },
    transactions,
    {
      upsert: true,
    }
  );
}

export async function upsertTransactions() {
  const product = await transactionsModel.findOne({
    _id: "6371259df03239e680000035",
  });

  if (product) {
    console.warn("Transactions data exists");
  } else {
    console.info("Upserting transactions data");
    await populateTransactions();
    console.info("DONE");
  }
}

async function populateTransactions() {
  for (let transactions of dataTransaction) {
    const transaction: Transactions = {
      _id: transactions["_id"],
      products: transactions["products"],
      cost: transactions["cost"],
      userId: transactions["userId"],
    };
    await saveTransactions(transaction);
  }
}
