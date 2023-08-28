import { config } from "dotenv";
config();
import express, { type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connect from "./utils/database";
import {
  upsertAffiliate,
  upsertOverallStats,
  upsertProduct,
  upsertProductStat,
  upsertTransactions,
  upsertUser,
} from "./utils/upsert";
import router from "./routes";
const PORT = process.env.PORT ?? 42069;

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/check", (_req, res: Response) => {
  res.sendStatus(200);
});

app.use("/", router);

app.listen(PORT, () => {
  connect()
    .then(() => {
      console.info("CONNECTED");
      upsertUser().catch((e) => {
        console.error("Failed to upsert users", e);
      });
      upsertProduct().catch((e) => {
        console.error("Failed to upsert products", e);
      });
      upsertProductStat().catch((e) => {
        console.error("failed to upsert productStats", e);
      });
      upsertTransactions().catch((e) => {
        console.error("failed to upsert transactions", e);
      });
      upsertOverallStats().catch((e) => {
        console.error("failed to upsert stats", e);
      });
      upsertAffiliate().catch((e) => {
        console.error("failed to upsert affiliate", e);
      });
    })
    .catch((e) => {
      console.error("FAILED TO CONNECT DB", e);
    });
});
