const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status: {
    type: String,
    enum: ["applied", "reviewed", "interviewing", "accepted", "rejected"],
    default: "applied",
  },
  appliedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
