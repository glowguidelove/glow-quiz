export default function ResultsLoading() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16 animate-pulse">
      {/* Title skeleton */}
      <div className="text-center space-y-3 mb-10">
        <div className="h-4 w-32 bg-border rounded-full mx-auto" />
        <div className="h-8 w-72 bg-border rounded-full mx-auto" />
        <div className="h-4 w-96 max-w-full bg-border rounded-full mx-auto" />
      </div>

      {/* Trust badges skeleton */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-36 bg-border rounded-full" />
        ))}
      </div>

      {/* Product card skeletons */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-border rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-3 w-16 bg-border rounded-full" />
                <div className="h-5 w-48 bg-border rounded-full" />
                <div className="h-3 w-full bg-border rounded-full" />
                <div className="h-3 w-3/4 bg-border rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
