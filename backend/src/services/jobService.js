// Purpose: Job-related business logic (validation, ownership checks, orchestration).

const jobRepository = require("../repositories/jobRepository");

class JobService {
  constructor(jobRepo) {
    this.jobRepo = jobRepo;
  }

  async createJob(jobData, recruiterId) {
    this.validateJobData(jobData);

    if (!recruiterId) {
      const err = new Error("Recruiter ID is required");
      err.statusCode = 400;
      throw err;
    }
    return await this.jobRepo.create({ ...jobData, createdBy: recruiterId });
  }

  async getRecruiterJobs(
    recruiterId,
    filters = { status: "ACTIVE" },
    pagination = {},
  ) {
    if (!recruiterId) {
      const err = new Error("Recruiter ID is required");
      err.statusCode = 400;
      throw err;
    }
    return await this.jobRepo.findByRecruiterId(
      recruiterId,
      filters,
      pagination,
    );
  }

  async getAllJobs(filters = { status: "ACTIVE" }, pagination = {}) {
    return this.jobRepo.findAllWithFilters(filters, pagination);
  }

  async getJobById(jobId) {
    if (!jobId) {
      const err = new Error("Job ID is required");
      err.statusCode = 400;
      throw err;
    }
    return await this.jobRepo.findById(jobId);
  }

  async closeJob(_jobId, _recruiterId) {
    void _jobId;
    void _recruiterId;
  }

  async updateJob(jobId, recruiterId, updates) {
    const job = await this.jobRepo.findById(jobId);
    if (!job || job.createdBy.toString() !== recruiterId) {
      const err = new Error("Forbidden: you do not own this job");
      err.statusCode = 403;
      throw err;
    }
    return await this.jobRepo.update(jobId, updates);
  }

  async deleteJob(_jobId, _recruiterId) {
    const jobId = _jobId;
    const recruiterId = _recruiterId;
    const job = await this.jobRepo.findById(jobId);
    if (!job || job.createdBy.toString() !== recruiterId) {
      const err = new Error("Forbidden: you do not own this job");
      err.statusCode = 403;
      throw err;
    }
    return await this.jobRepo.delete(jobId);
  }

  validateJobData(jobData) {
    const {
      title,
      description,
      company,
      employment,
      experience,
      locationType,
      location,
      openings,
      deadline,
      skills,
      salaryType,
      salaryAmount,
    } = jobData;

    if (
      !title ||
      !description ||
      !company ||
      !employment ||
      !experience ||
      !locationType ||
      !location ||
      !openings ||
      !deadline ||
      !skills
    ) {
      const err = new Error("Missing required fields");
      err.statusCode = 400;
      throw err;
    }

    // Validate salary consistency (both must be provided or both must be empty)
    if ((salaryType && !salaryAmount) || (!salaryType && salaryAmount)) {
      const err = new Error(
        "Both salary type and amount must be provided together, or left empty",
      );
      err.statusCode = 400;
      throw err;
    }

    // Validate salary type if provided
    if (salaryType && !["LPA", "MONTHLY"].includes(salaryType)) {
      const err = new Error("Salary type must be either 'LPA' or 'MONTHLY'");
      err.statusCode = 400;
      throw err;
    }

    // Validate salary amount if provided
    if (salaryAmount) {
      const amount = Number(salaryAmount);
      if (isNaN(amount) || amount <= 0) {
        const err = new Error("Salary amount must be a positive number");
        err.statusCode = 400;
        throw err;
      }

      // Validate based on salary type
      if (salaryType === "LPA" && amount > 100) {
        const err = new Error("LPA salary cannot exceed 100 lakhs");
        err.statusCode = 400;
        throw err;
      }

      if (salaryType === "MONTHLY" && amount > 1000000) {
        const err = new Error("Monthly salary cannot exceed 10 lakhs");
        err.statusCode = 400;
        throw err;
      }
    }
  }
}

module.exports = new JobService(jobRepository);
