// Purpose: Validate and sanitize URLs for GitHub, LinkedIn, and Resume links
// This keeps URLs safe and prevents malicious content

// Remove extra spaces and trim the URL
const cleanUrl = (url) => {
  if (!url) return "";
  return url.trim();
};

// Validate GitHub URL
// Accepts: https://github.com/username or github.com/username
const validateGitHubUrl = (url) => {
  if (!url) return true; // Optional field, so empty is OK

  const cleaned = cleanUrl(url);

  // GitHub regex pattern: github.com/[alphanumeric and hyphens]
  const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9\-_]+\/?$/;

  if (!githubRegex.test(cleaned)) {
    return false;
  }

  return true;
};

// Validate LinkedIn URL
// Accepts: https://linkedin.com/in/username or linkedin.com/in/username
const validateLinkedInUrl = (url) => {
  if (!url) return true; // Optional field, so empty is OK

  const cleaned = cleanUrl(url);

  // LinkedIn regex pattern: linkedin.com/in/[profile] or company/[company]
  const linkedinRegex =
    /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9\-_]+\/?(\?.*)?$/;

  if (!linkedinRegex.test(cleaned)) {
    return false;
  }

  return true;
};

// Validate Resume URL
// Accepts common file hosting services
const validateResumeUrl = (url) => {
  if (!url) return true; // Optional field, so empty is OK

  const cleaned = cleanUrl(url);

  // Whitelist of allowed domains for resume hosting
  const allowedDomains = [
    "drive.google.com", // Google Drive
    "dropbox.com", // Dropbox
    "onedrive.live.com", // OneDrive
    "icloud.com", // iCloud
    "github.com", // GitHub (for portfolios)
  ];

  // Check if URL starts with https:// or http://
  if (!/^https?:\/\//.test(cleaned)) {
    return false;
  }

  // Check if domain is in allowed list
  const isAllowedDomain = allowedDomains.some((domain) =>
    cleaned.includes(domain),
  );

  if (!isAllowedDomain) {
    return false;
  }

  return true;
};

// Sanitize URL - remove dangerous characters but keep it valid
const sanitizeUrl = (url) => {
  if (!url) return "";

  const cleaned = cleanUrl(url);

  // Prevent javascript: or data: protocols
  if (
    cleaned.toLowerCase().startsWith("javascript:") ||
    cleaned.toLowerCase().startsWith("data:")
  ) {
    return "";
  }

  return cleaned;
};

// Main sanitizer function for profile links
// Takes all links and returns sanitized versions
const sanitizeProfileLinks = (links) => {
  if (!links) return {};

  return {
    github: sanitizeUrl(links.github),
    linkedin: sanitizeUrl(links.linkedin),
  };
};

// Main validator function for profile links
// Returns object with validation status and messages
const validateProfileLinks = (links) => {
  const errors = {};

  if (links.github && !validateGitHubUrl(links.github)) {
    errors.github =
      "Invalid GitHub URL. Use format: https://github.com/username";
  }

  if (links.linkedin && !validateLinkedInUrl(links.linkedin)) {
    errors.linkedin =
      "Invalid LinkedIn URL. Use format: https://linkedin.com/in/username";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validator for resume URL
const validateResumeUrlOnly = (resumeUrl) => {
  if (!resumeUrl) return { isValid: true }; // Optional field

  if (!validateResumeUrl(resumeUrl)) {
    return {
      isValid: false,
      error:
        "Resume URL must be from Google Drive, Dropbox, OneDrive, iCloud, or GitHub",
    };
  }

  return { isValid: true };
};

module.exports = {
  validateGitHubUrl,
  validateLinkedInUrl,
  validateResumeUrl,
  sanitizeUrl,
  sanitizeProfileLinks,
  validateProfileLinks,
  validateResumeUrlOnly,
};
