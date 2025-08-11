import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Resume",
  description: "Bhavesh Patil's resume.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
