import "dotenv/config";
import express from "express";
import productsRouter from "./routes/productsRoutes.js";
import { pool } from "./db/pool.js";
import authRouter from "./routes/authRoutes.js";
import articlesRouter from "./routes/articlesRoutes.js";


type ApiError = {
  status?: number;
  message: string;
};

const app = express();
const PORT = 3000;

// ====== Global middleware ======

// 1) Request counter middleware (adds X-Request-Count)
let requestCount = 0;
app.use((req, res, next) => {
  requestCount += 1;
  res.setHeader("X-Request-Count", String(requestCount));
  next();
});

// 2) Logging middleware (timestamp + method + url)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// 3) Timing middleware (how long each request takes)
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });

  next();
});


// Parse JSON bodies
app.use(express.json());

// ====== Routes ======

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.get("/health/db", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: true, rows });
  } catch (err) {
    next(err);
  }
});

app.get("/debug/db", async (req, res) => {
  const [rows] = await pool.query("SELECT DATABASE() AS db");
  res.json(rows);
});

app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/articles", articlesRouter);


// ====== 404 handler ======
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// ====== Error handler ======
app.use(
  (
    err: unknown,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const fallback: ApiError = { status: 500, message: "Internal server error" };

    if (err && typeof err === "object" && "message" in err) {
      return res.status(500).json({
        error:
          typeof (err as any).message === "string"
            ? (err as any).message
            : fallback.message,
      });
    }

    return res.status(fallback.status).json({ error: fallback.message });
  }
);

// ====== Server start ======
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


