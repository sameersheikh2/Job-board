// Purpose: Central place for enums and shared constants.

const USER_ROLES = Object.freeze({
  JOB_SEEKER: "job_seeker",
  RECRUITER: "recruiter",
});

const JOB_STATUS = Object.freeze({
  OPEN: "open",
  CLOSED: "closed",
  DRAFT: "draft",
});

const APPLICATION_STATUS = Object.freeze({
  APPLIED: "applied",
  REVIEWED: "reviewed",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
});

module.exports = { USER_ROLES, JOB_STATUS, APPLICATION_STATUS };
