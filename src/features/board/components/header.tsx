"use client";

import { LogInIcon, SearchIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import type { ChangeEvent } from "react";
import { Input } from "@/components/input";

export function Header() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const limitUrlUpdates = debounce(500);

    setSearch(event.target.value, {
      shallow: true,
      limitUrlUpdates: value === "" ? undefined : limitUrlUpdates,
    });
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

        <button
          type="button"
          className="cursor-pointer size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150"
        >
          <LogInIcon className="size-3.5 text-navy-200" />
        </button>
      </div>
    </header>
  );
}
