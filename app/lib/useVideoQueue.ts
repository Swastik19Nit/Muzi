import { useState, useEffect } from "react";

interface Video {
  id: string;
  title: string;
  bigImg: string;
  upvotes: number;
  haveUpvoted: boolean;
}

const useVideoQueue = () => {
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string>("");

  const refreshStreams = async () => {
    const res = await fetch(`/api/streams/my`, { credentials: "include" });
    const data = await res.json();
    const sortedStreams = data.streams.sort((a: any, b: any) => b.upvotes - a.upvotes);
    setQueue(sortedStreams);
  };

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(refreshStreams, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (id: string, isUpvote: boolean) => {
    setQueue(
      queue.map((video) =>
        video.id === id
          ? {
              ...video,
              upvotes: isUpvote ? video.upvotes + 1 : video.upvotes - 1,
              haveUpvoted: !video.haveUpvoted,
            }
          : video
      ).sort((a, b) => b.upvotes - a.upvotes)
    );

    await fetch(`/api/streams/${isUpvote ? "upvote" : "downvote"}`, {
      method: "POST",
      body: JSON.stringify({ streamId: id }),
    });
    setTimeout(refreshStreams, 5000);
  };

  const handlePlayNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0].id);
      setQueue(queue.slice(1));
    }
  };

  return {
    queue,
    currentVideo,
    handleVote,
    handlePlayNext,
  };
};

export default useVideoQueue;
