import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
const YT_REGEX = new RegExp("^https:\/\/www.\.youtube\.com\/watch\/?v=[\w-]{11}$")

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})
export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url);

        if (!isYt) {
            return NextResponse.json({
                message: "Invalid YouTube URL"
            }, {
                status: 400
            })

        }
        const extractedId = data.url.split("?v=")[1];

        // const isYt = data.url.includes("youtube");
        await prismaClient.stream.create({
            data:{
                userId:data.creatorId,
                url: data.url,
                extractedId,
                type:"YouTube"
            }
            
        });
    }
    catch (e) {
        return NextResponse.json({
            message: "Error whiile adding a stream"
        }, {
            status: 411
        })
    }


}