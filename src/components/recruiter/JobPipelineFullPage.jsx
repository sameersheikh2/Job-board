import { ChevronDown, FileText, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

import {
  APPLICATION_STATUS_LIST,
  APPLICATION_STATUSES,
} from "../../utils/constants.js";

const stages = APPLICATION_STATUS_LIST;

const statusColors = {
  applied: "bg-blue-100 text-blue-800",
  reviewed: "bg-yellow-100 text-yellow-800",
  interviewing: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const JobPipelineFullPage = ({
  job,
  applicants = [],
  onClose,
  onStatusChange,
}) => {
  const updateApplicantStatus = (applicantId, newStatus) => {
    onStatusChange?.(applicantId, newStatus);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" onClick={onClose} className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">{job?.title}</h1>
            <p className="text-slate-600">
              {job?.company} • {applicants.length} applicants
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">All Applicants</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700">
                      Applied Date
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
                  {applicants.map((applicant) => (
                    <tr
                      key={applicant._id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4">{applicant.name}</td>
                      <td className="py-3 px-4">{applicant.email}</td>
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
                              .filter(
                                (stage) =>
                                  stage !== APPLICATION_STATUSES.APPLIED,
                              )
                              .map((stage) => (
                                <DropdownMenuItem
                                  key={stage}
                                  onClick={() =>
                                    updateApplicantStatus(applicant._id, stage)
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
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
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

export default JobPipelineFullPage;
