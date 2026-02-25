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

  async getUserApplications(applicantId, pagination = {}) {
    const { skip = 0, limit = 25 } = pagination;
    const applications = await this.appRepo.findByApplicantId(applicantId);
    const total = applications.length;
    const paginatedApps = applications.slice(skip, skip + limit);
    return { applications: paginatedApps, total };
  }

  async getApplicantApplications(applicantId, filters = {}) {
    return this.appRepo.findByApplicantId(applicantId, filters);
  }

  async getJobApplications(jobId, recruiterId, filters = {}, pagination = {}) {
    const job = await this.jobRepo.findById(jobId);
    if (!job || job.createdBy.toString() !== recruiterId) {
      throw new Error("Unauthorized access");
    }
    const applications = await this.appRepo.findApplicantsByJobId(
      jobId,
      filters,
      pagination,
    );
    return applications.map((app) => ({
      ...app.applicant,
      status: app.status,
      appliedAt: app.appliedAt,
    }));
  }

  async updateStatus(applicantId, recruiterId, jobId, status) {
    if (!applicantId || !recruiterId || !jobId || !status) {
      throw new Error("Missing required fields");
    }

    const filters = {
      applicant: applicantId,
      recruiter: recruiterId,
      job: jobId,
    };
    const application = await this.appRepo.findOne(filters);
    if (!application) {
      throw new Error("Application does not exist");
    }
    // if(application.applicant)
    return await this.appRepo.updateStatus(applicantId, jobId, status);
  }
}

module.exports = new ApplicationService(applicationRepository, jobRepository);
