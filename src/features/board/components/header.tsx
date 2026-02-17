import { SearchInput } from "@/features/board/components/search-input";
import { UserButton } from "@/features/board/components/user-button";

export function Header() {
  return (
    <header className="max-w-7xl mx-auto w-full flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-sm text-navy-100">
          Follow the progress of your product roadmap
        </p>
      </div>

      <div className="flex items-center gap-4">
        <SearchInput />
        <UserButton />
      </div>
    </header>
  );
}
