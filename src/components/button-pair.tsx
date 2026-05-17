"use client";

import { Copy, Download, Server, Clock, Cloud, QrCode, FileArchive } from "lucide-react";
import { useState } from "react";

export function ButtonPair() {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopyEnv = async () => {
    const envTemplate = `SESSION_ID="put your session id"
AUTO_READ_STATUS=true
STATUS_READ_MSG="Status Seen By me 𝐁𝐖𝐌-𝐗𝐌𝐃"
AUTO_STATUS_REPLY=false
AUTO_REJECT_CALLS=false
MODE="public"
WELCOME=true
AUTO_READ_MESSAGES=false
AUTO_TYPING=false
OWNER_NAME="Njabulo-Jb"
OWNER_NUMBER="26777821911"
AUTO_RECORDING=false
ALWAYS_ONLINE=false
AUTO_BLOCK=false
AUTO_REACT=false
PREFIX="."
STARTING_BOT_MESSAGE=yes
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

  const handleDownloadEnv = () => {
    const envContent = `SESSION_ID="put your session id"
AUTO_READ_STATUS=true
STATUS_READ_MSG="Status Seen By me 𝐁𝐖𝐌-𝐗𝐌𝐃"
AUTO_STATUS_REPLY=false
AUTO_REJECT_CALLS=false
MODE="public"
WELCOME=true
AUTO_READ_MESSAGES=false
AUTO_TYPING=false
OWNER_NAME="Njabulo-Jb"
OWNER_NUMBER="26777821911"
AUTO_RECORDING=false
ALWAYS_ONLINE=false
AUTO_BLOCK=false
AUTO_REACT=false
PREFIX="."
STARTING_BOT_MESSAGE=yes
`;

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
    // Direct download GWM-XMD repository as ZIP from GitHub
    window.open("https://github.com/NjabuloJf/GWM-XMD/archive/refs/heads/main.zip", "_blank");
  };

  const deployToHeroku = () => {
    window.open("https://heroku.com/deploy?template=https://github.com/NjabuloJf/GWM-XMD", "_blank");
  };

  const deployToRender = () => {
    window.open("https://render.com/deploy?repo=https://github.com/NjabuloJf/GWM-XMD", "_blank");
  };

  const generateQRCode = () => {
    window.open("https://gwm-xmd-qr-46edc1ec0fb1.herokuapp.com/", "_blank");
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
