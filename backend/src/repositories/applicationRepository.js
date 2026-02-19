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
  async findByRecruiterId(_recruiterId, _filters = {}, _pagination = {}) {
    const recruiterId = _recruiterId;
    const filters = _filters;
    const pagination = _pagination;
    return Application.find({ recruiterId });
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
  async updateStatus(_id, _status) {
    const id = _id;
    const status = _status;
    // TODO: implement update
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
