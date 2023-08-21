import { Router } from "express";
import { getUser } from "../controllers/user.controller";
import { getCustomers, getProducts } from "../controllers/client.controller";

const router = Router();

router.get("/general/user/:id", getUser);
router.get("/client/products", getProducts);
router.get("/client/customers", getCustomers);

export default router;
