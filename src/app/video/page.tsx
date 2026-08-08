"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, X, Play, Heart, Eye, Calendar, Clock, 
  Youtube, Github, ExternalLink, Filter, Grid3x3, 
  List, ArrowLeft, ThumbsUp, MessageCircle, Share2,
  Menu, ChevronDown, ChevronUp, Star, Award, Zap,
  Film, Video, Tv, Monitor, Smartphone, Tablet,
  TrendingUp, Flame, Sparkles, Crown, Diamond,
  Maximize2, Minimize2, Volume2, VolumeX, PlayCircle
} from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

type Video = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  views: number;
  likes: number;
  date: string;
  duration: string;
  category: string;
  tags: string[];
  channel: string;
  channelLink: string;
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
};

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest");
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // 🎬 Video Data - All YouTube Links
  const videos: Video[] = [
    {
      id: 1,
      title: "🚀 How to Deploy Njabulo Jb Bot on VPS",
      description: "Complete step-by-step tutorial on deploying Njabulo Jb WhatsApp bot on any VPS or hosting platform. Learn everything from installation to configuration.",
      thumbnail: "/images/video1.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example1",
      views: 15420,
      likes: 843,
      date: "2026-07-15",
      duration: "12:34",
      category: "Tutorial",
      tags: ["deployment", "vps", "whatsapp-bot", "njabulo-jb"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      featured: true,
      trending: true,
      popular: true
    },
    {
      id: 2,
      title: "🤖 Telegram Bot Setup & Deployment Guide",
      description: "Learn how to create and deploy your own Telegram bot from scratch. Includes bot creation, API setup, and advanced features.",
      thumbnail: "/images/video2.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example2",
      views: 8930,
      likes: 512,
      date: "2026-07-20",
      duration: "15:21",
      category: "Tutorial",
      tags: ["telegram", "bot", "deployment", "api"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      trending: true
    },
    {
      id: 3,
      title: "⚡ Njabulo Jb Bot - Full Features Overview",
      description: "Explore all the powerful features of Njabulo Jb WhatsApp bot. From AI chat to media downloader, see everything in action.",
      thumbnail: "/images/video3.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example3",
      views: 12450,
      likes: 721,
      date: "2026-07-25",
      duration: "18:45",
      category: "Features",
      tags: ["features", "whatsapp-bot", "ai", "demo"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      featured: true,
      popular: true
    },
    {
      id: 4,
      title: "🔧 Telegram Bot Advanced Commands & Automation",
      description: "Master advanced Telegram bot commands, automation, and integration techniques. Take your bot to the next level.",
      thumbnail: "/images/video4.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example4",
      views: 6720,
      likes: 389,
      date: "2026-07-28",
      duration: "14:02",
      category: "Advanced",
      tags: ["telegram", "advanced", "commands", "automation"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    },
    {
      id: 5,
      title: "💡 WhatsApp Bot Best Practices & Tips",
      description: "Learn the best practices for running a successful WhatsApp bot. Includes security, performance, and user engagement tips.",
      thumbnail: "/images/video5.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example5",
      views: 10580,
      likes: 634,
      date: "2026-08-01",
      duration: "10:56",
      category: "Tips",
      tags: ["best-practices", "whatsapp", "security", "performance"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      trending: true
    },
    {
      id: 6,
      title: "🎨 Njabulo UI Bot - Complete Walkthrough",
      description: "A complete walkthrough of the Njabulo UI Bot. Learn how to use the UI, generate code, and deploy your bots.",
      thumbnail: "/images/video6.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example6",
      views: 5420,
      likes: 312,
      date: "2026-08-03",
      duration: "22:18",
      category: "Walkthrough",
      tags: ["ui", "bot", "walkthrough", "code-generation"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    },
    {
      id: 7,
      title: "📱 Building WhatsApp Bot from Scratch",
      description: "Build a WhatsApp bot from scratch using Node.js. Covers everything from setup to deployment.",
      thumbnail: "/images/video7.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example7",
      views: 7890,
      likes: 456,
      date: "2026-08-05",
      duration: "25:43",
      category: "Tutorial",
      tags: ["build", "nodejs", "whatsapp-bot", "scratch"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      popular: true
    },
    {
      id: 8,
      title: "🤖 AI-Powered Chatbot Integration",
      description: "Integrate AI chatbots into your WhatsApp and Telegram bots. Use OpenAI and other AI services.",
      thumbnail: "/images/video8.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example8",
      views: 6540,
      likes: 423,
      date: "2026-08-07",
      duration: "16:32",
      category: "AI",
      tags: ["ai", "chatbot", "openai", "integration"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    },
    {
      id: 9,
      title: "🛡️ Securing Your WhatsApp Bot",
      description: "Learn how to secure your WhatsApp bot from attacks, spam, and unauthorized access.",
      thumbnail: "/images/video9.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=example9",
      views: 4320,
      likes: 278,
      date: "2026-08-08",
      duration: "11:45",
      category: "Security",
      tags: ["security", "protection", "anti-spam", "encryption"],
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    }
  ];

  // Categories
  const categories = ["All", "Tutorial", "Features", "Advanced", "Tips", "Walkthrough", "AI", "Security"];

  // Filter videos
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort videos
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === "latest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "popular") return b.views - a.views;
    if (sortBy === "trending") return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
    return 0;
  });

  // Featured videos
  const featuredVideos = videos.filter(v => v.featured);
  const popularVideos = videos.filter(v => v.popular);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const toggleLike = (id: number) => {
    setLikedVideos(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const openYouTube = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <BlurFade delay={0.04}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium text-slate-700 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="size-4" />
              ʙᴀᴄᴋ
            </Link>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl shadow-lg">
                <Youtube className="size-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                ᴊʙ ᴠɪᴅᴇᴏs
              </h1>
              <Film className="size-7 text-purple-500" />
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500">{videos.length} ᴠɪᴅᴇᴏs</span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 sᴇᴀʀᴄʜ ᴠɪᴅᴇᴏs..."
                className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="size-4 text-slate-400 hover:text-slate-600 transition-colors" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium text-slate-700 shadow-sm hover:shadow-md"
            >
              <Filter className="size-4" />
              Fɪʟᴛᴇʀs
              <ChevronDown className={`size-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-all ${viewMode === "grid" ? "bg-red-500 text-white" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
              >
                <Grid3x3 className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-all ${viewMode === "list" ? "bg-red-500 text-white" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
              >
                <List className="size-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-sm"
            >
              <option value="latest">📅 Latest</option>
              <option value="popular">🔥 Most Popular</option>
              <option value="trending">📈 Trending</option>
            </select>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm mb-6 animate-in slide-in-from-top-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-red-500 to-purple-500 text-white shadow-md shadow-red-500/20"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-slate-500 mb-4">
            {sortedVideos.length} ᴠɪᴅᴇᴏs ғᴏᴜɴᴅ
          </p>
        </BlurFade>

        {/* Featured Videos */}
        {featuredVideos.length > 0 && searchQuery === "" && selectedCategory === "All" && (
          <BlurFade delay={0.08}>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                <Star className="size-5 text-yellow-500 fill-yellow-500" />
                ғᴇᴀᴛᴜʀᴇᴅ ᴠɪᴅᴇᴏs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {featuredVideos.slice(0, 2).map((video) => (
                  <div
                    key={video.id}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-red-500/50 hover:shadow-xl transition-all duration-500 cursor-pointer"
                    onClick={() => openYouTube(video.youtubeUrl)}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-red-100 to-purple-100">
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">▶️</div>
                        <h3 className="text-lg font-bold text-slate-800 px-6 text-center line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-slate-600 px-6 text-center line-clamp-1 mt-1">{video.category}</p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-red-600/95 flex items-center justify-center hover:bg-red-700 transition-all cursor-pointer shadow-2xl shadow-red-500/30 transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="size-10 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded-lg text-xs text-white backdrop-blur-sm">
                        {video.duration}
                      </div>
                      {video.trending && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Flame className="size-3" />
                          Trending
                        </div>
                      )}
                      {video.popular && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <TrendingUp className="size-3" />
                          Popular
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-slate-800 line-clamp-1">{video.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{video.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Eye className="size-3" />
                          {formatNumber(video.views)}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="size-3" />
                          {formatNumber(video.likes)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {video.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <a
                          href={video.channelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-600 transition-colors hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Youtube className="size-3 text-red-500" />
                          {video.channel}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Video Grid */}
        <BlurFade delay={0.12}>
          {sortedVideos.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" 
              : "space-y-4"
            }>
              {sortedVideos.map((video, index) => (
                <div
                  key={video.id}
                  className={`group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-red-500/50 hover:shadow-xl transition-all duration-500 ${
                    viewMode === "list" ? "flex gap-5 p-4" : ""
                  }`}
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onClick={() => openYouTube(video.youtubeUrl)}
                >
                  {/* Thumbnail */}
                  <div className={`relative ${viewMode === "list" ? "w-56 flex-shrink-0" : "aspect-video"} bg-gradient-to-br from-red-100 to-purple-100 cursor-pointer`}>
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className={`${viewMode === "list" ? "text-4xl" : "text-5xl"} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                        ▶️
                      </div>
                      {viewMode === "list" ? (
                        <p className="text-xs text-slate-600 px-3 text-center line-clamp-2">{video.title}</p>
                      ) : (
                        <p className="text-xs text-slate-600 px-3 text-center line-clamp-1">{video.category}</p>
                      )}
                    </div>
                    {hoveredVideo === video.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-red-600/95 flex items-center justify-center hover:bg-red-700 transition-all cursor-pointer shadow-2xl shadow-red-500/30 transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="size-8 text-white ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded-lg text-[10px] text-white backdrop-blur-sm">
                      {video.duration}
                    </div>
                    {video.trending && !video.featured && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                        <Flame className="size-2.5" />
                        Trending
                      </div>
                    )}
                    {video.popular && !video.featured && !video.trending && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                        <TrendingUp className="size-2.5" />
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className={`p-4 flex-1 ${viewMode === "list" ? "flex flex-col justify-between" : ""}`}>
                    <div>
                      <h4 className={`font-semibold text-slate-800 ${viewMode === "list" ? "text-base" : "text-sm"} line-clamp-1`}>
                        {video.title}
                      </h4>
                      {viewMode === "list" && (
                        <p className="text-sm text-slate-500 line-clamp-2 mt-1">{video.description}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Eye className="size-3" />
                        {formatNumber(video.views)}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(video.id);
                        }}
                        className={`flex items-center gap-1 transition-colors ${
                          likedVideos.includes(video.id) ? "text-red-500" : "hover:text-red-500"
                        }`}
                      >
                        <Heart className={`size-3 ${likedVideos.includes(video.id) ? "fill-red-500" : ""}`} />
                        {formatNumber(video.likes + (likedVideos.includes(video.id) ? 1 : 0))}
                      </button>
                      <div className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {video.date}
                      </div>
                      <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] text-slate-500">
                        {video.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <a
                        href={video.channelLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-600 transition-colors hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Youtube className="size-3 text-red-500" />
                        {video.channel}
                      </a>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {video.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 bg-slate-100 rounded-full text-slate-500">
                          #{tag}
                        </span>
                      ))}
                      {video.tags.length > 3 && (
                        <span className="text-[9px] px-2 py-0.5 bg-slate-100 rounded-full text-slate-500">
                          +{video.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* YouTube Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openYouTube(video.youtubeUrl);
                      }}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                    >
                      <Youtube className="size-3" />
                      ᴡᴀᴛᴄʜ ᴏɴ ʏᴏᴜᴛᴜʙᴇ
                      <ExternalLink className="size-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-lg font-medium">ɴᴏ ᴠɪᴅᴇᴏs ғᴏᴜɴᴅ</p>
              <p className="text-sm mt-1">ᴛʀʏ ᴀ ᴅɪғғᴇʀᴇɴᴛ sᴇᴀʀᴄʜ ᴏʀ ғɪʟᴛᴇʀ</p>
            </div>
          )}
        </BlurFade>

        {/* Popular Videos Section */}
        {popularVideos.length > 0 && searchQuery === "" && selectedCategory === "All" && (
          <BlurFade delay={0.14}>
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                <TrendingUp className="size-5 text-green-500" />
                ᴘᴏᴘᴜʟᴀʀ ᴠɪᴅᴇᴏs
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {popularVideos.slice(0, 4).map((video) => (
                  <div
                    key={video.id}
                    className="group rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-red-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => openYouTube(video.youtubeUrl)}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-red-100 to-purple-100">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">▶️</div>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center hover:bg-red-700 transition-all">
                          <Play className="size-6 text-white ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-xs text-slate-800 line-clamp-1">{video.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <div className="flex items-center gap-0.5">
                          <Eye className="size-2.5" />
                          {formatNumber(video.views)}
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Heart className="size-2.5" />
                          {formatNumber(video.likes)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Footer */}
        <BlurFade delay={0.16}>
          <div className="text-center pt-8 mt-10 border-t border-slate-200">
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500 flex-wrap">
              <Youtube className="size-4 text-red-500" />
              <span>ᴘᴏᴡᴇʀᴇᴅ ʙʏ</span>
              <a
                href="https://www.youtube.com/@njabulojb"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors"
              >
                Njabulo Jb Tech
              </a>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">© 2026</span>
            </div>
          </div>
        </BlurFade>

      </div>
    </div>
  );
}
