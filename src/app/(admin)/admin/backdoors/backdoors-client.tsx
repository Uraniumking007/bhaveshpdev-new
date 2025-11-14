"use client";

import { useMemo, useState, useTransition } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { backdoorSchema, BackdoorFormValues } from "@/lib/validations/admin";
import { Badge } from "@heroui/react";
import {
  createBackdoor,
  deleteBackdoor,
} from "@/app/(admin)/admin/backdoors/actions";
import { AdminTable } from "@/components/admin/admin-table";
import { AdminDialog } from "@/components/admin/admin-dialog";
import { AdminFormField } from "@/components/admin/admin-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { AdminBackdoorEntry } from "@/types/admin";

type BackdoorsClientProps = {
  entries: AdminBackdoorEntry[];
};

export function BackdoorsClient({ entries }: BackdoorsClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    AdminBackdoorEntry["statuscode"] | "all"
  >("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesStatus =
        statusFilter === "all" || entry.statuscode === statusFilter;
      const matchesQuery = entry.hostname
        ?.toLowerCase()
        .includes(query.toLowerCase());
      return matchesStatus && (matchesQuery ?? true);
    });
  }, [entries, query, statusFilter]);

  const handleDelete = (id: string, hostname: string | null) => {
    if (!confirm(`Delete ${hostname ?? "entry"}?`)) return;
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteBackdoor(id);
      if (!result.success) {
        toast.error(result.error || "Failed to delete backdoor");
      } else {
        toast.success("Backdoor deleted");
        router.refresh();
      }
      setDeletingId(null);
    });
  };

  return (
    <AdminTable
      title="Backdoors"
      description="Track partner access and payment confirmations."
      actions={
        <BackdoorDialog
          onSuccess={() => router.refresh()}
          trigger={
            <Button className="bg-white/10 text-white hover:bg-white/20">
              Add backdoor
            </Button>
          }
        />
      }
    >
      <div className="mb-4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center">
          <div className="flex-1">
            <Label htmlFor="backdoor-search" className="text-white/60">
              Search hostnames
            </Label>
            <Input
              id="backdoor-search"
              placeholder="example.com"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="mt-1 border-white/10 bg-black/30 text-white placeholder:text-white/40"
            />
          </div>
          <div className="lg:w-64">
            <Label className="text-white/60">Status filter</Label>
            <Select
              value={statusFilter}
              onValueChange={(val: AdminBackdoorEntry["statuscode"] | "all") =>
                setStatusFilter(val)
              }
            >
              <SelectTrigger className="mt-1 border-white/10 bg-black/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 text-white">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="authorized">Authorized</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="unauthorized">Unauthorized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-sm text-white/60">
          Showing {filteredEntries.length} of {entries.length}
        </p>
      </div>

      {filteredEntries.length === 0 ? (
        <Alert className="border-white/20 bg-black/30 text-white">
          <AlertTitle>No backdoors recorded</AlertTitle>
          <AlertDescription>
            Add your first entry to keep track of partner access.
          </AlertDescription>
        </Alert>
      ) : (
        <Table className="[&_th]:text-white [&_td]:text-white/70">
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Hostname</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id} className="border-white/10">
                <TableCell className="font-medium text-white">
                  {entry.hostname || "—"}
                </TableCell>
                <TableCell>
                  {entry.payment !== null
                    ? `$${entry.payment.toFixed(2)}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={entry.statuscode} />
                </TableCell>
                <TableCell>
                  {new Date(entry.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    disabled={isPending && deletingId === entry.id}
                    onClick={() => handleDelete(entry.id, entry.hostname)}
                  >
                    {isPending && deletingId === entry.id
                      ? "Deleting..."
                      : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </AdminTable>
  );
}

function StatusBadge({ status }: { status: AdminBackdoorEntry["statuscode"] }) {
  const colorMap = {
    authorized: "success" as const,
    partial: "warning" as const,
    unauthorized: "danger" as const,
  };
  return (
    <Badge color={colorMap[status]} variant="flat">
      {status}
    </Badge>
  );
}

type BackdoorDialogProps = {
  onSuccess: () => void;
  trigger: React.ReactNode;
};

function BackdoorDialog({ onSuccess, trigger }: BackdoorDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<BackdoorFormValues>({
    resolver: zodResolver(backdoorSchema),
    defaultValues: {
      hostname: "",
      payment: "0",
      statuscode: "authorized",
    },
  });

  const onSubmit = (values: BackdoorFormValues) => {
    startTransition(async () => {
      const result = await createBackdoor({
        hostname: values.hostname,
        payment: parseFloat(values.payment),
        statuscode: values.statuscode,
      });

      if (!result.success) {
        toast.error(result.error || "Failed to create backdoor");
        return;
      }

      toast.success("Backdoor created");
      form.reset();
      setOpen(false);
      onSuccess();
    });
  };

  return (
    <AdminDialog
      title="Add backdoor"
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <AdminFormField label="Hostname">
          <>
            <Input id="hostname" {...form.register("hostname")} />
            {form.formState.errors.hostname && (
              <p className="text-sm text-red-400">
                {form.formState.errors.hostname.message}
              </p>
            )}
          </>
        </AdminFormField>
        <AdminFormField label="Payment">
          <>
            <Input
              id="payment"
              type="number"
              step="0.01"
              {...form.register("payment")}
            />
            {form.formState.errors.payment && (
              <p className="text-sm text-red-400">
                {form.formState.errors.payment.message}
              </p>
            )}
          </>
        </AdminFormField>
        <AdminFormField label="Status">
          <Controller
            control={form.control}
            name="statuscode"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="mt-1 border-white/10 bg-white/5 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 text-white">
                  <SelectItem value="authorized">Authorized</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unauthorized">Unauthorized</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </AdminFormField>
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
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </AdminDialog>
  );
}
