import { IssueSchema } from "@/api/routes/get-issue";
import { env } from "@/env";

type GetIssueParams = {
  id: string;
};

export async function getIssue({ id }: GetIssueParams) {
  const url = new URL(`/api/issues/${id}`, env.NEXT_PUBLIC_API_URL);

  const response = await fetch(url);
  const issue = await response.json();

  return IssueSchema.parse(issue);
}
