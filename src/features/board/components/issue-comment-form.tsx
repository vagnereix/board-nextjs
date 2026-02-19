"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, MessageCirclePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/input";

const createCommentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty"),
});

type CreateCommentFormData = z.infer<typeof createCommentSchema>;

type IssueCommentFormProps = {
  onCreateComment: (text: string) => Promise<void>;
  isAuthenticated: boolean;
};

export function IssueCommentForm({ onCreateComment, isAuthenticated }: IssueCommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentFormData>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      text: "",
    },
  });

  async function handleCreateComment(data: CreateCommentFormData) {
    await onCreateComment(data.text);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateComment)}
      className="relative w-full"
    >
      <Input
        className="bg-navy-900 h-11 pr-24 w-full"
        placeholder={
          isAuthenticated
            ? "Leave a comment..."
            : "You must be logged in to comment"
        }
        disabled={!isAuthenticated || isSubmitting}
        {...register("text")}
      />

      {errors.text && (
        <p className="text-red-400 mt-1 text-xs">{errors.text.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !isAuthenticated}
        className="cursor-pointer disabled:opacity-50 flex items-center gap-2 transition-colors duration-150 text-indigo-400 absolute right-3 top-1/2 -translate-y-1/2 text-xs hover:text-indigo-300"
      >
        Publish
        {isSubmitting ? (
          <Loader2Icon className="size-3 animate-spin" />
        ) : (
          <MessageCirclePlusIcon className="size-4" />
        )}
      </button>
    </form>
  );
}
