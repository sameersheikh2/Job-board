// Purpose: Application entrypoint. Load env, connect DB, register middleware/routes, and start server.
// Stateless design: no in-memory sessions; ready for horizontal scaling.

const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const config = require("./config/env");
const helmet = require("helmet");
const { logger } = require("./utils/logger");
const { apiLimiter } = require("./middleware/rateLimiter");
const { errorHandler } = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();
app.use(helmet());

app.use(express.json());

app.use(cors({ origin: config.frontendUrl, credentials: false }));
app.use(apiLimiter);
console.log("CORS configured for frontend URL:", config.frontendUrl);
// Health check
app.get("/api/health", (req, res) =>
  res.status(200).json({ success: true, message: "healthy" }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Centralized error handler
app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

// Connect to the database
connectDB().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    logger.info("Server is running", { port });
  });
});
