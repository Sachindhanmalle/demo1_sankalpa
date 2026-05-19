import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variant === "default" && "bg-indigo-500/20 text-indigo-300",
        variant === "success" && "bg-emerald-500/20 text-emerald-300",
        variant === "warning" && "bg-amber-500/20 text-amber-300",
        variant === "destructive" && "bg-red-500/20 text-red-300",
        className
      )}
      {...props}
    />
  );
}
