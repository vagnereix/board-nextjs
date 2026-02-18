export const IssuesQueryKeys = {
  all: ["issues"] as const,
  issueInteractions: (issueIds: string[]) => [...IssuesQueryKeys.all, "interactions", issueIds.sort().join(",")] as const,
};
