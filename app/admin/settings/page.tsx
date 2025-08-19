"use client";
import { RouteSettings } from "@/components/Settings/Modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RouteInfo {
  path: string;
  type: "static" | "dynamic" | "catch-all";
  hasLayout: boolean;
  hasLoading: boolean;
  hasError: boolean;
}

interface RoutesResponse {
  success: boolean;
  routes: RouteInfo[];
  total: number;
  expanded: boolean;
}

export default function SEOSettings() {
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandDynamic, setExpandDynamic] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "static" | "dynamic" | "catch-all"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(0);

  const fetchRoutes = async (expand: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/routes?expand=${expand}`);
      const data: RoutesResponse = await response.json();

      if (data.success) {
        setRoutes(data.routes);
        setTotal(data.total);
      } else {
        setError("Failed to fetch routes");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRoutes(expandDynamic);
  }, [expandDynamic]);

  const filteredRoutes = routes.filter((route) => {
    const matchesFilter = filter === "all" || route.type === filter;
    const matchesSearch = route.path
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getRouteTypeColor = (type: string) => {
    switch (type) {
      case "static":
        return "bg-green-100 text-green-800";
      case "dynamic":
        return "bg-blue-100 text-blue-800";
      case "catch-all":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRouteTypeIcon = (type: string) => {
    switch (type) {
      case "static":
        return "📄";
      case "dynamic":
        return "🔗";
      case "catch-all":
        return "🌐";
      default:
        return "❓";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:p-8 text-black">
      <div className="max-w-7xl mx-auto rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 self-start bg-white z-50 rounded-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  🗺️ Route Explorer
                </h1>
                <p className="text-gray-600 text-lg">
                  Discover and analyze your Next.js application routes
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                  {total} Total Routes
                </span>
                <Link href="/sitemap.xml" target="_blank">
                  <Button>Generate Sitemap</Button>
                </Link>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-red-700">⚠️ {error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔍 Search Routes
                </label>
                <input
                  type="text"
                  placeholder="Search by path..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filter */}
              <div className="lg:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏷️ Filter by Type
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Types</option>
                  <option value="static">Static</option>
                  <option value="dynamic">Dynamic</option>
                  <option value="catch-all">Catch-all</option>
                </select>
              </div>

              {/* Dynamic Routes Toggle */}
              <div className="flex items-end">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={expandDynamic}
                    onChange={(e) => setExpandDynamic(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Expand Dynamic Routes
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Routes Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Route Path
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route, index) => (
                    <tr
                      key={`${route.path}-${index}`}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <code className="text-sm bg-gray-100 px-3 py-1 rounded-lg font-mono text-blue-600 border">
                            {route.path}
                          </code>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRouteTypeColor(
                            route.type
                          )}`}
                        >
                          <span className="mr-1">
                            {getRouteTypeIcon(route.type)}
                          </span>
                          {route.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <RouteSettings route={route.path} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-lg font-medium mb-2">
                          No routes found
                        </p>
                        <p className="text-sm">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredRoutes.filter((r) => r.type === "static").length}
              </div>
              <div className="text-sm text-gray-600">Static Routes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredRoutes.filter((r) => r.type === "dynamic").length}
              </div>
              <div className="text-sm text-gray-600">Dynamic Routes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredRoutes.filter((r) => r.type === "catch-all").length}
              </div>
              <div className="text-sm text-gray-600">Catch-all Routes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {filteredRoutes.length}
              </div>
              <div className="text-sm text-gray-600">Showing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
