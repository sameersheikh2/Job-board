/* eslint-disable no-unused-vars */
// Responsibility: DB operations for Application entity only.

const Application = require("../models/Application");

class ApplicationRepository {
  /**
   * Create an application document.
   * @param {Object} appData - job, applicant, recruiter, status.
   * @returns {Promise<Object>} created application
   */
  async create(appData) {
    return Application.create(appData);
  }

  /**
   * Check if applicant already applied to a job (prevent duplicates).
   * @param {string} jobId
   * @param {string} applicantId
   * @returns {Promise<boolean>}
   */
  async alreadyApplied(jobId, applicantId) {
    return Application.exists({ job: jobId, applicant: applicantId });
  }

  /**
   * Find applications received by a recruiter.
   * @param {string} recruiterId
   * @param {Object} filters
   * @param {Object} pagination
   */
  async findApplicantsByJobId(_jobId, _filters = {}, _pagination = {}) {
    const jobId = _jobId;
    const filters = _filters;
    const { limit = 25, skip = 0 } = _pagination;
    return Application.find({ job: jobId, ...filters })
      .populate({
        path: "applicant",
        select: "name email",
        populate: {
          path: "profile",
          select:
            "headline location bio skills experience resumeUrl links -user -_id",
        },
      })
      .limit(limit)
      .skip(skip)
      .sort({ appliedAt: -1 })
      .lean();
  }

  /**
   * Find applications by applicant with populated job details.
   * @param {string} applicantId
   * @param {Object} filters
   */
  async findByApplicantId(applicantId, filters = {}) {
    return Application.find({ applicant: applicantId, ...filters })
      .populate({
        path: "job",
        select:
          "title description company location salary employment experience locationType skills deadline status createdBy",
      })
      .sort({
        appliedAt: -1,
      });
  }

  /**
   * Update application status.
   * @param {string} id
   * @param {string} status
   */
  async updateStatus(_applicantId, _jobId, _status) {
    const applicantId = _applicantId;
    const jobId = _jobId;
    const status = _status;
    // TODO: implement update
    return Application.findOneAndUpdate(
      { applicant: applicantId, job: jobId },
      { $set: { status: status } },
      { returnDocument: true },
    );
  }

  /**
   * Find single application by filters.
   * @param {Object} filters
   */
  async findOne(filters) {
    return Application.findOne(filters);
  }
}

module.exports = new ApplicationRepository();
