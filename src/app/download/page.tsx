"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Download, Smartphone, Shield, Zap, 
  CheckCircle, ArrowDown, QrCode, Share2,
  Package, Rocket, Heart
} from "lucide-react";

export default function DownloadPage() {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/app-release.apk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
            <Smartphone className="size-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Download Njabulo Jb App</h1>
          <p className="text-muted-foreground">
            Get the official Njabulo Jb app for Android
          </p>
        </div>

        {/* QR Code Section */}
        {url && (
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-xl shadow-lg">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`}
                alt="QR Code"
                className="w-48 h-48"
              />
            </div>
          </div>
        )}

        {/* Download Buttons */}
        <div className="grid gap-4 mb-8">
          <a
            href="/app-release.apk"
            download
            className="flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all text-lg font-semibold"
          >
            <Download className="size-6" />
            Download APK (Android)
          </a>
          
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-3 px-6 py-3 border rounded-xl hover:bg-accent transition-all"
          >
            {copied ? <CheckCircle className="size-5 text-green-500" /> : <Share2 className="size-5" />}
            {copied ? "Link Copied!" : "Copy Download Link"}
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 border rounded-xl text-center">
            <Zap className="size-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold">Fast & Light</h3>
            <p className="text-xs text-muted-foreground">Under 5MB size</p>
          </div>
          <div className="p-4 border rounded-xl text-center">
            <Shield className="size-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold">Secure</h3>
            <p className="text-xs text-muted-foreground">No permissions needed</p>
          </div>
          <div className="p-4 border rounded-xl text-center">
            <Smartphone className="size-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold">Offline Ready</h3>
            <p className="text-xs text-muted-foreground">Works without internet</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
          <h3 className="font-semibold mb-3">📱 How to Install:</h3>
          <ol className="space-y-2 text-sm">
            <li>1. Click "Download APK" button above</li>
            <li>2. Open the downloaded file</li>
            <li>3. Tap "Install" when prompted</li>
            <li>4. Allow "Install from unknown sources" if needed</li>
            <li>5. Open the app from your home screen</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-3">
            ⚠️ Android 8+ required | Version 1.0.0 | Size: ~4.5MB
          </p>
        </div>

        {/* Version Info */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Njabulo Jb | Version 1.0.0</p>
          <p className="mt-1">Last updated: May 2026</p>
        </div>
      </div>
    </div>
  );
          }
