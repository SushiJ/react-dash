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
