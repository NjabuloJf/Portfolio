"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Download, Copy, Check, AlertCircle, Loader2,
  Globe, FileVideo, Music, Image, 
  Twitter, Instagram, Facebook, Youtube, Send,
  Film, Sparkles, Share2, Trash2, RefreshCw,
  CheckCircle, ExternalLink, Headphones, Video
} from "lucide-react";

const platforms = [
  { name: "YouTube", key: "youtube", icon: <Youtube className="size-5" />, color: "bg-red-600", placeholder: "https://www.youtube.com/watch?v=ABC123XYZ" },
  { name: "Facebook", key: "facebook", icon: <Facebook className="size-5" />, color: "bg-blue-600", placeholder: "https://www.facebook.com/watch?v=123456789" },
  { name: "TikTok", key: "tiktok", icon: <Music className="size-5" />, color: "bg-black", placeholder: "https://www.tiktok.com/@username/video/123456789" },
  { name: "Instagram", key: "instagram", icon: <Instagram className="size-5" />, color: "bg-pink-600", placeholder: "https://www.instagram.com/p/ABC123XYZ/" },
  { name: "Twitter/X", key: "twitter", icon: <Twitter className="size-5" />, color: "bg-black", placeholder: "https://twitter.com/username/status/123456789" }
];

export default function UrlDownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "audio">("video");

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: selectedPlatform.key,
          url: url
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to download. Please check the URL.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
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

  const videos = result?.medias?.filter((m: any) => m.type === "video") || [];
  const audios = result?.medias?.filter((m: any) => m.type === "audio") || [];
  const images = result?.medias?.filter((m: any) => m.type === "image") || [];

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
              Download videos, audio, and images from YouTube, Facebook, TikTok, Instagram, and Twitter
            </p>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {platforms.map((platform) => (
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
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-600">Error</p>
                <p className="text-sm text-red-600/80">{error}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Tips:<br />
                  • Make sure the video is publicly accessible<br />
                  • Check if the URL is correct<br />
                  • For Facebook, try copying the video URL from the address bar
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="border rounded-xl overflow-hidden bg-card/50">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="size-5 text-green-500" />
                  Download Ready
                </h2>
                {result.title && <p className="text-sm text-muted-foreground">{result.title}</p>}
              </div>
            </div>
            
            {/* Tabs for Video/Audio */}
            {(videos.length > 0 || audios.length > 0) && (
              <div className="flex border-b bg-muted/20">
                {videos.length > 0 && (
                  <button
                    onClick={() => setActiveTab("video")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                      activeTab === "video"
                        ? "border-b-2 border-primary text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Video className="size-4" />
                    Videos ({videos.length})
                  </button>
                )}
                {audios.length > 0 && (
                  <button
                    onClick={() => setActiveTab("audio")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                      activeTab === "audio"
                        ? "border-b-2 border-primary text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Headphones className="size-4" />
                    Audio ({audios.length})
                  </button>
                )}
              </div>
            )}
            
            <div className="p-4 space-y-3">
              {/* Videos */}
              {activeTab === "video" && videos.map((media: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileVideo className="size-5 text-blue-500" />
                    <div>
                      <span className="text-sm font-medium capitalize">Video</span>
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
              
              {/* Audio */}
              {activeTab === "audio" && audios.map((media: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Music className="size-5 text-purple-500" />
                    <div>
                      <span className="text-sm font-medium capitalize">Audio</span>
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
              
              {/* Images */}
              {images.map((media: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Image className="size-5 text-green-500" />
                    <span className="text-sm font-medium">Image</span>
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
              
              {videos.length === 0 && audios.length === 0 && images.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No downloadable media found. Try a different URL.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Supported Platforms & Features</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-xs">
                <div>✅ YouTube: Video (1080p, 720p, 480p, 360p) + Audio (MP3)</div>
                <div>✅ Facebook: HD & SD video download</div>
                <div>✅ TikTok: Video with/without watermark + Audio</div>
                <div>✅ Instagram: Images & Thumbnails</div>
                <div>✅ Twitter/X: Video download</div>
              </div>
              <p className="text-xs text-yellow-600 mt-2">
                ⚠️ Note: For best results, use the direct video URL from the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Njabulo-Jb Downloader | Powered by Custom API
          </p>
        </div>
      </div>
    </div>
  );
   }
