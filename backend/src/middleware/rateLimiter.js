// Purpose: Basic rate limiting to mitigate brute force/abuse.
// TODO: Switch to a shared store (Redis/Memcached) when running multiple instances.

const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many auth attempts, please try later.",
  },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: { success: false, message: "Too many requests, please try later." },
});

module.exports = { authLimiter, apiLimiter };
