"use client";

import { Copy, Download, Server, Clock, Bot, Cloud } from "lucide-react";

export function ButtonPair() {
  const handleCopyEnv = async () => {
    const envTemplate = `# GWM-XMD WhatsApp Bot Configuration
# Generated on: ${new Date().toLocaleString()}

# Bot Configuration
BOT_NAME=GWM-XMD
PREFIX=.
OWNER_NUMBER=1234567890
SESSION_ID=your_session_id_here

# API Keys
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key

# Database
MONGODB_URI=mongodb://localhost:27017/gwm-xmd
REDIS_URL=redis://localhost:6379

# Deployment
PORT=3000
NODE_ENV=production

# UptimeRobot
UPTIMEROBOT_API_KEY=your_uptimerobot_key
MONITOR_URL=https://your-app-url.herokuapp.com

# Features
ENABLE_AI=true
ENABLE_GAMES=true
ENABLE_DOWNLOADER=true
ENABLE_GROUP_TOOLS=true
ENABLE_ANTI_LINK=true
ENABLE_AUTO_REACT=true
ENABLE_AUTO_STATUS_VIEW=true

# Webhook
WEBHOOK_URL=https://your-webhook-url.com
WEBHOOK_SECRET=your_webhook_secret

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# Logging
LOG_LEVEL=info
ENABLE_DEBUG=false`;

    try {
      await navigator.clipboard.writeText(envTemplate);
      alert("✅ .env template copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("❌ Failed to copy. Please copy manually.");
    }
  };

  const handleDownloadEnv = () => {
    const envContent = `# GWM-XMD WhatsApp Bot Configuration
# Generated on: ${new Date().toLocaleString()}

# Bot Configuration
BOT_NAME=GWM-XMD
PREFIX=.
OWNER_NUMBER=1234567890
SESSION_ID=your_session_id_here

# API Keys
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key

# Database
MONGODB_URI=mongodb://localhost:27017/gwm-xmd
REDIS_URL=redis://localhost:6379

# Deployment
PORT=3000
NODE_ENV=production

# UptimeRobot
UPTIMEROBOT_API_KEY=your_uptimerobot_key
MONITOR_URL=https://your-app-url.herokuapp.com

# Features
ENABLE_AI=true
ENABLE_GAMES=true
ENABLE_DOWNLOADER=true
ENABLE_GROUP_TOOLS=true
ENABLE_ANTI_LINK=true
ENABLE_AUTO_REACT=true
ENABLE_AUTO_STATUS_VIEW=true

# Webhook
WEBHOOK_URL=https://your-webhook-url.com
WEBHOOK_SECRET=your_webhook_secret

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# Logging
LOG_LEVEL=info
ENABLE_DEBUG=false`;

    const blob = new Blob([envContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".env";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("✅ .env file downloaded!");
  };

  const deployToHeroku = () => {
    window.open("https://heroku.com/deploy?template=https://github.com/yourusername/gwm-xmd-wa-bot", "_blank");
  };

  const deployToRender = () => {
    window.open("https://render.com/deploy?repo=https://github.com/yourusername/gwm-xmd-wa-bot", "_blank");
  };

  const setupUptimeBot = () => {
    window.open("https://uptimerobot.com/dashboard", "_blank");
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Main Button Pair */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopyEnv}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Copy className="size-4" />
          Copy .env
        </button>
        <button
          onClick={handleDownloadEnv}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Download className="size-4" />
          Download .env
        </button>
      </div>

      {/* Deployment Buttons */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground">🚀 Deploy to:</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={deployToHeroku}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Cloud className="size-4 text-purple-600" />
            Heroku
          </button>
          <button
            onClick={deployToRender}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Server className="size-4 text-blue-600" />
            Render
          </button>
          <button
            onClick={setupUptimeBot}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Clock className="size-4 text-green-600" />
            UptimeRobot
          </button>
        </div>
      </div>
    </div>
  );
}
