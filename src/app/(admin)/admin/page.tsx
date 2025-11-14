import { Metadata } from "next";
import Link from "next/link";
import { IconCertificate, IconFolder, IconLock } from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Admin Dashboard | Bhavesh P Dev",
  description: "Admin dashboard for managing your portfolio",
};

export default async function AdminDashboardPage() {
  const [certifications, projects, backdoors] = await Promise.all([
    prisma.certification.count().catch(() => 0),
    prisma.projects.count().catch(() => 0),
    prisma.confirmation.count().catch(() => 0),
  ]);

  const stats = [
    {
      name: "Certifications",
      value: certifications,
      icon: IconCertificate,
      href: "/admin/certifications",
      description: "Verified achievements currently published",
    },
    {
      name: "Projects",
      value: projects,
      icon: IconFolder,
      href: "/admin/projects",
      description: "Showcase entries live on the portfolio",
    },
    {
      name: "Backdoors",
      value: backdoors,
      icon: IconLock,
      href: "/admin/backdoors",
      description: "Authorization rules configured for access",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <BackgroundBeams className="pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative z-10 space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            System Overview
          </p>
          <h1 className="text-4xl font-bold">Welcome back, Bhavesh</h1>
          <p className="max-w-2xl text-white/70">
            Track portfolio vitals, publish new updates, and keep your projects,
            certifications, and access controls in perfect sync.
          </p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href} prefetch className="block">
            <Card
              className={cn(
                "h-full border-white/10 bg-white/5/50 text-white transition-all duration-300",
                "hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardDescription className="text-white/60">
                    {stat.name}
                  </CardDescription>
                  <CardTitle className="text-4xl font-semibold">
                    {stat.value}
                  </CardTitle>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardDescription className="px-6 text-white/60">
                {stat.description}
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
