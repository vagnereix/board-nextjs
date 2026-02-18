import type { Metadata } from "next";
import { getIssue } from "@/features/board/http/get-issue";

type IssuePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: IssuePageProps): Promise<Metadata> => {
  const { id } = await params;

  const issue = await getIssue({ id });

  return {
    title: `Issue #${issue.issueNumber}`,
  };
};

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;

  const issue = await getIssue({ id });

  return <div>IssuePage {issue.title}</div>;
}
