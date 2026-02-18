"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/skeleton";
import { LikeButton } from "@/features/board/components/like-button";
import { getIssueInteractions } from "@/features/board/http/get-issue-interactions";
import { IssuesQueryKeys } from "@/features/board/query-keys";

type IssueLikeButtonProps = {
  issueId: string;
};

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data, isLoading } = useQuery({
    queryKey: IssuesQueryKeys.issueInteractions([issueId]),
    queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
  });

  if (isLoading) {
    return <Skeleton className="h-7 w-16" />;
  }

  const interaction = data?.interactions[0];

  return (
    <LikeButton
      issueId={issueId}
      initialLikes={interaction?.likesCount ?? 0}
      initialLiked={interaction?.isLiked ?? false}
    />
  );
}
