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