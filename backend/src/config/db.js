const mongoose = require("mongoose");
const { logger } = require("../utils/logger");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("Error connecting to MongoDB", { error });
  }
}

module.exports = connectDB;
