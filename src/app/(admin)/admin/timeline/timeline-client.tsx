"use client";

import { useMemo, useState, useTransition } from "react";
import type { AdminTimelineEntry } from "@/types/admin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { timelineSchema, TimelineFormValues } from "@/lib/validations/admin";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTimelineEntry,
  removeTimelineEntry,
  updateTimelineEntry,
} from "./actions";
import { AdminTable } from "@/components/admin/admin-table";
import { AdminDialog } from "@/components/admin/admin-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type TimelineClientProps = {
  entries: AdminTimelineEntry[];
};

export function TimelineClient({ entries }: TimelineClientProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const sortedEntries = useMemo(
    () =>
      [...entries].sort((a, b) => {
        const aVal = parseInt(a.yearStart || "0", 10);
        const bVal = parseInt(b.yearStart || "0", 10);
        return bVal - aVal;
      }),
    [entries]
  );

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Remove "${title}" from timeline?`)) return;
    setDeletingId(id);
    startTransition(async () => {
      try {
        await removeTimelineEntry(id);
        toast.success("Timeline entry deleted");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete timeline entry");
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <AdminTable
      title="Timeline"
      description="Curate the milestones that define your journey."
      actions={
        <TimelineDialog
          onSuccess={() => router.refresh()}
          trigger={
            <Button className="bg-white/10 text-white hover:bg-white/20">
              Add entry
            </Button>
          }
        />
      }
    >
      {sortedEntries.length === 0 ? (
        <Alert className="border-white/20 bg-black/30 text-white">
          <AlertTitle>No entries yet</AlertTitle>
          <AlertDescription>
            Add your first milestone to start building the timeline.
          </AlertDescription>
        </Alert>
      ) : (
        <Table className="[&_th]:text-white [&_td]:text-white/70">
          <TableHeader>
            <TableRow className="border-white/10 text-white">
              <TableHead>Period</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.map((entry) => (
              <TableRow key={entry.id} className="border-white/10">
                <TableCell className="font-medium text-white">
                  {entry.yearStart}
                  {entry.ongoing
                    ? " – Present"
                    : entry.yearEnd
                    ? ` – ${entry.yearEnd}`
                    : ""}
                </TableCell>
                <TableCell>{entry.title}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell className="max-w-sm">
                  <p className="line-clamp-2">{entry.description}</p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <TimelineDialog
                      entry={entry}
                      onSuccess={() => router.refresh()}
                      trigger={
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Edit
                        </Button>
                      }
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      disabled={isPending && deletingId === entry.id}
                      onClick={() => handleDelete(entry.id, entry.title || "")}
                    >
                      {isPending && deletingId === entry.id
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </AdminTable>
  );
}

type TimelineDialogProps = {
  entry?: AdminTimelineEntry;
  onSuccess: () => void;
  trigger: React.ReactNode;
};

function TimelineDialog({ entry, onSuccess, trigger }: TimelineDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TimelineFormValues>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      yearStart: entry?.yearStart || "",
      yearEnd: entry?.yearEnd || "",
      ongoing: entry?.ongoing ?? false,
      title: entry?.title || "",
      type: entry?.type || "",
      description: entry?.description || "",
    },
  });

  const handleSubmit = (values: TimelineFormValues) => {
    startTransition(async () => {
      try {
        if (entry) {
          await updateTimelineEntry(entry.id, {
            ...values,
            yearEnd: values.yearEnd || undefined,
          });
          toast.success("Timeline entry updated");
        } else {
          await createTimelineEntry({
            ...values,
            yearEnd: values.yearEnd || undefined,
          });
          toast.success("Timeline entry added");
        }
        form.reset();
        setOpen(false);
        onSuccess();
      } catch (error) {
        console.error(error);
        toast.error("Unable to save timeline entry");
      }
    });
  };

  return (
    <AdminDialog
      title={entry ? "Edit entry" : "Add entry"}
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="yearStart">Start year</Label>
            <Input
              id="yearStart"
              placeholder="2018"
              {...form.register("yearStart")}
            />
            {form.formState.errors.yearStart && (
              <p className="text-sm text-red-400">
                {form.formState.errors.yearStart.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="yearEnd">End year</Label>
            <Input
              id="yearEnd"
              placeholder="2020"
              {...form.register("yearEnd")}
              disabled={form.watch("ongoing")}
            />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3">
          <div>
            <p className="font-medium">Ongoing</p>
            <p className="text-sm text-white/60">
              Toggle if this milestone is still active.
            </p>
          </div>
          <Controller
            control={form.control}
            name="ongoing"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...form.register("title")} />
          {form.formState.errors.title && (
            <p className="text-sm text-red-400">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            placeholder="Education, Experience..."
            {...form.register("type")}
          />
          {form.formState.errors.type && (
            <p className="text-sm text-red-400">
              {form.formState.errors.type.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Tell the story behind this milestone"
            {...form.register("description")}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-red-400">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-white/10 text-white hover:bg-white/20"
          >
            {isPending ? "Saving..." : entry ? "Save changes" : "Create entry"}
          </Button>
        </div>
      </form>
    </AdminDialog>
  );
}
