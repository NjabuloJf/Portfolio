"use client";

import { 
  Bot, Code, Cloud, Server, Clock, Shield, 
  Zap, Database, Github, Smartphone, Brain,
  Rocket, FileCode, Layout, Palette, Terminal,
  Lock, Globe, MessageCircle, Heart, Star,
  CheckCircle, Download, Copy, Settings
} from "lucide-react";

export function NjabuloUiFeatures() {
  const features = [
    {
      icon: <Code className="size-4" />,
      name: "Code Generation",
      description: "Generate React, Next.js, Node.js, Python code",
      color: "text-blue-500"
    },
    {
      icon: <Cloud className="size-4" />,
      name: "Deployment",
      description: "Deploy to Heroku, Render, Vercel, Netlify",
      color: "text-purple-500"
    },
    {
      icon: <Bot className="size-4" />,
      name: "WhatsApp Bot",
      description: "Create WhatsApp bots with auto-reply",
      color: "text-green-500"
    },
    {
      icon: <Brain className="size-4" />,
      name: "AI Assistant",
      description: "Intelligent code assistance and debugging",
      color: "text-pink-500"
    },
    {
      icon: <Database className="size-4" />,
      name: "Database Setup",
      description: "MongoDB, PostgreSQL, Redis integration",
      color: "text-orange-500"
    },
    {
      icon: <Shield className="size-4" />,
      name: "Security",
      description: "API keys, environment variables, rate limiting",
      color: "text-red-500"
    },
    {
      icon: <Zap className="size-4" />,
      name: "Fast Performance",
      description: "Optimized code for speed and efficiency",
      color: "text-yellow-500"
    },
    {
      icon: <Layout className="size-4" />,
      name: "UI Components",
      description: "Pre-built React/Next.js components",
      color: "text-cyan-500"
    },
    {
      icon: <Terminal className="size-4" />,
      name: "CLI Tools",
      description: "Command-line tools for automation",
      color: "text-gray-500"
    },
    {
      icon: <Lock className="size-4" />,
      name: "Authentication",
      description: "Session management and user auth",
      color: "text-indigo-500"
    },
    {
      icon: <Globe className="size-4" />,
      name: "API Integration",
      description: "Connect to OpenAI, Groq, Gemini APIs",
      color: "text-teal-500"
    },
    {
      icon: <MessageCircle className="size-4" />,
      name: "Chat Support",
      description: "24/7 AI chat assistance",
      color: "text-blue-500"
    }
  ];

  const quickActions = [
    { name: "Generate React Component", action: "Create a React navbar component" },
    { name: "Deploy to Heroku", action: "How to deploy to Heroku?" },
    { name: "WhatsApp Bot Setup", action: "Create a WhatsApp bot script" },
    { name: "API Key Setup", action: "How to get API keys?" },
    { name: "Database Connection", action: "Connect to MongoDB" },
    { name: "Environment Variables", action: "Setup .env file" }
  ];

  return (
    <div className="w-80 border-l border-border bg-card/50 overflow-y-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3">
          <Bot className="size-6 text-white" />
        </div>
        <h2 className="text-lg font-semibold">Njabulo UI Features</h2>
        <p className="text-xs text-muted-foreground">Everything you need to build and deploy</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Zap className="size-4 text-yellow-500" />
          Quick Actions
        </h3>
        <div className="space-y-1">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                const input = document.querySelector("textarea");
                if (input) {
                  input.value = action.action;
                  input.dispatchEvent(new Event("input", { bubbles: true }));
                }
              }}
              className="w-full text-left p-2 rounded-lg hover:bg-accent transition-colors text-sm"
            >
              {action.name}
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Star className="size-4 text-yellow-500" />
          All Features
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature, idx) => (
            <div key={idx} className="p-2 border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="flex items-center gap-2">
                <span className={feature.color}>{feature.icon}</span>
                <div>
                  <p className="text-xs font-medium">{feature.name}</p>
                  <p className="text-[10px] text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="p-2 text-center border rounded-lg">
          <div className="text-lg font-bold text-purple-500">12+</div>
          <div className="text-[10px] text-muted-foreground">Features</div>
        </div>
        <div className="p-2 text-center border rounded-lg">
          <div className="text-lg font-bold text-green-500">4+</div>
          <div className="text-[10px] text-muted-foreground">Deployments</div>
        </div>
        <div className="p-2 text-center border rounded-lg">
          <div className="text-lg font-bold text-blue-500">24/7</div>
          <div className="text-[10px] text-muted-foreground">Support</div>
        </div>
        <div className="p-2 text-center border rounded-lg">
          <div className="text-lg font-bold text-orange-500">100%</div>
          <div className="text-[10px] text-muted-foreground">Free</div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-3 border-t border-border">
        <p className="text-[10px] text-muted-foreground">
          Powered by Njabulo Jb Tech
        </p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <Heart className="size-3 text-red-500" />
          <span className="text-[9px]">Verified AI Bot</span>
        </div>
      </div>
    </div>
  );
      }
