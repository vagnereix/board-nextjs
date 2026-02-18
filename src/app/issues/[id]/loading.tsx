import { BackToBoardLink } from "@/features/board/components/back-to-board-link";

export default function IssueLoading() {
  return (
    <main className="max-w-7xl mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[0.5px] border-navy-500 rounded-xl">
      <BackToBoardLink />

      <div className="flex items-center gap-2">
        <div className="h-8 w-24 rounded-lg bg-navy-600 animate-pulse" />
        <div className="h-8 w-16 rounded-lg bg-navy-600 animate-pulse" />
      </div>

      <div className="space-y-2">
        <div className="h-8 w-3/4 max-w-md rounded bg-navy-600 animate-pulse" />
        <div className="space-y-2 pt-1">
          <div className="h-4 w-full rounded bg-navy-600/80 animate-pulse" />
          <div className="h-4 w-full rounded bg-navy-600/80 animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-navy-600/80 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
