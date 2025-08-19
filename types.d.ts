// types.ts
export interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

export interface SearchSuggestion {
  suggestions: string[];
}

export interface TitleProps {
  heading:string,
  gradheading:string,
  description:string
}

// Type for API error response
interface ApiError {
  data?: {
    message?: string;
  };
}

type PageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
    sort?: "latest" | "oldest" | "popular";
  }>;
};