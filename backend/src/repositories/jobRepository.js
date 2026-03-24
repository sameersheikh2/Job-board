// Responsibility: DB operations for Job entity only.
const mongoose = require("mongoose");
const Job = require("../models/Job");

class JobRepository {
  /**

   * Create a job document.

   * @param {Object} jobData - title, description, company, location, status, recruiterId.

   * @returns {Promise<Object>} created job doc

   */

  async create(jobData) {
    return await Job.create(jobData);
  }

  /**

   * Find job by id.

   * @param {string} id

   * @returns {Promise<Object|null>}

   */

  async findById(id) {
    return await Job.findById(id);
  }

  /**

   * List jobs with filters + pagination.

   * @param {Object} filters - e.g., { status, location }

   * @param {Object} pagination - { limit, skip }

   * @returns {Promise<Array>} jobs

   */

  async findAllWithFilters(filters = {}, pagination = {}) {
    const query = { status: "ACTIVE" };
    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    if (filters.location) {
      query.locationType = filters.location;
    }

    if (filters.employment) {
      query.employment = filters.employment;
    }

    if (filters.experience) {
      query.experience = filters.experience;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    let sort = { createdAt: -1 };

    if (filters.sort) {
      switch (filters.sort) {
        case "oldest":
          sort = { createdAt: 1 };
          break;
        case "salary-desc":
          sort = { salary: -1, createdAt: -1 };
          break;
        case "salary-asc":
          sort = { salary: 1, createdAt: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }
    const jobs = await Job.find(query)
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);
    const totalJobs = await Job.countDocuments(query);
    const limit = pagination.limit || 25;
    const numOfPages = Math.ceil(totalJobs / limit);
    return { jobs, totalJobs, numOfPages };
  }

  /**

   * List jobs by recruiter id.

   * @param {string} recruiterId

   */

  async findByRecruiterId(recruiterId, filters, pagination) {
    const matchStage = {
      $match: { createdBy: new mongoose.Types.ObjectId(recruiterId) },
    };
    if (filters.status) {
      matchStage.$match.status = filters.status;
    }

    let sortStage = { $sort: { createdAt: -1 } };

    if (filters.sort) {
      switch (filters.sort) {
        case "oldest":
          sortStage.$sort = { createdAt: 1 };
          break;
        case "most-applicants":
          sortStage.$sort = { applicantsCount: -1, createdAt: -1 };
          break;
        case "least-applicants":
          sortStage.$sort = { applicantsCount: 1, createdAt: -1 };
          break;
        default:
          sortStage.$sort = { createdAt: -1 };
      }
    }

    const pipeline = [
      matchStage,
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "job",
          as: "applicants",
        },
      },
      {
        $addFields: {
          applicantsCount: { $size: "$applicants" },
        },
      },
      sortStage,
      { $skip: pagination.skip },
      { $limit: pagination.limit },
    ];

    const jobs = await Job.aggregate(pipeline);
    const totalCountPipeline = [matchStage, { $count: "total" }];
    const countResult = await Job.aggregate(totalCountPipeline);
    const totalCount = countResult[0]?.total || 0;
    const limit = pagination.limit || 25;
    const numOfPages = Math.ceil(totalCount / limit);

    return { jobs, totalJobs: totalCount, numOfPages };
  }

  /**

   * Update job document.

   * @param {string} id

   * @param {Object} updates

   */

  async update(id, updates) {
    return await Job.findByIdAndUpdate(
      id,
      { $set: { ...updates } },
      { returnDocument: "after" },
    );
  }

  /**

   * Delete job document.

   * @param {string} id

   */

  delete(id) {
    return Job.findByIdAndDelete(id);
  }
}

module.exports = new JobRepository();
