import type { Product } from "./product.js";

// Input types (what the client is allowed to send)
export type CreateProductInput = Omit<Product, "id">; // name + price
export type UpdateProductPutInput = Omit<Product, "id">; // name + price (required)
export type UpdateProductPatchInput = Partial<Omit<Product, "id">>; // name/price optional
