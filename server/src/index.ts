import { config } from "dotenv";
config();
import express, { type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connect from "./utils/database";
import { upsertData } from "./utils/upsert";
import router from "./routes/general.route";
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

app.use("/general", router);

app.listen(PORT, () => {
  connect()
    .then(() => {
      console.info("CONNECTED");
      console.log(`http:localhost:${PORT}`);
      upsertData().catch((e) => {
        console.error("FAILED UPSERT DATA", e);
      });
    })
    .catch((e) => {
      console.error("FAILED TO CONNECT DB", e);
    });
});
