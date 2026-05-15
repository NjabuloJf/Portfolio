"use client";

import { 
  Bot, Shield, Zap, Database, Server, Clock, Gamepad2, 
  Download, Users, Link2, MessageCircle, Smartphone,
  Globe, Music, Video, Image, Lock, Award, CloudLightning,
  Send, Radio, BarChart3, FileText, Filter, Webhook,
  Hash, Mic, Volume2, Eye, Heart, Star, Trophy
} from "lucide-react";
import { useState } from "react";

export function NjabuloTelegramFeatures() {
  const [showAll, setShowAll] = useState(false);
  
  const allFeatures = [
    // Core Features
    { icon: <Bot className="size-5" />, name: "AI Chatbot", description: "OpenAI, Groq, Gemini & Claude integration", premium: false, category: "AI" },
    { icon: <MessageCircle className="size-5" />, name: "Auto Reply", description: "Custom auto-reply system with AI", premium: false, category: "Auto" },
    { icon: <Database className="size-5" />, name: "Multiple Databases", description: "MongoDB, PostgreSQL & Redis support", premium: false, category: "Database" },
    
    // Group Management
    { icon: <Users className="size-5" />, name: "Group Management", description: "Welcome, goodbye, anti-spam, and moderation", premium: false, category: "Group" },
    { icon: <Shield className="size-5" />, name: "Anti-Spam", description: "Advanced spam protection with AI detection", premium: false, category: "Security" },
    { icon: <Filter className="size-5" />, name: "Auto-Moderation", description: "Filter bad words and inappropriate content", premium: false, category: "Group" },
    { icon: <Hash className="size-5" />, name: "Admin Tools", description: "Ban, mute, kick, promote, demote commands", premium: false, category: "Group" },
    
    // Channel Management
    { icon: <Send className="size-5" />, name: "Channel Management", description: "Auto-post, scheduling, and broadcasting", premium: true, category: "Channel" },
    { icon: <Radio className="size-5" />, name: "Auto Forwarding", description: "Forward messages between channels/groups", premium: true, category: "Channel" },
    { icon: <BarChart3 className="size-5" />, name: "Channel Analytics", description: "View channel stats and growth metrics", premium: true, category: "Analytics" },
    
    // Media Downloader
    { icon: <Download className="size-5" />, name: "Media Downloader", description: "YouTube, TikTok, Instagram, Twitter", premium: false, category: "Downloader" },
    { icon: <Music className="size-5" />, name: "Music Downloader", description: "Download from Spotify, Apple Music", premium: true, category: "Downloader" },
    { icon: <Video className="size-5" />, name: "Video Downloader", description: "High quality video downloads (4K)", premium: false, category: "Downloader" },
    { icon: <Image className="size-5" />, name: "Image Tools", description: "Download, edit, and enhance images", premium: false, category: "Media" },
    
    // Utilities
    { icon: <Globe className="size-5" />, name: "Translator", description: "Translate to 100+ languages", premium: false, category: "Utility" },
    { icon: <CloudLightning className="size-5" />, name: "Weather Info", description: "Real-time weather updates", premium: false, category: "Utility" },
    { icon: <FileText className="size-5" />, name: "News Reader", description: "Latest news from around the world", premium: false, category: "Utility" },
    { icon: <Link2 className="size-5" />, name: "URL Shortener", description: "Shorten URLs with analytics", premium: false, category: "Utility" },
    { icon: <Webhook className="size-5" />, name: "Webhook Support", description: "Custom webhooks for automation", premium: true, category: "Developer" },
    
    // Games & Entertainment
    { icon: <Gamepad2 className="size-5" />, name: "Interactive Games", description: "Fun games, quizzes, and trivia", premium: true, category: "Games" },
    { icon: <Trophy className="size-5" />, name: "Leaderboards", description: "Ranking system for games", premium: true, category: "Games" },
    { icon: <Heart className="size-5" />, name: "Reaction Games", description: "Interactive reaction-based games", premium: true, category: "Games" },
    
    // Voice & Media
    { icon: <Mic className="size-5" />, name: "Voice Recognition", description: "Voice message transcription", premium: true, category: "Media" },
    { icon: <Volume2 className="size-5" />, name: "Text-to-Speech", description: "Convert text to voice messages", premium: false, category: "Media" },
    { icon: <Eye className="size-5" />, name: "OCR Reader", description: "Extract text from images", premium: false, category: "Utility" },
    
    // Premium
    { icon: <Award className="size-5" />, name: "Premium Features", description: "Unlock all premium commands", premium: true, category: "Premium" },
    { icon: <Star className="size-5" />, name: "Priority Support", description: "24/7 priority support", premium: true, category: "Support" },
    { icon: <Zap className="size-5" />, name: "Fast Performance", description: "Optimized for speed", premium: false, category: "Core" },
  ];

  const visibleFeatures = showAll ? allFeatures : allFeatures.slice(0, 12);
  const categories = [...new Set(allFeatures.map(f => f.category))];

  return (
    <div className="mb-6 p-4 border border-border rounded-xl bg-card/50">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="size-5 text-blue-500" />
          Njabulo-Jb Telegram Features
        </h2>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 flex items-center gap-1">
            <CheckCircle className="size-3" />
            Free (15+)
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20 flex items-center gap-1">
            <Award className="size-3" />
            Premium (10+)
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
              feature.premium ? 'text-purple-500' : 'text-blue-500'
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
      <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-3 text-center text-xs">
        <div>
          <p className="font-semibold text-blue-500">{allFeatures.length}+</p>
          <p className="text-muted-foreground">Total Features</p>
        </div>
        <div>
          <p className="font-semibold text-green-600">{allFeatures.filter(f => !f.premium).length}</p>
          <p className="text-muted-foreground">Free Features</p>
        </div>
        <div>
          <p className="font-semibold text-purple-600">{allFeatures.filter(f => f.premium).length}</p>
          <p className="text-muted-foreground">Premium</p>
        </div>
      </div>
    </div>
  );
}

// Helper component for CheckCircle icon
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// Helper component for ChevronRight
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
              }
