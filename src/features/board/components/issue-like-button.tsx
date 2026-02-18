"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { LikeButton } from "@/features/board/components/like-button";
import { getIssueInteractions } from "@/features/board/http/get-issue-interactions";
import { IssuesQueryKeys } from "@/features/board/query-keys";

type IssueLikeButtonProps = {
  issueId: string;
};

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data } = useSuspenseQuery({
    queryKey: IssuesQueryKeys.issueInteractions([issueId]),
    queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
  });

  const interaction = data.interactions[0];

  return (
    <LikeButton
      issueId={issueId}
      initialLikes={interaction.likesCount}
      initialLiked={interaction.isLiked}
    />
  );
}
