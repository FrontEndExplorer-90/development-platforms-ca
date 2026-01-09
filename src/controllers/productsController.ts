import type { Request, Response } from "express";
import type {
  CreateProductInput,
  UpdateProductPutInput,
  UpdateProductPatchInput,
} from "../types/productInput.js";
import {
  validateCreateProductInput,
  validatePutProductInput,
  validatePatchProductInput,
} from "../validators/productValidators.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductPut,
  updateProductPatch,
  deleteProductById,
} from "../services/productService.js";

// GET /products
export function getProducts(req: Request, res: Response) {
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const search =
    typeof req.query.search === "string" ? req.query.search : undefined;

  if (req.query.maxPrice && Number.isNaN(maxPrice)) {
    return res.status(400).json({ error: "maxPrice must be a number" });
  }

  const result = getAllProducts({ maxPrice, search });
  res.json(result);
}

// GET /products/:id
export function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const product = getProductById(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

// POST /products
export function createProductController(req: Request, res: Response) {
  const body = req.body as Partial<CreateProductInput>;

  const validation = validateCreateProductInput(body);
  if (!validation.ok) {
    return res.status(validation.status).json({ error: validation.error });
  }

  const { name, price } = body;
  const newProduct = createProduct({ name, price });

  res.status(201).json(newProduct);
}

// PUT /products/:id
export function updateProductPutController(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const body = req.body as Partial<UpdateProductPutInput>;

  const validation = validatePutProductInput(body);
  if (!validation.ok) {
    return res.status(validation.status).json({ error: validation.error });
  }

  const { name, price } = body;
  const updated = updateProductPut(id, { name, price });

  if (!updated) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(updated);
}

// PATCH /products/:id
export function updateProductPatchController(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const body = req.body as UpdateProductPatchInput;

  const validation = validatePatchProductInput(body);
  if (!validation.ok) {
    return res.status(validation.status).json({ error: validation.error });
  }

  const { name, price } = body;
  const updated = updateProductPatch(id, { name, price });

  if (!updated) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(updated);
}

export function deleteProductController(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const deleted = deleteProductById(id);

  if (!deleted) {
    return res.status(404).json({ error: "Product not found" });
  }

  // 204 = success, no body
  return res.status(204).send();
}
