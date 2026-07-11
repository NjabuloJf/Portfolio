"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Download, Smartphone, Shield, Zap, 
  CheckCircle, QrCode, Share2, Heart,
  Package, Rocket, Star, Users, Clock,
  ArrowDown, ExternalLink, Github, Twitter,
  MessageCircle, Copy, X, Video, Bot,
  Award, Coffee, Sparkles
} from "lucide-react";

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const copyLink = () => {
    const link = window.location.origin + "/downloads/Njabulo-Jb.apk";
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const appFeatures = [
    { icon: <Video className="size-5" />, title: "Video Player", desc: "Watch videos with Chewie player" },
    { icon: <Bot className="size-5" />, title: "AI Assistant", desc: "Built-in AI chat support" },
    { icon: <Download className="size-5" />, title: "Offline Mode", desc: "Works without internet" },
    { icon: <Shield className="size-5" />, title: "Secure", desc: "No permissions needed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            ← Back to Home
          </Link>
          
          <div className="text-center">
            <div className="inline-flex p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 shadow-xl">
              <Smartphone className="size-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Njabulo-Jb App
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download the official Njabulo-Jb app for Android. Built with Flutter for smooth performance.
            </p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 text-center border rounded-xl bg-card/30">
            <Package className="size-6 text-purple-500 mx-auto mb-1" />
            <p className="text-lg font-bold">v2.1.0</p>
            <p className="text-xs text-muted-foreground">Latest Version</p>
          </div>
          <div className="p-4 text-center border rounded-xl bg-card/30">
            <Download className="size-6 text-blue-500 mx-auto mb-1" />
            <p className="text-lg font-bold">18.5 MB</p>
            <p className="text-xs text-muted-foreground">File Size</p>
          </div>
          <div className="p-4 text-center border rounded-xl bg-card/30">
            <Users className="size-6 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold">500+</p>
            <p className="text-xs text-muted-foreground">Downloads</p>
          </div>
          <div className="p-4 text-center border rounded-xl bg-card/30">
            <Star className="size-6 text-yellow-500 mx-auto mb-1" />
            <p className="text-lg font-bold">4.8★</p>
            <p className="text-xs text-muted-foreground">User Rating</p>
          </div>
        </div>

        {/* Main Download Section with APK Image */}
        <div className="border rounded-2xl overflow-hidden bg-card/50 shadow-xl mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* App Icon with Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-border">
                  <img 
                    src="/images/njabuloapk.png" 
                    alt="Njabulo-Jb App" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                {/* Fallback if image fails */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg hidden">
                  <Smartphone className="size-12 text-white" />
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h2 className="text-2xl font-bold">Njabulo-Jb App</h2>
                  <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">v2.1.0</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Built with Flutter • Video Player • AI Assistant • Dark Mode
                </p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">✅ Verified</span>
                  <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full">📱 Android 5+</span>
                  <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full">🎥 Video Player</span>
                  <span className="text-xs px-2 py-1 bg-orange-500/10 text-orange-500 rounded-full">📦 18.5 MB</span>
                </div>
              </div>

              {/* Download Button */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <a
                  href="/downloads/Njabulo-Jb.apk"
                  download
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all text-lg font-semibold shadow-lg"
                >
                  <Download className="size-6" />
                  Download APK
                </a>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">
                  Safe • Secure • Android 5.0+
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional Download Options */}
          <div className="p-4 bg-muted/20 border-t flex flex-wrap gap-3 justify-center">
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
            >
              {copied ? <CheckCircle className="size-4 text-green-500" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={() => setShowQR(!showQR)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
            >
              <QrCode className="size-4" />
              {showQR ? "Hide QR" : "Show QR"}
            </button>
            <a
              href="https://github.com/NjabuloJf/Portfolio/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
            >
              <Github className="size-4" />
              View Releases
            </a>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 border shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Scan to Download</h3>
                <button onClick={() => setShowQR(false)} className="p-1 hover:bg-accent rounded">
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + "/downloads/Njabulo-Jb.apk")}`}
                    alt="QR Code"
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Scan with your phone to download
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">App Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {appFeatures.map((feature, idx) => (
              <div key={idx} className="p-4 text-center border rounded-xl bg-card/30 hover:bg-card/50 transition-colors">
                <div className="inline-flex p-2 bg-primary/10 rounded-full mb-2">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Version History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Version History</h2>
          <div className="border rounded-xl overflow-hidden bg-card/30">
            {[
              { version: "2.1.0", date: "May 2026", size: "18.5 MB", features: "Video player, AI chat, Dark mode" },
              { version: "2.0.0", date: "April 2026", size: "16.2 MB", features: "WhatsApp bot integration" },
              { version: "1.0.0", date: "March 2026", size: "12.4 MB", features: "Initial release" },
            ].map((v, idx) => (
              <div key={idx} className={`p-4 flex items-center justify-between hover:bg-accent/30 transition-colors ${idx !== 2 ? "border-b" : ""}`}>
                <div>
                  <p className="font-semibold">v{v.version}</p>
                  <p className="text-xs text-muted-foreground">{v.features}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs">{v.date}</p>
                  <p className="text-xs text-muted-foreground">{v.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Guide */}
        <div className="p-6 border rounded-xl bg-blue-500/5 border-blue-500/20 mb-8">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Smartphone className="size-5 text-blue-500" />
            How to Install
          </h3>
          <ol className="space-y-2 text-sm">
            <li>1. Click the <strong>Download APK</strong> button above</li>
            <li>2. Open the downloaded file from your notifications</li>
            <li>3. Tap <strong>Install</strong> when prompted</li>
            <li>4. If asked, enable <strong>"Install from unknown sources"</strong></li>
            <li>5. Open the app from your home screen and enjoy!</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-3">
            ⚠️ Android 5.0 (Lollipop) or higher required • No root needed
          </p>
        </div>

        {/* Social Share */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">Share this app with friends</p>
          <div className="flex justify-center gap-4">
            <a href="https://wa.me/?text=Download%20Njabulo-Jb%20App%3A%20" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-colors">
              <MessageCircle className="size-5 text-green-500" />
            </a>
            <a href="https://twitter.com/intent/tweet?text=Download%20Njabulo-Jb%20App%20%F0%9F%93%B1&url=" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/10 rounded-full hover:bg-blue-500/20 transition-colors">
              <Twitter className="size-5 text-blue-500" />
            </a>
            <a href="https://github.com/NjabuloJf/Portfolio/releases" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-500/10 rounded-full hover:bg-gray-500/20 transition-colors">
              <Github className="size-5 text-gray-500" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Njabulo-Jb App | Built with Flutter | Version 2.1.0
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            APK Size: 18.5 MB • Requires Android 5.0+
          </p>
        </div>
      </div>
    </div>
  );
                    }
