"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Music, X, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MusicPlayer({ isOpen, onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 5 Songs - You can change these URLs or use local files
  const songs = [
    {
      id: 1,
      title: "Song 1 - Summer Breeze",
      artist: "Njabulo Jb",
      url: "/song.mp3", // Place your song in public/song.mp3
      duration: "3:45"
    },
    {
      id: 2,
      title: "Song 2 - Night Dreams",
      artist: "Njabulo Jb",
      url: "/song1.mp3", // Place your song in public/song1.mp3
      duration: "4:12"
    },
    {
      id: 3,
      title: "Song 3 - Morning Light",
      artist: "Njabulo Jb",
      url: "/song2.mp3", // Place your song in public/song2.mp3
      duration: "3:28"
    },
    {
      id: 4,
      title: "Song 4 - Ocean Waves",
      artist: "Njabulo Jb",
      url: "/song3.mp3", // Place your song in public/song3.mp3
      duration: "5:01"
    },
    {
      id: 5,
      title: "Song 5 - Starry Night",
      artist: "Njabulo Jb",
      url: "/song4.mp3", // Place your song in public/song4.mp3
      duration: "4:35"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  const handleSongEnd = () => {
    playNext();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      {/* Music Player Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 rounded-2xl shadow-2xl w-96 max-w-[90%] p-6 border border-purple-500/30 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Music className="size-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Music Player</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="size-5 text-white" />
            </button>
          </div>

          {/* Song Info */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
              <Music className="size-10 text-white" />
            </div>
            <h4 className="text-white font-semibold text-lg">
              {songs[currentSongIndex].title}
            </h4>
            <p className="text-purple-300 text-sm">{songs[currentSongIndex].artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-purple-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #a855f7 ${(currentTime / duration) * 100}%, #581c87 ${(currentTime / duration) * 100}%)`
              }}
            />
            <div className="flex justify-between text-xs text-purple-300 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={playPrevious}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
            >
              <SkipBack className="size-6 text-white" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-110 shadow-lg"
            >
              {isPlaying ? (
                <Pause className="size-6 text-white" />
              ) : (
                <Play className="size-6 text-white" />
              )}
            </button>
            
            <button
              onClick={playNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
            >
              <SkipForward className="size-6 text-white" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="size-4 text-purple-300" />
              ) : (
                <Volume2 className="size-4 text-purple-300" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-purple-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Song List */}
          <div className="mt-4 pt-3 border-t border-purple-700">
            <p className="text-xs text-purple-300 mb-2">Playlist ({songs.length} songs)</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {songs.map((song, idx) => (
                <button
                  key={song.id}
                  onClick={() => {
                    setCurrentSongIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                    currentSongIndex === idx
                      ? "bg-purple-600/50 text-white"
                      : "text-purple-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{song.title}</span>
                    <span className="text-xs">{song.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
