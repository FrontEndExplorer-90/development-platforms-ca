import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";

type RegisterBody = {
  email?: unknown;
  password?: unknown;
};

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ REGISTER
export async function registerController(req: Request, res: Response) {
  const body = req.body as RegisterBody;

  if (typeof body.email !== "string" || !isValidEmail(body.email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  if (typeof body.password !== "string" || body.password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const email = body.email.trim().toLowerCase();
  const password = body.password;

  try {
    // Check if user already exists
    const [existingResult] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const existingRows = existingResult as Array<{ id: number }>;
    if (existingRows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Insert new user
    const [insertResult] = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, passwordHash]
    );

    const result = insertResult as { insertId: number };

    return res.status(201).json({
      id: result.insertId,
      email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ LOGIN (your logic)
export async function loginController(req: Request, res: Response) {
  const body = req.body as LoginBody;

  if (typeof body.email !== "string" || !isValidEmail(body.email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  if (typeof body.password !== "string" || body.password.length < 1) {
    return res.status(400).json({ error: "Password is required" });
  }

  const email = body.email.trim().toLowerCase();
  const password = body.password;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "JWT_SECRET is not configured" });
  }

  try {
    const [result] = await pool.query(
      "SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const rows = result as Array<{
      id: number;
      email: string;
      password_hash: string;
    }>;

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN ?? "1h" }
    );

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
