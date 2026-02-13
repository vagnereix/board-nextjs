import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { Header } from "@/features/board/components/header";

export const metadata: Metadata = {
  title: "Board",
};

type BoardProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Board({ searchParams }: BoardProps) {
  const { q } = await searchParams;

  return (
    <div className="max-w-[1620px] w-full mx-auto p-10 flex flex-col gap-8 h-dvh">
      <Header />

      <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
        <Section.Root>
          <Section.Header>
            <Section.Title>
              <ArchiveIcon className="size-3" />
              Backlog
            </Section.Title>
            <Section.Count>16</Section.Count>
          </Section.Header>

          <Section.Content>
            <Card.Root>
              <Card.Header>
                <Card.Number>TECH-001</Card.Number>
                <Card.Title>Implement credit card payment</Card.Title>
              </Card.Header>

              <Card.Footer>
                <Button>
                  <ThumbsUpIcon className="size-3" />
                  <span className="text-sm">12</span>
                </Button>

                <Button>
                  <MessageCircleIcon className="size-3" />
                  <span className="text-sm">4</span>
                </Button>
              </Card.Footer>
            </Card.Root>
          </Section.Content>
        </Section.Root>
      </main>
    </div>
  );
}
