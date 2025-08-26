// types.ts
import { Table } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData?: (id: string, columnId: string, value: any) => void;
  }
}

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  streaming?: boolean;
}

export interface SearchSuggestion {
  suggestions: string[];
}

export interface TitleProps {
  heading: string;
  gradheading: string;
  description?: string;
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
