import { setTimeout } from "node:timers/promises";
import { CommentsListResponseSchema } from "@/api/routes/list-issue-comments";
import { env } from "@/env";

type ListIssueCommentsParams = {
  issueId: string;
  limit?: number;
  offset?: number;
};

export async function listIssueComments({
  issueId,
  limit = 5,
  offset = 0,
}: ListIssueCommentsParams) {
  const url = new URL(
    `/api/issues/${issueId}/comments`,
    env.NEXT_PUBLIC_API_URL,
  );

  await setTimeout(1000);

  if (limit) {
    url.searchParams.set("limit", limit.toString());
  }

  if (offset) {
    url.searchParams.set("offset", offset.toString());
  }

  const response = await fetch(url);
  const comments = await response.json();

  return CommentsListResponseSchema.parse(comments);
}
