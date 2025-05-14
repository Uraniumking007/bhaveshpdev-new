"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function TimelineTable({
  timeline,
  deleteTimeline,
}: {
  timeline: any[];
  deleteTimeline: (id: string) => Promise<void>;
}) {
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
              <td className="p-3">{item.yearStart}</td>
              <td className="p-3">{item.yearEnd}</td>
              <td className="p-3 text-center">{item.ongoing ? "Yes" : "No"}</td>
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.type}</td>
              <td className="p-3 max-w-xs truncate" title={item.description}>
                {item.description}
              </td>
              <td className="p-3 flex gap-2 items-center">
                <Link href={`/admin/timeline/${item.id}/edit`}>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                  >
                    Edit
                  </Button>
                </Link>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
