"use client";

import { SearchIcon } from "lucide-react";
import { debounce, parseAsString, useQueryState } from "nuqs";
import type { ChangeEvent } from "react";
import { Input } from "@/components/input";

export function SearchInput() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault("").withOptions({ shallow: false }));

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const limitUrlUpdates = debounce(500);

    setSearch(event.target.value, {
      limitUrlUpdates: value === "" ? undefined : limitUrlUpdates,
    });
  }

  return (
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
  );
}
