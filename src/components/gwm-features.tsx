"use client";

import { Bot, Shield, Zap, Database, Server, Clock, Gamepad2, Download, Users, Link2, Eye, MessageSquare } from "lucide-react";

export function GWMXFeatures() {
  const features = [
    { icon: <Bot className="size-5" />, name: "AI Chatbot", description: "OpenAI & Groq integration for smart responses" },
    { icon: <Database className="size-5" />, name: "Database Support", description: "MongoDB & Redis for data persistence" },
    { icon: <Download className="size-5" />, name: "Media Downloader", description: "Download videos, music, and images from various platforms" },
    { icon: <Shield className="size-5" />, name: "Anti-Link & Anti-Spam", description: "Protect groups from spam and harmful links" },
    { icon: <Users className="size-5" />, name: "Group Management", description: "Welcome, goodbye, and moderation tools" },
    { icon: <Eye className="size-5" />, name: "Auto Status View", description: "Automatic status viewer and saver" },
    { icon: <Gamepad2 className="size-5" />, name: "Interactive Games", description: "Fun games for group engagement" },
    { icon: <MessageSquare className="size-5" />, name: "Auto Reply", description: "Custom auto-reply system" },
    { icon: <Link2 className="size-5" />, name: "URL Shortener", description: "Shorten URLs with analytics" },
    { icon: <Zap className="size-5" />, name: "Fast Performance", description: "Optimized for speed and low memory usage" },
  ];

  return (
    <div className="mb-6 p-4 border border-border rounded-xl bg-card/50">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Bot className="size-5" />
        GWM-XMD Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent/30 transition-colors">
            <span className="text-primary shrink-0">{feature.icon}</span>
            <div>
              <p className="text-sm font-medium">{feature.name}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
