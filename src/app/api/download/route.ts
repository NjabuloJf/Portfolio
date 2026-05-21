import { NextRequest, NextResponse } from "next/server";

// API endpoints for different platforms
const API_ENDPOINTS = {
  tiktok: "https://tikwm.com/api/",
  instagram: "https://api.allorigins.win/raw?url=",
  youtube: "https://pipedapi.kavin.rocks",
  facebook: "https://getvideo.cc/api",
  twitter: "https://twitsave.com/info"
};

export async function POST(request: NextRequest) {
  try {
    const { platform, url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let result = null;

    switch (platform) {
      case "tiktok":
        result = await downloadTikTok(url);
        break;
      case "instagram":
        result = await downloadInstagram(url);
        break;
      case "youtube":
        result = await downloadYouTube(url);
        break;
      case "facebook":
        result = await downloadFacebook(url);
        break;
      case "twitter":
        result = await downloadTwitter(url);
        break;
      default:
        return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Failed to download" }, { status: 500 });
  }
}

async function downloadTikTok(url: string) {
  try {
    const response = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (data && data.data) {
      const medias = [];
      if (data.data.play) medias.push({ url: data.data.play, type: "video", quality: "HD" });
      if (data.data.wmplay) medias.push({ url: data.data.wmplay, type: "video", quality: "With Watermark" });
      if (data.data.hdplay) medias.push({ url: data.data.hdplay, type: "video", quality: "Full HD" });
      if (data.data.music) medias.push({ url: data.data.music, type: "audio", quality: "Original" });
      
      return {
        success: true,
        title: data.data.title,
        thumbnail: data.data.cover,
        medias: medias
      };
    }
    return { success: false, error: "No video found" };
  } catch (error) {
    return { success: false, error: "Failed to fetch TikTok video" };
  }
}

async function downloadInstagram(url: string) {
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://instagram.com/api/oembed?url=${encodeURIComponent(url)}`)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    return {
      success: true,
      title: data.title || "Instagram Post",
      thumbnail: data.thumbnail_url,
      medias: [{ url: data.thumbnail_url, type: "image", quality: "HD" }]
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch Instagram content" };
  }
}

async function downloadYouTube(url: string) {
  try {
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return { success: false, error: "Invalid YouTube URL" };
    }
    
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    
    return {
      success: true,
      title: "YouTube Video",
      thumbnail: thumbnail,
      medias: [
        { url: thumbnail, type: "image", quality: "Thumbnail" },
        { url: embedUrl, type: "embed", quality: "Embed" }
      ]
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch YouTube video" };
  }
}

async function downloadFacebook(url: string) {
  try {
    const response = await fetch(`https://getvideo.cc/api?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (data && data.video) {
      return {
        success: true,
        title: data.title || "Facebook Video",
        medias: [{ url: data.video, type: "video", quality: "HD" }]
      };
    }
    return { success: false, error: "No video found" };
  } catch (error) {
    return { success: false, error: "Failed to fetch Facebook video" };
  }
}

async function downloadTwitter(url: string) {
  try {
    const response = await fetch(`https://twitsave.com/info?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (data && data.video) {
      return {
        success: true,
        title: data.title || "Twitter Video",
        medias: [{ url: data.video, type: "video", quality: "HD" }]
      };
    }
    return { success: false, error: "No video found" };
  } catch (error) {
    return { success: false, error: "Failed to fetch Twitter video" };
  }
}

function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
  }
