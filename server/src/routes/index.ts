import { Router } from "express";
import { getUser } from "../controllers/user.controller";
import {
  getCustomers,
  getGeography,
  getProducts,
  getTransactions,
} from "../controllers/client.controller";
import { getSales } from "../controllers/sales.controller";

const router = Router();

router.get("/general/user/:id", getUser);

router.get("/client/products", getProducts);
router.get("/client/customers", getCustomers);
router.get("/client/transactions", getTransactions);
router.get("/client/geography", getGeography);

router.get("/sales", getSales);

export default router;
