const router = require("express").Router();
const applicationController = require("../controllers/applicationController");
const { auth, jobSeekerOnly } = require("../middleware/auth");

router.get("/", auth, jobSeekerOnly, applicationController.getUserApplications);

router.post(
  "/apply/:jobId",
  auth,
  jobSeekerOnly,
  applicationController.applyToJob,
);

router.get("/:jobId", auth, applicationController.getJobApplications);
router.put("/:jobId/:applicantId", auth, applicationController.updateStatus);

module.exports = router;
