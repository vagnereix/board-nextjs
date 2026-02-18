"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type z from "zod";
import type { IssuesListResponseSchema } from "@/api/routes/list-issues";
import { IssuesList } from "@/features/board/components/issues-list";
import { getIssueInteractions } from "@/features/board/http/get-issue-interactions";
import { IssuesQueryKeys } from "@/features/board/query-keys";

type BoardContentProps = {
  issues: z.infer<typeof IssuesListResponseSchema>;
};

export function BoardContent({ issues }: BoardContentProps) {
  const allIssuesIds = useMemo(() => {
    return [
      ...issues.backlog.map((issue) => issue.id),
      ...issues.todo.map((issue) => issue.id),
      ...issues.in_progress.map((issue) => issue.id),
      ...issues.done.map((issue) => issue.id),
    ];
  }, [issues]);

  const { data: interactionsData } = useQuery({
    queryKey: IssuesQueryKeys.issueInteractions(allIssuesIds),
    queryFn: () => getIssueInteractions({ issueIds: allIssuesIds }),
  });

  const interactions: Map<string, { isLiked: boolean; likesCount: number }> = useMemo(() => {
    if (!interactionsData) return new Map();

    return new Map(
      interactionsData.interactions.map((interaction) => [
        interaction.issueId,
        {
          isLiked: interaction.isLiked,
          likesCount: interaction.likesCount,
        },
      ]),
    );
  }, [interactionsData]);

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 min-h-0 items-stretch">
      <IssuesList title="Backlog" issues={issues.backlog} interactions={interactions} />
      <IssuesList title="Todo" issues={issues.todo} interactions={interactions} />
      <IssuesList title="In Progress" issues={issues.in_progress} interactions={interactions} />
      <IssuesList title="Done" issues={issues.done} interactions={interactions} />
    </main>
  );
}
