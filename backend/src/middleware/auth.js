// Purpose: JWT authentication and basic RBAC helpers.

const jwt = require("jsonwebtoken");
const config = require("../config/env");
const { USER_ROLES } = require("../utils/constants");
const { errorResponse } = require("../utils/apiResponse");
const { logger } = require("../utils/logger");

function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ")
      ? header.replace("Bearer ", "")
      : null;
    if (!token) return errorResponse(res, "Unauthorized", 401);

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = { id: decoded.id, role: decoded.role };
    return next();
  } catch (err) {
    logger.warn("Auth middleware error", { error: err?.message });
    return errorResponse(res, "Invalid or expired token", 401);
  }
}

function recruiterOnly(req, res, next) {
  if (req.user?.role !== USER_ROLES.RECRUITER) {
    return errorResponse(res, "Forbidden: recruiters only", 403);
  }
  return next();
}

function jobSeekerOnly(req, res, next) {
  if (req.user?.role !== USER_ROLES.JOB_SEEKER) {
    return errorResponse(res, "Forbidden: job seekers only", 403);
  }
  return next();
}

function optionalAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ")
      ? header.replace("Bearer ", "")
      : null;
    if (token) {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = { id: decoded.id, role: decoded.role };
    }
    return next();
  } catch (err) {
    logger.warn("Optional auth middleware error", { error: err?.message });
    return next();
  }
}

// TODO: Extend with finer-grained RBAC (e.g., permissions per resource).
module.exports = { auth, recruiterOnly, jobSeekerOnly, optionalAuth };
