import {
  getTimeline,
  addTimeline,
  deleteTimeline,
  updateTimeline,
} from "./actions";
import TimelineTable from "./TimelineTable";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MagicBorderButton from "@/components/Buttons/magic-border-button";

export default async function AdminTimelinePage() {
  const timeline = await getTimeline();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Timeline</h1>
      <form
        action={addTimeline}
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <div>
          <Label htmlFor="yearStart">Start Year</Label>
          <Input
            name="yearStart"
            id="yearStart"
            placeholder="Start Year"
            required
          />
        </div>
        <div>
          <Label htmlFor="yearEnd">End Year</Label>
          <Input
            name="yearEnd"
            id="yearEnd"
            placeholder="End Year (or leave blank)"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ongoing"
            id="ongoing"
            className="accent-blue-500"
          />
          <Label htmlFor="ongoing">Ongoing</Label>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input name="title" id="title" placeholder="Title" required />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Input
            name="type"
            id="type"
            placeholder="Type (education, experience, etc)"
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            placeholder="Description"
            required
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <MagicBorderButton type="submit">Add Entry</MagicBorderButton>
        </div>
      </form>
      <TimelineTable timeline={timeline} deleteTimeline={deleteTimeline} />
    </div>
  );
}
