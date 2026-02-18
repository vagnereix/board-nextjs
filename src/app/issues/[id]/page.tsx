import {
  ArchiveIcon,
  MessageCirclePlusIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Input } from "@/components/input";
import { BackToBoardLink } from "@/features/board/components/back-to-board-link";
import IssueCommentsList, {
  IssueCommentsListSkeleton,
} from "@/features/board/components/issue-comments-list";
import { IssueLikeButton } from "@/features/board/components/issue-like-button";
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

        <IssueLikeButton issueId={issue.id} />
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold text-2xl">{issue.title}</h1>
        <p className="text-navy-100 text-sm leading-relaxed">
          {issue.description}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold">Comments</span>

        <form action="" className="relative w-full">
          <Input
            className="bg-navy-900 h-11 pr-24 w-full"
            placeholder="Leave a comment..."
          />

          <button
            type="button"
            className="cursor-pointer disabled:opacity-50 flex items-center gap-2 transition-colors duration-150 text-indigo-400 absolute right-3 top-1/2 -translate-y-1/2 text-xs hover:text-indigo-300"
          >
            Publish
            <MessageCirclePlusIcon className="size-4" />
          </button>
        </form>

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsListSkeleton />}>
            <IssueCommentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
