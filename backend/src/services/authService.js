// Purpose: Authentication business logic; orchestrates signup/login and token handling.

const jwt = require("jsonwebtoken");
const config = require("../config/env");
const userRepository = require("../repositories/userRepository");
const { USER_ROLES } = require("../utils/constants");

class AuthService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async signup(userData) {
    const normalizedEmail = userData.email?.toLowerCase().trim();
    const exists = await this.userRepo.findByEmail(normalizedEmail, {
      includePassword: false,
    });
    if (exists) {
      const err = new Error("Email already in use");
      err.statusCode = 400;
      throw err;
    }

    if (!Object.values(USER_ROLES).includes(userData.role)) {
      const err = new Error("Invalid role");
      err.statusCode = 400;
      throw err;
    }

    const user = await this.userRepo.create({
      ...userData,
      email: normalizedEmail,
    });
    const token = this.generateToken(user);
    user.password = undefined;
    return { user, token };
  }

  async login({ email, password }) {
    const normalizedEmail = email?.toLowerCase().trim();
    const user = await this.userRepo.findByEmail(normalizedEmail, {
      includePassword: true,
    });
    if (!user) {
      const err = new Error("Invalid credentials or User does not exist");
      err.statusCode = 401;
      throw err;
    }
    const isMatch = await this.userRepo.comparePassword(user._id, password);
    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }
    const token = this.generateToken(user);

    user.password = undefined;
    return { user, token };
  }

  generateToken(user) {
    return jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });
  }
}

module.exports = new AuthService(userRepository);
