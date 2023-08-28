import { Request, Response } from "express";
import { userModel } from "../models/User";

export async function getAdmins(_req: Request, res: Response) {
  try {
    const admins = await userModel
      .find({ role: "admin", __v: 0 })
      .select("-password");

    if (!admins) {
      res.status(200).json([]);
    }

    res.status(200).json(admins);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

export async function getAffiliate(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const transactions = await userModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "affiliates",
          localField: "_id",
          foreignField: "userId",
          as: "sales",
        },
      },
      {
        $unwind: "$sales",
      },
      {
        $project: {
          _id: 0,
          affiliateSales: "$sales.affiliateSales",
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "affiliateSales",
          foreignField: "_id",
          as: "transactions",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const flattenedTransactions = transactions[0].transactions;

    res.status(200).json(flattenedTransactions);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
