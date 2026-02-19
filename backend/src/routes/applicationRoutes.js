const router = require("express").Router();
const applicationController = require("../controllers/applicationController");
const { auth, jobSeekerOnly } = require("../middleware/auth");

router.post(
  "/apply/:jobId",
  auth,
  jobSeekerOnly,
  applicationController.applyToJob,
);

module.exports = router;
