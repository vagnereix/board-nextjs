import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsUpIcon } from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";
import type z from "zod";
import type { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions";
import { Button } from "@/components/button";
import { toggleLike } from "@/features/board/http/toggle-like";
import { IssuesQueryKeys } from "@/features/board/query-keys";

type LikeButtonProps = ComponentProps<"button"> & {
  issueId: string;
  initialLikes: number;
  initialLiked?: boolean;
};

type IssueInteractionsResponse = z.infer<
  typeof IssueInteractionsResponseSchema
>;

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked = false,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: onToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueriesData<IssueInteractionsResponse>({
        queryKey: IssuesQueryKeys.issueInteractions(),
      });

      queryClient.setQueriesData<IssueInteractionsResponse>(
        { queryKey: IssuesQueryKeys.issueInteractions() },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            interactions: old.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                };
              }

              return interaction;
            }),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _params, context) => {
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData(queryKey, data);
        }
      }
    },
  });

  const liked = initialLiked;

  function handleToggleLike(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    onToggleLike();
  }

  return (
    <Button
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500"
      aria-label={liked ? "Unlike" : "Like"}
      onClick={handleToggleLike}
      disabled={isPending}
      {...props}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  );
}
