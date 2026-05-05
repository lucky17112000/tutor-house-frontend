import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-lg",
        "bg-zinc-100 dark:bg-zinc-800/80",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 -translate-x-full"
        style={{
          background:
            "linear-gradient(90deg,transparent 0%,rgba(219,234,254,0.55) 45%,rgba(255,255,255,0.7) 55%,transparent 100%)",
          animation: "shimmer 1.6s ease-in-out infinite",
        }}
      />
    </div>
  )
}

export { Skeleton }
