export const IssuesQueryKeys = {
  all: ["issues"] as const,
  issueInteractions: (issueIds?: string[]) => {
    const key = [...IssuesQueryKeys.all, "interactions"] as const;

    if (issueIds) {
      return [...key, issueIds.slice().sort().join(",")] as const;
    }

    return key;
  },
};
