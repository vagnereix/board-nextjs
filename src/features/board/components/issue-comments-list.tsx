import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/features/board/components/comment";
import { listIssueComments } from "@/features/board/http/list-issue-comments";

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
