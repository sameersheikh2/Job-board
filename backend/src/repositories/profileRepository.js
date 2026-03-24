// Responsibility: DB operations for Profile entity.

const Profile = require("../models/Profile");

class ProfileRepository {
  async findByUserId(userId) {
    return Profile.findOne({ user: userId });
  }

  upsertByUserId(userId, payload) {
    return Profile.findOneAndUpdate(
      { user: userId },
      { $set: { ...payload, user: userId } },
      { returnDocument: "after", upsert: true },
    );
  }
}

module.exports = new ProfileRepository();
