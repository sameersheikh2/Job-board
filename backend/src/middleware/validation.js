// Purpose: Centralize request validation with express-validator.
// Keep controllers thin and reuse schemas across routes.

const { body, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/apiResponse");
const {
  validateGitHubUrl,
  validateLinkedInUrl,
  validateResumeUrl,
  sanitizeUrl,
} = require("../utils/urlSanitizer");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validation failed", 422, errors.array());
  }
  return next();
};

// Auth
const validateSignup = [
  body("name").isString().isLength({ min: 3 }).withMessage("Name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password too short"),
  body("role").isIn(["job_seeker", "recruiter"]).withMessage("Invalid role"),
  handleValidationErrors,
];

const validateLogin = [
  body("email").isEmail(),
  body("password").notEmpty(),
  handleValidationErrors,
];

// Jobs
const validateCreateJob = [
  body("title").notEmpty(),
  body("description").notEmpty(),
  body("company").notEmpty(),
  body("employment").notEmpty(),
  body("experience").notEmpty(),
  body("locationType").notEmpty(),
  body("location").notEmpty(),
  body("openings").notEmpty(),
  body("deadline").notEmpty(),
  body("skills").notEmpty(),
  // TODO: add salary/skills validations when fields are added
  handleValidationErrors,
];

// Applications
const validateApplyJob = [
  body("jobId").isMongoId().withMessage("jobId required"),
  // TODO: validate optional fields (coverLetter, resumeUrl) when added
  handleValidationErrors,
];

const validateFilterJobs = [
  body("search").optional().isString(),
  body("location").optional().isString(),
  handleValidationErrors,
];

const validateProfileUpdate = [
  body("name").optional().isString().isLength({ min: 3 }),
  body("headline").optional().isString().isLength({ min: 2 }),
  body("location").optional().isString(),
  body("bio").optional().isString().isLength({ max: 600 }),
  body("skills").optional().isArray(),
  body("skills.*").optional().isString(),
  body("links").optional().isObject(),
  // GitHub URL validation and sanitization
  body("links.github")
    .optional()
    .trim()
    .custom((value) => {
      if (value && !validateGitHubUrl(value)) {
        throw new Error(
          "Invalid GitHub URL. Use format: https://github.com/username",
        );
      }
      return true;
    })
    .customSanitizer(sanitizeUrl),
  // LinkedIn URL validation and sanitization
  body("links.linkedin")
    .optional()
    .trim()
    .custom((value) => {
      if (value && !validateLinkedInUrl(value)) {
        throw new Error(
          "Invalid LinkedIn URL. Use format: https://linkedin.com/in/username",
        );
      }
      return true;
    })
    .customSanitizer(sanitizeUrl),
  // Resume URL validation and sanitization
  body("resumeUrl")
    .optional()
    .trim()
    .custom((value) => {
      if (value && !validateResumeUrl(value)) {
        throw new Error(
          "Resume must be from: Google Drive, Dropbox, OneDrive, iCloud, or GitHub",
        );
      }
      return true;
    })
    .customSanitizer(sanitizeUrl),
  handleValidationErrors,
];

module.exports = {
  validateSignup,
  validateLogin,
  validateCreateJob,
  validateApplyJob,
  validateProfileUpdate,
  handleValidationErrors,
  validateFilterJobs,
};
