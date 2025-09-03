"use client";
import MarkdownRenderer from "@/components/Extra/MarkDownRender";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Message {
  id: string;
  sender: string;
  text: string;
  createdAt: string;
}

interface Session {
  id: string;
  sessionId: string;
  cookieId: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}
interface Location {
  city?: string;
  region?: string;
  country?: string;
}

interface Browser {
  name?: string;
  version?: string;
}

interface OS {
  name?: string;
  version?: string;
}

interface Device {
  vendor?: string;
  model?: string;
}

interface Cookie {
  id: string;
  ip: string;
  location?: Location;
  browser?: Browser;
  os?: OS;
  device?: Device;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: {
    cookie: Cookie;
    sessions: Session[];
    totalSessions: number;
    totalMessages: number;
  };
  success: boolean;
}

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState<ApiResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cookies/${id}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
        setError("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cookie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <p className="text-gray-600">No data found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-[90rem] mx-auto text-black">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md border p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Cookie Details
        </h1>
        <p className="text-gray-600">
          Cookie ID: <span className="font-mono text-sm">{id}</span>
        </p>
      </div>

      {/* Cookie Information */}
      <div className="bg-white rounded-lg shadow-md border p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">IP Address</p>
            <p className="text-gray-800">{data.cookie.ip}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Visit Count</p>
            <p className="text-gray-800">{data.cookie.visitCount}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">First Visit</p>
            <p className="text-gray-800">{formatDate(data.cookie.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Visit</p>
            <p className="text-gray-800">{formatDate(data.cookie.updatedAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Browser</p>
            <p className="text-gray-800">
              {data.cookie.browser?.name} {data.cookie.browser?.version}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Operating System
            </p>
            <p className="text-gray-800">
              {data.cookie.os?.name} {data.cookie.os?.version}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Device</p>
            <p className="text-gray-800">
              {data.cookie.device?.vendor} {data.cookie.device?.model}
            </p>
          </div>
          {data.cookie.location && (
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-gray-800">
                {data.cookie.location.city}, {data.cookie.location.region}{" "}
                {data.cookie.location.country}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Total Chat Sessions
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {data.totalSessions}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Total Messages
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {data.totalMessages}
          </p>
        </div>
      </div>

      {/* Chat Sessions */}
      <div className="bg-white rounded-lg shadow-md border p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Chat Sessions
        </h2>

        {data.sessions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No chat sessions found
          </p>
        ) : (
          <div className="grid xs:grid-cols-1 grid-cols-2 gap-10">
            {data.sessions.map((session, index) => (
              <div
                key={session.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Session #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Started: {formatDate(session.createdAt)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Messages: {session.messages.length}
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                    {session.sessionId}
                  </span>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto py-5 pe-2">
                  {session.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-xl px-4 py-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <MarkdownRenderer>{message.text}</MarkdownRenderer>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
