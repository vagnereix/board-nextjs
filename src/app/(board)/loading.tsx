import { Skeleton } from "@/components/skeleton";
import { Section } from "@/features/board/components/section";

function ColumnSkeleton() {
  return (
    <Section.Root>
      <Section.Header>
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-4 w-6" />
      </Section.Header>

      <Section.Content>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-navy-700 border-[0.5px] border-navy-600 p-3 space-y-4 rounded-lg"
          >
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-full" />
              {i === 1 && <Skeleton className="h-4 w-4/5" />}
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ))}
      </Section.Content>
    </Section.Root>
  );
}

export default function BoardLoading() {
  return (
    <main className="grid grid-cols-4 gap-5 flex-1 min-h-0 items-stretch">
      <ColumnSkeleton />
      <ColumnSkeleton />
      <ColumnSkeleton />
      <ColumnSkeleton />
    </main>
  );
}
