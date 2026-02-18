import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/features/board/components/comment";
import { listIssueComments } from "@/features/board/http/list-issue-comments";

export function IssueCommentsListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Only for loading animation
        <div key={i} className="flex items-start gap-2">
          <div className="size-8 rounded-full bg-navy-600 animate-pulse shrink-0" />
          <div className="flex-1 px-3 py-2.5 rounded-lg bg-navy-700 border-[0.5px] border-navy-600 flex flex-col gap-1">
            <div className="flex items-baseline gap-1">
              <div className="h-4 w-24 rounded bg-navy-600 animate-pulse" />
              <div className="h-3 w-16 rounded bg-navy-600/80 animate-pulse" />
            </div>
            <div className="space-y-1 pt-0.5">
              <div className="h-4 w-full rounded bg-navy-600/80 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-navy-600/80 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function IssueCommentsList({
  issueId,
}: {
  issueId: string;
}) {
  const { comments } = await listIssueComments({ issueId });

  if (comments.length === 0) {
    return <div className="text-navy-400 text-sm text-center py-2">No comments yet</div>;
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <Comment.Root key={comment.id}>
          <Comment.Avatar src={comment.author.avatar} />
          <Comment.Content>
            <Comment.Header>
              <Comment.Author>{comment.author.name}</Comment.Author>
              <Comment.Time>
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </Comment.Time>
            </Comment.Header>

            <Comment.Text>{comment.text}</Comment.Text>
          </Comment.Content>
        </Comment.Root>
      ))}
    </div>
  );
}
