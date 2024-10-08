"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Music, Share2, SkipForward } from "lucide-react"
import Image from "next/image"
import axios from "axios"

interface Video {
  id: string
  title: string
  thumbnail: string
  upvotes: number
  downvotes: number
}

export default function Component() {
  const [inputLink, setInputLink] = useState("")
  const [previewId, setPreviewId] = useState("")
  const [queue, setQueue] = useState<Video[]>([
    { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg", upvotes: 5, downvotes: 1 },
    { id: "9bZkp7q19f0", title: "PSY - GANGNAM STYLE", thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg", upvotes: 3, downvotes: 0 },
    { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/0.jpg", upvotes: 2, downvotes: 1 },
  ])
  const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ")
  
  async function refreshStreams(){
    const res =await axios.get(`/api/streams/my`);
    console.log(res);
  }

  useEffect(()=>{
    refreshStreams();
    const interval = setInterval(()=>{

    },10*1000)
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value)
    const videoId = extractVideoId(e.target.value)
    if (videoId) {
      setPreviewId(videoId)
    }
  }

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const handleSubmit = async () => {
    if (previewId) {
      try {
        const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${previewId}`)
        const data = await response.json()
        setQueue([...queue, { 
          id: previewId, 
          title: data.title, 
          thumbnail: `https://img.youtube.com/vi/${previewId}/0.jpg`,
          upvotes: 0,
          downvotes: 0
        }])
        setInputLink("")
        setPreviewId("")
      } catch (error) {
        console.error("Error fetching video info:", error)
      }
    }
  }

  const handleVote = (id: string, voteType: 'upvote' | 'downvote') => {
    setQueue(
      queue.map((video) =>
        video.id === id
          ? {
              ...video,
              upvotes: voteType === 'upvote' ? video.upvotes + 1 : video.upvotes,
              downvotes: voteType === 'downvote' ? video.downvotes + 1 : video.downvotes,
            }
          : video
      ).sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this music queue!',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      // Fallback for browsers that don't support navigator.share
      alert("Copy this link to share: " + window.location.href);
    }
  }

  const handlePlayNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0].id)
      setQueue(queue.slice(1))
    }
  }

  useEffect(() => {
    if (queue.length > 0 && !currentVideo) {
      setCurrentVideo(queue[0].id)
    }
  }, [queue, currentVideo])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-gray-100">
      <header className="p-4 border-b border-purple-800 bg-gray-950 bg-opacity-50 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Music className="h-8 w-8 text-purple-400" />
            <span className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r text-3xl from-purple-400 to-pink-600">
              Muzi
            </span>
          </div>
          <Button onClick={handleShare} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 space-y-4">
            <h2 className="text-2xl font-bold text-purple-400">Now Playing</h2>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg shadow-purple-500/20">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-between items-center">
              <Button onClick={handlePlayNext} className="bg-green-600 hover:bg-green-700 text-white">
                <SkipForward className="w-4 h-4 mr-2" />
                Play Next
              </Button>
              <div className="text-sm text-gray-400">
                {queue.length} {queue.length === 1 ? 'video' : 'videos'} in queue
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter YouTube video link"
                  value={inputLink}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border-2 border-purple-500 text-gray-100 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 ease-in-out"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Music className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 px-8 rounded-full transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                  Add to Queue
                </Button>
              </div>
            </div>
            {previewId && (
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg shadow-purple-500/20">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${previewId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-2xl font-bold text-purple-400">Upcoming Videos</h2>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {queue.map((video) => (
                <Card key={video.id} className="bg-gray-800 border-purple-500 border-2 rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-lg hover:shadow-purple-500/30">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={video.thumbnail}
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
                        onClick={() => handleVote(video.id, 'upvote')}
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {video.upvotes}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVote(video.id, 'downvote')}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        {video.downvotes}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}