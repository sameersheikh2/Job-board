import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileDetailsForm from "../components/profile/ProfileDetailsForm.jsx";
import { upsertProfile } from "../features/profileSlice/profileSlice.jsx";
import { showError, showSuccess } from "../utils/toast.js";

const ProfileEdit = () => {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile?.profile);
  const status = useSelector((state) => state.profile?.status);
  const isLoading = status === "loading";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: user?.name || "",
    headline: profile?.headline || "",
    location: profile?.location || "",
    experience: profile?.experience || "",
    bio: profile?.bio || "",
    skills: Array.isArray(profile?.skills)
      ? profile.skills.join(", ")
      : profile?.skills || "",
    portfolio: profile?.links?.portfolio || "",
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
        portfolio: values.portfolio,
        linkedin: values.linkedin,
      },
      resumeUrl: values.resume,
    };

    try {
      const response = await dispatch(upsertProfile(payload)).unwrap();
      showSuccess(response?.message || "Profile updated");
      navigate("/profile");
    } catch (error) {
      showError(error || "Failed to update profile");
    }
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
      />
    </section>
  );
};

export default ProfileEdit;
