import { products } from "../data/products.js";
import type { Product } from "../types/product.js";
import type {
  CreateProductInput,
  UpdateProductPutInput,
  UpdateProductPatchInput,
} from "../types/productInput.js";

export function getAllProducts(query: {
  maxPrice?: number;
  search?: string;
}): Product[] {
  const { maxPrice, search } = query;

  let result = products;

  if (typeof maxPrice === "number") {
    result = result.filter((p) => p.price <= maxPrice);
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(term));
  }

  return result;
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function createProduct(input: CreateProductInput): Product {
  const nextId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct: Product = { id: nextId, ...input };
  products.push(newProduct);

  return newProduct;
}

export function updateProductPut(id: number, input: UpdateProductPutInput): Product | undefined {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  const updated: Product = { id, ...input };
  products[index] = updated;

  return updated;
}

export function updateProductPatch(
  id: number,
  input: UpdateProductPatchInput
): Product | undefined {
  const product = products.find((p) => p.id === id);
  if (!product) return undefined;

  if (input.name !== undefined) product.name = input.name;
  if (input.price !== undefined) product.price = input.price;

  return product;
}

export function deleteProductById(id: number): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  return true;
}
