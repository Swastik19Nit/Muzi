"use client";
import Link from "next/link";
import { Music } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Appbar() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between w-full">
      <Link className="flex items-center justify-center" href="#">
        <Music className="h-8 w-8 text text-purple-400" />
        <span className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r text-3xl from-purple-400 to-pink-600">
          Muzi
        </span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#">
          Features
        </Link>
        <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#">
          Pricing
        </Link>
        {session ? (
          <Button
            variant="outline"
            className="text-red-400 border-red-400 hover:bg-red-400/10"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        )}
      </nav>
    </div>
  );
}