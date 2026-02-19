const router = require("express").Router();
const { auth, recruiterOnly, optionalAuth } = require("../middleware/auth");
const { validateCreateJob } = require("../middleware/validation");
const jobController = require("../controllers/jobController");

router.get("/recruiter", auth, recruiterOnly, jobController.getRecruiterJobs);
router.post(
  "/",
  auth,
  recruiterOnly,
  validateCreateJob,
  jobController.createJob,
);
router.get("/:jobId", optionalAuth, jobController.getJobById);
router.patch("/:jobId", auth, recruiterOnly, jobController.updateJob);
router.get("/", jobController.getAllJobs);

module.exports = router;
