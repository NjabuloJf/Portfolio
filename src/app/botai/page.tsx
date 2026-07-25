"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, Crown, Shield, Bot, 
  Smartphone, Send, MessageCircle, Zap, 
  Users, Database, Cloud, Server, Lock, 
  TrendingUp, Star, Award, Medal, Diamond,
  Facebook, Instagram, Twitter, Youtube,
  Github, Linkedin, Globe, ExternalLink,
  Play, Pause, Volume2, VolumeX, Maximize
} from "lucide-react";

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
  bgGradient: string;
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
  const [isMuted, setIsMuted] = useState(false);

  const slides: SlideImage[] = [
    {
      id: 1,
      src: "/images/botai/banner1.png",
      alt: "Njabulo Jb Bot AI",
      title: "Njabulo Jb Bot AI",
      description: "The most powerful WhatsApp bot with advanced AI capabilities"
    },
    {
      id: 2,
      src: "/images/botai/banner2.png",
      alt: "GWM-XMD Bot",
      title: "GWM-XMD Bot",
      description: "Next generation WhatsApp bot with premium features"
    },
    {
      id: 3,
      src: "/images/botai/banner3.png",
      alt: "Njabulo Jb Telegram Bot",
      title: "Njabulo Jb Telegram Bot",
      description: "Advanced Telegram bot with channel management"
    },
    {
      id: 4,
      src: "/images/botai/banner4.png",
      alt: "AI Assistant",
      title: "AI Assistant",
      description: "Intelligent AI powered by Njabulo Jb"
    },
    {
      id: 5,
      src: "/images/botai/banner5.png",
      alt: "Bot Ecosystem",
      title: "Bot Ecosystem",
      description: "Complete ecosystem of bots and tools"
    }
  ];

  const bots: BotData[] = [
    {
      id: 1,
      name: "Njabulo-Jb WhatsApp Bot",
      icon: <MessageCircle className="size-8 text-white" />,
      color: "from-green-500 to-emerald-600",
      bgGradient: "from-green-600/20 to-emerald-600/20",
      description: "The ultimate WhatsApp bot with multi-device support, AI chat, and advanced features. Trusted by thousands of users worldwide.",
      features: [
        "Multi-device support",
        "AI chat integration",
        "Group management",
        "Auto-reply system",
        "Media downloader",
        "Anti-spam protection"
      ],
      rules: [
        "1. Respect all users in the group",
        "2. No spamming or flooding",
        "3. Use bot for legal purposes only",
        "4. Do not share inappropriate content",
        "5. Follow WhatsApp terms of service",
        "6. Report any bugs to support"
      ],
      image: "/images/botai/whatsapp-bot.png",
      link: "/njabulobot"
    },
    {
      id: 2,
      name: "GWM-XMD WhatsApp Bot",
      icon: <Zap className="size-8 text-white" />,
      color: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-600/20 to-pink-600/20",
      description: "Next generation WhatsApp bot with enhanced security, faster response, and premium features.",
      features: [
        "Enhanced security",
        "Faster response time",
        "Premium features",
        "24/7 uptime",
        "Web dashboard",
        "Analytics tracking"
      ],
      rules: [
        "1. Premium features require activation",
        "2. Keep your session ID secure",
        "3. Do not share API keys",
        "4. Use responsibly",
        "5. Respect privacy of others",
        "6. Follow community guidelines"
      ],
      image: "/images/botai/gwmxmd-bot.png",
      link: "/gwmxmd"
    },
    {
      id: 3,
      name: "Njabulo-Jb Telegram Bot",
      icon: <Send className="size-8 text-white" />,
      color: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-600/20 to-cyan-600/20",
      description: "Advanced Telegram bot for channels and groups. Complete with AI integration and automation.",
      features: [
        "Channel management",
        "Auto-forwarding",
        "Inline keyboard",
        "AI responses",
        "Analytics",
        "File sharing"
      ],
      rules: [
        "1. No spam or promotional messages",
        "2. Respect channel guidelines",
        "3. Use commands properly",
        "4. Do not share personal info",
        "5. Report any issues",
        "6. Follow Telegram policies"
      ],
      image: "/images/botai/telegram-bot.png",
      link: "/njabulo-telegrambot"
    }
  ];

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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-6 py-3 rounded-2xl border border-yellow-500/30">
            <Crown className="size-8 text-yellow-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Njabulo Jb Bot AI
            </h1>
            <Crown className="size-8 text-yellow-500" />
          </div>
          <p className="text-gray-400 mt-2 text-sm">King of WhatsApp & Telegram Bots</p>
        </div>

        {/* Image Slider */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-purple-900/30 mb-8">
          <div className="relative h-64 md:h-96">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentSlide 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-95"
                }`}
              >
                <div className="w-full h-full bg-gradient-to-r from-purple-800/50 to-pink-800/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🤖</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-gray-300 text-lg">
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
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? "w-8 bg-yellow-500" 
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Bots Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className={`border rounded-2xl overflow-hidden bg-gradient-to-br ${bot.bgGradient} border-purple-900/30 hover:border-yellow-500/50 transition-all duration-300`}
            >
              {/* Bot Header - Gold King Crown */}
              <div className={`bg-gradient-to-r ${bot.color} p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white/20">
                    {bot.icon}
                  </div>
                  <span className="text-white font-semibold text-sm">{bot.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="size-6 text-yellow-300" />
                  <span className="text-yellow-300 text-xs font-bold">KING</span>
                </div>
              </div>

              {/* Bot Image */}
              <div className="p-4 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500/30 flex items-center justify-center">
                  <div className="text-4xl">
                    {bot.id === 1 && "💬"}
                    {bot.id === 2 && "⚡"}
                    {bot.id === 3 && "✈️"}
                  </div>
                </div>
              </div>

              {/* Bot Description */}
              <div className="px-4">
                <p className="text-gray-300 text-sm text-center">{bot.description}</p>
              </div>

              {/* Features */}
              <div className="px-4 py-2">
                <div className="flex flex-wrap gap-1 justify-center">
                  {bot.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-gray-400">
                      {feature}
                    </span>
                  ))}
                  {bot.features.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-gray-400">
                      +{bot.features.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Rules */}
              <div className="px-4 py-2">
                <button
                  onClick={() => setSelectedBot(selectedBot === bot.id ? null : bot.id)}
                  className="w-full flex items-center justify-between text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <span>📜 Rules & Guidelines</span>
                  <ChevronRight className={`size-4 transition-transform ${selectedBot === bot.id ? "rotate-90" : ""}`} />
                </button>
                {selectedBot === bot.id && (
                  <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                    {bot.rules.map((rule, idx) => (
                      <p key={idx} className="text-[11px] text-gray-400 border-b border-white/5 pb-1">
                        {rule}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Button */}
              <div className="p-4">
                <Link
                  href={bot.link}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all text-sm font-medium"
                >
                  <Crown className="size-4" />
                  View Bot
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-purple-900/30">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Crown className="size-4 text-yellow-500" />
            <span>Powered by</span>
            <span className="font-semibold text-white">Njabulo Jb AI</span>
            <span className="text-gray-500">© 2026</span>
          </div>
          <p className="text-[10px] text-gray-600 mt-1">
            The King of WhatsApp & Telegram Bots
          </p>
        </div>
      </div>
    </div>
  );
  }
