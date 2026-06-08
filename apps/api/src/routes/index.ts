import { Router } from "express";
import productRoutes from "./product.routes";
import comparisonRoutes from "./comparison.routes";

const router = Router();

router.use("/products", productRoutes);
router.use("/comparison", comparisonRoutes);

export default router;
