import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { UserButton } from "@/components/header/user-button";

export default function IssuesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="max-w-[1620px] w-full mx-auto p-10 flex flex-col gap-8 h-dvh">
      <Header.Root>
        <Header.Content>
          <Header.Title>Product Roadmap</Header.Title>
          <Header.Description>
            Follow the progress of your product roadmap
          </Header.Description>
        </Header.Content>

        <Header.Footer>
          <UserButton />
        </Header.Footer>
      </Header.Root>

      {children}
    </div>
  );
}
