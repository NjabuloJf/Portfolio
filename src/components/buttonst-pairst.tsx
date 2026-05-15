"use client";

import { Copy, Download, Server, Clock, Cloud, MessageCircle, Users, Send, Bot } from "lucide-react";
import { useState } from "react";

export function ButtonstPairst() {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const getTelegramEnvTemplate = () => {
    return `# Njabulo-Jb Telegram Bot Configuration
# Generated on: ${new Date().toLocaleString()}

# Telegram Bot Configuration
BOT_NAME=NjabuloJbTelegramBot
BOT_TOKEN=your_telegram_bot_token_here
BOT_USERNAME=njabulojbbot
OWNER_ID=your_telegram_user_id

# API Keys
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key

# Database
MONGODB_URI=mongodb://localhost:27017/njabulo-telegram
REDIS_URL=redis://localhost:6379
POSTGRES_URL=postgresql://user:pass@localhost:5432/njabulo_telegram

# Deployment
PORT=3000
NODE_ENV=production
WEBHOOK_URL=https://your-domain.com/webhook

# UptimeRobot & Monitoring
UPTIMEROBOT_API_KEY=your_uptimerobot_key
MONITOR_URL=https://your-app-url.herokuapp.com

# Telegram Features
ENABLE_AI=true
ENABLE_GAMES=true
ENABLE_DOWNLOADER=true
ENABLE_GROUP_TOOLS=true
ENABLE_CHANNEL_TOOLS=true
ENABLE_ANTI_SPAM=true
ENABLE_AUTO_REPLY=true
ENABLE_WELCOME=true
ENABLE_LOGGING=true

# Channel Management
ENABLE_AUTO_POST=true
CHANNEL_ID=@your_channel
ENABLE_FORWARDING=false

# Premium Features
ENABLE_PREMIUM=true
PREMIUM_PACKAGE=unlimited
ENABLE_NSFW=false
ENABLE_TRANSLATOR=true
ENABLE_WEATHER=true
ENABLE_NEWS=true

# Webhook
WEBHOOK_URL=https://your-webhook-url.com
WEBHOOK_SECRET=your_webhook_secret

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# Logging
LOG_LEVEL=info
ENABLE_DEBUG=false

# Anti-Spam
ANTI_SPAM_THRESHOLD=5
ANTI_SPAM_ACTION=ban
ENABLE_FILTER_BAD_WORDS=true

# Media Settings
MAX_MEDIA_SIZE=50
ALLOWED_MEDIA_TYPES=photo,video,audio,document
ENABLE_COMPRESSION=true

# Dashboard
ENABLE_WEB_DASHBOARD=true
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=secure_password_here

# Bot Appearance
THEME=dark
LANGUAGE=en
TIMEZONE=UTC`;
  };

  const handleCopyEnv = async () => {
    const envTemplate = getTelegramEnvTemplate();
    try {
      await navigator.clipboard.writeText(envTemplate);
      setCopied(true);
      alert("✅ Njabulo-Jb Telegram Bot .env template copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("❌ Failed to copy. Please copy manually.");
    }
  };

  const handleDownloadEnv = () => {
    const envContent = getTelegramEnvTemplate();
    const blob = new Blob([envContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".env";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    alert("✅ Njabulo-Jb Telegram Bot .env file downloaded!");
    setTimeout(() => setDownloaded(false), 2000);
  };

  const deployToHeroku = () => {
    window.open("https://heroku.com/deploy?template=https://github.com/njabulojs/njabulo-telegram-bot", "_blank");
  };

  const deployToRender = () => {
    window.open("https://render.com/deploy?repo=https://github.com/njabulojs/njabulo-telegram-bot", "_blank");
  };

  const setupUptimeBot = () => {
    window.open("https://uptimerobot.com/dashboard", "_blank");
  };

  const createBotTelegram = () => {
    window.open("https://t.me/botfather", "_blank");
  };

  const joinTelegramGroup = () => {
    window.open("https://t.me/njabulojbgroup", "_blank");
  };

  const joinTelegramChannel = () => {
    window.open("https://t.me/njabulojbchannel", "_blank");
  };

  const sendBotMessage = () => {
    window.open("https://t.me/njabulojbbot", "_blank");
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Main Button Pair */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopyEnv}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
        >
          <Copy className={`size-4 transition-transform ${copied ? 'scale-110' : ''}`} />
          {copied ? "Copied!" : "Copy .env"}
        </button>
        <button
          onClick={handleDownloadEnv}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
        >
          <Download className={`size-4 transition-transform ${downloaded ? 'scale-110' : ''}`} />
          {downloaded ? "Downloaded!" : "Download .env"}
        </button>
      </div>

      {/* Telegram Group and Channel Buttons */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <MessageCircle className="size-3" />
          📢 Join Our Telegram Community:
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={joinTelegramGroup}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 transform"
          >
            <Users className="size-4" />
            Join Telegram Group
          </button>
          <button
            onClick={joinTelegramChannel}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-all duration-200 hover:scale-105 transform"
          >
            <Send className="size-4" />
            Join Telegram Channel
          </button>
          <button
            onClick={sendBotMessage}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-200 hover:scale-105 transform"
          >
            <Bot className="size-4" />
            Message @njabulojbbot
          </button>
        </div>
      </div>

      {/* Bot Creation Button */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <Bot className="size-3" />
          🤖 Create Your Own Bot:
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={createBotTelegram}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Bot className="size-4 text-blue-500" />
            Create Bot with @BotFather
          </button>
        </div>
      </div>

      {/* Deployment Buttons */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <Server className="size-3" />
          🚀 Deploy to:
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={deployToHeroku}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200 hover:scale-105 transform"
          >
            <Cloud className="size-4 text-purple-600" />
            Heroku
          </button>
          <button
            onClick={deployToRender}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200 hover:scale-105 transform"
          >
            <Server className="size-4 text-blue-600" />
            Render
          </button>
          <button
            onClick={setupUptimeBot}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200 hover:scale-105 transform"
          >
            <Clock className="size-4 text-green-600" />
            UptimeRobot
          </button>
        </div>
      </div>

      {/* Info Message About Njabulo-Jb Bot Telegram */}
      <div className="text-xs text-muted-foreground mt-2 p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
        <p className="font-semibold mb-1 flex items-center gap-1">📱 About Njabulo-Jb Telegram Bot:</p>
        <ul className="list-disc list-inside ml-2 space-y-0.5">
          <li>🤖 Send <span className="font-mono text-xs">/start</span> to @njabulojbbot on Telegram</li>
          <li>💬 Join our group for support: t.me/njabulojbgroup</li>
          <li>📢 Subscribe to channel for updates: t.me/njabulojbchannel</li>
          <li>⚡ Get your bot token from @BotFather on Telegram</li>
          <li>🔧 Complete setup guide available in documentation</li>
        </ul>
      </div>
    </div>
  );
              }
