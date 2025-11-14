"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export type TimelinePayload = {
  yearStart: string;
  yearEnd?: string | null;
  ongoing: boolean;
  title: string;
  description: string;
  type: string;
};

function sanitizePayload(payload: TimelinePayload) {
  return {
    yearStart: payload.yearStart,
    yearEnd: payload.yearEnd ? payload.yearEnd : null,
    ongoing: payload.ongoing,
    title: payload.title,
    description: payload.description,
    type: payload.type,
  };
}

function parseFormData(formData: FormData): TimelinePayload {
  return {
    yearStart: (formData.get("yearStart") as string) ?? "",
    yearEnd: formData.get("yearEnd")?.toString() || undefined,
    ongoing: formData.get("ongoing") === "on",
    title: (formData.get("title") as string) ?? "",
    description: (formData.get("description") as string) ?? "",
    type: (formData.get("type") as string) ?? "",
  };
}

async function revalidateTimeline() {
  revalidatePath("/timeline");
  revalidatePath("/admin/timeline");
}

export async function getTimeline() {
  await requireAdmin();
  return prisma.timeline.findMany({ orderBy: { yearStart: "desc" } });
}

export async function createTimelineEntry(payload: TimelinePayload) {
  await requireAdmin();
  try {
  await prisma.timeline.create({
      data: sanitizePayload(payload),
    });
    await revalidateTimeline();
  } catch (error) {
    console.error("Failed to create timeline entry", error);
    throw error;
  }
}

export async function updateTimelineEntry(
  id: string,
  payload: TimelinePayload
) {
  await requireAdmin();
  try {
    await prisma.timeline.update({
      where: { id },
      data: sanitizePayload(payload),
    });
    await revalidateTimeline();
  } catch (error) {
    console.error("Failed to update timeline entry", error);
    throw error;
  }
}

export async function removeTimelineEntry(id: string) {
  await requireAdmin();
  try {
  await prisma.timeline.delete({ where: { id } });
    await revalidateTimeline();
  } catch (error) {
    console.error("Failed to delete timeline entry", error);
    throw error;
  }
}

// Legacy form-based actions (used by older routes)
export async function addTimeline(formData: FormData) {
  await createTimelineEntry(parseFormData(formData));
}

export async function updateTimeline(formData: FormData) {
  const id = formData.get("id") as string;
  await updateTimelineEntry(id, parseFormData(formData));
}

export async function deleteTimeline(id: string) {
  await removeTimelineEntry(id);
}
