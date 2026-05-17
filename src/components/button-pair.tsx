"use client";

import { Copy, Download, Server, Clock, Cloud, QrCode, FileArchive } from "lucide-react";
import { useState } from "react";

export function ButtonPair() {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

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
      setCopied(true);
      alert("✅ .env template copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
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
    setDownloaded(true);
    alert("✅ .env file downloaded!");
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleDownloadZip = () => {
    // Create a zip file containing GWM-XMD bot files
    const zipContent = `GWM-XMD WhatsApp Bot Files

To get the full GWM-XMD bot source code, visit:
https://github.com/NjabuloJf/GWM-XMD

Or clone with:
git clone https://github.com/NjabuloJf/GWM-XMD.git

Files included in repository:
- app.json (Deployment configuration)
- index.js (Main bot file)
- package.json (Dependencies)
- .env.example (Environment variables)
- README.md (Documentation)
- commands/ (Bot commands folder)
- helpers/ (Helper functions)
- events/ (Event handlers)

Quick Start:
1. Clone the repository
2. Run npm install
3. Copy .env.example to .env
4. Add your SESSION_ID
5. Run npm start`;

    const blob = new Blob([zipContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GWM-XMD-info.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("✅ GWM-XMD information downloaded!");
  };

  const deployToHeroku = () => {
    window.open("https://heroku.com/deploy?template=https://github.com/NjabuloJf/GWM-XMD", "_blank");
  };

  const deployToRender = () => {
    window.open("https://render.com/deploy?repo=https://github.com/NjabuloJf/GWM-XMD", "_blank");
  };

  const generateQRCode = () => {
    window.open("https://render.com/deploy?repo=https://github.com/NjabuloJf/GWM-XMD", "_blank");
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
          <Copy className={`size-4 transition-transform ${copied ? 'scale-110' : ''}`} />
          {copied ? "Copied!" : "Copy .env"}
        </button>
        <button
          onClick={handleDownloadEnv}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Download className={`size-4 transition-transform ${downloaded ? 'scale-110' : ''}`} />
          {downloaded ? "Downloaded!" : "Download .env"}
        </button>
      </div>

      {/* Download Panel Files - ZIP GWM-XMD */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground">📦 Download Panel Files:</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownloadZip}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <FileArchive className="size-4 text-orange-600" />
            Download GWM-XMD (ZIP)
          </button>
        </div>
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
            onClick={generateQRCode}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <QrCode className="size-4 text-blue-600" />
            QR Code
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
