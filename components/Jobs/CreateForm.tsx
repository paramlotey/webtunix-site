"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    JobTitle: "",
    Job_Description: "",
    Min_exp: 0,
    Max_exp: 0,
    Job_type: "FULL_TIME",
    Salary: "",
    Primary_Skills: "",
    Secondary_Skills: "",
    Show: false,
  });


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelect(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSwitch(name: string, value: boolean) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      JobTitle: formData.JobTitle,
      Job_Description: formData.Job_Description,
      Min_exp: Number(formData.Min_exp),
      Max_exp: Number(formData.Max_exp),
      Job_type: formData.Job_type,
      Salary: formData.Salary,
      Primary_Skills: formData.Primary_Skills.split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      Secondary_Skills: formData.Secondary_Skills.split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      Show: formData.Show,
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Vacancy created successfully!");
        setFormData({
          JobTitle: "",
          Job_Description: "",
          Min_exp: 0,
          Max_exp: 0,
          Job_type: "",
          Salary: "",
          Primary_Skills: "",
          Secondary_Skills: "",
          Show: false,
        });
      } else {
        const err = await res.json();
        alert(`Error: ${err.error || "Failed to create vacancy"}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating vacancy.");
    }
  }

  return (
    <div>
      {/* Vacancy Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div>
          <Label>Job Title</Label>
          <Input
            name="JobTitle"
            value={formData.JobTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Job Description</Label>
          <Textarea
            name="Job_Description"
            value={formData.Job_Description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Min Experience</Label>
            <Input
              type="number"
              name="Min_exp"
              value={formData.Min_exp}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Max Experience</Label>
            <Input
              type="number"
              name="Max_exp"
              value={formData.Max_exp}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <Label>Job Type</Label>
          <Select
            value={formData.Job_type}
            onValueChange={(val) => handleSelect("Job_type", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULL_TIME">FULL TIME</SelectItem>
              <SelectItem value="PART_TIME">PART TIME</SelectItem>
              <SelectItem value="CONTRACT">CONTRACT</SelectItem>
              <SelectItem value="FREELANCE">FREELANCE</SelectItem>
              <SelectItem value="INTERNSHIP">INTERNSHIP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Salary/Month(in ₹)</Label>
          <Input
            name="Salary"
            value={formData.Salary}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Primary Skills (comma separated)</Label>
            <Input
              name="Primary_Skills"
              value={formData.Primary_Skills}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Secondary Skills (comma separated)</Label>
            <Input
              name="Secondary_Skills"
              value={formData.Secondary_Skills}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={formData.Show}
            onCheckedChange={(val) => handleSwitch("Show", val)}
          />
          <Label>Publish Vacancy</Label>
        </div>

        <Button type="submit">Create Vacancy</Button>
      </form>
    </div>
  );
};

export default CreateForm;
