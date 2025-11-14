import { Label } from "@/components/ui/label";

type AdminFormFieldProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminFormField({
  label,
  description,
  children,
}: AdminFormFieldProps) {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-white">{label}</Label>
        {description && <p className="text-sm text-white/60">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function AdminFormActions({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end gap-2">{children}</div>;
}
