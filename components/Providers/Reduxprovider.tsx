"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/redux/Store/Store";
import { Toaster } from "sonner";
interface ReduxProviderProps {
  children: ReactNode;
}
const Store = makeStore();
export default function ReduxProvider({
  children,
}: ReduxProviderProps) {
  return <Provider store={Store}><Toaster richColors/>{children}</Provider>;
}
