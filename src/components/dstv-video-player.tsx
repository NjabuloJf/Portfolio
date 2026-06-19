"use client";

import { useEffect, useRef } from "react";
import { Loader2, AlertCircle, Wifi, WifiOff } from "lucide-react";

type Channel = {
  id: number;
  name: string;
  category: string;
  logo: string;
  stream: string;
};

interface DstvVideoPlayerProps {
  channel: Channel;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  brightness: number;
  isLoading: boolean;
  error: string | null;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (value: number) => void;
  onBrightnessChange: (value: number) => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export function DstvVideoPlayer({
  channel,
  isPlaying,
  volume,
  isMuted,
  brightness,
  isLoading,
  error,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  onBrightnessChange,
  onToggleFullscreen,
  isFullscreen,
}: DstvVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.filter = `brightness(${brightness}%)`;
    }
  }, [brightness]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Simulate stream (using placeholder video)
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        loop
        playsInline
        onClick={onTogglePlay}
      />

      {/* Channel Info Overlay */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
        <span className="text-sm font-medium">{channel.name}</span>
        <span className="text-xs text-gray-400 ml-2">• {channel.category}</span>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
          <Loader2 className="size-12 animate-spin text-purple-500 mb-3" />
          <p className="text-sm text-gray-400">Loading {channel.name}...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
          <AlertCircle className="size-12 text-red-500 mb-3" />
          <p className="text-sm text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-purple-500 rounded-lg text-sm hover:bg-purple-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* HD Badge */}
      <div className="absolute top-4 right-4 bg-green-500/20 px-2 py-0.5 rounded text-[10px] text-green-400 border border-green-500/30">
        HD
      </div>

      {/* Connection Status */}
      <div className="absolute bottom-20 right-4 flex items-center gap-1.5 text-xs">
        <Wifi className="size-3 text-green-400" />
        <span className="text-green-400">Live</span>
      </div>

      {/* Click to play/pause hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!isPlaying && !isLoading && !error && (
          <div className="opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={onTogglePlay}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-auto hover:bg-white/30"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
  }
