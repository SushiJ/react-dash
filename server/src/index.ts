import { config } from "dotenv";
config();
import express, { type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connect from "./utils/database";
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
    .then(() => console.info("CONNECTED"))
    .catch((e) => console.error("FAILED TO CONNECT DB", e));
});
