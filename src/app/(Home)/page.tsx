import DevInfo from "@/components/dev-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bhavesh Patil - Home",
  description: "Bhavesh Patil's personal website.",
};

export default function Home() {
  return <DevInfo />;
}
