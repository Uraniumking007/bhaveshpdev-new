import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { IconCertificate, IconFolder } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  title: "Admin Dashboard | Bhavesh P Dev",
  description: "Admin dashboard for managing your portfolio",
};

export default async function AdminDashboardPage() {
  const [certifications, projects] = await Promise.all([
    prisma.certification.count(),
    prisma.projects.count(),
  ]);

  const stats = [
    {
      name: "Certifications",
      value: certifications,
      icon: IconCertificate,
      href: "/admin/certifications",
    },
    {
      name: "Projects",
      value: projects,
      icon: IconFolder,
      href: "/admin/projects",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-white/70">
          Welcome to your portfolio admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className={cn(
              "bg-white/5 rounded-xl p-6 border border-white/10",
              "hover:bg-white/10 transition-colors duration-200"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/70">{stat.name}</p>
                <p className="text-2xl font-semibold text-white mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
