'use client';

import { Loader2Icon, LogInIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function UserButton() {
  const { data: session, isPending } = authClient.useSession();

  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  }

  async function handleSignOut() {
    await authClient.signOut();
  }

  if (isPending) {
    return (
      <div className="cursor-pointer size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center">
        <Loader2Icon className="size-3.5 animate-spin text-navy-200" />
      </div>
    )
  }

  if (session?.user) {
    return (
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
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="cursor-pointer size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150"
    >
      <LogInIcon className="size-3.5 text-navy-200" />
    </button>
  );
}
