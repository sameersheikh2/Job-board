import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileDetailsForm from "../profile/ProfileDetailsForm.jsx";
import { upsertProfile } from "../../features/profileSlice/profileSlice.jsx";
import { showError, showSuccess } from "../../utils/toast.js";

const OnboardingForm = () => {
  const userName = useSelector((state) => state.auth.user?.name || "");
  const status = useSelector((state) => state.profile.status);
  const isLoading = status === "loading";
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        portfolio: values.portfolio,
        linkedin: values.linkedin,
      },
      resumeUrl: values.resume,
    };

    try {
      const response = await dispatch(upsertProfile(payload)).unwrap();
      showSuccess(response?.message || "Profile saved");
      navigate("/");
    } catch (error) {
      showError(error || "Failed to save profile");
    }
  };

  return (
    <ProfileDetailsForm
      key={userName}
      initialValues={{ name: userName }}
      introLabel="Profile onboarding"
      title="Tell us about you"
      description="Complete your profile so we can personalize your recommendations."
      submitLabel="Finish setup"
      loadingLabel="Saving profile..."
      isLoading={isLoading}
      footerNote="You can edit these details later from your profile."
      onSubmit={handleSubmit}
    />
  );
};

export default OnboardingForm;
