import { useState } from "react";
import { Spinner } from "../../../components/ui/spinner";

const ProfileDetailsForm = ({
  initialValues = {},
  onSubmit,
  introLabel = "Profile details",
  title = "Complete your profile",
  description = "Add the details that show up on your public profile.",
  submitLabel = "Save profile",
  footerNote = "You can update these details anytime from your profile.",
  isLoading = false,
  loadingLabel = "Saving...",
}) => {
  const defaultValues = {
    name: "",
    headline: "",
    location: "",
    experience: "",
    bio: "",
    skills: "",
    portfolio: "",
    linkedin: "",
    resume: "",
  };

  const [formValues, setFormValues] = useState(() => ({
    ...defaultValues,
    ...initialValues,
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    onSubmit?.(formValues);
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-[#e3d7c5] bg-white/90 p-6 shadow-2xl backdrop-blur sm:p-10">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          {introLabel}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">{description}</p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="name"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Alex Johnson"
              className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="headline"
            >
              Headline
            </label>
            <input
              id="headline"
              name="headline"
              type="text"
              value={formValues.headline}
              onChange={handleChange}
              placeholder="Frontend Engineer"
              className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="location"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formValues.location}
              onChange={handleChange}
              placeholder="Remote / Bengaluru"
              className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="experience"
            >
              Experience level
            </label>
            <select
              id="experience"
              name="experience"
              value={formValues.experience}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#d8cab8] bg-white px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
              required
            >
              <option value="">Select level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formValues.bio}
            onChange={handleChange}
            placeholder="Share a quick summary of what you build and what you want next."
            className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="skills"
          >
            Top skills
          </label>
          <input
            id="skills"
            name="skills"
            type="text"
            value={formValues.skills}
            onChange={handleChange}
            placeholder="React, TypeScript, Node.js"
            className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            required
          />
          <p className="text-xs text-slate-500">
            Separate skills with commas or spaces (e.g., React, TypeScript,
            Node.js)
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="portfolio"
            >
              Portfolio URL
            </label>
            <input
              id="portfolio"
              name="portfolio"
              type="url"
              value={formValues.portfolio}
              onChange={handleChange}
              placeholder="https://your-site.com"
              className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="linkedin"
            >
              LinkedIn URL
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              value={formValues.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/you"
              className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="resume"
          >
            Resume URL
          </label>
          <input
            id="resume"
            name="resume"
            type="url"
            value={formValues.resume}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">{footerNote}</p>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#0c1323] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Spinner className="size-4 text-white" />
                {loadingLabel}
              </span>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetailsForm;
