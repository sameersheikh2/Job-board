const applicationService = require("../services/applicationService");

class ApplicationController {
  async applyToJob(req, res) {
    const applicantId = req.user.id;
    const jobId = req.params.jobId;

    try {
      const application = await applicationService.applyToJob(
        jobId,
        applicantId,
      );
      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        data: { application },
      });
    } catch (error) {
      const statusCode = error.message === "Already applied" ? 409 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserApplications(req, res) {
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
      res.status(200).json({
        success: true,
        data: {
          applications,
          totalApplications: total,
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getJobApplications(req, res) {
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
      res.status(200).json({
        success: true,
        data: { applications },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateStatus(req, res) {
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
      res.status(200).json({
        success: true,
        message: "Application status updated successfully",
        data: { application: updatedApplication },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ApplicationController();
