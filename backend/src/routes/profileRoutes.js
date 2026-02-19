const router = require("express").Router();
const profileController = require("../controllers/profileController");
const { auth, jobSeekerOnly } = require("../middleware/auth");
const { validateProfileUpdate } = require("../middleware/validation");

router.get("/me", auth, jobSeekerOnly, profileController.getMe);
router.put(
  "/me",
  auth,
  jobSeekerOnly,
  validateProfileUpdate,
  profileController.upsertMe,
);
module.exports = router;
