import { NextRequest, NextResponse } from "next/server";

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
    const response = await fetch(`https://instagram.com/api/oembed?url=${encodeURIComponent(url)}`);
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
    // Extract video ID
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return { success: false, error: "Invalid YouTube URL" };
    }

    // Use multiple APIs to get video/audio
    const apis = [
      `https://pipedapi.kavin.rocks/streams/${videoId}`,
      `https://inv.riverside.rocks/api/v1/videos/${videoId}`,
      `https://ytdlp.tomscript.workers.dev/?url=${encodeURIComponent(url)}`
    ];

    let videoData = null;
    for (const apiUrl of apis) {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          videoData = await response.json();
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (videoData) {
      const medias = [];
      
      // Video formats
      const videoFormats = videoData.videoFormats || videoData.formats?.filter((f: any) => f.hasVideo) || [];
      const audioFormats = videoData.audioFormats || videoData.formats?.filter((f: any) => f.hasAudio) || [];
      
      // Add video qualities
      const qualities = ['1080', '720', '480', '360'];
      for (const quality of qualities) {
        const video = videoFormats.find((v: any) => v.quality === quality || v.height === parseInt(quality));
        if (video && video.url) {
          medias.push({ url: video.url, type: "video", quality: `${quality}p` });
        }
      }
      
      // Add audio
      const audio = audioFormats[0] || videoData.audio;
      if (audio && audio.url) {
        medias.push({ url: audio.url, type: "audio", quality: "MP3" });
      }
      
      // Thumbnail
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      return {
        success: true,
        title: videoData.title || "YouTube Video",
        thumbnail: thumbnail,
        medias: medias
      };
    }
    
    // Fallback: Return thumbnail only
    return {
      success: true,
      title: "YouTube Video",
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      medias: [
        { url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, type: "image", quality: "Thumbnail" },
        { url: `https://www.youtube.com/embed/${videoId}`, type: "embed", quality: "Embed" }
      ]
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch YouTube video" };
  }
}

async function downloadFacebook(url: string) {
  try {
    // Use multiple Facebook download APIs
    const apis = [
      `https://getvideo.cc/api?url=${encodeURIComponent(url)}`,
      `https://fbdown.io/api/ajaxSearch?url=${encodeURIComponent(url)}`,
      `https://snapsave.app/api/ajaxSearch?url=${encodeURIComponent(url)}`
    ];

    for (const apiUrl of apis) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.video || data.hd || data.sd) {
            const medias = [];
            if (data.hd) medias.push({ url: data.hd, type: "video", quality: "HD" });
            if (data.sd) medias.push({ url: data.sd, type: "video", quality: "SD" });
            if (data.video) medias.push({ url: data.video, type: "video", quality: "Normal" });
            
            return {
              success: true,
              title: data.title || "Facebook Video",
              thumbnail: data.thumbnail,
              medias: medias
            };
          }
        }
      } catch (e) {
        continue;
      }
    }

    // Alternative: Use yt-dlp service
    const alternativeApi = `https://ytdlp.tomscript.workers.dev/?url=${encodeURIComponent(url)}`;
    const altResponse = await fetch(alternativeApi);
    
    if (altResponse.ok) {
      const altData = await altResponse.json();
      if (altData.url) {
        return {
          success: true,
          title: "Facebook Video",
          medias: [{ url: altData.url, type: "video", quality: "HD" }]
        };
      }
    }
    
    return { success: false, error: "Could not fetch Facebook video. Try a different URL." };
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
