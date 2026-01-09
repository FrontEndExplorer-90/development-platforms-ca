import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProductController,
  updateProductPutController,
  updateProductPatchController,
  deleteProductController,
} from "../controllers/productsController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProductController);
router.put("/:id", updateProductPutController);
router.patch("/:id", updateProductPatchController);
router.delete("/:id", deleteProductController);

export default router;
