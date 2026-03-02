import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  FileText,
  ArrowLeft,
  Mail,
  Phone,
  User,
  Briefcase,
  MessageSquare,
  Calendar,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { showComingSoon } from "../utils/comingSoon.js";
import { apiClient } from "../api/apiClient";

const stages = ["applied", "reviewed", "interviewing", "accepted", "rejected"];

const statusColors = {
  applied: "bg-blue-100 text-blue-800",
  reviewed: "bg-yellow-100 text-yellow-800",
  interviewing: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const JobPipelinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = useParams();
  const passedJob = location?.state;
  const { user } = useSelector((state) => state.auth); // Assuming auth slice has user with role
  const [job] = useState(passedJob);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobDetails, setShowJobDetails] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/");
      return;
    }
    const fetchApplicants = async () => {
      try {
        const res = await apiClient.get(`/applications/${jobId}`);
        console.log(res.data?.data?.applications);
        setApplicants(res?.data?.data?.applications);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId, user, navigate]);

  const updateApplicantStatus = (applicantId, newStatus) => {
    console.log(`Updating applicant ${applicantId} to ${newStatus}`);
    setApplicants((prev) =>
      prev.map((app) =>
        app._id === applicantId ? { ...app, status: newStatus } : app,
      ),
    );
  };

  const handleAction = async (applicantId, action) => {
    const validStatuses = [
      "applied",
      "reviewed",
      "interviewing",
      "accepted",
      "rejected",
    ];
    const status = action.toLowerCase();
    if (!validStatuses.includes(status)) {
      console.error("Invalid status:", action);
      return;
    }
    try {
      const res = await apiClient.put(`/applications/${jobId}/${applicantId}`, {
        status,
      });
      updateApplicantStatus(
        res.data?.data?.application?.applicant?._id || applicantId,
        status,
      );
    } catch (error) {
      console.error("Error updating applicant status:", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowJobDetails(!showJobDetails)}
            >
              <h1 className="text-2xl font-bold text-slate-900">
                {job?.title}
              </h1>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  showJobDetails ? "rotate-180" : ""
                }`}
              />
            </div>
            <p className="text-slate-600">
              {job?.company} • {applicants.length} applicants
            </p>
          </div>
        </div>

        {showJobDetails && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Job Details</h3>
            <div className="space-y-3">
              <div>
                <strong>Description:</strong> {job.description}
              </div>
              <div>
                <strong>Location:</strong> {job.location} ({job.locationType})
              </div>
              <div>
                <strong>Salary:</strong> ${job.salaryAmount} {job.salaryType}
              </div>
              <div>
                <strong>Employment:</strong> {job.employment}
              </div>
              <div>
                <strong>Skills Required:</strong> {job.skills}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Applicant Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Contact
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Experience
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Skills
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Applied
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicants?.map((applicant) => (
                    <tr
                      key={applicant._id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-500" />
                          <span className="font-medium">{applicant.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-slate-500" />
                            <span>{applicant.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-slate-500" />
                            <span>{applicant.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4 text-slate-500" />
                          <span>{applicant?.profile?.experience}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {applicant?.profile?.skills.map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(applicant.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-1"
                            >
                              <Badge
                                className={`${statusColors[applicant.status]} flex items-center gap-1`}
                              >
                                {applicant.status.charAt(0).toUpperCase() +
                                  applicant.status.slice(1)}
                                <ChevronDown className="h-3 w-3" />
                              </Badge>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {stages
                              .filter((stage) => stage !== "applied")
                              .map((stage) => (
                                <DropdownMenuItem
                                  key={stage}
                                  onClick={() =>
                                    handleAction(applicant._id, stage)
                                  }
                                >
                                  {stage.charAt(0).toUpperCase() +
                                    stage.slice(1)}
                                </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Actions <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => showComingSoon()}>
                              <User className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => showComingSoon()}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => showComingSoon()}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Interview
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => showComingSoon()}>
                              <FileText className="h-4 w-4 mr-2" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleAction(applicant._id, "rejected")
                              }
                              className="text-red-600"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPipelinePage;
