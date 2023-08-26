import { Request, Response } from "express";
import { overallStatsModel } from "../models/Stats";

export async function getSales(_req: Request, res: Response) {
  try {
    const stats = await overallStatsModel.find();

    if (!stats) {
      res.status(404).json({ message: "not found" });
      return;
    }
    res.status(200).json(stats[0]);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
