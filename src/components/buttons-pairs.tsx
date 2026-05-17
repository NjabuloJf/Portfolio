"use client";

import { Copy, Download, Server, Clock, Cloud, ExternalLink, QrCode, X } from "lucide-react";
import { useState } from "react";

interface ButtonsPairsProps {
  botName?: string;
}

export function ButtonsPairs({ botName = "njabulo" }: ButtonsPairsProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState("");

  const getEnvTemplate = () => {
    return `# ${botName.toUpperCase()} WhatsApp Bot Configuration
# Generated on: ${new Date().toLocaleString()}

# Bot Configuration
BOT_NAME=${botName.toUpperCase()}
PREFIX=.
OWNER_NUMBER=1234567890
SESSION_ID=your_session_id_here
MULTI_DEVICE=true

# API Keys
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
GOOGLE_API_KEY=your_google_key
GEMINI_API_KEY=your_gemini_key

# Database
MONGODB_URI=mongodb://localhost:27017/${botName}
REDIS_URL=redis://localhost:6379
POSTGRES_URL=postgresql://user:pass@localhost:5432/${botName}

# Deployment
PORT=3000
NODE_ENV=production

# UptimeRobot & Monitoring
UPTIMEROBOT_API_KEY=your_uptimerobot_key
MONITOR_URL=https://your-app-url.herokuapp.com
KAFFEINE_API_KEY=your_kaffeine_key

# Features
ENABLE_AI=true
ENABLE_GAMES=true
ENABLE_DOWNLOADER=true
ENABLE_GROUP_TOOLS=true
ENABLE_ANTI_LINK=true
ENABLE_ANTI_CALL=true
ENABLE_AUTO_REACT=true
ENABLE_AUTO_STATUS_VIEW=true
ENABLE_AUTO_BIO=true
ENABLE_AUTO_READ=true
ENABLE_AUTO_RECORD=true

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
RATE_LIMIT_MAX=200
RATE_LIMIT_WINDOW=60000

# Logging
LOG_LEVEL=info
ENABLE_DEBUG=false
ENABLE_VERBOSE=false

# Anti-Spam
ANTI_SPAM_THRESHOLD=5
ANTI_SPAM_ACTION=warn
ENABLE_FILTER_BAD_WORDS=true

# Media Settings
MAX_MEDIA_SIZE=50
ALLOWED_MEDIA_TYPES=image,video,audio,document
ENABLE_COMPRESSION=true

# Web & Dashboard
ENABLE_WEB_DASHBOARD=true
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=secure_password_here

# Bot Appearance
THEME=dark
LANGUAGE=en
TIMEZONE=UTC`;
  };

  const handleCopyEnv = async () => {
    const envTemplate = getEnvTemplate();
    try {
      await navigator.clipboard.writeText(envTemplate);
      setCopied(true);
      alert(`✅ ${botName.toUpperCase()} .env template copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("❌ Failed to copy. Please copy manually.");
    }
  };

  const handleDownloadEnv = () => {
    const envContent = getEnvTemplate();
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
    alert(`✅ ${botName.toUpperCase()} .env file downloaded!`);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const deployToHeroku = () => {
    window.open("https://heroku.com/deploy?template=https://github.com/NjabuloJf/Njabulo-Jb", "_blank");
  };

  const deployToRender = () => {
    window.open("https://render.com/deploy?repo=https://github.com/NjabuloJf/Njabulo-Jb", "_blank");
  };

  const generateQRCode = () => {
    // Generate QR code for WhatsApp pairing
    const whatsappNumber = "26777821911";
    const whatsappMessage = "Hello Njabulo Jb! I want to deploy a bot";
    const qrData = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    setQrValue(qrData);
    setShowQR(true);
  };

  const closeQRModal = () => {
    setShowQR(false);
    setQrValue("");
  };

  const setupUptimeBot = () => {
    window.open("https://uptimerobot.com/dashboard", "_blank");
  };

  return (
    <div className="space-y-4 mb-8">
      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full mx-4 border shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scan QR Code</h3>
              <button onClick={closeQRModal} className="p-1 hover:bg-accent rounded">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`}
                  alt="QR Code"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Scan this QR code with your WhatsApp to message me directly
              </p>
              <p className="text-xs text-center text-muted-foreground">
                WhatsApp Number: +267 77 821 911
              </p>
              <button
                onClick={() => window.open(qrValue, "_blank")}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Open WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* Deployment Buttons */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <ExternalLink className="size-3" />
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
            onClick={generateQRCode}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200 hover:scale-105 transform"
          >
            <QrCode className="size-4 text-blue-600" />
            QR Code
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

      {/* Additional Info */}
      <div className="text-xs text-muted-foreground mt-2 p-2 bg-card/30 rounded-lg">
        <p>💡 Tip: After deploying, don't forget to:</p>
        <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
          <li>Add your session ID for authentication</li>
          <li>Configure API keys for AI features</li>
          <li>Set up monitoring to keep bot alive 24/7</li>
        </ul>
      </div>
    </div>
  );
}
