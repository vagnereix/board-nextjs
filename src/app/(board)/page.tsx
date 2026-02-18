import type { Metadata } from "next";
import { BoardContent } from "@/features/board/components/board-content";
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

  return <BoardContent issues={issues} />;
}
