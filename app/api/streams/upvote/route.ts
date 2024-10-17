import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

// Define schema 
const UpvoteSchema = z.object({
    streamId: z.string(),
});

export async function POST(req: NextRequest) {
    
    const session = await getServerSession();
    //can be used later
    // if (!session?.user?.email) {
    //     return NextResponse.json(
    //         { message: "Unauthenticated" },
    //         { status: 403 }
    //     );
    // }
    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ??"",
        }
    });
    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    try {
        const data = UpvoteSchema.parse(await req.json());

        // const stream = await prismaClient.stream.findUnique({
        //     where: { id: data.streamId }
        // });
        // if(!stream) {
        //     return NextResponse.json(
        //         { message: "Stream not found" },
        //         { status: 404 }
        //     );
        // }
        
        await prismaClient.upvote.create({
            data: {
                userId: user.id,
                streamId: data.streamId
            }
        });
        return NextResponse.json(
            { message: "Upvoted successfully" },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Error while upvoting", error: err instanceof z.ZodError ? err.errors : err },
            { status: 400 }
        );
    }
}

