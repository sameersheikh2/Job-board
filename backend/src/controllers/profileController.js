const profileService = require("../services/profileService");
const { successResponse } = require("../utils/apiResponse");

class ProfileController {
  async getMe(req, res, next) {
    try {
      const data = await profileService.getMe(req.user.id);
      return successResponse(res, data, "Profile fetched");
    } catch (err) {
      next(err);
    }
  }

  async upsertMe(req, res, next) {
    try {
      const data = await profileService.upsertMe(req.user.id, req.body);
      return successResponse(res, data, "Profile updated");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProfileController();
