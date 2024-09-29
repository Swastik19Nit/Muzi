import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

//@ts-ignore
import youtubesearchapi from "youtube-search-api"
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
        const res = await youtubesearchapi.GetVideoDetails(extractedId);
        // console.log(res.title);
        // console.log(JSON.stringify(res.thumbnail.thumbnails));

        // const isYt = data.url.includes("youtube");
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1);
        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "YouTube",
                title: res.title ?? "Can't find YouTube video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "",
                bigImg: thumbnails[thumbnails.length - 1].url ?? ""



            }

        });
        return NextResponse.json({
            message: "Added Stream",
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

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? "",

        }
    })

    return NextResponse.json(streams)
}