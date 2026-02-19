// Purpose: Standardize API responses across controllers.
// Keeps client-facing shape consistent for success/error handling.

function successResponse(res, data, message = "OK", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function errorResponse(res, message = "Error", statusCode = 500, error = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
}

module.exports = { successResponse, errorResponse };
