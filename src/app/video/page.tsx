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
  Maximize2, Minimize2, Volume2, VolumeX, PlayCircle,
  CheckCircle, AlertCircle, Info
} from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

type Video = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  embedUrl: string;
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
  isShort?: boolean;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement | null>(null);

  // 🎬 Video Data - Your Actual Videos
  const videos: Video[] = [
    {
      id: 1,
      title: "🚀 How to Deploy NjabuloJb Minibot on Render Free 📡💬",
      description: "Step by step tutorial on how to deploy NjabuloJb minibot on Render for free. Full guide with easy steps.",
      thumbnail: "https://img.youtube.com/vi/_c6F4vGdJbU/maxresdefault.jpg",
      youtubeUrl: "https://youtube.com/shorts/_c6F4vGdJbU",
      embedUrl: "https://www.youtube.com/embed/_c6F4vGdJbU",
      views: 2,
      likes: 1,
      date: "2025-09-01",
      duration: "0:45",
      category: "Tutorial",
      tags: ["deploy", "render", "minibot", "whatsapp-bot", "free"],
      channel: "Njabulo-JB Office",
      channelLink: "https://www.youtube.com/@Njabulo-JBOffice",
      featured: true,
      trending: true,
      popular: true,
      isShort: true
    },
    {
      id: 2,
      title: "📹 How to Deploy Njabulo JB Simple WhatsApp Bot on Heroku",
      description: "Watch video now! Complete guide to deploy Njabulo JB WhatsApp bot on Heroku with simple steps.",
      thumbnail: "https://img.youtube.com/vi/yuFuKu9SUIM/maxresdefault.jpg",
      youtubeUrl: "https://youtu.be/yuFuKu9SUIM",
      embedUrl: "https://www.youtube.com/embed/yuFuKu9SUIM",
      views: 74,
      likes: 4,
      date: "2024-12-26",
      duration: "8:42",
      category: "Tutorial",
      tags: ["heroku", "deploy", "whatsapp-bot", "njabulo-jb"],
      channel: "Njabulo-JB Office",
      channelLink: "https://www.youtube.com/@Njabulo-JBOffice",
      featured: true,
      trending: true,
      popular: true
    }
  ];

  // Categories
  const categories = ["All", "Tutorial", "Deployment", "WhatsApp Bot", "Heroku", "Render"];

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

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
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

          {/* Channel Info */}
          <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl shadow-sm mb-4">
            <div className="p-2 bg-red-500/10 rounded-xl">
              <Youtube className="size-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Njabulo-JB Office</h3>
              <p className="text-xs text-slate-500">11 subscribers • 4 videos</p>
            </div>
            <a
              href="https://www.youtube.com/@Njabulo-JBOffice"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto px-4 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
            >
              Sᴜʙsᴄʀɪʙᴇ
            </a>
          </div>

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
                    onClick={() => openVideo(video)}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-red-100 to-purple-100">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-red-600/95 flex items-center justify-center hover:bg-red-700 transition-all cursor-pointer shadow-2xl shadow-red-500/30 transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="size-10 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded-lg text-xs text-white backdrop-blur-sm">
                        {video.duration}
                      </div>
                      {video.isShort && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Zap className="size-3" />
                          Short
                        </div>
                      )}
                      {video.trending && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Flame className="size-3" />
                          Trending
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openVideo(video);
                        }}
                        className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                      >
                        <Play className="size-3" />
                        ᴡᴀᴛᴄʜ ɴᴏᴡ
                      </button>
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
                  onClick={() => openVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className={`relative ${viewMode === "list" ? "w-56 flex-shrink-0" : "aspect-video"} bg-gradient-to-br from-red-100 to-purple-100 cursor-pointer`}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
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
                    {video.isShort && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                        <Zap className="size-2.5" />
                        Short
                      </div>
                    )}
                    {video.trending && !video.featured && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                        <Flame className="size-2.5" />
                        Trending
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

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openVideo(video);
                      }}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-xs font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                    >
                      <Play className="size-3" />
                      ᴡᴀᴛᴄʜ ɴᴏᴡ
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

        {/* Footer */}
        <BlurFade delay={0.16}>
          <div className="text-center pt-8 mt-10 border-t border-slate-200">
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500 flex-wrap">
              <Youtube className="size-4 text-red-500" />
              <span>ᴘᴏᴡᴇʀᴇᴅ ʙʏ</span>
              <a
                href="https://www.youtube.com/@Njabulo-JBOffice"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors"
              >
                Njabulo-JB Office
              </a>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">© 2026</span>
            </div>
          </div>
        </BlurFade>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X className="size-6" />
              </button>

              {/* Video Title */}
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-white font-semibold text-sm line-clamp-1 max-w-[70%]">
                  {selectedVideo.title}
                </h3>
                <p className="text-white/60 text-xs">{selectedVideo.channel}</p>
              </div>

              {/* Video Player */}
              <div className="aspect-video w-full">
                <iframe
                  ref={videoRef}
                  src={`${selectedVideo.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>

              {/* Video Info */}
              <div className="p-4 bg-black/80 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <Eye className="size-3" />
                    {formatNumber(selectedVideo.views)} views
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="size-3" />
                    {formatNumber(selectedVideo.likes)} likes
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {selectedVideo.date}
                  </div>
                  {selectedVideo.isShort && (
                    <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full text-[10px]">
                      Short
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedVideo.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] px-2 py-0.5 bg-white/10 text-white/50 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  <Youtube className="size-3" />
                  ᴏᴘᴇɴ ᴏɴ ʏᴏᴜᴛᴜʙᴇ
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
