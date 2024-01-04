import { Request, Response } from "express";
import { productModel } from "../models/Product";
import { userModel } from "../models/User";
import { transactionsModel } from "../models/Transactions";
import { getCountryISO3 } from "../utils/getISOmapping";

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
  field: "userId" | "cost";
  sort: "asc" | "desc";
};
type formattedSort = {
  [key: string]: 1 | -1;
};

function generateSort(unparsed: any) {
  try {
    const { sort } = JSON.parse(unparsed);
    if (sort) {
      const flattened: Sort = {
        field: sort[0]?.field,
        sort: sort[0]?.sort,
      };

      const formattedSort: formattedSort = {
        [flattened.field]: flattened.sort === "asc" ? 1 : -1,
      };

      return formattedSort;
    }
    return null;
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
}

export async function getTransactions(req: Request, res: Response) {
  const { page = 1, pageSize = 20, sort = {}, search = "" } = req.query;
  try {
    const formattedSort = generateSort(sort);

    // WARN:This is insane IKR
    const searchQuery = search
      ? {
        $or: [
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$cost" },
                regex: search,
                options: "i",
              },
            },
          },
        ],
        userId: { $regex: new RegExp(String(search), "i") },
      }
      : {};

    const transactions = await transactionsModel
      .find(searchQuery)
      .sort(formattedSort ? formattedSort : {})
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

export async function getGeography(_req: Request, res: Response) {
  try {
    const countries = await userModel.find(
      {},
      {
        country: 1,
        _id: 0,
      },
    );

    let countryISO: Record<string, number> = {};

    for (let { country } of countries) {
      if (!country) continue;
      if (!countryISO[country]) countryISO[country] = 1;
      else countryISO[country] += 1;
    }

    let country = [];

    for (let [k, v] of Object.entries(countryISO)) {
      let isoCountry = getCountryISO3(k);
      country.push({ id: isoCountry, value: v });
    }

    res.status(200).json(country);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
