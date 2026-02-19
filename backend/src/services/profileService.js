const profileRepository = require("../repositories/profileRepository");
const userRepository = require("../repositories/userRepository");
const applicationRepository = require("../repositories/applicationRepository");

class ProfileService {
  async getMe(userId) {
    const [user, profile, applications] = await Promise.all([
      userRepository.findById(userId),
      profileRepository.findByUserId(userId),
      applicationRepository.findByApplicantId(userId),
    ]);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    user.password = undefined;
    return { user, profile, applications };
  }

  async upsertMe(userId, payload) {
    const { name, ...profileFields } = payload;
    const profile = await profileRepository.upsertByUserId(
      userId,
      profileFields,
    );
    const userUpdates = { isVerified: true };
    if (name) userUpdates.name = name;
    const user = await userRepository.updateById(userId, userUpdates, {
      new: true,
    });
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    user.password = undefined;
    return { user, profile };
  }
}

module.exports = new ProfileService();
