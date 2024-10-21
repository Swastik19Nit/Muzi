"use client"
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