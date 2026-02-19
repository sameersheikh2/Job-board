// Responsibility: Define auth-related HTTP endpoints.

const router = require("express").Router();
const authController = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../middleware/validation");
const { authLimiter } = require("../middleware/rateLimiter");

// Public routes
router.post("/signup", authLimiter, validateSignup, authController.signup);
router.post("/login", authLimiter, validateLogin, authController.login);

module.exports = router;
