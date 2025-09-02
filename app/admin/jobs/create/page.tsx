import CreateForm from "@/components/Jobs/CreateForm";
import React from "react";

const CreateJobs = () => {
  return (
    <div className="min-h-screen text-gray-900 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          📝 Create New Job
        </h1>
      <CreateForm />
      </div>
    </div>
  );
};

export default CreateJobs;
