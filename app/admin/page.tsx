import Image from "next/image";
import Link from "next/link";

const AdminHome = () => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="text-2xl font-bold text-center text-black">Admin Dashboard</h1>
            <p className="text-gray-600">
              Welcome to your admin panel. Use the menu button above to toggle
              the sidebar.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly mt-20 mb-20 gap-10">
        {/* Blogs */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image
            width="58"
            height="58"
            src="/icons/admin-blog.png"
            alt="blog"
          />

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Blogs
          </h5>

          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Manage blog posts, edit existing articles, and create new content
            for the platform.
          </p>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Manage Blogs
          </Link>
        </div>

        {/* Job Posts */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image
            width="58"
            height="58"
            src="/icons/admin-job.png"
            alt="job posts"
          />

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Job Posts
          </h5>

          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            View and manage job listings, update details, and post new job
            opportunities.
          </p>
          <Link
            href="/admin/jobs"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Manage Job Posts
          </Link>
        </div>

        {/* Applications */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image
            width="58"
            height="58"
            src="/icons/admin-apply.png"
            alt="applications"
          />

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Applications
          </h5>

          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Review submitted applications, update their status, and manage
            applicant details.
          </p>
          <Link
            href="/admin/applications"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Manage Applications
          </Link>
        </div>

        {/* User Management */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image
            width="58"
            height="58"
            src="/icons/admin-admin.png"
            alt="admin management"
          />

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            User Management
          </h5>

          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Manage your admin account and permissions.
          </p>
          <Link
            href="/admin/users"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Manage Users
          </Link>
        </div>

        {/* Analytics & Reports */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image
            width="58"
            height="58"
            src="/icons/admin-analytics.png"
            alt="analytics"
          />

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Analytics & Reports
          </h5>

          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Track website performance, user engagement, and application
            statistics.
          </p>
          <Link
            href="/admin/analytics"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            View Reports
          </Link>
        </div>

        {/* Settings & Configurations */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image
            width="58"
            height="58"
            src="/icons/admin-settings.png"
            alt="settings"
          />

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Settings & Configurations
          </h5>

          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Customize website settings, including dynamic SEO and site
            preferences.
          </p>
          <Link
            href="/admin/settings"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Configure Settings
          </Link>
        </div>

        {/* Enquiries */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image
            width="58"
            height="58"
            src="/icons/admin-enquiry.png"
            alt="enquiries"
          />

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Enquiries
          </h5>

          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Manage user enquiries and respond to queries efficiently.
          </p>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            View Enquiries
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
