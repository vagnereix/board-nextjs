import { ArchiveIcon } from "lucide-react";
import type z from "zod";
import type { IssueCardSchema } from "@/api/routes/list-issues";
import { Card } from "@/components/card";
import { Section } from "@/features/board/components/section";

type Issue = z.infer<typeof IssueCardSchema>;

type IssuesListProps = {
  title: string;
  issues: Issue[];
};

export function IssuesList({ title, issues }: IssuesListProps) {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>
          <ArchiveIcon className="size-3" />
          {title}
        </Section.Title>
        <Section.Count>{issues.length}</Section.Count>
      </Section.Header>

      <Section.Content>
        {issues.length > 0 ? issues.map((issue) => (
          <Card.Root key={issue.id}>
            <Card.Header>
              <Card.Number>ISS-{issue.issueNumber}</Card.Number>
              <Card.Title>{issue.title}</Card.Title>
            </Card.Header>
          </Card.Root>
        )) : (
          <div className="flex items-center justify-center py-8 text-center">
            <p className="text-sm text-navy-300">No issues matching your filters</p>
          </div>
        )}
      </Section.Content>
    </Section.Root>
  );
}
