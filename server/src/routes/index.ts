import { Router } from "express";
import { getUser } from "../controllers/user.controller";
import {
  getCustomers,
  getGeography,
  getProducts,
  getTransactions,
} from "../controllers/client.controller";
import { getSales } from "../controllers/sales.controller";
import { getAdmins, getAffiliate } from "../controllers/management.controller";

const router = Router();

router.get("/general/user/:id", getUser);

router.get("/client/products", getProducts);
router.get("/client/customers", getCustomers);
router.get("/client/transactions", getTransactions);
router.get("/client/geography", getGeography);

router.get("/sales", getSales);

router.get("/management/admins", getAdmins);
router.get("/management/performance/:id", getAffiliate);

export default router;
