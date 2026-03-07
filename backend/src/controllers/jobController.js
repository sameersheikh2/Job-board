const jobService = require("../services/jobService");
const { successResponse } = require("../utils/apiResponse");

class JobController {
  async createJob(req, res, next) {
    try {
      const data = await jobService.createJob(req.body, req.user.id);
      return successResponse(res, data, "Job created successfully");
    } catch (err) {
      next(err);
    }
  }

  async getRecruiterJobs(req, res, next) {
    const { sort } = req.query;
    let status = req.query.status;
    if (status) {
      status = status.toUpperCase();
    } else {
      status = "ACTIVE";
    }

    if (status !== "ACTIVE" && status !== "CLOSED" && status !== "DRAFT") {
      const err = new Error("Invalid status value");
      err.statusCode = 400;
      throw err;
    }

    if (sort) {
      const validSorts = [
        "newest",
        "oldest",
        "most-applicants",
        "least-applicants",
      ];
      if (!validSorts.includes(sort)) {
        const err = new Error("Invalid sort parameter");
        err.statusCode = 400;
        throw err;
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 25, 50);
    const skip = (page - 1) * limit;
    const pagination = { limit, skip };

    // Properly construct filters object with modified status and sort
    const filters = {
      status,
      sort,
    };

    try {
      const data = await jobService.getRecruiterJobs(
        req.user.id,
        filters,
        pagination,
      );
      return successResponse(res, data);
    } catch (err) {
      next(err);
    }
  }

  async updateJob(req, res, next) {
    try {
      const data = await jobService.updateJob(
        req.params.jobId,
        req.user.id,
        req.body,
      );
      return successResponse(res, data, "Job updated successfully");
    } catch (err) {
      next(err);
    }
  }

  async getAllJobs(req, res, next) {
    // Security: Sanitize and validate search input
    const { search, location, employment, experience, sort, salary } =
      req.query;

    // XSS Protection: Remove dangerous characters and limit length
    const sanitizeInput = (input) => {
      if (!input || typeof input !== "string") return "";

      // Remove HTML tags, scripts, and dangerous characters
      const cleaned = input
        .replace(/<script[^>]*>.*?<\/script>/gi, "")
        .replace(/<[^>]*>/g, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "")
        .trim();

      // Limit length to prevent abuse
      return cleaned.substring(0, 100); // Max 100 characters
    };

    const sanitizedSearch = sanitizeInput(search);

    if (sanitizedSearch && sanitizedSearch.length < 2) {
      const err = new Error("Search term must be at least 2 characters long");
      err.statusCode = 400;
      return next(err);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 25, 50); // Max 50 per page
    const skip = (page - 1) * limit;
    const pagination = { limit, skip };

    try {
      const data = await jobService.getAllJobs(
        {
          search: sanitizedSearch,
          location,
          employment,
          experience,
          sort,
          salary,
        },
        pagination,
      );
      return successResponse(res, data);
    } catch (err) {
      next(err);
    }
  }

  async getJobById(req, res, next) {
    try {
      const job = await jobService.getJobById(req.params.jobId);
      if (!job) {
        const err = new Error("Job not found");
        err.statusCode = 404;
        return next(err);
      }

      let hasApplied = false;
      let applicationStatus = null;

      if (req.user?.id) {
        const applicationRepository = require("../repositories/applicationRepository");
        const application = await applicationRepository.findOne({
          job: req.params.jobId,
          applicant: req.user.id,
        });
        if (application) {
          hasApplied = true;
          applicationStatus = application.status;
        }
      }

      return successResponse(res, {
        job,
        hasApplied,
        applicationStatus,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteJob(req, res, next) {
    try {
      await jobService.deleteJob(req.params.jobId, req.user.id);
      return successResponse(res, null, "Job deleted successfully");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new JobController();
