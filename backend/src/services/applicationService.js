// Purpose: Application-related business logic (apply, listings, status updates).

const applicationRepository = require("../repositories/applicationRepository");
const jobRepository = require("../repositories/jobRepository");

class ApplicationService {
  constructor(appRepo, jobRepo) {
    this.appRepo = appRepo;
    this.jobRepo = jobRepo;
  }

  async applyToJob(jobId, applicantId) {
    if (!jobId || !applicantId) {
      throw new Error("Invalid Job or Applicant ID");
    }

    const job = await this.jobRepo.findById(jobId);

    if (!job || job.status !== "ACTIVE") {
      throw new Error("Job not available");
    }

    if (await this.appRepo.alreadyApplied(jobId, applicantId)) {
      throw new Error("Already applied");
    }

    return this.appRepo.create({
      job: jobId,
      applicant: applicantId,
      recruiter: job.createdBy,
    });
  }

  async getApplicantApplications(applicantId, filters = {}) {
    return this.appRepo.findByApplicantId(applicantId, filters);
  }

  async getRecruiterApplications(recruiterId, filters = {}, pagination = {}) {
    return this.appRepo.findByRecruiterId(recruiterId, filters, pagination);
  }
}

module.exports = new ApplicationService(applicationRepository, jobRepository);
