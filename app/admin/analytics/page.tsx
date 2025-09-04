"use client";

import React, { useEffect, useState } from "react";
import { Users, Globe, Monitor, Cpu, Eye, Bot, Calendar } from "lucide-react";
import { VisitorData } from "@/types";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cookies, setCookies] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await fetch("/api/cookies");
        const data = await response.json();
        setCookies(data?.data || []);
      } catch (error) {
        console.error("Error fetching cookies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCookies();
  }, []);

  const stats = {
    totalVisitors: cookies.length,
    botVisits: cookies.filter((c) => c.isBot).length,
    totalVisits: cookies.reduce((sum, c) => sum + c.visitCount, 0),
    uniqueLocations: new Set(
      cookies
        .map((c) =>
          c.location
            ? `${c.location.city || "Unknown City"}, ${
                c.location.country_name ||
                c.location.country ||
                "Unknown Country"
              }`
            : null
        )
        .filter(Boolean)
    ).size,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 text-lg">Loading visitor data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[90rem] mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-black">
          Visitor Analytics Dashboard
        </h1>
        <p className="text-slate-600 text-lg">
          Real-time insights into your website traffic
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">
                Total Visitors
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {stats.totalVisitors}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Visits</p>
              <p className="text-3xl font-bold text-slate-900">
                {stats.totalVisits}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">
                Unique Locations
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {stats.uniqueLocations}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Bot Visits</p>
              <p className="text-3xl font-bold text-slate-900">
                {stats.botVisits}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Bot className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Visitor Details
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  ID & IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Visits
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Browser
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  OS
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Architecture
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Engine
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  First Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  User Agent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {cookies.map((cookie, index) => (
                <tr
                  key={cookie.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-25"
                  }`}
                  onClick={() => router.push(`/admin/analytics/${cookie.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">
                          {cookie.id}
                        </span>
                        <span className="font-mono text-sm text-slate-700">
                          {cookie.ip}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-slate-400 mt-1" />
                      {cookie.location ? (
                        <div className="text-slate-700 text-sm space-y-0.5">
                          <div className="font-medium">
                            {cookie.location.city || "Unknown City"},{" "}
                            {cookie.location.country_name ||
                              cookie.location.country ||
                              "Unknown Country"}
                          </div>
                          <div className="text-xs text-slate-500">
                            {cookie.location.region} • {cookie.location.postal}
                          </div>
                          <div className="text-xs text-slate-500">
                            ISP: {cookie.location.org}
                          </div>
                          <div className="text-xs text-slate-500">
                            Timezone: {cookie.location.timezone}
                          </div>
                          <div className="text-xs text-slate-500">
                            Lat , Lng : {cookie.location.loc}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-700">Unknown</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        cookie.visitCount > 5
                          ? "bg-green-100 text-green-700"
                          : cookie.visitCount > 1
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {cookie.visitCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        cookie.isBot
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {cookie.isBot ? (
                        <Bot className="w-3 h-3" />
                      ) : (
                        <Users className="w-3 h-3" />
                      )}
                      {cookie.isBot ? "Bot" : "Human"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                    <div className="space-y-1">
                      <div className="font-medium">{cookie.browser.name}</div>
                      <div className="text-xs text-slate-500">
                        {cookie.browser.version}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                    <div className="space-y-1">
                      <div className="font-medium">{cookie.os.name}</div>
                      <div className="text-xs text-slate-500">
                        {cookie.os.version}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-700 text-sm">
                        {cookie.cpu.architecture}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                    <div className="space-y-1">
                      <div className="font-medium">{cookie.engine.name}</div>
                      <div className="text-xs text-slate-500">
                        {cookie.engine.version}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div className="text-sm">
                        {new Date(cookie.createdAt).toLocaleDateString()}
                        <div className="text-xs text-slate-500">
                          {new Date(cookie.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div className="text-sm">
                        {new Date(cookie.updatedAt).toLocaleDateString()}
                        <div className="text-xs text-slate-500">
                          {new Date(cookie.updatedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="whitespace-pre  text-sm text-slate-600 font-mono bg-slate-50 px-2 py-1 rounded">
                      {cookie.ua}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
