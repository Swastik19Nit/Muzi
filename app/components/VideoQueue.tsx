import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Video {
  id: string;
  title: string;
  bigImg: string;
  upvotes: number;
  haveUpvoted: boolean;
}

interface VideoQueueProps {
  queue: Video[];
  onVote: (id: string, isUpvote: boolean) => void;
}

const VideoQueue: React.FC<VideoQueueProps> = ({ queue, onVote }) => (
  <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
    {queue.map((video) => (
      <Card
        key={video.id}
        className="bg-gray-800 border-purple-500 border-2 rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-lg hover:shadow-purple-500/30"
      >
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <img
              src={video.bigImg}
              alt={video.title}
              width={80}
              height={60}
              className="rounded"
            />
            <div className="text-sm font-medium line-clamp-2">{video.title}</div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onVote(video.id, !video.haveUpvoted)}
              className={`border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300 ${
                video.haveUpvoted ? "bg-green-500 text-white" : ""
              }`}
            >
              {video.haveUpvoted ? <ThumbsDown className="w-4 h-4 mr-1" /> : <ThumbsUp className="w-4 h-4 mr-1" />}
              {video.upvotes}
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default VideoQueue;
