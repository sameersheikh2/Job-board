// Purpose: Minimal logger wrapper to centralize logging behavior.

function info(message, meta = {}) {
  // Keeping simple console for now
  console.log(`[INFO] ${message}`, meta);
}

function error(message, meta = {}) {
  console.error(`[ERROR] ${message}`, meta);
}

function warn(message, meta = {}) {
  console.warn(`[WARN] ${message}`, meta);
}

module.exports = { logger: { info, error, warn } };
