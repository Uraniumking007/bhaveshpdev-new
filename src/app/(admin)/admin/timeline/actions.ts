"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTimeline() {
  return await prisma.timeline.findMany({ orderBy: { yearStart: "desc" } });
}

export async function addTimeline(formData: FormData) {
  const yearStart = formData.get("yearStart") as string;
  const yearEnd = formData.get("yearEnd") as string | null;
  const ongoing = formData.get("ongoing") === "on";
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  await prisma.timeline.create({
    data: { yearStart, yearEnd, ongoing, title, description, type },
  });
  revalidatePath("/admin/timeline");
}

export async function deleteTimeline(id: string) {
  await prisma.timeline.delete({ where: { id } });
  revalidatePath("/admin/timeline");
}

export async function updateTimeline(formData: FormData) {
  const id = formData.get("id") as string;
  const yearStart = formData.get("yearStart") as string;
  const yearEnd = formData.get("yearEnd") as string | null;
  const ongoing = formData.get("ongoing") === "on";
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  await prisma.timeline.update({
    where: { id },
    data: { yearStart, yearEnd, ongoing, title, description, type },
  });
  revalidatePath("/admin/timeline");
}
