import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const mockUser = {
//   name: "Alex Johnson",
//   email: "alex@devhub.io",
//   role: "job_seeker",
//   createdAt: "2024-12-01",
//   isVerified: true,
// };

// const mockProfile = {
//   headline: "Frontend Engineer",
//   location: "Remote",
//   bio: "I build clean, fast interfaces for modern product teams.",
//   skills: ["React", "TypeScript", "Tailwind", "Node.js"],
//   links: {
//     portfolio: "https://devhub.io/aj",
//     linkedin: "https://linkedin.com/in/alexjohnson",
//   },
//   resumeUrl: "https://devhub.io/resume.pdf",
// };

// const mockAppliedJobs = [
//   {
//     id: "app-1",
//     title: "Frontend Engineer",
//     company: "Nimbus Labs",
//     location: "Remote",
//     status: "Applied",
//     date: "2025-01-12",
//   },
//   {
//     id: "app-2",
//     title: "UI Engineer",
//     company: "Arcline Studio",
//     location: "Austin, TX",
//     status: "Interview",
//     date: "2025-01-02",
//   },
// ];

// const mockMyJobs = [
//   {
//     id: "job-1",
//     title: "Senior Product Designer",
//     company: "Dev Hub IO",
//     location: "Remote",
//     status: "Active",
//     date: "2025-01-05",
//   },
//   {
//     id: "job-2",
//     title: "Backend Engineer",
//     company: "Dev Hub IO",
//     location: "New York, NY",
//     status: "Closed",
//     date: "2024-12-14",
//   },
// ];

const useMockAuth = () => {
  // TODO: replace mock data with Redux Toolkit user/auth slice.
  const { user, isVerified, status, error } = useSelector(
    (state) => state.auth,
  );
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = false;
  // const user = useMemo(() => mockUser, []);
  // const profile = useMemo(() => mockProfile, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return {
    isVerified,
    status,
    error,
    isAuthenticated,
    isLoading,
    user,
    // profile,
    // appliedJobs: mockAppliedJobs,
    // myJobs: mockMyJobs,
  };
};

export default useMockAuth;
