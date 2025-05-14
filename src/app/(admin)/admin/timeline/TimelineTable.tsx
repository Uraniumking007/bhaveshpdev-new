"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TimelineTable({
  timeline,
  addTimeline,
  deleteTimeline,
  updateTimeline,
}: {
  timeline: any[];
  addTimeline: (formData: FormData) => Promise<void>;
  deleteTimeline: (id: string) => Promise<void>;
  updateTimeline: (formData: FormData) => Promise<void>;
}) {
  const [editId, setEditId] = useState<string | null>(null);

  function EditTimelineRow({
    item,
    onCancel,
  }: {
    item: any;
    onCancel: () => void;
  }) {
    const [formState, setFormState] = useState({
      yearStart: item.yearStart || "",
      yearEnd: item.yearEnd || "",
      ongoing: !!item.ongoing,
      title: item.title || "",
      description: item.description || "",
      type: item.type || "",
    });

    return (
      <form
        action={updateTimeline}
        className="flex flex-col md:flex-row gap-2 items-center"
      >
        <input type="hidden" name="id" value={item.id} />
        <input
          name="yearStart"
          value={formState.yearStart}
          onChange={(e) =>
            setFormState((f) => ({ ...f, yearStart: e.target.value }))
          }
          className="border p-1 rounded w-20"
          required
        />
        <input
          name="yearEnd"
          value={formState.yearEnd || ""}
          onChange={(e) =>
            setFormState((f) => ({ ...f, yearEnd: e.target.value }))
          }
          className="border p-1 rounded w-20"
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            name="ongoing"
            checked={formState.ongoing}
            onChange={(e) =>
              setFormState((f) => ({ ...f, ongoing: e.target.checked }))
            }
          />
          Ongoing
        </label>
        <input
          name="title"
          value={formState.title}
          onChange={(e) =>
            setFormState((f) => ({ ...f, title: e.target.value }))
          }
          className="border p-1 rounded w-32"
          required
        />
        <input
          name="type"
          value={formState.type}
          onChange={(e) =>
            setFormState((f) => ({ ...f, type: e.target.value }))
          }
          className="border p-1 rounded w-24"
          required
        />
        <input
          name="description"
          value={formState.description}
          onChange={(e) =>
            setFormState((f) => ({ ...f, description: e.target.value }))
          }
          className="border p-1 rounded w-40"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-2 py-1 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 px-2 py-1"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 mt-6">
      <table className="w-full text-sm text-white">
        <thead>
          <tr className="bg-white/10">
            <th className="p-3 font-semibold">Start</th>
            <th className="p-3 font-semibold">End</th>
            <th className="p-3 font-semibold">Ongoing</th>
            <th className="p-3 font-semibold">Title</th>
            <th className="p-3 font-semibold">Type</th>
            <th className="p-3 font-semibold">Description</th>
            <th className="p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {timeline.map((item: any, idx: number) => (
            <tr
              key={item.id}
              className={
                idx % 2 === 0
                  ? "bg-white/5 hover:bg-white/10 transition"
                  : "hover:bg-white/10 transition"
              }
            >
              {editId === item.id ? (
                <td colSpan={7} className="p-3 bg-black/60 rounded-lg">
                  <EditTimelineRow
                    item={item}
                    onCancel={() => setEditId(null)}
                  />
                </td>
              ) : (
                <>
                  <td className="p-3">{item.yearStart}</td>
                  <td className="p-3">{item.yearEnd}</td>
                  <td className="p-3 text-center">
                    {item.ongoing ? "Yes" : "No"}
                  </td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.type}</td>
                  <td
                    className="p-3 max-w-xs truncate"
                    title={item.description}
                  >
                    {item.description}
                  </td>
                  <td className="p-3 flex gap-2 items-center">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                      onClick={() => setEditId(item.id)}
                    >
                      Edit
                    </Button>
                    <form
                      action={async () => {
                        await deleteTimeline(item.id);
                      }}
                      className="inline"
                    >
                      <Button
                        type="submit"
                        size="sm"
                        variant="outline"
                        className="text-red-400 border-red-400 hover:bg-red-400/10"
                      >
                        Delete
                      </Button>
                    </form>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
