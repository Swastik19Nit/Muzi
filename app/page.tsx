"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Users, Zap } from "lucide-react";
import { Appbar } from "./components/Appbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Appbar />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Let Your Fans <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Choose the Beat</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Empower your audience to curate your music stream. Boost engagement like never before.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Get Started
                </Button>
                <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Why Choose Us
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow">
                <Users className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2 text-purple-300">Engage Your Audience</h3>
                <p className="text-gray-400">Let fans actively participate in your stream.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow">
                <Zap className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2 text-purple-300">Boost Viewership</h3>
                <p className="text-gray-400">Increase popularity as fans tune in for their choices.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow">
                <Music className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2 text-purple-300">Discover New Music</h3>
                <p className="text-gray-400">Explore fresh tracks through your community.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Ready to Revolutionize Your Streams?
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join creators transforming their music streams with fan-driven playlists.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input 
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700 focus:border-purple-500 focus:ring-purple-500" 
                    placeholder="Enter your email" 
                    type="email" 
                  />
                  <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-purple-400 transition-colors" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-900 border-t border-purple-800/30">
        <div className="container px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <p className="text-xs text-gray-500">© 2024 MusicStreamChoice. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:text-purple-400 transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:text-purple-400 transition-colors" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
