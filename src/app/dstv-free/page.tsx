"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Menu, Home, Tv, Film, Clock, 
  Heart, Settings, LogOut, User, Sun, Moon,
  ChevronLeft, ChevronRight, Play, Pause,
  Volume2, VolumeX, Maximize, Minimize,
  RefreshCw, Wifi, WifiOff, AlertCircle
} from "lucide-react";
import { DstvChannelGrid } from "@/components/dstv-channel-grid";
import { DstvVideoPlayer } from "@/components/dstv-video-player";
import { DstvControls } from "@/components/dstv-controls";
import { DstvSidebar } from "@/components/dstv-sidebar";

// Sample channel data
const channels = [
  { id: 1, name: "DStv Sports", category: "Sports", logo: "/channels/sports.png", stream: "https://example.com/sports.m3u8" },
  { id: 2, name: "DStv Movies", category: "Movies", logo: "/channels/movies.png", stream: "https://example.com/movies.m3u8" },
  { id: 3, name: "DStv Series", category: "Series", logo: "/channels/series.png", stream: "https://example.com/series.m3u8" },
  { id: 4, name: "DStv News", category: "News", logo: "/channels/news.png", stream: "https://example.com/news.m3u8" },
  { id: 5, name: "DStv Music", category: "Music", logo: "/channels/music.png", stream: "https://example.com/music.m3u8" },
  { id: 6, name: "DStv Kids", category: "Kids", logo: "/channels/kids.png", stream: "https://example.com/kids.m3u8" },
  { id: 7, name: "DStv Lifestyle", category: "Lifestyle", logo: "/channels/lifestyle.png", stream: "https://example.com/lifestyle.m3u8" },
  { id: 8, name: "DStv Documentaries", category: "Documentaries", logo: "/channels/documentaries.png", stream: "https://example.com/documentaries.m3u8" },
  { id: 9, name: "DStv Comedy", category: "Comedy", logo: "/channels/comedy.png", stream: "https://example.com/comedy.m3u8" },
  { id: 10, name: "DStv Action", category: "Movies", logo: "/channels/action.png", stream: "https://example.com/action.m3u8" },
  { id: 11, name: "DStv Drama", category: "Series", logo: "/channels/drama.png", stream: "https://example.com/drama.m3u8" },
  { id: 12, name: "DStv Nature", category: "Documentaries", logo: "/channels/nature.png", stream: "https://example.com/nature.m3u8" },
];

const categories = ["All", "Sports", "Movies", "Series", "News", "Music", "Kids", "Lifestyle", "Documentaries", "Comedy"];

export default function DstvFreePage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || channel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleChannelSelect = (channel: typeof channels[0]) => {
    setSelectedChannel(channel);
    setIsLoading(true);
    setError(null);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
    }, 1000);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (value === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <DstvSidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-purple-900/90 to-black/90 p-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Menu className="size-5" />
              </button>
              <div className="flex items-center gap-2">
                <Tv className="size-6 text-purple-500" />
                <span className="font-bold text-lg">DStv <span className="text-purple-500">Free</span></span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search channels..."
                  className="pl-9 pr-3 py-1.5 bg-white/10 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-purple-500 w-48"
                />
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <User className="size-5" />
              </button>
            </div>
          </header>

          {/* Video Player Area */}
          <div className="flex-1 relative bg-black">
            <DstvVideoPlayer
              channel={selectedChannel}
              isPlaying={isPlaying}
              volume={volume}
              isMuted={isMuted}
              brightness={brightness}
              isLoading={isLoading}
              error={error}
              onTogglePlay={togglePlay}
              onToggleMute={toggleMute}
              onVolumeChange={handleVolumeChange}
              onBrightnessChange={handleBrightnessChange}
              onToggleFullscreen={toggleFullscreen}
              isFullscreen={isFullscreen}
            />

            {/* Video Controls Overlay */}
            <DstvControls
              isPlaying={isPlaying}
              volume={volume}
              isMuted={isMuted}
              brightness={brightness}
              isFullscreen={isFullscreen}
              showControls={showControls}
              onTogglePlay={togglePlay}
              onToggleMute={toggleMute}
              onVolumeChange={handleVolumeChange}
              onBrightnessChange={handleBrightnessChange}
              onToggleFullscreen={toggleFullscreen}
              onToggleControls={toggleControls}
              channelName={selectedChannel.name}
            />
          </div>

          {/* Channel Grid */}
          <div className="bg-gradient-to-t from-black to-transparent p-4 max-h-[40vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">📺 Channels</h2>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === cat 
                        ? "bg-purple-500 text-white" 
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <DstvChannelGrid
              channels={filteredChannels}
              selectedChannel={selectedChannel}
              onSelectChannel={handleChannelSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
  }
