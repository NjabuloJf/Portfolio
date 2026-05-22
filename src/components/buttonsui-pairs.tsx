"use client";

import { useState } from "react";
import { 
  Copy, Download, Server, Clock, Cloud, 
  ExternalLink, QrCode, Github, Zap, 
  Shield, Box, FileArchive, Code, RefreshCw
} from "lucide-react";

export function ButtonsUiPairs() {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopyEnv = async () => {
    const envTemplate = `# Njabulo UI Bot Configuration
# Generated on: ${new Date().toLocaleString()}

# Bot Configuration
BOT_NAME=NjabuloUI
PREFIX=.
OWNER_NAME=Njabulo Jb
OWNER_NUMBER=26777821911
SESSION_ID=your_session_id_here

# API Keys
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
GOOGLE_API_KEY=your_google_key

# Database
MONGODB_URI=mongodb://localhost:27017/njabulo-ui
REDIS_URL=redis://localhost:6379
POSTGRES_URL=postgresql://user:pass@localhost:5432/njabulo_ui

# Deployment
PORT=3000
NODE_ENV=production
VERCEL_URL=your-vercel-url.vercel.app

# Monitoring
UPTIMEROBOT_API_KEY=your_uptimerobot_key
MONITOR_URL=https://your-app-url.herokuapp.com

# Features
ENABLE_AI=true
ENABLE_CODE_GENERATION=true
ENABLE_DEPLOYMENT=true
ENABLE_MONITORING=true

# Rate Limiting
RATE_LIMIT_MAX=200
RATE_LIMIT_WINDOW=60000

# Logging
LOG_LEVEL=info
ENABLE_DEBUG=false

# Security
ENABLE_CORS=true
ENABLE_RATE_LIMIT=true
ENABLE_HELMET=true

# UI Settings
THEME=dark
LANGUAGE=en
TIMEZONE=UTC
`;

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

  const handleDownloadZip = () => {
    // Simulate download of Njabulo UI Bot ZIP
    const zipContent = `Njabulo UI Bot Package

📦 Contents:
- index.js - Main bot file
- package.json - Dependencies
- .env.example - Environment variables
- README.md - Documentation
- commands/ - Bot commands folder
- events/ - Event handlers
- utils/ - Utility functions
- config/ - Configuration files

Quick Start:
1. Extract the ZIP file
2. Run npm install
3. Copy .env.example to .env
4. Add your API keys
5. Run npm start

For full source code, visit:
https://github.com/NjabuloJf/njabulo-ui-bot
`;

    const blob = new Blob([zipContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "njabulo-ui-bot-info.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    alert("✅ Njabulo UI Bot information downloaded!");
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleDownloadFullZip = () => {
    window.open("https://github.com/NjabuloJf/njabulo-ui-bot/archive/refs/heads/main.zip", "_blank");
  };

  const deployToHeroku = () => {
    window.open("https://heroku.com/deploy?template=https://github.com/NjabuloJf/njabulo-ui-bot", "_blank");
  };

  const deployToRender = () => {
    window.open("https://render.com/deploy?repo=https://github.com/NjabuloJf/njabulo-ui-bot", "_blank");
  };

  const deployToVercel = () => {
    window.open("https://vercel.com/new/clone?repository-url=https://github.com/NjabuloJf/njabulo-ui-bot", "_blank");
  };

  const generateQRCode = () => {
    window.open("https://njabulo-ui-bot.vercel.app", "_blank");
  };

  const setupUptimeRobot = () => {
    window.open("https://uptimerobot.com/dashboard", "_blank");
  };

  const viewGitHub = () => {
    window.open("https://github.com/NjabuloJf/njabulo-ui-bot", "_blank");
  };

  const generateCode = () => {
    window.open("https://github.com/NjabuloJf/njabulo-ui-bot/generate", "_blank");
  };

  return (
    <div className="space-y-3">
      {/* Main Button Pair */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopyEnv}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-all duration-200"
        >
          <Copy className={`size-4 transition-transform ${copied ? 'scale-110' : ''}`} />
          {copied ? "Copied!" : "Copy .env"}
        </button>
        <button
          onClick={handleDownloadZip}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-200"
        >
          <FileArchive className={`size-4 transition-transform ${downloaded ? 'scale-110' : ''}`} />
          {downloaded ? "Downloaded!" : "Download Info"}
        </button>
        <button
          onClick={handleDownloadFullZip}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200"
        >
          <Download className="size-4" />
          Full ZIP
        </button>
      </div>

      {/* Deployment Buttons */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
          <Zap className="size-3" />
          🚀 Deploy to:
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={deployToHeroku}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Cloud className="size-3 text-purple-600" />
            Heroku
          </button>
          <button
            onClick={deployToRender}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Server className="size-3 text-blue-600" />
            Render
          </button>
          <button
            onClick={deployToVercel}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Box className="size-3 text-black" />
            Vercel
          </button>
          <button
            onClick={setupUptimeRobot}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Clock className="size-3 text-green-600" />
            UptimeRobot
          </button>
          <button
            onClick={generateQRCode}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <QrCode className="size-3 text-blue-600" />
            QR Code
          </button>
          <button
            onClick={viewGitHub}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Github className="size-3 text-gray-600" />
            GitHub
          </button>
        </div>
      </div>

      {/* Code Generation Button */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
          <Code className="size-3" />
          📝 Generate:
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={generateCode}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <RefreshCw className="size-3 text-purple-600" />
            Generate Code
          </button>
          <button
            onClick={() => window.open("https://github.com/NjabuloJf/njabulo-ui-bot/fork", "_blank")}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <ExternalLink className="size-3 text-blue-600" />
            Fork Repository
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="text-[10px] text-muted-foreground mt-2 p-2 bg-muted/30 rounded-lg">
        <p>💡 Quick Actions:</p>
        <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
          <li>Copy .env - Get configuration template</li>
          <li>Download ZIP - Get full bot source code</li>
          <li>Deploy buttons - One-click deployment</li>
          <li>QR Code - Share this app link</li>
        </ul>
      </div>
    </div>
  );
        }
