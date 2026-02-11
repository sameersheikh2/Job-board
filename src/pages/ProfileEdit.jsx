import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileDetailsForm from "../components/profile/ProfileDetailsForm.jsx";
import {
  fetchProfile,
  upsertProfile,
} from "../features/profileSlice/profileSlice.jsx";
import { showError, showSuccess } from "../utils/toast.js";
import { applyToJob } from "../features/applicationSlice/applicationSlice.jsx";
import { useEffect } from "react";

const ProfileEdit = () => {
  const user = useSelector((state) => state.auth.user);
  const { profile, status } = useSelector((state) => state.profile);
  const applicationStatus = useSelector((state) => state.application?.status);
  const isLoading = status === "loading" || applicationStatus === "loading";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isApplyFlow = location.state?.isApplyFlow || false;
  const jobId = location.state?.jobId;

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const resumeWarningMessage =
    isApplyFlow && !profile?.resumeUrl
      ? "We strongly recommend adding a resume to increase your chances of selection."
      : null;

  const initialValues = {
    name: user?.name || "",
    headline: profile?.headline || "",
    location: profile?.location || "",
    experience: profile?.experience || "",
    bio: profile?.bio || "",
    skills: Array.isArray(profile?.skills)
      ? profile.skills.join(", ")
      : profile?.skills || "",
    github: profile?.links?.github || "",
    linkedin: profile?.links?.linkedin || "",
    resume: profile?.resumeUrl || "",
  };

  const parseSkills = (value) =>
    value
      .split(/[\s,]+/)
      .map((skill) => skill.trim())
      .filter(Boolean);

  const handleSubmit = async (values) => {
    const payload = {
      name: values.name,
      headline: values.headline,
      location: values.location,
      experience: values.experience,
      bio: values.bio,
      skills: parseSkills(values.skills || ""),
      links: {
        github: values.github,
        linkedin: values.linkedin,
      },
      resumeUrl: values.resume,
    };

    try {
      const response = await dispatch(upsertProfile(payload)).unwrap();
      showSuccess(response?.message || "Profile updated");
      // If in apply flow, don't navigate anywhere yet
      // If normal edit, navigate back
      if (!isApplyFlow) {
        navigate(-1);
      }
    } catch (error) {
      showError(error || "Failed to update profile");
    }
  };

  const handleApplyAndSave = async (values) => {
    const payload = {
      name: values.name,
      headline: values.headline,
      location: values.location,
      experience: values.experience,
      bio: values.bio,
      skills: parseSkills(values.skills || ""),
      links: {
        github: values.github,
        linkedin: values.linkedin,
      },
      resumeUrl: values.resume,
    };

    try {
      // First save profile
      const profileResponse = await dispatch(upsertProfile(payload)).unwrap();
      showSuccess(profileResponse?.message || "Profile updated");

      // Then apply to job
      const applicationResponse = await dispatch(applyToJob(jobId)).unwrap();
      showSuccess(
        applicationResponse?.message || "Application submitted successfully",
      );

      // Navigate after both operations succeed
      if (jobId) {
        navigate(`/jobs/${jobId}`);
      } else {
        navigate("/profile");
      }
    } catch (error) {
      // Error is already shown in catch block, don't add extra toast
      showError(error || "Failed to update profile or apply to job");
    }
  };

  const handleCancel = () => {
    // Always go back in history to preserve correct back button behavior
    navigate(-1);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <ProfileDetailsForm
        key={`${user?.name || ""}-${profile?.updatedAt || ""}`}
        initialValues={initialValues}
        introLabel="Profile"
        title="Edit your profile"
        description="Update your details anytime to keep your profile fresh."
        submitLabel="Save changes"
        loadingLabel="Updating profile..."
        isLoading={isLoading}
        footerNote="Changes will be reflected on your profile once saved."
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        showApplyButton={isApplyFlow}
        applyLabel="Save and Apply"
        onApplyAndSave={handleApplyAndSave}
        resumeWarningMessage={resumeWarningMessage}
      />
    </section>
  );
};

export default ProfileEdit;
