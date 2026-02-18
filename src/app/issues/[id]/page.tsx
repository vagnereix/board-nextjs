import { ArchiveIcon, MoveLeftIcon, ThumbsUpIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/button";
import { BackToBoardLink } from "@/features/board/components/back-to-board-link";
import IssueCommentsList, {
  IssueCommentsListSkeleton,
} from "@/features/board/components/issue-comments-list";
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

const statusLabels = {
  backlog: "Backlog",
  todo: "Todo",
  in_progress: "In Progress",
  done: "Done",
} as const;

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;

  const issue = await getIssue({ id });

  return (
    <main className="max-w-7xl mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[0.5px] border-navy-500 rounded-xl">
      <BackToBoardLink />

      <div className="flex items-center gap-2">
        <span className="bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
          <ArchiveIcon className="size-3" />
          {statusLabels[issue.status]}
        </span>

        <Button>
          <ThumbsUpIcon className="size-3" />
          <span className="text-sm">12</span>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold text-2xl">{issue.title}</h1>
        <p className="text-navy-100 text-sm leading-relaxed">
          {issue.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold">Comments</span>

        <form action=""></form>

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsListSkeleton />}>
            <IssueCommentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
