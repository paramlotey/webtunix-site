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
export interface ApiError {
  data?: {
    message?: string;
  };
}

export type PageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
    sort?: "latest" | "oldest" | "popular";
  }>;
};
export interface VisitorData {
  id: string;
  ip: string;
  location?: {
    ip?: string;
    asn?: string;
    org?: string;
    city?: string;
    in_eu?: boolean;
    postal?: string;
    region?: string;
    country?: string;
    network?: string;
    version?: string;
    currency?: string;
    timezone?: string;
    languages?: string;
    loc?: number;
    utc_offset?: string;
    country_tld?: string;
    region_code?: string;
    country_area?: number;
    country_code?: string;
    country_name?: string;
    currency_name?: string;
    continent_code?: string;
    country_capital?: string;
    country_code_iso3?: string;
    country_population?: number;
    country_calling_code?: string;
  };
  browser: { name: string; major?: string; version: string };
  os: { name: string; version: string };
  device?: { [key: string]: any };
  cpu: { architecture: string };
  engine: { name: string; version: string };
  ua: string;
  isBot: boolean;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
}
export type Blog = {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  thumbnailImg: string;
  createdAt: string | Date;
  category: string[] | null;
};

export type Props = {
  initialBlogs: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  current: {
    category: string[];
    search: string;
    sort: "latest" | "oldest" | "popular";
  };
  categories: string[];
};
