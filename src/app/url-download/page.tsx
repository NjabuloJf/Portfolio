"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { 
  Download, Copy, Check, AlertCircle, Loader2,
  Globe, FileVideo, Music, Image, 
  Twitter, Instagram, Facebook, Youtube, Send,
  Film, Sparkles, Share2, Trash2, RefreshCw,
  CheckCircle, ExternalLink, Headphones, Video,
  Search, FileText, Mic, CloudDownload
} from "lucide-react";

// Your APIs with CORS proxy
const PROXY_URL = "https://api.allorigins.win/raw?url=";
const API_BASE = "https://eliteprotech-apis.zone.id";

const getApiUrl = (type: string, query: string) => {
  const encodedQuery = encodeURIComponent(query);
  switch(type) {
    case "ytsearch":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/ytsearch?q=${encodedQuery}`)}`;
    case "spotify":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/spotify1?q=${encodedQuery}`)}`;
    case "sps":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/sps?q=${encodedQuery}`)}`;
    case "lyrics":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/lyrics?q=${encodedQuery}`)}`;
    case "ytmp3":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/ytdown?format=mp3&url=${encodedQuery}`)}`;
    case "ytmp4":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/ytdown?format=mp4&url=${encodedQuery}`)}`;
    case "tiktok":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/tiktok?url=${encodedQuery}`)}`;
    case "instagram":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/instagram?url=${encodedQuery}`)}`;
    case "mediafire":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/mediafire?url=${encodedQuery}`)}`;
    case "facebook":
      return `${PROXY_URL}${encodeURIComponent(`${API_BASE}/facebook?url=${encodedQuery}`)}`;
    default:
      return "";
  }
};

const platforms = [
  { name: "YouTube", key: "youtube", icon: <Youtube className="size-5" />, color: "bg-red-600", placeholder: "https://www.youtube.com/watch?v=ABC123XYZ", hasUrl: true },
  { name: "Spotify", key: "spotify", icon: <Music className="size-5" />, color: "bg-green-600", placeholder: "https://open.spotify.com/track/123456789", hasUrl: true },
  { name: "Spotify Search", key: "sps", icon: <Search className="size-5" />, color: "bg-green-500", placeholder: "Search for song or artist...", hasUrl: false },
  { name: "Lyrics", key: "lyrics", icon: <FileText className="size-5" />, color: "bg-purple-600", placeholder: "Song name - Artist name", hasUrl: false },
  { name: "TikTok", key: "tiktok", icon: <Music className="size-5" />, color: "bg-black", placeholder: "https://www.tiktok.com/@username/video/123456789", hasUrl: true },
  { name: "Instagram", key: "instagram", icon: <Instagram className="size-5" />, color: "bg-pink-600", placeholder: "https://www.instagram.com/p/ABC123XYZ/", hasUrl: true },
  { name: "Facebook", key: "facebook", icon: <Facebook className="size-5" />, color: "bg-blue-600", placeholder: "https://www.facebook.com/watch?v=123456789", hasUrl: true },
  { name: "Twitter/X", key: "twitter", icon: <Twitter className="size-5" />, color: "bg-black", placeholder: "https://twitter.com/username/status/123456789", hasUrl: true },
  { name: "MediaFire", key: "mediafire", icon: <CloudDownload className="size-5" />, color: "bg-orange-600", placeholder: "https://www.mediafire.com/file/xxxxx", hasUrl: true },
  { name: "Search", key: "search", icon: <Search className="size-5" />, color: "bg-purple-600", placeholder: "Search for music or videos...", hasUrl: false }
];

export default function UrlDownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "audio" | "lyrics">("video");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleDownload = async () => {
    if (!url.trim() && selectedPlatform.hasUrl) {
      setError("Please enter a valid URL");
      return;
    }
    if (!url.trim() && !selectedPlatform.hasUrl) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setSearchResults([]);

    try {
      // Handle YouTube downloads
      if (selectedPlatform.key === "youtube") {
        const videoId = extractYouTubeId(url);
        if (!videoId) throw new Error("Invalid YouTube URL");

        const mp4Url = getApiUrl("ytmp4", url);
        const mp4Response = await fetch(mp4Url);
        const mp4Data = await mp4Response.json();

        const mp3Url = getApiUrl("ytmp3", url);
        const mp3Response = await fetch(mp3Url);
        const mp3Data = await mp3Response.json();

        const medias = [];
        if (mp4Data && mp4Data.download_url) medias.push({ url: mp4Data.download_url, type: "video", quality: "HD" });
        if (mp3Data && mp3Data.download_url) medias.push({ url: mp3Data.download_url, type: "audio", quality: "MP3" });

        if (medias.length === 0) throw new Error("Could not fetch download links");

        setResult({
          success: true,
          title: `YouTube Video`,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          medias: medias
        });
      }
      // Handle Spotify URL
      else if (selectedPlatform.key === "spotify") {
        const apiUrl = getApiUrl("spotify", url);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.tracks && data.tracks.items) {
          setSearchResults(data.tracks.items);
        } else {
          throw new Error("No results found");
        }
      }
      // Handle Spotify Search (sps)
      else if (selectedPlatform.key === "sps") {
        const apiUrl = getApiUrl("sps", url);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.data) {
          setSearchResults(data.data);
        } else {
          throw new Error("No results found");
        }
      }
      // Handle Lyrics Search
      else if (selectedPlatform.key === "lyrics") {
        const apiUrl = getApiUrl("lyrics", url);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.lyrics) {
          setResult({
            success: true,
            title: `${data.title} - ${data.artist}`,
            lyrics: data.lyrics,
            type: "lyrics"
          });
        } else {
          throw new Error("Lyrics not found");
        }
      }
      // Handle TikTok
      else if (selectedPlatform.key === "tiktok") {
        const apiUrl = getApiUrl("tiktok", url);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.data) {
          const medias = [];
          if (data.data.play) medias.push({ url: data.data.play, type: "video", quality: "HD" });
          if (data.data.music) medias.push({ url: data.data.music, type: "audio", quality: "Original" });
          setResult({ success: true, title: data.data.title, medias: medias });
        } else {
          throw new Error("No media found");
        }
      }
      // Handle Instagram
      else if (selectedPlatform.key === "instagram") {
        const apiUrl = getApiUrl("instagram", url);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.data) {
          const medias = [];
          if (data.data.video) medias.push({ url: data.data.video, type: "video", quality: "HD" });
          if (data.data.images) data.data.images.forEach((img: string) => medias.push({ url: img, type: "image" }));
          setResult({ success: true, title: "Instagram Post", medias: medias });
        } else {
          throw new Error("No media found");
        }
      }
      // Handle Facebook
      else if (selectedPlatform.key === "facebook") {
        const apiUrl = getApiUrl("facebook", url);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.data) {
          const medias = [];
          if (data.data.hd) medias.push({ url: data.data.hd, type: "video", quality: "HD" });
          if (data.data.sd) medias.push({ url: data.data.sd, type: "video", quality: "SD" });
          setResult({ success: true, title: "Facebook Video", medias: medias });
        } else {
          throw new Error("No video found");
        }
      }
      // Handle MediaFire
      else if (selectedPlatform.key === "mediafire") {
        const apiUrl = getApiUrl("mediafire", url);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.data && data.data.download_url) {
          setResult({
            success: true,
            title: data.data.file_name || "MediaFire File",
            medias: [{ url: data.data.download_url, type: "file", quality: "Direct Download" }]
          });
        } else {
          throw new Error("No download link found");
        }
      }
      // Handle Search
      else if (selectedPlatform.key === "search") {
        const apiUrl = getApiUrl("ytsearch", url);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.videos) {
          setSearchResults(data.videos);
        } else {
          throw new Error("No search results found");
        }
      }
      // Handle Twitter
      else if (selectedPlatform.key === "twitter") {
        const externalApi = `${PROXY_URL}${encodeURIComponent(`https://twitsave.com/info?url=${encodeURIComponent(url)}`)}`;
        const response = await fetch(externalApi);
        const data = await response.json();
        
        if (data && data.video) {
          setResult({ success: true, title: "Twitter Video", medias: [{ url: data.video, type: "video", quality: "HD" }] });
        } else {
          throw new Error("No video found");
        }
      }
    } catch (err) {
      console.error("Download error:", err);
      setError(err instanceof Error ? err.message : "Failed to process. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchItemClick = async (item: any) => {
    if (selectedPlatform.key === "sps" || selectedPlatform.key === "spotify") {
      setResult({
        success: true,
        title: item.title || item.name,
        medias: [{ url: item.url || item.preview_url, type: "audio", quality: "Preview" }]
      });
      setSearchResults([]);
    } else {
      const videoUrl = `https://www.youtube.com/watch?v=${item.id || item.videoId}`;
      setUrl(videoUrl);
      setSelectedPlatform(platforms.find(p => p.key === "youtube")!);
      setTimeout(() => handleDownload(), 100);
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
    setSearchResults([]);
  };

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videos = result?.medias?.filter((m: any) => m.type === "video") || [];
  const audios = result?.medias?.filter((m: any) => m.type === "audio") || [];
  const files = result?.medias?.filter((m: any) => m.type === "file") || [];

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
              Njabulo-Jb Media Downloader
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download videos, audio, lyrics, and files from YouTube, Spotify, TikTok, Instagram, Facebook, Twitter, and MediaFire
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
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                  selectedPlatform.key === platform.key
                    ? `${platform.color} text-white shadow-lg scale-105`
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {platform.icon}
                <span className="hidden sm:inline">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* URL Input */}
        <div className="border rounded-xl p-6 bg-card/50 mb-6">
          <label className="block text-sm font-medium mb-2">
            {selectedPlatform.hasUrl ? "Paste Media URL" : "Enter Search Term"}
          </label>
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
              {loading ? "Processing..." : selectedPlatform.key === "search" || selectedPlatform.key === "sps" || selectedPlatform.key === "lyrics" ? "Search" : "Download"}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="border rounded-xl overflow-hidden bg-card/50 mb-6">
            <div className="p-4 border-b bg-muted/30">
              <h2 className="font-semibold flex items-center gap-2">
                <Search className="size-5 text-blue-500" />
                Search Results
              </h2>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearchItemClick(item)}
                  className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors text-left"
                >
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title || item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.channel || item.artist || item.subtitle}</p>
                  </div>
                  <Download className="size-4 text-primary" />
                </button>
              ))}
            </div>
          </div>
        )}

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
                  • Make sure the URL is correct<br />
                  • The API service may be temporarily unavailable<br />
                  • Try again in a few moments
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
                  {result.type === "lyrics" ? "Lyrics" : "Download Ready"}
                </h2>
                {result.title && <p className="text-sm text-muted-foreground">{result.title}</p>}
              </div>
            </div>
            
            {/* Lyrics Display */}
            {result.type === "lyrics" && (
              <div className="p-4">
                <div className="p-4 bg-muted/20 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap font-sans">{result.lyrics}</pre>
                </div>
                <button
                  onClick={() => handleCopy(result.lyrics)}
                  className="mt-3 inline-flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-accent transition-colors"
                >
                  {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                  Copy Lyrics
                </button>
              </div>
            )}
            
            {/* Tabs for Video/Audio/File */}
            {!result.type === "lyrics" && (
              <>
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
                  {files.length > 0 && (
                    <button
                      onClick={() => setActiveTab("file")}
                      className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                        activeTab === "file"
                          ? "border-b-2 border-primary text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      <CloudDownload className="size-4" />
                      Files ({files.length})
                    </button>
                  )}
                </div>
                
                <div className="p-4 space-y-3">
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
                        <button onClick={() => handleCopy(media.url)} className="p-2 rounded-lg border hover:bg-accent transition-colors">
                          {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                        </button>
                        <a href={media.url} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                          <Download className="size-4" />
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                  
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
                        <button onClick={() => handleCopy(media.url)} className="p-2 rounded-lg border hover:bg-accent transition-colors">
                          {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                        </button>
                        <a href={media.url} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                          <Download className="size-4" />
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                  
                  {activeTab === "file" && files.map((media: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <CloudDownload className="size-5 text-orange-500" />
                        <span className="text-sm font-medium">File</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleCopy(media.url)} className="p-2 rounded-lg border hover:bg-accent transition-colors">
                          {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                        </button>
                        <a href={media.url} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                          <Download className="size-4" />
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Supported Features</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-xs">
                <div>✅ YouTube: Video + Audio</div>
                <div>✅ Spotify: Search & Download</div>
                <div>✅ Lyrics: Find song lyrics</div>
                <div>✅ TikTok: Video + Audio</div>
                <div>✅ Instagram: Video + Images</div>
                <div>✅ Facebook: HD & SD video</div>
                <div>✅ Twitter/X: Video download</div>
                <div>✅ MediaFire: Direct download</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Njabulo-Jb Media Downloader | Powered by EliteProTech APIs
          </p>
        </div>
      </div>
    </div>
  );
                                               }
