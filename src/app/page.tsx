"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { 
  ChevronLeft, ChevronRight, Crown, Shield, Bot, 
  Smartphone, Send, MessageCircle, Zap, 
  Users, Database, Cloud, Server, Lock, 
  TrendingUp, Star, Award, Medal, Diamond,
  Facebook, Instagram, Twitter, Youtube,
  Github, Linkedin, Globe, ExternalLink,
  Play, Pause, Volume2, VolumeX, Maximize,
  CheckCircle, ArrowRight, Home, Search,
  Menu, X, Filter, Grid3x3, List, ArrowLeft,
  Layout, Code, Terminal, Eye, ThumbsUp, Calendar,
  Clock, Heart, SkipForward, SkipBack, RotateCw
} from "lucide-react";
import { DATA } from "@/data/resume";

type SlideVideo = {
  id: number;
  src: string;
  poster?: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  date: string;
  channel: string;
  channelLink: string;
  duration?: string;
};

type BotData = {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  features: string[];
  rules: string[];
  image: string;
  link: string;
};

export default function BotAIPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedBot, setSelectedBot] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // 🎬 YouTube Videos with HTML5 Video Support
  const slides: SlideVideo[] = [
    {
      id: 1,
      src: "/videos/deploy-njabulo-bot.mp4",
      poster: "/images/video-poster1.jpg",
      title: "🚀 How to Deploy Njabulo Jb Bot",
      description: "Step by step guide to deploy your own Njabulo Jb WhatsApp bot on VPS or hosting",
      views: 15420,
      likes: 843,
      date: "2026-07-15",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      duration: "12:34"
    },
    {
      id: 2,
      src: "/videos/telegram-bot-setup.mp4",
      poster: "/images/video-poster2.jpg",
      title: "🤖 Telegram Bot Setup & Deployment Guide",
      description: "Complete tutorial on how to create and deploy your own Telegram bot",
      views: 8930,
      likes: 512,
      date: "2026-07-20",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      duration: "15:21"
    },
    {
      id: 3,
      src: "/videos/njabulo-bot-features.mp4",
      poster: "/images/video-poster3.jpg",
      title: "⚡ Njabulo Jb Bot - Full Features Overview",
      description: "Explore all the powerful features of Njabulo Jb WhatsApp bot",
      views: 12450,
      likes: 721,
      date: "2026-07-25",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      duration: "18:45"
    },
    {
      id: 4,
      src: "/videos/telegram-advanced.mp4",
      poster: "/images/video-poster4.jpg",
      title: "🔧 Telegram Bot Advanced Commands & Automation",
      description: "Learn advanced Telegram bot commands and automation techniques",
      views: 6720,
      likes: 389,
      date: "2026-07-28",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      duration: "14:02"
    },
    {
      id: 5,
      src: "/videos/whatsapp-bot-tips.mp4",
      poster: "/images/video-poster5.jpg",
      title: "💡 WhatsApp Bot Best Practices & Tips",
      description: "Best practices for running a successful WhatsApp bot",
      views: 10580,
      likes: 634,
      date: "2026-08-01",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb",
      duration: "10:56"
    }
  ];

  // 🎯 Bots - Only Njabulo-Jb Bot, Telegram Bot, and Telegram Channel
  const bots: BotData[] = [
    {
      id: 1,
      name: "ɴᴊᴀʙᴜʟᴏ-ᴊʙ ʙᴏᴛ",
      icon: <MessageCircle className="size-6 text-green-500" />,
      color: "from-green-500/10 to-emerald-500/10",
      description: "The ultimate WhatsApp bot with multi-device support, AI chat, and advanced features.",
      features: ["Multi-device support", "AI chat integration", "Group management", "Auto-reply system", "Media downloader", "Anti-spam protection"],
      rules: [
        "Respect all users in the group",
        "No spamming or flooding",
        "Use bot for legal purposes only",
        "Do not share inappropriate content",
        "Follow WhatsApp terms of service"
      ],
      image: "/images/njabulob.png",
      link: "/njabulobot"
    },
    {
      id: 2,
      name: "ᴛᴇʟᴇɢʀᴀᴍ ʙᴏᴛ",
      icon: <Send className="size-6 text-blue-500" />,
      color: "from-blue-500/10 to-cyan-500/10",
      description: "Advanced Telegram bot for channels and groups with AI integration and automation.",
      features: ["Channel management", "Auto-forwarding", "Inline keyboard", "AI responses", "Analytics", "File sharing"],
      rules: [
        "No spam or promotional messages",
        "Respect channel guidelines",
        "Use commands properly",
        "Do not share personal info",
        "Follow Telegram policies"
      ],
      image: "/images/image4.png",
      link: "/njabulo-telegrambot"
    },
    {
      id: 3,
      name: "ɴᴊᴀʙᴜʟᴏ ᴛᴇʟᴇɢʀᴀᴍ ᴄʜᴀɴɴᴇʟ",
      icon: <Users className="size-6 text-yellow-500" />,
      color: "from-yellow-500/10 to-amber-500/10",
      description: "Join Njabulo Jb Telegram channel for updates, news, and community support.",
      features: ["Daily updates", "Community support", "Bot announcements", "Tips & tricks", "Exclusive content", "Direct support"],
      rules: [
        "Be respectful to others",
        "No offensive language",
        "Stay on topic",
        "No spam or self-promotion",
        "Follow channel guidelines"
      ],
      image: "/images/image2.png",
      link: "https://t.me/njabulojbbot"
    }
  ];

  // Format number with K/M
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Video controls
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setVideoProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    // Auto go to next video
    setTimeout(() => {
      nextSlide();
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const goToSlide = (index: number) => {
    // Pause current video
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
    setCurrentSlide(index);
    setVideoProgress(0);
    setCurrentTime(0);
    
    // Reset interval
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  };

  // Auto-slide timer
  useEffect(() => {
    if (isPlaying) {
      slideInterval.current = setInterval(() => {
        nextSlide();
      }, 8000);
    }
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPlaying, currentSlide]);

  // Video autoplay on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, user needs to interact
        setIsVideoPlaying(false);
      });
    }
  }, [currentSlide]);

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredBots = bots.filter(bot => 
    bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <BlurFade delay={0.04}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm"
            >
              <ArrowLeft className="size-4" />
              ʙᴀᴄᴋ
            </Link>

            <div className="flex items-center gap-2">
              <Bot className="size-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                ᴊʙ ʙᴏᴛ ᴀɪ
              </h1>
              <Bot className="size-8 text-primary" />
            </div>

            <div className="w-[100px] hidden md:block" />
          </div>

          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 sᴇᴀʀᴄʜ Jʙ ʙᴏᴛ Aɪ..."
              className="w-full pl-9 pr-10 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            )}
          </div>

          <p className="text-muted-foreground text-center text-sm mb-2">ᴡʜᴀᴛsᴀᴘᴘ & ᴛᴇʟᴇɢʀᴀᴍ ʙᴏᴛ ᴇᴄᴏsʏsᴛᴇᴍ</p>
        </BlurFade>

        {/* 🎬 Video Player */}
        <BlurFade delay={0.08}>
          <div className="relative rounded-2xl overflow-hidden bg-card/50 border border-border mb-8">
            <div className="relative">
              {/* Video Element */}
              <video
                ref={videoRef}
                src={slides[currentSlide].src}
                poster={slides[currentSlide].poster}
                className="w-full h-[400px] md:h-[500px] object-cover bg-black"
                onTimeUpdate={handleVideoProgress}
                onLoadedMetadata={handleVideoLoaded}
                onEnded={handleVideoEnded}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                playsInline
                preload="metadata"
              />

              {/* Video Overlay - Show when paused or not playing */}
              {!isVideoPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={toggleVideoPlay}
                    className="w-20 h-20 rounded-full bg-red-600/90 hover:bg-red-700 transition-colors flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform"
                  >
                    <Play className="size-10 text-white ml-1" />
                  </button>
                </div>
              )}

              {/* Video Title Overlay */}
              <div className="absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-lg md:text-xl font-bold">{slides[currentSlide].title}</h3>
                <p className="text-white/80 text-sm">{slides[currentSlide].description}</p>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleVideoPlay}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {isVideoPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
                  </button>
                  
                  <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer relative">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${videoProgress}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={videoProgress}
                      onChange={(e) => {
                        if (videoRef.current) {
                          const val = parseFloat(e.target.value);
                          videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
                          setVideoProgress(val);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  <span className="text-white/80 text-xs">
                    {formatTime(currentTime)} / {formatTime(videoDuration)}
                  </span>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = !videoRef.current.muted;
                      }
                    }}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    <Volume2 className="size-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (videoRef.current.requestFullscreen) {
                          videoRef.current.requestFullscreen();
                        }
                      }
                    }}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    <Maximize className="size-4" />
                  </button>
                </div>

                {/* Video Stats */}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-white/70">
                  <div className="flex items-center gap-1">
                    <Eye className="size-3" />
                    <span>{formatNumber(slides[currentSlide].views)} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="size-3" />
                    <span>{formatNumber(slides[currentSlide].likes)} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    <span>{slides[currentSlide].date}</span>
                  </div>
                  <a
                    href={slides[currentSlide].channelLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                  >
                    <Youtube className="size-3 text-red-500" />
                    <span>{slides[currentSlide].channel}</span>
                  </a>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors shadow-sm z-10"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors shadow-sm z-10"
              >
                <ChevronRight className="size-6" />
              </button>

              {/* Auto-Play Toggle */}
              <button
                onClick={toggleAutoPlay}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors shadow-sm z-10"
                title={isPlaying ? "Pause auto-slide" : "Resume auto-slide"}
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
              </button>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full shadow-sm z-10">
                {currentSlide + 1} / {slides.length}
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide 
                        ? "w-6 bg-white" 
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Bots Section */}
        <BlurFade delay={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBots.length > 0 ? (
              filteredBots.map((bot) => (
                <div
                  key={bot.id}
                  className={`border rounded-2xl overflow-hidden bg-card/50 border-border hover:border-primary/50 transition-all duration-300`}
                >
                  <div className={`bg-gradient-to-r ${bot.color} p-4 flex items-center justify-between border-b border-border`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-white">
                        {bot.icon}
                      </div>
                      <span className="font-semibold text-sm">{bot.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Crown className="size-4 text-primary" />
                      <span className="text-xs text-primary font-medium">ɢᴏʟᴅ</span>
                    </div>
                  </div>

                  <div className="p-4 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border-2 border-primary/30 flex items-center justify-center">
                      <img
                        src={bot.image}
                        alt={bot.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div className="px-4">
                    <p className="text-muted-foreground text-sm text-center">{bot.description}</p>
                  </div>

                  <div className="px-4 py-2">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {bot.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                      {bot.features.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          +{bot.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="px-4 py-2">
                    <button
                      onClick={() => setSelectedBot(selectedBot === bot.id ? null : bot.id)}
                      className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>📜 ʀᴜʟᴇs & ɢᴜɪᴅᴇʟɪɴᴇs</span>
                      <ChevronRight className={`size-4 transition-transform ${selectedBot === bot.id ? "rotate-90" : ""}`} />
                    </button>
                    {selectedBot === bot.id && (
                      <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                        {bot.rules.map((rule, idx) => (
                          <p key={idx} className="text-[11px] text-muted-foreground border-b border-border/50 pb-1">
                            {rule}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {bot.id === 3 ? (
                      <a
                        href={bot.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 shadow-sm"
                      >
                        ᴊᴏɪɴ ᴄʜᴀɴɴᴇʟ
                        <ArrowRight className="size-4" />
                      </a>
                    ) : (
                      <Link
                        href={bot.link}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 shadow-sm"
                      >
                        ᴠɪᴇᴡ ʙᴏᴛ
                        <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                <Bot className="size-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>ɴᴏ ʙᴏᴛs ғᴏᴜɴᴅ ғᴏʀ "{searchQuery}"</p>
              </div>
            )}
          </div>
        </BlurFade>

        {/* Footer */}
        <BlurFade delay={0.16}>
          <div className="text-center pt-6 mt-8 border-t border-border">
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground flex-wrap">
              <Bot className="size-4 text-primary" />
              <span>ᴘᴏᴡᴇʀᴇᴅ ʙʏ</span>
              <a
                href="https://github.com/NjabuloJf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-500 hover:text-blue-600 hover:underline transition-colors"
              >
                Njabulo Jb AI
              </a>
              <span className="text-muted-foreground">© 2026</span>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
  }
