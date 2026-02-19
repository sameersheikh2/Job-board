const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    team: { type: String },
    employment: { type: String, required: true },
    experience: { type: String, required: true },
    locationType: { type: String, required: true },
    location: { type: String, required: true },
    salaryType: {
      type: String,
      enum: ["LPA", "MONTHLY"],
      default: null,
    },
    salaryAmount: { type: Number },
    openings: { type: Number, required: true },
    deadline: { type: Date, required: true },
    skills: { type: String, required: true },
    hiring: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "CLOSED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

//indexing
JobSchema.index({ status: 1, createdAt: -1 });

JobSchema.index({ createdBy: 1 });

JobSchema.index({ deadline: 1 });

JobSchema.index(
  {
    title: "text",
    description: "text",
    company: "text",
    skills: "text",
    location: "text",
  },
  {
    weights: { title: 10, company: 8, description: 5, skills: 5, location: 8 },
  },
);

JobSchema.index({ locationType: 1 });
JobSchema.index({ employment: 1 });
JobSchema.index({ experience: 1 });
JobSchema.index({ location: 1 });

module.exports = mongoose.model("Job", JobSchema);
