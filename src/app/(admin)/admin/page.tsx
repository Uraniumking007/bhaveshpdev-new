import { auth } from "@/app/api/auth/[...nextauth]/auth";
import React from "react";
import ProjectCardEditable from "./_components/admin-project-card";
import { prisma } from "@/lib/prisma";
import SignOutButton from "./_components/sign-out-button";
import CreateProjectModal from "./_components/create-project-card";
import Router from "next/router";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  if (!session.user.isDemo && !session.user.isAdmin) {
    return <div>Forbidden</div>;
  }

  // if (!session.user.isAdmin || !session.user.isDemo) {
  //   return (
  //     <div>
  //       forbidden {session.user.isAdmin ? "is admin" : "is not admin"}
  //       {session.user.isDemo ? "is demo" : "is not demo"}
  //     </div>
  //   );
  // }

  const projects = await prisma.projects.findMany({
    orderBy: {
      projectInitiated: "desc",
    },
  });

  return (
    <div className="overflow-auto h-screen w-full items-center flex flex-col">
      <div className="pt-16 text-center">
        <h1>Admin Dashboard</h1>
        <p>Welcome {session.user.username}</p>
        <div className="w-full flex gap-10">
          <SignOutButton />
          <CreateProjectModal />
        </div>
      </div>
      <div className="pt-8 flex justify-center items-center flex-wrap mb-10 w-full gap-8">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCardEditable {...project} />
          </div>
        ))}
      </div>
    </div>
  );
}
