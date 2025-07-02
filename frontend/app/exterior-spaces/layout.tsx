import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exterior Spaces | ThinkxLife",
  description: "Interactive Exterior Spaces Prototype - ThinkxLife",
};

export default function ExteriorSpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden z-50">
      {children}
    </div>
  );
} 