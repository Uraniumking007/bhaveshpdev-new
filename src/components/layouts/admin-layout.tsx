"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils/cn";
import {
  IconCertificate,
  IconFolder,
  IconHome,
  IconSettings,
} from "@tabler/icons-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import SignOutButton from "@/app/(admin)/admin/_components/sign-out-button";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: IconFolder,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: IconFolder,
  },
  {
    name: "Certifications",
    href: "/admin/certifications",
    icon: IconCertificate,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: IconSettings,
  },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white/5 border-r border-white/10">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b border-white/10">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-white/10">
              <SignOutButton />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 pl-64">
          <main className="container mx-auto px-4 py-8">
            <div className="relative">
              <SparklesCore
                id="tsparticles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="absolute inset-0 pointer-events-none"
                particleColor="#FFFFFF"
              />
              <div className="relative">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
