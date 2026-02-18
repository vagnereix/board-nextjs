import type { ReactNode } from "react";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/header/search-input";
import { UserButton } from "@/components/header/user-button";
import { Skeleton } from "@/components/skeleton";

export default function BoardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
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
          <Suspense fallback={<Skeleton className="w-2xs h-10" />}>
            <SearchInput />
          </Suspense>
          <UserButton />
        </Header.Footer>
      </Header.Root>

      {children}
    </div>
  );
}
