import type {
  CreateProductInput,
  UpdateProductPutInput,
  UpdateProductPatchInput,
} from "../types/productInput.js";

type ValidationResult =
  | { ok: true }
  | { ok: false; status: 400; error: string };

// Validate POST body (name + price required)
export function validateCreateProductInput(
  body: Partial<CreateProductInput>
): ValidationResult {
  const { name, price } = body;

  if (!name || typeof name !== "string") {
    return { ok: false, status: 400, error: "name is required and must be a string" };
  }

  if (price === undefined || typeof price !== "number" || Number.isNaN(price)) {
    return { ok: false, status: 400, error: "price is required and must be a number" };
  }

  return { ok: true };
}

// Validate PUT body (name + price required)
export function validatePutProductInput(
  body: Partial<UpdateProductPutInput>
): ValidationResult {
  const { name, price } = body;

  if (!name || typeof name !== "string") {
    return { ok: false, status: 400, error: "name is required and must be a string" };
  }

  if (price === undefined || typeof price !== "number" || Number.isNaN(price)) {
    return { ok: false, status: 400, error: "price is required and must be a number" };
  }

  return { ok: true };
}

// Validate PATCH body (name/price optional, but if provided must be valid)
export function validatePatchProductInput(
  body: UpdateProductPatchInput
): ValidationResult {
  const { name, price } = body;

  if (name !== undefined && typeof name !== "string") {
    return { ok: false, status: 400, error: "name must be a string" };
  }

  if (price !== undefined && (typeof price !== "number" || Number.isNaN(price))) {
    return { ok: false, status: 400, error: "price must be a number" };
  }

  // Optional extra rule: PATCH must include at least one field
  if (name === undefined && price === undefined) {
    return { ok: false, status: 400, error: "Provide at least one field to update" };
  }

  return { ok: true };
}
