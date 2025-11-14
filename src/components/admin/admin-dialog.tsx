import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AdminDialogProps = {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function AdminDialog({
  title,
  description,
  trigger,
  children,
  open,
  onOpenChange,
}: AdminDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl border-white/10 bg-neutral-950 text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className="text-sm text-white/60">{description}</p>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
