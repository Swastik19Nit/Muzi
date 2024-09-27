"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const { data: session } = useSession(); 

    return (
        <div>
            <div>Muzi</div>
            <div>
                {session ? ( 
                    <button className="m-2 p-2 bg-red-300" onClick={() => signOut()}>
                        Sign Out
                    </button>
                ) : (
                    <button className="m-2 p-2 bg-blue-300" onClick={() => signIn()}>
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
}
