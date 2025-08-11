"use client";

import { IconTrash } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils/cn";

interface BackdoorAdminCardProps {
  backdoor: {
    id: bigint;
    hostname: string | null;
    payment: number | null;
    statuscode: "authorized" | "partial" | "unauthorized";
    created_at: Date;
  };
  onDelete: (id: string) => Promise<void>;
}

export function BackdoorAdminCard({
  backdoor,
  onDelete,
}: BackdoorAdminCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "authorized":
        return "bg-green-500/20 text-green-500";
      case "partial":
        return "bg-yellow-500/20 text-yellow-500";
      case "unauthorized":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {backdoor.hostname || "No Hostname"}
          </h3>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              getStatusColor(backdoor.statuscode)
            )}
          >
            {backdoor.statuscode}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-white/70 text-sm">
            Payment: {backdoor.payment ? `$${backdoor.payment}` : "N/A"}
          </p>
          <p className="text-white/70 text-sm">
            Created: {new Date(backdoor.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => onDelete(backdoor.id.toString())}
            className={cn(
              "bg-red-500/20 hover:bg-red-500/30 text-red-500",
              "transition-all duration-300",
              "flex items-center gap-2"
            )}
          >
            <IconTrash className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
