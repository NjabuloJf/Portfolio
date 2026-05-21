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

// Alternative Working APIs
const getApiUrl = (platform: string, url: string) => {
  const encodedUrl = encodeURIComponent(url);
  
  switch(platform) {
    case "tiktok":
      return `https://tikwm.com/api/?url=${encodedUrl}`;
    case "instagram":
      return `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.instagram.com/oembed?url=${encodedUrl}`)}`;
    case "youtube":
      return `https://pipedapi.kavin.rocks/oembed?url=${encodedUrl}`;
    default:
      return `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://prenivapi.vercel.app/api/${platform}?url=${encodedUrl}`)}`;
  }
};

const platforms = [
  { name: "TikTok", key: "tiktok", icon: <Music className="size-5" />, color: "bg-black", placeholder: "https://www.tiktok.com/@username/video/123456789" },
  { name: "Facebook", key: "facebook", icon: <Facebook className="size-5" />, color: "bg-blue-600", placeholder: "https://www.facebook.com/watch?v=123456789" },
  { name: "Instagram", key: "instagram", icon: <Instagram className="size-5" />, color: "bg-pink-600", placeholder: "https://www.instagram.com/p/ABC123XYZ/" },
  { name: "Twitter/X", key: "twitter", icon: <Twitter className="size-5" />, color: "bg-black", placeholder: "https://twitter.com/username/status/123456789" },
  { name: "YouTube", key: "youtube", icon: <Youtube className="size-5" />, color: "bg-red-600", placeholder: "https://www.youtube.com/watch?v=ABC123XYZ" },
  { name: "Spotify", key: "spotify", icon: <Music className="size-5" />, color: "bg-green-500", placeholder: "https://open.spotify.com/track/123456789" },
  { name: "Pinterest", key: "pinterest", icon: <Image className="size-5" />, color: "bg-red-500", placeholder: "https://www.pinterest.com/pin/123456789" },
  { name: "CapCut", key: "capcut", icon: <Film className="size-5" />, color: "bg-blue-500", placeholder: "https://www.capcut.com/t/ABC123XYZ" }
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

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = getApiUrl(selectedPlatform.key, url);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Process different response formats
      const medias: MediaItem[] = [];
      let title = "";
      let thumbnail = "";

      // TikTok response format
      if (selectedPlatform.key === "tiktok" && data.data) {
        const tiktokData = data.data;
        title = tiktokData.title || "TikTok Video";
        thumbnail = tiktokData.cover;
        if (tiktokData.play) medias.push({ url: tiktokData.play, type: "video", quality: "HD" });
        if (tiktokData.wmplay) medias.push({ url: tiktokData.wmplay, type: "video", quality: "With Watermark" });
        if (tiktokData.hdplay) medias.push({ url: tiktokData.hdplay, type: "video", quality: "Full HD" });
        if (tiktokData.music) medias.push({ url: tiktokData.music, type: "audio", quality: "Original Audio" });
      }
      // Instagram oEmbed format
      else if (selectedPlatform.key === "instagram" && data.thumbnail_url) {
        title = data.title || "Instagram Post";
        thumbnail = data.thumbnail_url;
        if (data.thumbnail_url) medias.push({ url: data.thumbnail_url, type: "image", quality: "HD" });
      }
      // YouTube oEmbed format
      else if (selectedPlatform.key === "youtube" && data.thumbnail_url) {
        title = data.title || "YouTube Video";
        thumbnail = data.thumbnail_url;
        // Note: YouTube video download requires different API
        medias.push({ url: `https://img.youtube.com/vi/${getYouTubeId(url)}/maxresdefault.jpg`, type: "image", quality: "Thumbnail" });
      }
      // Try to extract from any response
      else if (data.medias) {
        data.medias.forEach((m: any) => {
          medias.push({ url: m.url, type: m.type || "video", quality: m.quality });
        });
        title = data.title || "Download Ready";
        thumbnail = data.thumbnail;
      }
      else if (data.video) {
        medias.push({ url: data.video, type: "video" });
        title = data.title || "Video Download";
        thumbnail = data.thumbnail;
      }
      else if (data.url) {
        medias.push({ url: data.url, type: "video" });
        title = data.title || "Download Ready";
      }
      else if (data.data?.play) {
        medias.push({ url: data.data.play, type: "video", quality: "HD" });
        title = data.data.title || "Video";
        thumbnail = data.data.cover;
      }
      
      if (medias.length === 0) {
        throw new Error("No downloadable media found. The API may be temporarily unavailable.");
      }

      setResult({
        success: true,
        title: title,
        thumbnail: thumbnail,
        medias: medias
      });
      
    } catch (err) {
      console.error("Download error:", err);
      setError(`Failed to fetch: ${err instanceof Error ? err.message : "Please check the URL and try again"}`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : "";
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

  const displayedPlatforms = showAllPlatforms ? platforms : platforms.slice(0, 6);

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
              Download videos and images from TikTok, Instagram, YouTube, Facebook, Twitter, and more
            </p>
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
          
          {platforms.length > 6 && (
            <div className="text-center mt-3">
              <button
                onClick={() => setShowAllPlatforms(!showAllPlatforms)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {showAllPlatforms ? "Show Less" : `Show ${platforms.length - 6} More Platforms`}
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
                💡 Tips: 
                Make sure the URL is correct and the video is publicly accessible.
                Some platforms may require the video to be public.
                For YouTube, only thumbnails are available via this API.
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
                1. Select the platform of your media<br />
                2. Paste the media URL in the input field<br />
                3. Click Download and wait for processing<br />
                4. Choose your preferred quality and download the file<br />
                <span className="text-yellow-600 mt-2 block">⚠️ Note: Due to API limitations, some platforms may only provide thumbnails or limited quality. For full video downloads, try using dedicated desktop software.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 text-center border rounded-lg">
            <Download className="size-5 mx-auto mb-1 text-green-500" />
            <p className="text-xs font-medium">Easy Download</p>
            <p className="text-[10px] text-muted-foreground">One click download</p>
          </div>
          <div className="p-3 text-center border rounded-lg">
            <Copy className="size-5 mx-auto mb-1 text-blue-500" />
            <p className="text-xs font-medium">Copy Links</p>
            <p className="text-[10px] text-muted-foreground">Share with friends</p>
          </div>
          <div className="p-3 text-center border rounded-lg">
            <Globe className="size-5 mx-auto mb-1 text-purple-500" />
            <p className="text-xs font-medium">8+ Platforms</p>
            <p className="text-[10px] text-muted-foreground">Popular social media</p>
          </div>
          <div className="p-3 text-center border rounded-lg">
            <RefreshCw className="size-5 mx-auto mb-1 text-orange-500" />
            <p className="text-xs font-medium">Free Service</p>
            <p className="text-[10px] text-muted-foreground">No registration needed</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Njabulo-Jb Downloader | For personal use only. Respect copyright.
          </p>
        </div>
      </div>
    </div>
  );
   }
