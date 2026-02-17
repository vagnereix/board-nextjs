import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { Header } from "@/features/board/components/header";
import { listIssues } from "@/features/board/http/list-issues";

export const metadata: Metadata = {
  title: "Board",
};

type BoardProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Board({ searchParams }: BoardProps) {
  const { q } = await searchParams;

  const issues = await listIssues();

  return (
    <div className="max-w-[1620px] w-full mx-auto p-10 flex flex-col gap-8 h-dvh">
      <Header />

      <main className="grid grid-cols-4 gap-5 flex-1 min-h-0 items-stretch">
        <Section.Root>
          <Section.Header>
            <Section.Title>
              <ArchiveIcon className="size-3" />
              Backlog
            </Section.Title>
            <Section.Count>{issues.backlog.length}</Section.Count>
          </Section.Header>

          <Section.Content>
            {issues.backlog.map((issue) => (
              <Card.Root key={issue.id}>
                <Card.Header>
                  <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
              </Card.Root>
            ))}
          </Section.Content>
        </Section.Root>
      </main>
    </div>
  );
}
