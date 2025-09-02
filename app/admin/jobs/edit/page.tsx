"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Job {
  id: number;
  JobTitle: string;
  Job_Description: string;
  Min_exp: number;
  Max_exp: number;
  Job_type: string;
  Salary: string;
  Primary_Skills: string[];
  Secondary_Skills: string[];
  Show: boolean;
}

const Page = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs", { method: "GET" });
      const data = await res.json();

      if (data.success) {
        setJobs(data.jobs);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleJobStatus = async (id: number) => {
    try {
      const response = await fetch(`/api/jobs`, {
        method: "PATCH",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      if (data.success) {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === id ? { ...job, Show: !job.Show } : job
          )
        );
        toast.success("Job status updated successfully");
      } else {
        toast.error(data.message || "Failed to update job status");
      }
    } catch (error: unknown) {
      console.error("Toggle job status error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const deleteJob = async (id: number) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Job Deleted successfully");
        fetchJobs();
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and review job postings ({jobs.length} total)
          </p>
        </div>
        <Link href="/admin/jobs/create">
          <Button variant="default" className="whitespace-nowrap">
            Add New Job
          </Button>
        </Link>
      </div>
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No job postings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new job posting.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="hidden lg:block bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary(in ₹)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills (Primary & Secondary)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {job.JobTitle}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {job.Job_Description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            ID: {job.id}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.Job_type}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {job.Min_exp}-{job.Max_exp} yrs
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900">
                        {job.Salary || (
                          <span className="text-gray-400">Not specified</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {job.Primary_Skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.Secondary_Skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-black">
                        <Switch
                          checked={job.Show}
                          onCheckedChange={() => toggleJobStatus(job.id)}
                        />
                      </td>

                      <td className="space-x-1">
                        <EditJobs job={job} onJobUpdated={fetchJobs} />
                        <Button
                          variant={"destructive"}
                          onClick={() => deleteJob(job.id)}
                        >
                          <Trash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:hidden space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow rounded-lg p-4 space-y-2 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {job.JobTitle}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {job.Job_Description}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">
                      ID: {job.id}
                    </div>
                  </div>
                  <Switch
                    checked={job.Show}
                    onCheckedChange={() => toggleJobStatus(job.id)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {job.Job_type}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {job.Min_exp}-{job.Max_exp} yrs
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {job.Salary || "Not specified"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {job.Primary_Skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.Secondary_Skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <EditJobs job={job} onJobUpdated={fetchJobs} />
                  <Button
                    variant={"destructive"}
                    onClick={() => deleteJob(job.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

const EditJobs = ({
  job,
  onJobUpdated,
}: {
  job: Job;
  onJobUpdated: () => void;
}) => {
  const [formData, setFormData] = useState<Job>(job);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    field: keyof Job,
    value: string[] | string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Job updated successfully");
        setOpen(false);
        onJobUpdated();
      } else {
        toast.error(data.message || "Failed to update job");
      }
    } catch (err) {
      console.error("Update failed", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg text-black">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.JobTitle}
              onChange={(e) => handleChange("JobTitle", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={formData.Job_Description}
              onChange={(e) => handleChange("Job_Description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min_exp">Min Exp</Label>
              <Input
                type="number"
                id="min_exp"
                value={formData.Min_exp}
                onChange={(e) =>
                  handleChange("Min_exp", Number(e.target.value))
                }
              />
            </div>
            <div>
              <Label htmlFor="max_exp">Max Exp</Label>
              <Input
                type="number"
                id="max_exp"
                value={formData.Max_exp}
                onChange={(e) =>
                  handleChange("Max_exp", Number(e.target.value))
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="salary">Salary(in ₹)</Label>
            <Input
              id="salary"
              value={formData.Salary}
              onChange={(e) => handleChange("Salary", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="job_type">Job Type</Label>
            <Select
              value={formData.Job_type}
              onValueChange={(value) => handleChange("Job_type", value)}
            >
              <SelectTrigger id="job_type" className="w-full">
                <SelectValue placeholder="Select Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">FULL_TIME</SelectItem>
                <SelectItem value="PART_TIME">PART_TIME</SelectItem>
                <SelectItem value="CONTRACT">CONTRACT</SelectItem>
                <SelectItem value="FREELANCE">FREELANCE</SelectItem>
                <SelectItem value="INTERNSHIP">INTERNSHIP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="primary">Primary Skills (comma separated)</Label>
            <Input
              id="primary"
              value={formData.Primary_Skills.join(", ")}
              onChange={(e) =>
                handleChange(
                  "Primary_Skills",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="secondary">
              Secondary Skills (comma separated)
            </Label>
            <Input
              id="secondary"
              value={formData.Secondary_Skills.join(", ")}
              onChange={(e) =>
                handleChange(
                  "Secondary_Skills",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
