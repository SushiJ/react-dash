import { Request, Response } from "express";
import { productModel } from "../models/Product";
import { userModel } from "../models/User";
import { transactionsModel } from "../models/Transactions";

export async function getProducts(_req: Request, res: Response) {
  try {
    const product = await productModel
      .aggregate([
        {
          $lookup: {
            from: "productstats",
            localField: "_id",
            foreignField: "productId",
            as: "productStats",
          },
        },
        {
          $addFields: {
            productStats: {
              $arrayElemAt: ["$productStats", 0],
            },
          },
        },
        {
          $project: {
            _id: 0,
            __v: 0,
            "productStats._id": 0,
            "productStats.__v": 0,
          },
        },
      ])
      .limit(20);
    res.status(200).json(product);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
}

export async function getCustomers(_req: Request, res: Response) {
  try {
    const customers = await userModel
      .find({ role: "user" }, { __v: 0, createdAt: 0, updatedAt: 0 })
      .select("-password")
      .limit(50);

    if (!customers) {
      res.status(404).json({ message: "not found" });
      return;
    }

    res.status(200).json(customers);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

type Sort = {
  field: string;
  sort: string;
};

type formattedSort = {
  [key: string]: 1 | -1;
};

function generateSort(sort: string) {
  try {
    const parseSort: Sort = JSON.parse(sort);
    const formattedSort: formattedSort = {
      [parseSort.field]: parseSort.sort === "asc" ? 1 : -1,
    };
    return formattedSort;
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
}

export async function getTransactions(req: Request, res: Response) {
  const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
  try {
    // TODO: IDK about the "as string casting"
    const formattedSort = generateSort(sort as string);
    const searchQuery = search
      ? { cost: { $regex: new RegExp(String(search), "i") } }
      : {};

    const transactions = await transactionsModel
      .find(searchQuery)
      .sort(formattedSort)
      .skip(+page * +pageSize)
      .limit(+pageSize);

    if (!transactions) {
      res.status(404).json({ message: "not found" });
      return;
    }

    // TODO: Instead of doing a query let's do it in the front end
    // since it's not gonna change (stale data)

    // const totalCount = await transactionsModel.count(); INFO: total = 500

    res.status(200).json(transactions);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}
