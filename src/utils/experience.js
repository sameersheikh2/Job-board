const experiencePresets = {
  fresher: { label: "Fresher", years: "0-1 yrs" },
  entry: { label: "Entry", years: "0-1 yrs" },
  "entry-level": { label: "Entry", years: "0-1 yrs" },
  junior: { label: "Junior", years: "0-2 yrs" },
  mid: { label: "Mid", years: "2-5 yrs" },
  "mid-level": { label: "Mid", years: "2-5 yrs" },
  senior: { label: "Senior", years: "5+ yrs" },
  "senior-level": { label: "Senior", years: "5+ yrs" },
  lead: { label: "Lead", years: "7+ yrs" },
  principal: { label: "Principal", years: "10+ yrs" },
};

const formatStatus = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "";

const normalizeExperience = (value) =>
  value?.toLowerCase().trim().replace(/[\s_]+/g, "-");

const formatExperience = (value) => {
  if (!value) return "";
  if (/\d/.test(value)) return value;
  const key = normalizeExperience(value);
  const preset = experiencePresets[key];
  if (preset) return `${preset.label} · ${preset.years}`;
  return formatStatus(value.replace(/-/g, " "));
};

export { formatExperience };
