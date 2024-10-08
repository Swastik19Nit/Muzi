import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret:process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn(params) {
            console.log(params);
            if (!params.user.email) {
                return false; 
            }
            try {
                const existingUser = await prismaClient.user.findUnique({
                    where: { email: params.user.email }
                });

                if (existingUser) {
                  
                    await prismaClient.user.update({
                        where: { email: params.user.email },
                        data: {
                            email: params.user.email ?? "",
                            provider: "Google",
                        },
                    });
                } else {
                  
                    await prismaClient.user.create({
                        data: {
                            email: params.user.email ?? "",
                            provider: "Google",
                        },
                    });
                }
                
                return true;
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false; 
            }
        },
    },
});

export { handler as GET, handler as POST };
