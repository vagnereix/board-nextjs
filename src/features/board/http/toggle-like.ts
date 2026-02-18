import { LikeResponseSchema } from "@/api/routes/schemas/toggle-like";
import { env } from "@/env";

type ToggleLikeParams = {
  issueId: string;
};

export async function toggleLike({ issueId }: ToggleLikeParams) {
  const url = new URL(`/api/issues/${issueId}/like`, env.NEXT_PUBLIC_API_URL);

  const response = await fetch(url, {
    method: "POST",
  });

  const like = await response.json();

  return LikeResponseSchema.parse(like);
}
