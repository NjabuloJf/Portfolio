"use client";

import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Sun, SunMoon, ChevronUp, ChevronDown, X
} from "lucide-react";
import { useState } from "react";

interface DstvControlsProps {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  brightness: number;
  isFullscreen: boolean;
  showControls: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (value: number) => void;
  onBrightnessChange: (value: number) => void;
  onToggleFullscreen: () => void;
  onToggleControls: () => void;
  channelName: string;
}

export function DstvControls({
  isPlaying,
  volume,
  isMuted,
  brightness,
  isFullscreen,
  showControls,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  onBrightnessChange,
  onToggleFullscreen,
  onToggleControls,
  channelName,
}: DstvControlsProps) {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showBrightnessSlider, setShowBrightnessSlider] = useState(false);

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? "opacity-100" : "opacity-0"
      }`}
      onMouseEnter={() => setShowVolumeSlider(false)}
    >
      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Left Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
          </button>
          
          <span className="text-xs text-gray-300 hidden sm:block">{channelName}</span>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-1">
          {/* Volume Control */}
          <div className="relative flex items-center">
            <button
              onClick={onToggleMute}
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setTimeout(() => setShowVolumeSlider(false), 1000)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </button>
            
            {showVolumeSlider && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/80 backdrop-blur-sm p-3 rounded-lg min-w-[120px]">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 ${isMuted ? 0 : volume}%, #374151 ${isMuted ? 0 : volume}%)`
                  }}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">0%</span>
                  <span className="text-xs text-gray-400">{isMuted ? 0 : volume}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Brightness Control */}
          <div className="relative flex items-center">
            <button
              onClick={() => setShowBrightnessSlider(!showBrightnessSlider)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Sun className="size-5" />
            </button>
            
            {showBrightnessSlider && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/80 backdrop-blur-sm p-3 rounded-lg min-w-[120px]">
                <div className="flex items-center gap-2">
                  <SunMoon className="size-3 text-gray-400" />
                  <input
                    type="range"
                    min="30"
                    max="150"
                    value={brightness}
                    onChange={(e) => onBrightnessChange(parseInt(e.target.value))}
                    className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 ${brightness - 30}%, #374151 ${brightness - 30}%)`
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">30%</span>
                  <span className="text-xs text-gray-400">{brightness}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleFullscreen}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isFullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
          </button>
        </div>
      </div>

      {/* HD Quality Badge */}
      <div className="flex justify-between items-center mt-1 px-2">
        <div className="text-[10px] text-gray-400">
          <span className="bg-purple-500/20 px-2 py-0.5 rounded text-purple-300">HD 1080p</span>
        </div>
        <div className="text-[10px] text-gray-500">
          {isPlaying ? "● Live" : "● Paused"}
        </div>
      </div>

      {/* Click to show/hide controls */}
      <button
        onClick={onToggleControls}
        className="absolute bottom-0 left-0 right-0 h-full opacity-0"
      />
    </div>
  );
  }
