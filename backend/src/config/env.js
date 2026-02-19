// Purpose: Centralize environment configuration and defaults for the API.
// TODO: Extend with other providers (Redis, mailer, object storage) as you add integrations.

require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || "7d",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};

module.exports = config;
