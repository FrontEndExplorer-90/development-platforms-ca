import type { Request, Response } from "express";
import { pool } from "../db/pool.js";
import type { AuthRequest } from "../middleware/authJwt.js";

type CreateArticleBody = {
  title?: unknown;
  body?: unknown;
  category?: unknown;
};

// GET /articles (public)
export async function getArticlesController(_req: Request, res: Response) {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, body, category, submitted_by, created_at
       FROM articles
       ORDER BY created_at DESC`
    );

    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// POST /articles (protected)
export async function createArticleController(req: AuthRequest, res: Response) {
  const body = req.body as CreateArticleBody;

  if (typeof body.title !== "string" || body.title.trim().length < 3) {
    return res.status(400).json({ error: "Title must be at least 3 characters" });
  }

  if (typeof body.body !== "string" || body.body.trim().length < 10) {
    return res.status(400).json({ error: "Body must be at least 10 characters" });
  }

  if (typeof body.category !== "string" || body.category.trim().length < 2) {
    return res.status(400).json({ error: "Category must be at least 2 characters" });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const title = body.title.trim();
  const articleBody = body.body.trim();
  const category = body.category.trim();

  try {
    const [result] = await pool.query(
      `INSERT INTO articles (title, body, category, submitted_by)
       VALUES (?, ?, ?, ?)`,
      [title, articleBody, category, userId]
    );

    const insert = result as { insertId: number };

    return res.status(201).json({
      id: insert.insertId,
      title,
      body: articleBody,
      category,
      submitted_by: userId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
