"use client";
import Link from "next/link";
import { Music } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const { data: session } = useSession(); 

  return (
    <div className="flex items-center justify-between w-full">
      <Link className="flex items-center justify-center" href="#">
          <Music className="h-6 w-6 text-purple-400" />
          <span className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">MusicStreamChoice</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#">
            Pricing
          </Link>
        {session ? ( 
          <button className="m-2 p-2 bg-red-300 rounded-md" onClick={() => signOut()}>
            Sign Out
          </button>
        ) : (
          <button className="m-2 p-2 bg-blue-300 rounded-md" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </nav>
    </div>
  );
}
