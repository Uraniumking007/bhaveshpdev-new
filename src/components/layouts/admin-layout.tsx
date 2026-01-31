"use client";

import { useMemo } from "react";
import type { ComponentType, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IconCertificate,
  IconFolder,
  IconHome,
  IconLock,
  IconLogout,
  IconProps,
  IconSettings,
  IconTimeline,
} from "@tabler/icons-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { signOut } from "next-auth/react";

type NavigationItem = {
  name: string;
  href: string;
  icon: ComponentType<IconProps>;
};

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/admin", icon: IconHome },
  { name: "Projects", href: "/admin/projects", icon: IconFolder },
  { name: "Timeline", href: "/admin/timeline", icon: IconTimeline },
  {
    name: "Certifications",
    href: "/admin/certifications",
    icon: IconCertificate,
  },
  { name: "Backdoors", href: "/admin/backdoors", icon: IconLock },
  { name: "Settings", href: "/admin/settings", icon: IconSettings },
];

function NavigationLinks({ activeHref }: { activeHref: string }) {
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      {navigation.map((item) => {
        const isActive = activeHref.startsWith(item.href);
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-2"
                onClick={() => setOpenMobile(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const activeHref = useMemo(() => {
    return (
      navigation.find((item) => pathname.startsWith(item.href))?.href ??
      navigation[0].href
    );
  }, [pathname]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-black text-white">
        <Sidebar collapsible="icon" className="border-r border-white/10">
          <SidebarHeader>
            <div className="flex items-center gap-3 rounded-lg bg-white/5 px-2 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-semibold">
                BP
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Bhavesh P Dev</p>
                <p className="text-xs text-white/60">Admin Console</p>
              </div>
            </div>
            <SidebarInput placeholder="Search navigation…" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Manage</SidebarGroupLabel>
              <SidebarGroupContent>
                <NavigationLinks activeHref={activeHref} />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => signOut()} tooltip="Sign out">
                  <IconLogout className="h-4 w-4" />
                  <span>Sign out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="bg-black text-white">
          <header className="sticky top-0 z-20 flex h-16 items-center border-b border-white/10 bg-black/70 px-4 backdrop-blur-md lg:px-8">
            <div className="flex flex-1 items-center gap-3">
              <SidebarTrigger className="text-white" />
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">
                  Admin Portal
                </p>
                <h1 className="text-2xl font-semibold">Control Center</h1>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/30 text-white"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </header>
          <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5/10">
              <SparklesCore
                id="admin-sidebar-stars"
                background="transparent"
                minSize={0.6}
                maxSize={1.2}
                particleDensity={70}
                className="pointer-events-none absolute inset-0"
                particleColor="#FFFFFF"
              />
              <div className="relative z-10 p-4 lg:p-8">{children}</div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
