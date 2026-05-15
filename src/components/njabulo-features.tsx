"use client";

import { 
  Bot, Shield, Zap, Database, Server, Clock, Gamepad2, 
  Download, Users, Link2, Eye, MessageSquare, Smartphone,
  Globe, Music, Video, Image, Lock, Award, CloudLightning,
  PhoneCall, BookOpen, Sparkles, HeartHandshake, Cpu,
  ChevronRight, TrendingUp, CheckCircle
} from "lucide-react";
import { useState } from "react";

export function NjabuloFeatures() {
  const [showAll, setShowAll] = useState(false);
  
  const allFeatures = [
    { icon: <Smartphone className="size-5" />, name: "Multi-Device Support", description: "Latest WhatsApp multi-device protocol", premium: false, category: "Core" },
    { icon: <Bot className="size-5" />, name: "Advanced AI Chatbot", description: "OpenAI, Groq, Gemini & Claude integration", premium: false, category: "AI" },
    { icon: <Database className="size-5" />, name: "Multiple Databases", description: "MongoDB, PostgreSQL & Redis support", premium: false, category: "Database" },
    { icon: <Download className="size-5" />, name: "Media Downloader", description: "YouTube, TikTok, Instagram, Facebook, Twitter", premium: false, category: "Downloader" },
    { icon: <Shield className="size-5" />, name: "Anti-Link & Anti-Spam", description: "Advanced protection system with AI detection", premium: false, category: "Security" },
    { icon: <PhoneCall className="size-5" />, name: "Anti-Call", description: "Block spam calls automatically", premium: false, category: "Security" },
    { icon: <Users className="size-5" />, name: "Group Management", description: "Welcome, goodbye, anti-link, and moderation", premium: false, category: "Group" },
    { icon: <Eye className="size-5" />, name: "Auto Status View", description: "Automatic status viewer & saver", premium: false, category: "Auto" },
    { icon: <Gamepad2 className="size-5" />, name: "Interactive Games", description: "Fun games, economy system, and leaderboards", premium: true, category: "Games" },
    { icon: <Music className="size-5" />, name: "Music Downloader", description: "Download from Spotify, Apple Music, Deezer", premium: true, category: "Downloader" },
    { icon: <Video className="size-5" />, name: "Video Downloader", description: "High quality video downloads (4K support)", premium: false, category: "Downloader" },
    { icon: <Image className="size-5" />, name: "Image Editor", description: "Edit images with AI filters and effects", premium: true, category: "Media" },
    { icon: <Globe className="size-5" />, name: "Translator", description: "Translate to 100+ languages instantly", premium: false, category: "Utility" },
    { icon: <CloudLightning className="size-5" />, name: "Weather Info", description: "Real-time weather updates with forecasts", premium: false, category: "Utility" },
    { icon: <BookOpen className="size-5" />, name: "News Reader", description: "Latest news from around the world", premium: false, category: "Utility" },
    { icon: <MessageSquare className="size-5" />, name: "Auto Reply", description: "Custom auto-reply system with AI", premium: false, category: "Auto" },
    { icon: <Link2 className="size-5" />, name: "URL Shortener", description: "Shorten URLs with click analytics", premium: false, category: "Utility" },
    { icon: <Award className="size-5" />, name: "Leveling System", description: "XP, ranking, and rewards system", premium: true, category: "Games" },
    { icon: <Sparkles className="size-5" />, name: "Sticker Maker", description: "Create custom animated stickers", premium: false, category: "Media" },
    { icon: <HeartHandshake className="size-5" />, name: "Premium Support", description: "24/7 priority support and updates", premium: true, category: "Support" },
    { icon: <Cpu className="size-5" />, name: "Plugin System", description: "Custom plugin support and API", premium: true, category: "Developer" },
    { icon: <TrendingUp className="size-5" />, name: "Analytics Dashboard", description: "Bot usage statistics and insights", premium: true, category: "Analytics" },
  ];

  const visibleFeatures = showAll ? allFeatures : allFeatures.slice(0, 12);
  const categories = [...new Set(allFeatures.map(f => f.category))];

  return (
    <div className="mb-6 p-4 border border-border rounded-xl bg-card/50">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="size-5" />
          Njabulo-Jb Features
        </h2>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 flex items-center gap-1">
            <CheckCircle className="size-3" />
            Free (15+)
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20 flex items-center gap-1">
            <Award className="size-3" />
            Premium (7+)
          </span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs text-muted-foreground">Categories:</span>
        {categories.map((cat) => (
          <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-accent/50 text-muted-foreground">
            {cat}
          </span>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {visibleFeatures.map((feature, idx) => (
          <div 
            key={idx} 
            className={`group flex items-start gap-2 p-2 rounded-lg hover:bg-accent/30 transition-all duration-200 hover:scale-[1.02] transform ${
              feature.premium ? 'border-l-2 border-purple-500 bg-gradient-to-r from-transparent to-purple-500/5' : ''
            }`}
          >
            <span className={`shrink-0 mt-0.5 transition-transform group-hover:scale-110 ${
              feature.premium ? 'text-purple-500' : 'text-primary'
            }`}>
              {feature.icon}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium flex items-center gap-1 flex-wrap">
                {feature.name}
                {feature.premium && (
                  <span className="text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full">Pro</span>
                )}
                <span className="text-[10px] text-muted-foreground">• {feature.category}</span>
              </p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {allFeatures.length > 12 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors py-2 border-t border-border"
        >
          {showAll ? "Show Less" : `Show All ${allFeatures.length} Features`}
          <ChevronRight className={`size-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
        </button>
      )}

      {/* Feature Stats */}
      <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-3 text-center text-xs">
        <div>
          <p className="font-semibold text-primary">{allFeatures.length}+</p>
          <p className="text-muted-foreground">Total Features</p>
        </div>
        <div>
          <p className="font-semibold text-green-600">{allFeatures.filter(f => !f.premium).length}</p>
          <p className="text-muted-foreground">Free Features</p>
        </div>
      </div>
    </div>
  );
         }
