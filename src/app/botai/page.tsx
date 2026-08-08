"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";
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
  Clock, Heart
} from "lucide-react";
import { DATA } from "@/data/resume";

type SlideImage = {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  date: string;
  channel: string;
  channelLink: string;
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

  // 🎬 YouTube Videos with views, likes, and channel info
  const slides: SlideImage[] = [
    {
      id: 1,
      src: "/images/song1.mp4",
      alt: "How to Deploy Njabulo Jb Bot",
      title: "🚀 How to Deploy Njabulo Jb Bot",
      description: "Step by step guide to deploy your own Njabulo Jb WhatsApp bot on VPS or hosting",
      views: 15420,
      likes: 843,
      date: "2026-07-15",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    },
    {
      id: 2,
      src: "/images/song2.mp4",
      alt: "Telegram Bot Setup Guide",
      title: "🤖 Telegram Bot Setup & Deployment Guide",
      description: "Complete tutorial on how to create and deploy your own Telegram bot",
      views: 8930,
      likes: 512,
      date: "2026-07-20",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    },
    {
      id: 3,
      src: "/images/song3.mp4",
      alt: "Njabulo Jb Bot Features",
      title: "⚡ Njabulo Jb Bot - Full Features Overview",
      description: "Explore all the powerful features of Njabulo Jb WhatsApp bot",
      views: 12450,
      likes: 721,
      date: "2026-07-25",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    },
    {
      id: 4,
      src: "/images/song4.mp4",
      alt: "Telegram Bot Advanced Commands",
      title: "🔧 Telegram Bot Advanced Commands & Automation",
      description: "Learn advanced Telegram bot commands and automation techniques",
      views: 6720,
      likes: 389,
      date: "2026-07-28",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    },
    {
      id: 5,
      src: "/images/song5.mp4",
      alt: "WhatsApp Bot Best Practices",
      title: "💡 WhatsApp Bot Best Practices & Tips",
      description: "Best practices for running a successful WhatsApp bot",
      views: 10580,
      likes: 634,
      date: "2026-08-01",
      channel: "Njabulo Jb Tech",
      channelLink: "https://www.youtube.com/@njabulojb"
    }
  ];

  // 🎯 Bots - Removed GWM-XMD and Njabulo UI Bot
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

  const filteredBots = bots.filter(bot => 
    bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentSlide]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Format number with K/M
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Arrow */}
        <BlurFade delay={0.04}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            {/* Back Arrow Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm"
            >
              <ArrowLeft className="size-4" />
              ʙᴀᴄᴋ
            </Link>

            {/* Title */}
            <div className="flex items-center gap-2">
              <Bot className="size-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                ᴊʙ ʙᴏᴛ ᴀɪ
              </h1>
              <Bot className="size-8 text-primary" />
            </div>

            {/* Empty div for spacing */}
            <div className="w-[100px] hidden md:block" />
          </div>

          {/* Search Bar */}
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
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            )}
          </div>

          <p className="text-muted-foreground text-center text-sm mb-2">ᴡʜᴀᴛsᴀᴘᴘ & ᴛᴇʟᴇɢʀᴀᴍ ʙᴏᴛ ᴇᴄᴏsʏsᴛᴇᴍ</p>
        </BlurFade>

        {/* 🎬 YouTube Video Slider with Views & Likes */}
        <BlurFade delay={0.08}>
          <div className="relative rounded-2xl overflow-hidden bg-card/50 border border-border mb-8">
            <div className="relative h-72 md:h-96">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-95"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-purple-500/20 flex flex-col items-center justify-center p-6">
                    {/* YouTube Video Thumbnail */}
                    <div className="relative w-full max-w-3xl h-48 md:h-56 rounded-xl overflow-hidden bg-black/10">
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-500/20 to-purple-500/20">
                        <div className="text-6xl mb-2">▶️</div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground text-center px-4">
                          {slide.title}
                        </h3>
                        <p className="text-muted-foreground text-sm text-center px-4 mt-1 max-w-2xl">
                          {slide.description}
                        </p>
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer shadow-2xl">
                            <Play className="size-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Stats */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="size-3" />
                        <span>{formatNumber(slide.views)} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="size-3" />
                        <span>{formatNumber(slide.likes)} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>{slide.date}</span>
                      </div>
                      <a
                        href={slide.channelLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors hover:underline"
                      >
                        <Youtube className="size-3 text-red-500" />
                        <span>{slide.channel}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-border text-foreground hover:bg-gray-50 transition-colors shadow-sm z-10"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-border text-foreground hover:bg-gray-50 transition-colors shadow-sm z-10"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute top-4 left-4 p-2 rounded-full bg-white border border-border text-foreground hover:bg-gray-50 transition-colors shadow-sm z-10"
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? "w-6 bg-primary" 
                      : "bg-muted hover:bg-muted/80"
                  }`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="absolute top-4 right-4 bg-white border border-border text-xs text-muted-foreground px-3 py-1 rounded-full shadow-sm z-10">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </BlurFade>

        {/* Bots Section - Now with 3 bots */}
        <BlurFade delay={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBots.length > 0 ? (
              filteredBots.map((bot) => (
                <div
                  key={bot.id}
                  className={`border rounded-2xl overflow-hidden bg-card/50 border-border hover:border-primary/50 transition-all duration-300`}
                >
                  {/* Bot Header */}
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

                  {/* Bot Image */}
                  <div className="p-4 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border-2 border-primary/30 flex items-center justify-center">
                      <img
                        src={bot.image}
                        alt={bot.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="text-3xl">
                              ${bot.id === 1 ? "💬" : bot.id === 2 ? "✈️" : "📢"}
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  {/* Bot Description */}
                  <div className="px-4">
                    <p className="text-muted-foreground text-sm text-center">{bot.description}</p>
                  </div>

                  {/* Features */}
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

                  {/* Rules */}
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

                  {/* Button */}
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
