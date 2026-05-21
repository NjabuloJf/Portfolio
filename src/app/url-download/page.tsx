"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Download, Copy, Check, AlertCircle, Loader2,
  Globe, FileVideo, Music, Image, 
  Twitter, Instagram, Facebook, Youtube, Send,
  Film, Sparkles, Share2, Trash2, RefreshCw,
  CheckCircle, ExternalLink, HelpCircle
} from "lucide-react";

const platforms = [
  { name: "TikTok", key: "tiktok", icon: <Music className="size-5" />, color: "bg-black", placeholder: "https://www.tiktok.com/@username/video/123456789", downloadMethod: "online" },
  { name: "Facebook", key: "facebook", icon: <Facebook className="size-5" />, color: "bg-blue-600", placeholder: "https://www.facebook.com/watch?v=123456789", downloadMethod: "online" },
  { name: "Instagram", key: "instagram", icon: <Instagram className="size-5" />, color: "bg-pink-600", placeholder: "https://www.instagram.com/p/ABC123XYZ/", downloadMethod: "online" },
  { name: "Twitter/X", key: "twitter", icon: <Twitter className="size-5" />, color: "bg-black", placeholder: "https://twitter.com/username/status/123456789", downloadMethod: "online" },
  { name: "YouTube", key: "youtube", icon: <Youtube className="size-5" />, color: "bg-red-600", placeholder: "https://www.youtube.com/watch?v=ABC123XYZ", downloadMethod: "external" },
  { name: "Spotify", key: "spotify", icon: <Music className="size-5" />, color: "bg-green-500", placeholder: "https://open.spotify.com/track/123456789", downloadMethod: "external" },
  { name: "CapCut", key: "capcut", icon: <Film className="size-5" />, color: "bg-blue-500", placeholder: "https://www.capcut.com/t/ABC123XYZ", downloadMethod: "online" }
];

const externalDownloaders = {
  youtube: "https://y2mate.nu/",
  spotify: "https://spotifydown.com/",
  instagram: "https://snapinsta.app/",
  tiktok: "https://snaptik.app/",
  facebook: "https://fdown.net/",
  twitter: "https://twitsave.com/"
};

export default function UrlDownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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
      // For platforms that require external downloaders
      if (selectedPlatform.downloadMethod === "external") {
        const externalUrl = externalDownloaders[selectedPlatform.key as keyof typeof externalDownloaders];
        setResult({
          type: "external",
          message: `This platform requires an external downloader.`,
          externalUrl: externalUrl,
          instructions: `1. Copy your URL: ${url}\n2. Paste it in the external downloader\n3. Click download`
        });
        setLoading(false);
        return;
      }

      // Try multiple proxy services
      const proxyUrls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://prenivapi.vercel.app/api/${selectedPlatform.key}?url=${encodeURIComponent(url)}`)}`,
        `https://cors-anywhere.herokuapp.com/https://prenivapi.vercel.app/api/${selectedPlatform.key}?url=${encodeURIComponent(url)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`https://prenivapi.vercel.app/api/${selectedPlatform.key}?url=${encodeURIComponent(url)}`)}`
      ];

      let data = null;
      let lastError = null;

      for (const proxyUrl of proxyUrls) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          
          const response = await fetch(proxyUrl, {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
            }
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            data = await response.json();
            break;
          }
        } catch (err) {
          lastError = err;
          continue;
        }
      }

      if (data && (data.medias || data.video || data.audio || data.images || data.data)) {
        const medias: any[] = [];
        const mediaData = data.data || data;
        
        if (mediaData.play) medias.push({ url: mediaData.play, type: "video", quality: "HD" });
        if (mediaData.wmplay) medias.push({ url: mediaData.wmplay, type: "video", quality: "With Watermark" });
        if (mediaData.hdplay) medias.push({ url: mediaData.hdplay, type: "video", quality: "Full HD" });
        if (mediaData.medias) mediaData.medias.forEach((m: any) => medias.push(m));
        if (mediaData.video) medias.push({ url: mediaData.video, type: "video" });
        if (mediaData.audio) medias.push({ url: mediaData.audio, type: "audio" });
        
        if (medias.length > 0) {
          setResult({
            type: "success",
            title: mediaData.title || mediaData.desc || "Download Ready",
            thumbnail: mediaData.cover || mediaData.thumbnail,
            medias: medias
          });
        } else {
          throw new Error("No media found");
        }
      } else {
        throw new Error("Could not fetch media");
      }
      
    } catch (err) {
      console.error("Download error:", err);
      // Provide alternative solution
      const altDownloader = externalDownloaders[selectedPlatform.key as keyof typeof externalDownloaders];
      if (altDownloader) {
        setResult({
          type: "alternative",
          message: "Direct download failed. Use this alternative:",
          externalUrl: altDownloader,
          url: url,
          instructions: `Copy this URL and paste it in the downloader: ${url}`
        });
        setError(null);
      } else {
        setError(`Unable to download. Try using an online downloader like ${externalDownloaders.tiktok} for TikTok videos.`);
      }
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
              Download videos from TikTok, Instagram, Facebook, Twitter, and more
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
              {loading ? "Processing..." : "Get Download Link"}
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
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-500/10 rounded-lg">
              <p className="text-xs font-medium mb-1">💡 Alternative Method:</p>
              <p className="text-xs text-muted-foreground">
                1. Open {externalDownloaders[selectedPlatform.key as keyof typeof externalDownloaders] || "an online downloader"}<br />
                2. Paste this URL: <span className="font-mono break-all">{url}</span><br />
                3. Click download<br />
                4. Save the video to your device
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="border rounded-xl overflow-hidden bg-card/50">
            <div className="p-4 border-b bg-muted/30">
              <h2 className="font-semibold flex items-center gap-2">
                {result.type === "success" ? <CheckCircle className="size-5 text-green-500" /> : <HelpCircle className="size-5 text-yellow-500" />}
                {result.type === "success" ? "Download Ready" : "Alternative Method"}
              </h2>
              {result.title && <p className="text-sm text-muted-foreground mt-1">{result.title}</p>}
            </div>
            
            <div className="p-4">
              {result.type === "success" && result.medias && (
                <div className="space-y-3">
                  {result.medias.map((media: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {media.type === "video" && <FileVideo className="size-5 text-blue-500" />}
                        {media.type === "image" && <Image className="size-5 text-green-500" />}
                        {media.type === "audio" && <Music className="size-5 text-purple-500" />}
                        <div>
                          <span className="text-sm font-medium capitalize">{media.type}</span>
                          {media.quality && <span className="text-xs text-muted-foreground ml-2">{media.quality}</span>}
                        </div>
                      </div>
                      <a
                        href={media.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                      >
                        <Download className="size-4" />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
              
              {result.type === "external" && (
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm mb-2">{result.message}</p>
                    <div className="bg-muted p-2 rounded-lg mb-2">
                      <p className="text-xs font-mono break-all">URL: {url}</p>
                    </div>
                    <a
                      href={result.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <ExternalLink className="size-4" />
                      Open Downloader
                    </a>
                  </div>
                </div>
              )}
              
              {result.type === "alternative" && (
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm mb-2">{result.message}</p>
                    <div className="bg-muted p-2 rounded-lg mb-2">
                      <p className="text-xs font-mono break-all">URL: {result.url}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(result.url)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 border rounded-lg"
                      >
                        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                        Copy URL
                      </button>
                      <a
                        href={result.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        <ExternalLink className="size-4" />
                        Open Downloader
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alternative Downloaders */}
        <div className="mt-6 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <HelpCircle className="size-4" />
            Alternative Downloaders (If above fails)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {Object.entries(externalDownloaders).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 p-2 border rounded-lg hover:bg-accent">
                <ExternalLink className="size-3" />
                {key.charAt(0).toUpperCase() + key.slice(1)} Downloader
              </a>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Note</p>
              <p className="text-xs text-muted-foreground mt-1">
                Due to API limitations, some platforms may redirect you to external downloaders.
                These are trusted services for downloading social media content.
                Always respect copyright and terms of service.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Njabulo-Jb Downloader | For personal use only
          </p>
        </div>
      </div>
    </div>
  );
   }
