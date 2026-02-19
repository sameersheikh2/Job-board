// Purpose: Centralized Express error handler to keep controllers thin.
// Controllers should call next(err); this middleware formats responses consistently.

const { errorResponse } = require("../utils/apiResponse");
const { logger } = require("../utils/logger");

function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;

  const isSafeError = [400, 401, 403, 404, 409].includes(statusCode);

  logger.error("Request failed", {
    status: statusCode,
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id,
  });

  let clientMessage = err.message;
  if (!isSafeError) {
    clientMessage = "An error occurred. Please try again later.";
  }

  return errorResponse(
    res,
    clientMessage,
    statusCode,
    process.env.NODE_ENV === "development" ? err : undefined,
  );
}

module.exports = { errorHandler };
