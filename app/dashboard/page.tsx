"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Music, Share2, SkipForward } from "lucide-react"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StreamView from "../components/StreamView"

interface Video {
  id: string;
  type?: string;
  url?: string;
  extractedId?: string;
  title: string;
  smallImg?: string;
  bigImg: string;
  active?: boolean;
  userId?: string;
  upvotes: number;
  haveUpvoted: boolean;
}

const creatorId = "6c81be2e-23ec-4d1d-ab12-2f42ff077b44"

export default function Component() {
  return <StreamView creatorId={creatorId} />
}