"use client";

import { Bot, Shield, Zap, Database, Server, Clock } from "lucide-react";

export function GWMXFeatures() {
  const features = [
    { icon: <Bot className="size-5" />, name: "AI Chatbot", description: "OpenAI & Groq integration for smart responses" },
    { icon: <Database className="size-5" />, name: "Database Support", description: "MongoDB & Redis for data persistence" },
    { icon: <Zap className="size-5" />, name: "Media Downloader", description: "Download videos, music, and images" },
    { icon: <Shield className="size-5" />, name: "Anti-Link & Anti-Spam", description: "Protect groups from spam" },
    { icon: <Server className="size-5" />, name: "Group Management", description: "Welcome, goodbye, and moderation tools" },
    { icon: <Clock className="size-5" />, name: "Auto Status View", description: "Automatic status viewer" },
  ];

  return (
    <div className="mb-6 p-4 border border-border rounded-xl bg-card/50">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Bot className="size-5" />
        GWM-XMD WhatsApp Bot Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent/30 transition-colors">
            <span className="text-primary">{feature.icon}</span>
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
