import { prisma } from "@/lib/prisma";
import { updateTimeline } from "../../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { notFound, redirect } from "next/navigation";

export default async function EditTimelinePage({
  params,
}: {
  params: { id: string };
}) {
  const timeline = await prisma.timeline.findUnique({
    where: { id: params.id },
  });
  if (!timeline) return notFound();

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Timeline Entry</h1>
      <form
        action={async (formData: FormData) => {
          "use server";
          await updateTimeline(formData);
          redirect("/admin/timeline");
        }}
        className="space-y-4 bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <input type="hidden" name="id" value={timeline.id} />
        <div>
          <Label htmlFor="yearStart">Start Year</Label>
          <Input
            name="yearStart"
            id="yearStart"
            defaultValue={timeline.yearStart || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="yearEnd">End Year</Label>
          <Input
            name="yearEnd"
            id="yearEnd"
            defaultValue={timeline.yearEnd || ""}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ongoing"
            id="ongoing"
            className="accent-blue-500"
            defaultChecked={!!timeline.ongoing}
          />
          <Label htmlFor="ongoing">Ongoing</Label>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            id="title"
            defaultValue={timeline.title || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Input
            name="type"
            id="type"
            defaultValue={timeline.type || ""}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
            id="description"
            defaultValue={timeline.description || ""}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="default">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
