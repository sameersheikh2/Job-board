// Responsibility: All DB operations related to User entity only. Keep DB access here.

const User = require("../models/User");

class UserRepository {
  /**
   * Create a new user document.
   * @param {Object} userData - name, email, password, role.
   * @returns {Promise<Object>} created user doc
   */
  async create(userData) {
    return User.create(userData);
  }

  /**
   * Find user by email for login or uniqueness checks.
   * @param {string} email
   * @param {{ includePassword?: boolean }} options
   * @returns {Promise<Object|null>} user doc or null
   */
  async findByEmail(email, options = {}) {
    if (!email) return null;
    const cleaned = email.toLowerCase().trim();
    if (options.includePassword) {
      return User.findOne({ email: cleaned }).select("+password");
    }
    return User.findOne({ email: cleaned });
  }

  /**
   * Find user by id.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return User.findById(id);
  }

  async updateById(id, updates, options = {}) {
    return User.findByIdAndUpdate(id, updates, options);
  }

  async comparePassword(userId, plainPassword) {
    const user = await User.findById(userId).select("+password");
    if (!user) return false;
    return user.comparePassword(plainPassword);
  }
}

module.exports = new UserRepository();
