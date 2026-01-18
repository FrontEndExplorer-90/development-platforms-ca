import { Router } from "express";
import { requireAuth } from "../middleware/authJwt.js";
import {
  getArticlesController,
  createArticleController,
} from "../controllers/articlesController.js";

const router = Router();

router.get("/", getArticlesController);
router.post("/", requireAuth, createArticleController);

export default router;
