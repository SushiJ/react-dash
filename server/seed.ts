import mongoose from "mongoose";
import connect from "./src/utils/database";
import {
  upsertAffiliate,
  upsertOverallStats,
  upsertProduct,
  upsertProductStat,
  upsertTransactions,
  upsertUser,
} from "./src/utils/upsert";

function upsert() {
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
}

upsert();
