import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { POST_STATUS_LABELS, type Post } from "@/lib/admin";

const STYLES: Record<Post["status"], string> = {
  draft: "bg-muted text-muted-foreground border-border",
  published: "bg-success/15 text-success border-success/30",
  scheduled: "bg-warning/15 text-warning border-warning/30",
  archived: "bg-destructive/10 text-destructive border-destructive/30",
};

export function StatusBadge({ status }: { status: Post["status"] }) {
  return (
    <Badge variant="outline" className={cn("font-medium", STYLES[status])}>
      {POST_STATUS_LABELS[status]}
    </Badge>
  );
}
