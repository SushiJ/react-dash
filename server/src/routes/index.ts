import { Router } from "express";
import { getUser } from "../controllers/user.controller";
import {
  getCustomers,
  getGeography,
  getProducts,
  getTransactions,
} from "../controllers/client.controller";

const router = Router();

router.get("/general/user/:id", getUser);

router.get("/client/products", getProducts);
router.get("/client/customers", getCustomers);
router.get("/client/transactions", getTransactions);
router.get("/client/geography", getGeography);

export default router;
