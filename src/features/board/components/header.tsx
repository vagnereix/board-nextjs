"use client";

import { Loader2Icon, LogInIcon, SearchIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import type { ChangeEvent } from "react";
import { Input } from "@/components/input";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const { data: session, isPending } = authClient.useSession();

  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const limitUrlUpdates = debounce(500);

    setSearch(event.target.value, {
      shallow: true,
      limitUrlUpdates: value === "" ? undefined : limitUrlUpdates,
    });
  }

  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  }

   async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <header className="max-w-7xl mx-auto w-full flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the progress of your product roadmap
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="size-4 absolute text-navy-200 left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />

          <Input
            type="search"
            placeholder="Search for features"
            className="w-2xs pl-8"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {isPending ? (
          <div className="cursor-pointer size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center">
            <Loader2Icon className="size-3.5 animate-spin text-navy-200" />
          </div>
        ) : session?.user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="cursor-pointer size-8 rounded-full overflow-hidden"
          >
            <img
              src={session.user.image ?? ""}
              alt={session.user.name ?? ""}
              className="size-full object-cover"
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSignIn}
            className="cursor-pointer size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150"
          >
            <LogInIcon className="size-3.5 text-navy-200" />
          </button>
        )}
      </div>
    </header>
  );
}
