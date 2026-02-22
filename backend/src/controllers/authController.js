// Responsibility: Translate HTTP requests to authService calls.

const authService = require("../services/authService");
const { successResponse } = require("../utils/apiResponse");

class AuthController {
  async signup(req, res, next) {
    try {
      const result = await authService.signup(req.body);
      return successResponse(res, result, "User created", 201);
    } catch (err) {
      next(err); // Controllers should use next(err) to reach the centralized error handler
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      const { token } = result;
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24, // 1 days
      });
      return successResponse(res, result, "Login successful");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
