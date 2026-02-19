import "server-only";

import { headers } from "next/headers";
import { CommentSchema } from "@/api/routes/create-comment";
import { env } from "@/env";
import { getCookiesFromHeaders } from "@/features/board/http/utils";

type CreateCommentParams = {
  issueId: string;
  text: string;
};

export async function createComment({ issueId, text }: CreateCommentParams) {
  const url = new URL(
    `/api/issues/${issueId}/comments`,
    env.NEXT_PUBLIC_API_URL,
  );

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: getCookiesFromHeaders(await headers()), // Ensure cookies are sent for authentication in server-side requests
  });

  const comment = await response.json();

  return CommentSchema.parse(comment);
}
