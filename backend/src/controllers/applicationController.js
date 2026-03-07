const applicationService = require("../services/applicationService");
const { successResponse } = require("../utils/apiResponse");

class ApplicationController {
  async applyToJob(req, res, next) {
    const applicantId = req.user.id;
    const jobId = req.params.jobId;

    try {
      const application = await applicationService.applyToJob(
        jobId,
        applicantId,
      );
      return successResponse(
        res,
        { application },
        "Application submitted successfully",
        201,
      );
    } catch (error) {
      error.statusCode = error.message === "Already applied" ? 409 : 400;
      return next(error);
    }
  }

  async getUserApplications(req, res, next) {
    const applicantId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 25, 100);
    const skip = (page - 1) * limit;

    try {
      const { applications, total } =
        await applicationService.getUserApplications(applicantId, {
          skip,
          limit,
        });
      return successResponse(res, {
        applications,
        totalApplications: total,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getJobApplications(req, res, next) {
    const jobId = req.params.jobId;
    const filters = req.query;
    const recruiterId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 25, 50);
    const skip = (page - 1) * limit;
    const pagination = { limit, skip };

    try {
      const applications = await applicationService.getJobApplications(
        jobId,
        recruiterId,
        filters,
        pagination,
      );
      return successResponse(res, { applications });
    } catch (error) {
      return next(error);
    }
  }

  async updateStatus(req, res, next) {
    const status = req.body.status;
    const recruiterId = req.user.id;
    const { jobId, applicantId } = req.params;
    try {
      const updatedApplication = await applicationService.updateStatus(
        applicantId,
        recruiterId,
        jobId,
        status,
      );
      return successResponse(
        res,
        { application: updatedApplication },
        "Application status updated successfully",
      );
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new ApplicationController();
