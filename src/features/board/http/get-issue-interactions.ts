import { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions";
import { env } from "@/env";

type GetIssueInteractionsParams = {
  issueIds: string[];
};

export async function getIssueInteractions({ issueIds }: GetIssueInteractionsParams) {
  const url = new URL(`/api/issues/interactions`, env.NEXT_PUBLIC_API_URL);

  url.searchParams.set("issueIds", issueIds.join(","));

  const response = await fetch(url, {
    credentials: "include", // Ensure cookies are sent for authentication in client-side requests
  });

  const interactions = await response.json();

  return IssueInteractionsResponseSchema.parse(interactions);
}
