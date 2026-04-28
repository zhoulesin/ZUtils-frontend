export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border bg-white p-6">
          <div className="mb-4 h-12 w-12 rounded-lg bg-gray-200" />
          <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
          <div className="mb-4 h-4 w-full rounded bg-gray-200" />
          <div className="flex gap-4">
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}
