export const IssuesQueryKeys = {
  all: ["issues"] as const,
  issueInteractions: (issueId: string) => [...IssuesQueryKeys.all, "interactions", issueId] as const,
};
