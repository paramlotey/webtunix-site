import { ApiError } from "@/types";

// Type guard to check if error has the expected structure
export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as ApiError).data === "object"
  );
};