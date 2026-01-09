import express from "express";
import productsRouter from "./routes/productsRoutes.js";

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

// 4) Auth middleware (simple Bearer token check)
function checkAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  if (authHeader !== "Bearer letmein") {
    return res.status(403).json({ error: "Invalid token" });
  }

  next();
}

// Parse JSON bodies
app.use(express.json());

// ====== Routes ======

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

// Public / protected demo routes
app.get("/public", (req, res) => {
  res.json({ message: "Public: anyone can access this." });
});

app.get("/protected", checkAuth, (req, res) => {
  res.json({ message: "Protected: you have access" });
});

app.get("/admin", checkAuth, (req, res) => {
  res.json({ message: "Admin: welcome, mighty one" });
});


app.use("/products", checkAuth, productsRouter);

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
