import { Request, Response } from "express";
import { userModel } from "../models/User";
import { transactionsModel } from "../models/Transactions";
import { overallStatsModel } from "../models/Stats";
import { OverallStat } from "../types";

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id, { __v: 0, _id: 0 });
    if (!user) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(user);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
}

export async function getDashboardStats(_req: Request, res: Response) {
  try {
    // INFO: Gotta hard code this

    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    const transactions = await transactionsModel
      .find(
        {},
        {
          __v: 0,
          updatedAt: 0,
        }
      )
      .limit(50)
      .sort({ createdAt: -1 });

    const overallStats = await overallStatsModel.find<OverallStat>({
      year: currentYear,
    });

    if (!transactions || !overallStats) {
      res.status(200).json([]);
    }

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      dailyData,
    } = overallStats[0]!;

    const monthStat = monthlyData.find(({ month }) => month === currentMonth);
    const todayStat = dailyData.find(({ date }) => date === currentDay);

    res.status(200).json({
      monthStat,
      todayStat,
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      salesByCategory,
      transactions,
    });
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
}
