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
}

module.exports = new ApplicationController();
