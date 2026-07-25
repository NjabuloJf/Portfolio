"use client";

import { useState, useEffect } from "react";
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
  Menu, X, Filter, Grid3x3, List, ArrowLeft
} from "lucide-react";
import { DATA } from "@/data/resume";

type SlideImage = {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
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

  const slides: SlideImage[] = [
    {
      id: 1,
      src: "images/image5.png",
      alt: "Njabulo Jb Bot AI",
      title: "Njabulo Jb Bot AI",
      description: "The most powerful WhatsApp bot with advanced AI capabilities"
    },
    {
      id: 2,
      src: "images/image4.png",
      alt: "GWM-XMD Bot",
      title: "GWM-XMD Bot",
      description: "Next generation WhatsApp bot with premium features"
    },
    {
      id: 3,
      src: "images/image3.png",
      alt: "Njabulo Jb Telegram Bot",
      title: "Njabulo Jb Telegram Bot",
      description: "Advanced Telegram bot with channel management"
    },
    {
      id: 4,
      src: "images/image2.png",
      alt: "AI Assistant",
      title: "AI Assistant",
      description: "Intelligent AI powered by Njabulo Jb"
    },
    {
      id: 5,
      src: "images/image1.png",
      alt: "Bot Ecosystem",
      title: "Bot Ecosystem",
      description: "Complete ecosystem of bots and tools"
    }
  ];

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
      image: "images/image2.png",
      link: "/njabulobot"
    },
    {
      id: 2,
      name: "ɢᴡᴍ-xᴍᴅ",
      icon: <Zap className="size-6 text-purple-500" />,
      color: "from-purple-500/10 to-pink-500/10",
      description: "Next generation WhatsApp bot with enhanced security, faster response, and premium features.",
      features: ["Enhanced security", "Faster response", "Premium features", "24/7 uptime", "Web dashboard", "Analytics tracking"],
      rules: [
        "Premium features require activation",
        "Keep your session ID secure",
        "Do not share API keys",
        "Use responsibly",
        "Respect privacy of others"
      ],
      image: "/images/botai/gwmxmd-bot.png",
      link: "/gwmxmd"
    },
    {
      id: 3,
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
      image: "/images/botai/telegram-bot.png",
      link: "/njabulo-telegrambot"
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
      const timer = setInterval(nextSlide, 4000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentSlide]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const clearSearch = () => {
    setSearchQuery("");
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

          {/* Search Bar with "Jb bot Ai" placeholder */}
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

        {/* Image Slider */}
        <BlurFade delay={0.08}>
          <div className="relative rounded-2xl overflow-hidden bg-card/50 border border-border mb-8">
            <div className="relative h-64 md:h-80">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-95"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-r from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🤖</div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {slide.title}
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-border text-foreground hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-border text-foreground hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
            <div className="absolute top-4 right-4 bg-white border border-border text-xs text-muted-foreground px-3 py-1 rounded-full shadow-sm">
              {currentSlide + 1} / {slides.length}
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
                      <div className="text-3xl">
                        {bot.id === 1 && "💬"}
                        {bot.id === 2 && "⚡"}
                        {bot.id === 3 && "✈️"}
                      </div>
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

                  {/* Button - White background */}
                  <div className="p-4">
                    <Link
                      href={bot.link}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 shadow-sm"
                    >
                      ᴠɪᴇᴡ ʙᴏᴛ
                      <ArrowRight className="size-4" />
                    </Link>
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
