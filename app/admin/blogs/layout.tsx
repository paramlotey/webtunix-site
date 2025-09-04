import type { ReactNode } from "react";

export default function AdminBlogsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <section className="p-6 max-w-7xl mx-auto">{children}</section>;
}
