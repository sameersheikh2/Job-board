import OnboardingHeader from "../components/profile-onboarding/OnboardingHeader.jsx";
import OnboardingForm from "../components/profile-onboarding/OnboardingForm.jsx";

const ProfileOnboarding = () => (
  <div className="min-h-screen bg-linear-to-b from-[#f6f5f3] via-white to-[#efeae2]">
    <OnboardingHeader />
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <OnboardingForm />
    </main>
  </div>
);

export default ProfileOnboarding;
