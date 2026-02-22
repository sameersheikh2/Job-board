const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    headline: { type: String, trim: true },
    location: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 600 },
    skills: [{ type: String, trim: true }],
    experience: {
      type: String,
      trim: true,
      enum: ["Fresher", "Junior", "Mid", "Senior", "Lead"],
      default: "Fresher",
    },
    links: {
      github: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },
    resumeUrl: { type: String, trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", ProfileSchema);
