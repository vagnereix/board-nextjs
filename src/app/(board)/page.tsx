import type { Metadata } from "next";
import { IssuesList } from "@/features/board/components/issues-list";
import { listIssues } from "@/features/board/http/list-issues";

export const metadata: Metadata = {
  title: "Board",
};

type BoardProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Board({ searchParams }: BoardProps) {
  const { q } = await searchParams;

  const issues = await listIssues({ search: q });

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 min-h-0 items-stretch">
      <IssuesList title="Backlog" issues={issues.backlog} />
      <IssuesList title="Todo" issues={issues.todo} />
      <IssuesList title="In Progress" issues={issues.in_progress} />
      <IssuesList title="Done" issues={issues.done} />
    </main>
  );
}
