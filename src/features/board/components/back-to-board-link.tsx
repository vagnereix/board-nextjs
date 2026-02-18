import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

export function BackToBoardLink() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-navy-200 hover:text-navy-100 transition-colors duration-150"
    >
      <MoveLeftIcon className="size-4" />
      <span className="text-xs">Back to board</span>
    </Link>
  );
}
