import { Request, Response } from "express";
import { productModel } from "../models/Product";
import { userModel } from "../models/User";

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
