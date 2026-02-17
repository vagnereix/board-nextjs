import { env } from "process";
import { IssuesListResponseSchema } from "@/api/routes/list-issues";

type ListIssuesParams = {
  search?: string;
};

export async function listIssues({ search }: ListIssuesParams) {
  const url = new URL("/api/issues", env.NEXT_PUBLIC_API_URL);

  if (search) {
    url.searchParams.set("search", search);
  }

  const response = await fetch(url);
  const issues = await response.json();

  return IssuesListResponseSchema.parse(issues);
}
