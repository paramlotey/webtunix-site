"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: CloudinaryWidgetOptions,
        callback: (error: unknown, result: CloudinaryResult) => void
      ) => { open: () => void };
    };
  }
}

interface CloudinaryWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  sources?: Array<"local" | "url" | "camera" | "image_search">;
  multiple?: boolean;
  cropping?: boolean;
  [key: string]: unknown; // allows extra fields without using `any`
}

interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
    [key: string]: unknown; // extra info without `any`
  };
}

const UploadWidget = ({ onUpload }: { onUpload: (url: string) => void }) => {
  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openWidget = () => {
    if (!window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        uploadPreset: "Swissdigitech",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: false,
      },
      (error: unknown, result: CloudinaryResult) => {
        if (!error && result?.event === "success") {
          onUpload(result.info.secure_url);
        }
      }
    );

    widget.open();
  };

  return (
    <button
      onClick={openWidget}
      className="bg-blue-400 hover:bg-blue-500 duration-200 p-2 rounded-md"
    >
      Upload Image
    </button>
  );
};

export default UploadWidget;
