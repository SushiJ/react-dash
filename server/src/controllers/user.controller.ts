import { Request, Response } from "express";
import { userModel } from "../models/User";

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
