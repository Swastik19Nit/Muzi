import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
const YT_REGEX = new RegExp("^(?:(?:https?:)?\\/\\/)?(?:www\\.)?(?:m\\.)?(?:youtu(?:be)?\\.com\\/(?:v\\/|embed\\/|watch(?:\\/|\\?v=))|youtu\\.be\\/)((?:\\w|-){11})(?:\\S+)?$")


const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})
export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        // const isYt = YT_REGEX.test(data.url);
        const isYt = data.url.match(YT_REGEX);

        if (!isYt) {
            return NextResponse.json({
                message: "Invalid YouTube URL"
            }, {
                status: 400
            })

        }
        const extractedId = data.url.split("?v=")[1];

        // const isYt = data.url.includes("youtube");
        const stream = await prismaClient.stream.create({
            data:{
                userId:data.creatorId,
                url: data.url,
                extractedId,
                type:"YouTube"
            }
            
        });
        return NextResponse.json({
            message:"Added Stream",
            id: stream.id,
        })
    }
    catch (e) {
        return NextResponse.json({
            message: "Error whiile adding a stream"
        }, {
            status: 411
        })
    }


}

export async function GET(req:NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
        where:{
            userId: creatorId ?? "",

        }
    })

    return NextResponse.json(streams)
}