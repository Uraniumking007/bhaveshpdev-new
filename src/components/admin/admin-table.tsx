import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AdminTableProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function AdminTable({
  title,
  description,
  actions,
  children,
}: AdminTableProps) {
  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && (
            <CardDescription className="text-white/60">
              {description}
            </CardDescription>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
