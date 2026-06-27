function Shimmer({ className }: { className: string }) {
  return (
    <div className={`bg-border animate-pulse rounded ${className}`} />
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-start gap-5">
        <Shimmer className="w-20 h-20 !rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-5 w-40" />
          <Shimmer className="h-3 w-24" />
          <Shimmer className="h-3 w-full max-w-xs mt-2" />
          <Shimmer className="h-3 w-56" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-void border border-border rounded-lg p-3 text-center space-y-1.5">
            <Shimmer className="h-6 w-12 mx-auto" />
            <Shimmer className="h-2 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LanguageSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
      <Shimmer className="h-3 w-24" />
      <Shimmer className="h-2 w-full !rounded-full" />
      <div className="flex flex-wrap gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <Shimmer key={i} className="h-3 w-20" />
        ))}
      </div>
    </div>
  );
}

export function RepoSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-surface border border-border rounded-xl p-4 space-y-3">
          <div className="space-y-1.5">
            <Shimmer className="h-4 w-40" />
            <Shimmer className="h-3 w-full" />
            <Shimmer className="h-3 w-2/3" />
          </div>
          <div className="flex gap-3 pt-3 border-t border-border/60">
            <Shimmer className="h-2.5 w-16" />
            <Shimmer className="h-2.5 w-10" />
            <Shimmer className="h-2.5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
