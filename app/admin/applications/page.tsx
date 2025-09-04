"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Mail,
  Phone,
  User,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Save,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Application {
  id: number;
  applicantName: string;
  email: string;
  phoneNo: number;
  status: string;
  createdAt: string;
  start_date?: string;
  qualification?: string[];
  cover_letter?: string;
  resume?: string;
  vacancy?: {
    JobTitle: string;
    id: number;
  };
}

interface EditModalProps {
  application: Application | null;
  onUpdate: (id: number, data: Partial<Application>) => void;
}

interface ViewModalProps {
  application: Application | null;
}

const Page = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/application");
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.vacancy?.JobTitle?.toLowerCase().includes(
            searchTerm.toLowerCase()
          )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApps(filtered);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/application", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setApplications((apps) =>
          apps.map((app) =>
            app.id === id ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const updateApplication = async (id: number, data: Partial<Application>) => {
    try {
      const res = await fetch("/api/application", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });

      if (res.ok) {
        setApplications((apps) =>
          apps.map((app) => (app.id === id ? { ...app, ...data } : app))
        );
      }
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };

  const deleteApplication = async (id: number) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch("/api/application", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setApplications((apps) => apps.filter((app) => app.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1";
    switch (status) {
      case "accepted":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="text-lg text-gray-700">Loading applications...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[90rem] mx-auto text-black ">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Applications Dashboard
        </h1>
        <p className="text-gray-600">Manage and review job applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Applications",
            value: applications.length,
            color: "bg-blue-500",
          },
          {
            label: "Pending",
            value: applications.filter((app) => app.status === "pending")
              .length,
            color: "bg-yellow-500",
          },
          {
            label: "Approved",
            value: applications.filter((app) => app.status === "accepted")
              .length,
            color: "bg-green-500",
          },
          {
            label: "Rejected",
            value: applications.filter((app) => app.status === "rejected")
              .length,
            color: "bg-red-500",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div
              className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No applications found
          </h3>
          <p className="text-gray-500">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold text-lg text-gray-800">
                    {app.applicantName}
                  </span>
                </div>
                <div className={getStatusBadge(app.status)}>
                  {getStatusIcon(app.status)}
                  <span className="capitalize">{app.status}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {/* Personal Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{app.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{app.phoneNo}</span>
                  </div>
                </div>

                {/* Job Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>{app.vacancy?.JobTitle || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer - Actions */}
              <div className="px-6 py-4 border-t flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <ViewModal application={app} />
                  <EditModal application={app} onUpdate={updateApplication} />
                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
                <div className="flex gap-2">
                  {app.status !== "accepted" && (
                    <button
                      onClick={() => updateStatus(app.id, "accepted")}
                      className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs hover:bg-green-200 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  {app.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(app.id, "rejected")}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200 transition-colors"
                    >
                      Reject
                    </button>
                  )}
                  {app.status !== "pending" && (
                    <button
                      onClick={() => updateStatus(app.id, "pending")}
                      className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs hover:bg-yellow-200 transition-colors"
                    >
                      Pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EditModal: React.FC<EditModalProps> = ({ application, onUpdate }) => {
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phoneNo: "",
    start_date: "",
    qualification: "",
    cover_letter: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (application && isOpen) {
      setFormData({
        applicantName: application.applicantName || "",
        email: application.email || "",
        phoneNo: application.phoneNo?.toString() || "",
        start_date: application.start_date
          ? new Date(application.start_date).toISOString().split("T")[0]
          : "",
        qualification: application.qualification?.join(", ") || "",
        cover_letter: application.cover_letter || "",
      });
    }
  }, [application, isOpen]);

  const handleSubmit = () => {
    if (!application) return;

    const updateData = {
      ...formData,
      phoneNo: Number(formData.phoneNo),
      qualification: formData.qualification
        .split(",")
        .map((q) => q.trim())
        .filter((q) => q),
    };

    onUpdate(application.id, updateData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm">
          <Edit2 className="h-4 w-4" /> Edit
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto text-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Edit Application
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Update the application details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Applicant Name *
              </label>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    applicantName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phoneNo}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualifications
            </label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  qualification: e.target.value,
                })
              }
              placeholder="Enter qualifications separated by commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple qualifications with commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter
            </label>
            <textarea
              value={formData.cover_letter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cover_letter: e.target.value,
                })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
              placeholder="Enter cover letter..."
            />
          </div>

          <DialogFooter className="flex gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Update Application
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ViewModal: React.FC<ViewModalProps> = ({ application }) => {
  if (!application) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
          <Eye className="h-4 w-4" /> View
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto text-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Application Details
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete information for {application.applicantName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <p className="text-gray-900">{application.applicantName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <p className="text-gray-900">{application.email}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <p className="text-gray-900">{application.phoneNo}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : application.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {application.status === "accepted" && (
                      <CheckCircle className="h-3 w-3" />
                    )}
                    {application.status === "rejected" && (
                      <XCircle className="h-3 w-3" />
                    )}
                    {application.status === "pending" && (
                      <Clock className="h-3 w-3" />
                    )}
                    {application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Position:</span>
                <p className="text-gray-900">
                  {application.vacancy?.JobTitle || "N/A"}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Applied On:</span>
                <p className="text-gray-900">
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Preferred Start Date:
                </span>
                <p className="text-gray-900">
                  {application.start_date
                    ? new Date(application.start_date).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          {application.qualification &&
            application.qualification.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Qualifications
                </h3>
                <ul className="space-y-1">
                  {application.qualification.map((qual, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Cover Letter */}
          {application.cover_letter && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Cover Letter</h3>
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {application.cover_letter}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Page;
