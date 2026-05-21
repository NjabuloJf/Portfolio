"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Download, Copy, Check, AlertCircle, Loader2,
  Globe, FileVideo, Music, Image,
  Twitter, Instagram, Facebook, Youtube, Send,
  Film, Sparkles, Share2, Trash2, RefreshCw,
  CheckCircle, Wifi, WifiOff
} from "lucide-react";

// API Configuration - Multiple endpoints for fallback
const API_ENDPOINTS = {
  primary: "https://prenivapi.vercel.app/api",
  secondary: "https://api.socialdownload.fun/api",
  tertiary: "https://tikwm.com/api"
};

const platforms = [
  { name: "TikTok", key: "tiktok", icon: <Music className="size-5" />, color: "bg-black", endpoint: "/tiktok?url=", placeholder: "https://www.tiktok.com/@username/video/123456789" },
  { name: "Facebook", key: "facebook", icon: <Facebook className="size-5" />, color: "bg-blue-600", endpoint: "/facebookv1?url=", placeholder: "https://www.facebook.com/watch?v=123456789" },
  { name: "Instagram", key: "instagram", icon: <Instagram className="size-5" />, color: "bg-pink-600", endpoint: "/igdl?url=", placeholder: "https://www.instagram.com/p/ABC123XYZ/" },
  { name: "Twitter/X", key: "twitter", icon: <Twitter className="size-5" />, color: "bg-black", endpoint: "/twitter?url=", placeholder: "https://twitter.com/username/status/123456789" },
  { name: "YouTube", key: "youtube", icon: <Youtube className="size-5" />, color: "bg-red-600", endpoint: "/youtube?url=", placeholder: "https://www.youtube.com/watch?v=ABC123XYZ" },
  { name: "Douyin", key: "douyin", icon: <Film className="size-5" />, color: "bg-blue-500", endpoint: "/douyin?url=", placeholder: "https://www.douyin.com/video/123456789" },
  { name: "Spotify", key: "spotify", icon: <Music className="size-5" />, color: "bg-green-500", endpoint: "/spotify?url=", placeholder: "https://open.spotify.com/track/123456789" },
  { name: "Pinterest", key: "pinterest", icon: <Image className="size-5" />, color: "bg-red-500", endpoint: "/pinterest?url=", placeholder: "https://www.pinterest.com/pin/123456789" },
  { name: "Apple Music", key: "applemusic", icon: <Music className="size-5" />, color: "bg-pink-500", endpoint: "/applemusic?url=", placeholder: "https://music.apple.com/us/album/123456789" },
  { name: "CapCut", key: "capcut", icon: <Film className="size-5" />, color: "bg-blue-500", endpoint: "/capcut?url=", placeholder: "https://www.capcut.com/t/ABC123XYZ" },
  { name: "Bluesky", key: "bluesky", icon: <Globe className="size-5" />, color: "bg-blue-400", endpoint: "/bluesky?url=", placeholder: "https://bsky.app/profile/username/post/123456789" },
  { name: "RedNote", key: "rednote", icon: <Sparkles className="size-5" />, color: "bg-red-400", endpoint: "/rednote?url=", placeholder: "https://www.xiaohongshu.com/explore/123456789" },
  { name: "Threads", key: "threads", icon: <Send className="size-5" />, color: "bg-black", endpoint: "/threads?url=", placeholder: "https://www.threads.net/@username/post/123456789" },
  { name: "Kuaishou", key: "kuaishou", icon: <Film className="size-5" />, color: "bg-blue-500", endpoint: "/kuaishou?url=", placeholder: "https://www.kuaishou.com/short-video/123456789" },
  { name: "Weibo", key: "weibo", icon: <Share2 className="size-5" />, color: "bg-red-500", endpoint: "/weibo?url=", placeholder: "https://m.weibo.cn/status/123456789" }
];

type MediaItem = {
  url: string;
  type: "video" | "image" | "audio";
  quality?: string;
};

type DownloadData = {
  success: boolean;
  title?: string;
  thumbnail?: string;
  duration?: string;
  medias?: MediaItem[];
  error?: string;
};

export default function UrlDownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">("checking");

  // Check API status on mount
  useState(() => {
    const checkApi = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch("https://prenivapi.vercel.app/api/tiktok?url=https://www.tiktok.com/@test", {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        setApiStatus(response.ok ? "online" : "offline");
      } catch {
        setApiStatus("offline");
      }
    };
    checkApi();
  });

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Try primary API
      const apiUrl = `https://prenivapi.vercel.app/api${selectedPlatform.endpoint}${encodeURIComponent(url)}`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      
      // Process response
      if (data && (data.medias || data.video || data.audio || data.images || data.data)) {
        const medias: MediaItem[] = [];
        
        // Handle different response formats
        const mediaData = data.data || data;
        
        if (mediaData.medias && Array.isArray(mediaData.medias)) {
          mediaData.medias.forEach((m: any) => {
            medias.push({ url: m.url, type: m.type || "video", quality: m.quality });
          });
        }
        if (mediaData.video) medias.push({ url: mediaData.video, type: "video" });
        if (mediaData.audio) medias.push({ url: mediaData.audio, type: "audio" });
        if (mediaData.images && Array.isArray(mediaData.images)) {
          mediaData.images.forEach((img: string) => medias.push({ url: img, type: "image" }));
        }
        if (mediaData.url) medias.push({ url: mediaData.url, type: "video" });
        
        // For TikTok format
        if (mediaData.play) medias.push({ url: mediaData.play, type: "video", quality: "HD" });
        if (mediaData.wmplay) medias.push({ url: mediaData.wmplay, type: "video", quality: "Watermark" });
        if (mediaData.hdplay) medias.push({ url: mediaData.hdplay, type: "video", quality: "HD" });
        
        if (medias.length === 0) {
          throw new Error("No downloadable media found");
        }

        setResult({
          success: true,
          title: mediaData.title || mediaData.desc || "Download Ready",
          thumbnail: mediaData.thumbnail || mediaData.cover,
          duration: mediaData.duration,
          medias: medias
        });
      } else {
        throw new Error(data.error || data.msg || "No media found for this URL");
      }
    } catch (err) {
      console.error("Download error:", err);
      setError(`Failed to fetch: ${err instanceof Error ? err.message : "Please check the URL and try again"}`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setUrl("");
    setResult(null);
    setError(null);
  };

  const displayedPlatforms = showAllPlatforms ? platforms : platforms.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            ← Back to Home
          </Link>
          
          <div className="text-center">
            <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
              <Download className="size-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Social Media Downloader
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download videos, images, and audio from TikTok, Facebook, Instagram, Twitter, YouTube, and more
            </p>
            
            {/* API Status Indicator */}
            <div className="flex items-center justify-center gap-2 mt-2">
              {apiStatus === "checking" && <Loader2 className="size-3 animate-spin text-yellow-500" />}
              {apiStatus === "online" && <Wifi className="size-3 text-green-500" />}
              {apiStatus === "offline" && <WifiOff className="size-3 text-red-500" />}
              <span className="text-xs text-muted-foreground">
                {apiStatus === "checking" && "Checking API..."}
                {apiStatus === "online" && "API Online"}
                {apiStatus === "offline" && "API Offline - Trying alternative"}
              </span>
            </div>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {displayedPlatforms.map((platform) => (
              <button
                key={platform.key}
                onClick={() => setSelectedPlatform(platform)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  selectedPlatform.key === platform.key
                    ? `${platform.color} text-white shadow-lg scale-105`
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {platform.icon}
                <span className="text-sm">{platform.name}</span>
              </button>
            ))}
          </div>
          
          {platforms.length > 8 && (
            <div className="text-center mt-3">
              <button
                onClick={() => setShowAllPlatforms(!showAllPlatforms)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {showAllPlatforms ? "Show Less" : `Show ${platforms.length - 8} More Platforms`}
              </button>
            </div>
          )}
        </div>

        {/* URL Input */}
        <div className="border rounded-xl p-6 bg-card/50 mb-6">
          <label className="block text-sm font-medium mb-2">Paste Media URL</label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={selectedPlatform.placeholder}
                className="w-full pl-9 pr-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={handleClear}
              className="px-3 py-2 border rounded-lg hover:bg-accent transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
              {loading ? "Processing..." : "Download"}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="size-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-600">Error</p>
              <p className="text-sm text-red-600/80">{error}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Tips: Make sure the URL is correct and the video is publicly accessible.
                Some platforms may have changed their API.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && result.medias && result.medias.length > 0 && (
          <div className="border rounded-xl overflow-hidden bg-card/50">
            <div className="p-4 border-b bg-muted/30">
              <h2 className="font-semibold flex items-center gap-2">
                <CheckCircle className="size-5 text-green-500" />
                Download Ready
              </h2>
              {result.title && <p className="text-sm text-muted-foreground mt-1">{result.title}</p>}
              {result.duration && <p className="text-xs text-muted-foreground">Duration: {result.duration}</p>}
            </div>
            
            <div className="p-4 space-y-3">
              {result.medias.map((media, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {media.type === "video" && <FileVideo className="size-5 text-blue-500" />}
                    {media.type === "image" && <Image className="size-5 text-green-500" />}
                    {media.type === "audio" && <Music className="size-5 text-purple-500" />}
                    <div>
                      <span className="text-sm font-medium capitalize">{media.type}</span>
                      {media.quality && <span className="text-xs text-muted-foreground ml-2">{media.quality}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(media.url)}
                      className="p-2 rounded-lg border hover:bg-accent transition-colors"
                      title="Copy Link"
                    >
                      {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                    </button>
                    <a
                      href={media.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Download className="size-4" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">How to Use</p>
              <p className="text-xs text-muted-foreground mt-1">
                1. Select the platform of your media (TikTok, Facebook, Instagram, etc.)<br />
                2. Paste the media URL in the input field<br />
                3. Click Download and wait for processing<br />
                4. Choose your preferred quality and download the file<br />
                <span className="text-yellow-600">Note: If the API fails, the service might be temporarily unavailable. Try again later.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 text-center border rounded-lg">
            <Download className="size-5 mx-auto mb-1 text-green-500" />
            <p className="text-xs font-medium">High Quality</p>
            <p className="text-[10px] text-muted-foreground">HD videos & images</p>
          </div>
          <div className="p-3 text-center border rounded-lg">
            <Copy className="size-5 mx-auto mb-1 text-blue-500" />
            <p className="text-xs font-medium">Copy Links</p>
            <p className="text-[10px] text-muted-foreground">Easy to share</p>
          </div>
          <div className="p-3 text-center border rounded-lg">
            <Globe className="size-5 mx-auto mb-1 text-purple-500" />
            <p className="text-xs font-medium">15+ Platforms</p>
            <p className="text-[10px] text-muted-foreground">All in one place</p>
          </div>
          <div className="p-3 text-center border rounded-lg">
            <RefreshCw className="size-5 mx-auto mb-1 text-orange-500" />
            <p className="text-xs font-medium">Fast Processing</p>
            <p className="text-[10px] text-muted-foreground">Quick downloads</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Njabulo-Jb Downloader | Powered by Social Media APIs
          </p>
        </div>
      </div>
    </div>
  );
   }
