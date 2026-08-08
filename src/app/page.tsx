/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { 
  ArrowUpRight, MessageCircle, Search, X, Rocket, Music, 
  CheckCircle, Download, Smartphone, Bell, Play, Pause, 
  Volume2, VolumeX, SkipForward, SkipBack, Users, 
  MessageSquare, Facebook, Globe, Bot, Zap, Crown,
  Radio, Headphones, Share2, Star, Heart, Award,
  Youtube, Github, ExternalLink, Send, Hash, Link as LinkIcon,
  FastForward, PlayCircle, Repeat, Timer, Clock, Eye, ThumbsUp,
  Calendar, Video, Film
} from "lucide-react";
import { MusicPlayer } from "@/components/music-player";
import { ImageCarousel } from "@/components/image-carousel";

const BLUR_FADE_DELAY = 0.04;

// 🆕 Toast Notification Component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20">
        <Music className="size-5" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

// Loading Screen
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <div className="relative mb-4">
        <div className="absolute -inset-1.5 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" />
        </div>
        <div className="relative rounded-full overflow-hidden">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <img 
              src={DATA.avatarUrl} 
              alt={DATA.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-1 right-1 z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
              <div className="relative w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 z-20">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-sm" />
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-1 shadow-lg border border-white/20">
                <CheckCircle className="size-3.5 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xl font-semibold text-foreground">ɳʝαႦυʅσ</h2>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-0.5 shadow-lg">
          <CheckCircle className="size-3 text-white" />
        </div>
        <span className="text-[8px] font-medium text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded-full">Meta Verified</span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Loading your dashboard...</p>
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full animate-loading-line" />
      </div>
      <style jsx>{`
        @keyframes loading-line {
          0% { width: 0%; opacity: 1; }
          50% { width: 100%; opacity: 1; }
          100% { width: 0%; opacity: 0; }
        }
        .animate-loading-line {
          animation: loading-line 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// 🆕 Mini Music Player for Notification with Multiple Songs
function MiniMusicPlayer({ audioSrcs, onClose }: { audioSrcs: string[]; onClose: () => void }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isShuffling, setIsShuffling] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songNames = [
    "Njabulo Jb - Song 1",
    "Njabulo Jb - Song 2",
    "Njabulo Jb - Song 3",
    "Njabulo Jb - Song 4",
    "Njabulo Jb - Song 5"
  ];

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(audioSrcs[currentSongIndex]);
      audioRef.current.loop = false;
      audioRef.current.playbackRate = playbackSpeed;
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
      });
      
      audioRef.current.addEventListener('ended', () => {
        if (isShuffling) {
          handleShuffleNext();
        } else {
          handleNext();
        }
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [currentSongIndex, playbackSpeed]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error('Audio play failed:', err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const nextIndex = (currentSongIndex + 1) % audioSrcs.length;
    setCurrentSongIndex(nextIndex);
    setCurrentTime(0);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.error('Play failed:', err));
        setIsPlaying(true);
      }
    }, 50);
  };

  const handlePrevious = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const prevIndex = (currentSongIndex - 1 + audioSrcs.length) % audioSrcs.length;
    setCurrentSongIndex(prevIndex);
    setCurrentTime(0);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.error('Play failed:', err));
        setIsPlaying(true);
      }
    }, 50);
  };

  const handleShuffleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * audioSrcs.length);
    } while (randomIndex === currentSongIndex && audioSrcs.length > 1);
    setCurrentSongIndex(randomIndex);
    setCurrentTime(0);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.error('Play failed:', err));
        setIsPlaying(true);
      }
    }, 50);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const handleSpeedChange = () => {
    const currentIndex = speedOptions.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speedOptions.length;
    const newSpeed = speedOptions[nextIndex];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-40 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-bottom-4">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Music className="size-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs">⚡ Fast Playing</h4>
              <p className="text-white/80 text-xs">{songNames[currentSongIndex]}</p>
              <p className="text-white/50 text-[10px]">{currentSongIndex + 1} / {audioSrcs.length}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/60 text-[10px]">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                const val = parseFloat(e.target.value);
                audioRef.current.currentTime = val;
                setCurrentTime(val);
              }
            }}
            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%)`
            }}
          />
          <span className="text-white/60 text-[10px]">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
            {isMuted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          
          <div className="flex items-center gap-2">
            <button onClick={handlePrevious} className="text-white/70 hover:text-white transition-colors p-1">
              <SkipBack className="size-4" />
            </button>
            
            <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-purple-600 hover:bg-white/90 transition-all flex items-center justify-center shadow-lg">
              {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 ml-0.5" />}
            </button>
            
            <button onClick={handleNext} className="text-white/70 hover:text-white transition-colors p-1">
              <SkipForward className="size-4" />
            </button>

            <button onClick={toggleShuffle} className={`p-1 rounded transition-colors ${isShuffling ? 'text-yellow-300 bg-white/20' : 'text-white/50 hover:text-white'}`}>
              <Repeat className="size-4" />
            </button>
          </div>

          <button onClick={handleSpeedChange} className="text-white/70 hover:text-white transition-colors text-xs font-bold bg-white/10 px-2 py-1 rounded-full">
            {playbackSpeed}x
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`
            }}
          />
        </div>

        <div className="flex justify-center gap-1.5 mt-2">
          <span className="text-white/40 text-[8px] flex items-center gap-1">
            <FastForward className="size-3" />
            Fast Playback
          </span>
          {isShuffling && (
            <span className="text-yellow-300/60 text-[8px] flex items-center gap-1">
              <Repeat className="size-3" />
              Shuffle
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// 🆕 Notification Ads Component - With Video Notifications
function NotificationAds() {
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [reappearTimer, setReappearTimer] = useState<NodeJS.Timeout | null>(null);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [remainingAds, setRemainingAds] = useState(12);
  const [countdown, setCountdown] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  // Song list
  const songs = [
    "/song1.mp3",
    "/song2.mp3",
    "/song3.mp3",
    "/song4.mp3",
    "/song5.mp3"
  ];

  // 🎯 12 Ads - Removed GWM-XMD and Njabulo UI, Added Video Notifications
  const ads = [
    {
      id: 1,
      type: "music",
      icon: <Music className="size-6 text-green-500" />,
      title: "🎵ʟɪsᴛᴇɴ ᴛᴏ ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴍᴜsɪᴄ",
      description: "Enjoy the latest tracks",
      buttonText: "▶ Play Music",
      color: "from-green-600 to-emerald-600",
      action: () => {
        setShowMusicPlayer(true);
        setToastMessage("🎵 Now playing music...");
      }
    },
    {
      id: 2,
      type: "download",
      icon: <Download className="size-6 text-blue-500" />,
      title: "📱ᴅᴏᴡɴʟᴏᴀᴅ ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴀᴘᴘ",
      description: "Get the official Android app",
      buttonText: "⬇ Download APK",
      color: "from-blue-600 to-purple-600",
      action: () => window.open("/downloads/Njabulo-Jb.apk", "_blank")
    },
    {
      id: 3,
      type: "channel",
      icon: <Bell className="size-6 text-yellow-500" />,
      title: "🔔 ᴊᴏɪɴ ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴄʜᴀɴɴᴇʟ",
      description: "Get notifications & updates on WhatsApp",
      buttonText: "📢 Join Channel",
      color: "from-yellow-600 to-orange-600",
      action: () => window.open("https://whatsapp.com/channel/0029VbC9yTmElah0BO3KD509", "_blank")
    },
    {
      id: 4,
      type: "whatsapp",
      icon: <MessageCircle className="size-6 text-green-500" />,
      title: "💬 ᴍᴇssᴀɢᴇ ᴏᴡɴᴇʀ ᴏɴ ᴡʜᴀᴛsᴀᴘᴘ",
      description: "Chat directly with Njabulo Jb",
      buttonText: "📱 Contact Now",
      color: "from-green-600 to-teal-600",
      action: () => window.open("https://wa.me/26777821911", "_blank")
    },
    {
      id: 5,
      type: "facebook",
      icon: <Facebook className="size-6 text-blue-500" />,
      title: "📘 ғᴏʟʟᴏᴡ ᴏɴ ғᴀᴄᴇʙᴏᴏᴋ",
      description: "Stay updated on Facebook",
      buttonText: "👍 Follow Now",
      color: "from-blue-600 to-cyan-600",
      action: () => window.open("https://www.facebook.com/profile.php?id=100094314013209", "_blank")
    },
    {
      id: 6,
      type: "bot",
      icon: <Bot className="size-6 text-indigo-500" />,
      title: "🤖 ɢᴇᴛ sᴛᴀʀᴛᴇᴅ ᴡɪᴛʜ ɴᴊᴀʙᴜʟᴏ ᴊʙ ʙᴏᴛ",
      description: "Try the AI-powered WhatsApp bot",
      buttonText: "🚀 Start Bot",
      color: "from-indigo-600 to-purple-600",
      action: () => window.open("https://wa.me/26777821911?text=!start", "_blank")
    },
    {
      id: 7,
      type: "share",
      icon: <Share2 className="size-6 text-rose-500" />,
      title: "📤sʜᴀʀᴇ ɴᴊᴀʙᴜʟᴏ ᴊʙ ʙᴏᴛ",
      description: "Share the bot with friends",
      buttonText: "📤 Share Now",
      color: "from-rose-600 to-pink-600",
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'NJABULO JB Bot',
            text: 'Check out NJABULO JB Bot!',
            url: 'https://github.com/NjabuloJf/Njabulo-Jb'
          }).catch(() => {});
        } else {
          navigator.clipboard.writeText('https://github.com/NjabuloJf/Njabulo-Jb');
          setToastMessage("📤 Link copied to clipboard!");
        }
      }
    },
    {
      id: 8,
      type: "star",
      icon: <Star className="size-6 text-amber-500" />,
      title: "⭐sᴛᴀʀ ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴏɴ ɢɪᴛʜᴜʙ",
      description: "Show your support with a star",
      buttonText: "⭐ Star Now",
      color: "from-amber-600 to-orange-600",
      action: () => window.open("https://github.com/NjabuloJf/Njabulo-Jb", "_blank")
    },
    {
      id: 9,
      type: "video",
      icon: <Youtube className="size-6 text-red-500" />,
      title: "🎬 ʜᴏᴡ ᴛᴏ ᴅᴇᴘʟᴏʏ ɴᴊᴀʙᴜʟᴏ ᴊʙ ʙᴏᴛ",
      description: "Watch the full deployment tutorial",
      buttonText: "▶ Watch Video",
      color: "from-red-600 to-rose-600",
      action: () => window.open("/video", "_blank")
    },
    {
      id: 10,
      type: "video",
      icon: <Video className="size-6 text-purple-500" />,
      title: "📺 ʜᴏᴡ ᴛᴏ ᴅᴇᴘʟᴏʏ ɴᴊᴀʙᴜʟᴏ ᴊʙ ʙᴏᴛ",
      description: "Learn how to create a Telegram bot",
      buttonText: "▶ Watch Tutorial",
      color: "from-purple-600 to-indigo-600",
      action: () => window.open("/video", "_blank")
    },
    {
      id: 11,
      type: "video",
      icon: <Film className="size-6 text-blue-500" />,
      title: "🎥 ɴᴊᴀʙᴜʟᴏ ᴊʙ ʙᴏᴛ ғᴇᴀᴛᴜʀᴇs ᴏᴠᴇʀᴠɪᴇᴡ",
      description: "Explore all bot features",
      buttonText: "▶ Watch Now",
      color: "from-blue-600 to-cyan-600",
      action: () => window.open("/video", "_blank")
    },
    {
      id: 12,
      type: "award",
      icon: <Award className="size-6 text-yellow-500" />,
      title: "🏆 Get NJABULO JB Badge",
      description: "Claim your verified badge today",
      buttonText: "🎖️ Claim Badge",
      color: "from-yellow-600 to-amber-600",
      action: () => window.open("https://www.facebook.com/profile.php?id=100094314013209", "_blank")
    }
  ];

  // 🔄 FAST random time between 5-10 seconds
  const getRandomReappearTime = () => {
    return Math.floor(Math.random() * (10 - 5 + 1) + 5); // 5-10 seconds
  };

  // 🎲 Get random unused ad index
  const getRandomUnusedIndex = () => {
    const available = ads
      .map((_, index) => index)
      .filter(index => !usedIndices.includes(index));
    
    if (available.length === 0) {
      setUsedIndices([]);
      setRemainingAds(12);
      return Math.floor(Math.random() * ads.length);
    }
    
    setRemainingAds(available.length);
    return available[Math.floor(Math.random() * available.length)];
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (reappearTimer) clearTimeout(reappearTimer);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [reappearTimer]);

  let countdownInterval: NodeJS.Timeout | null = null;

  // Start countdown timer
  const startCountdown = (seconds: number) => {
    setCountdown(seconds);
    setIsCountdownActive(true);
    
    countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval!);
          setIsCountdownActive(false);
          showNextRandomAd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 🎯 Show next random ad
  const showNextRandomAd = () => {
    const nextIndex = getRandomUnusedIndex();
    setActiveAdIndex(nextIndex);
    setUsedIndices(prev => [...prev, nextIndex]);
    setIsVisible(true);
    setIsCountdownActive(false);
  };

  // 📌 Initial setup - show first random ad
  useEffect(() => {
    const initialIndex = Math.floor(Math.random() * ads.length);
    setActiveAdIndex(initialIndex);
    setUsedIndices([initialIndex]);
    setRemainingAds(11);
    setIsVisible(true);
  }, []);

  const currentAd = ads[activeAdIndex];

  const handleDismiss = () => {
    if (reappearTimer) {
      clearTimeout(reappearTimer);
      setReappearTimer(null);
    }

    setIsVisible(false);
    
    const randomTime = getRandomReappearTime();
    startCountdown(randomTime);
  };

  const handleAction = () => {
    currentAd.action();
    if (currentAd.type !== 'music') {
      handleDismiss();
    }
  };

  return (
    <>
      {showMusicPlayer && (
        <MiniMusicPlayer 
          audioSrcs={songs}
          onClose={() => {
            setShowMusicPlayer(false);
            handleDismiss();
          }} 
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {isVisible && currentAd && (
        <div className="fixed bottom-24 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-bottom-4">
          <div className={`bg-gradient-to-r ${currentAd.color} rounded-2xl p-4 shadow-2xl border border-white/20`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
                  {currentAd.icon}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm">{currentAd.title}</h4>
                <p className="text-white/80 text-xs mt-1">{currentAd.description}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={handleAction}
                    className="px-3 py-1.5 bg-white text-purple-600 rounded-lg text-xs font-medium hover:bg-white/90 transition-colors"
                  >
                    {currentAd.buttonText}
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs hover:bg-white/30 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button onClick={handleDismiss} className="text-white/60 hover:text-white">
                <X className="size-4" />
              </button>
            </div>
            
            <div className="mt-2 flex items-center justify-center gap-2 text-white/60 text-[10px]">
              <Clock className="size-3" />
              <span>Next notification in</span>
              <span className="font-bold text-white text-sm animate-pulse">
                {isCountdownActive ? countdown : '--'}
              </span>
              <span>s</span>
              <span className="text-white/20">|</span>
              <span className="text-white/30">{remainingAds} ads left</span>
            </div>
            
            <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/40 rounded-full transition-all duration-1000"
                style={{ 
                  width: isCountdownActive ? `${(countdown / 10) * 100}%` : '0%'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Search Bar Component
function SearchBar({ onSearch, searchQuery }: { onSearch: (query: string) => void; searchQuery: string }) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search projects, work, skills..."
          className="w-full h-10 pl-9 pr-10 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        {searchQuery && (
          <button onClick={() => onSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
}

// Bottom Buttons Component
function BottomButtons({ onOpenMusic }: { onOpenMusic: () => void }) {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed bottom-32 right-8 z-40 flex flex-col gap-3">
      <button
        onClick={onOpenMusic}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 group shadow-lg backdrop-blur-sm"
        aria-label="Open Music Player"
      >
        <Music className="size-5 text-green-500 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-green-600 hidden sm:inline">Music Player</span>
      </button>
      
      <a
        href="/video"
        download
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group shadow-lg backdrop-blur-sm"
        aria-label="Download APK"
      >
        <Smartphone className="size-5 text-blue-500 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-blue-600 hidden sm:inline">Wach video</span>
      </a>
      
      <button
        onClick={scrollToProjects}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-500/20 border border-orange-500/40 hover:bg-orange-500/30 transition-all duration-300 group shadow-lg backdrop-blur-sm"
        aria-label="Go to Projects"
      >
        <Rocket className="size-5 text-orange-500 group-hover:scale-110 group-hover:-translate-y-1 transition-transform" />
        <span className="text-sm font-medium text-orange-600 hidden sm:inline">Projects</span>
      </button>
    </div>
  );
}

// Avatar with Green Status Ring and Meta Verified Badge
function AvatarWithMetaBadge() {
  return (
    <div className="relative flex-shrink-0">
      <div className="absolute -inset-1.5 rounded-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" />
      </div>
      
      <div className="relative rounded-full overflow-hidden">
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden">
          <img 
            src={DATA.avatarUrl} 
            alt={DATA.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 z-10">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
            <div className="relative w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
          </div>
        </div>
        
        <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 z-20">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-sm" />
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-1 md:p-1.5 shadow-lg border border-white/20">
              <CheckCircle className="size-3 md:size-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section Header with Verified Badge
function SectionHeader({ title, id }: { title: string; id: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <h2 id={id} className="text-xl font-bold">{title}</h2>
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-0.5 shadow-lg">
        <CheckCircle className="size-3.5 text-white" />
      </div>
      <span className="text-[10px] font-medium text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-full">Meta Verified</span>
    </div>
  );
}

// Carousel Images
const carouselImages = [
  { src: "/images/image1.png", alt: "Njabulo Jb Project 1", link: "/business" },
  { src: "/images/image2.png", alt: "Njabulo Jb Project 2", link: "https://github.com/NjabuloJf/Njabulo-Jb" },
  { src: "images/image3.png", alt: "Njabulo Jb Project 3", link: "https://www.facebook.com/profile.php?id=100094314013209" },
  { src: "images/image4.png", alt: "Njabulo Jb Project 4", link: "https://t.me/njabulojbbot" },
  { src: "images/image5.png", alt: "Njabulo Jb Project 5", link: "https://wa.me/27791234567" },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-dvh flex flex-col gap-8 relative pb-20">
      <MusicPlayer isOpen={isMusicPlayerOpen} onClose={() => setIsMusicPlayerOpen(false)} />

      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm py-3 border-b border-border">
        <SearchBar onSearch={setSearchQuery} searchQuery={searchQuery} />
      </div>

      <NotificationAds />

      <section id="hero" className="py-4">
        <div className="mx-auto w-full max-w-4xl px-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1 text-left order-2 md:order-1">
              <div className="flex items-center gap-2 flex-wrap justify-start">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                  yOffset={8}
                  text={`${DATA.name.split(" ")[0]}`}
                />
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-0.5 shadow-lg">
                  <CheckCircle className="size-3.5 md:size-4 text-white" />
                </div>
                <span className="text-[10px] font-medium text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-full">Meta Verified</span>
              </div>
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-base lg:text-lg mt-2 text-left"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <AvatarWithMetaBadge />
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      <section id="carousel" className="py-2">
        <div className="container mx-auto px-4">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-xl font-bold text-center mb-3">ᴍʏ ᴘʀᴏᴊᴇᴄᴛs ɢᴀʟʟᴇʀʏ</h2>
            <p className="text-center text-muted-foreground text-sm mb-5">Click on any image to view the project</p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
            <ImageCarousel images={carouselImages} autoScrollInterval={4000} />
          </BlurFade>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <SectionHeader title="ɴᴊᴀʙᴜʟᴏ ᴊʙ" id="about" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <SectionHeader title="ᴡᴏʀᴋ ᴇxᴘᴇʀɪᴇɴᴄᴇ" id="work" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">ᴇᴅᴜᴄᴀᴛɪᴏɴ</h2>
          </BlurFade>
          <div className="flex flex-col gap-5">
            {DATA.education.map((education, index) => (
              <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + index * 0.05}>
                <Link href={education.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-3 justify-between group">
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img src={education.logoUrl} alt={education.school} className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none" />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2 text-sm md:text-base">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-xs md:text-sm text-muted-foreground">{education.degree}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>{education.start} - {education.end}</span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <SectionHeader title="sᴋɪʟʟs" id="skills" />
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-lg h-7 w-fit px-3 flex items-center gap-1.5">
                  {skill.icon && <skill.icon className="size-3.5 rounded overflow-hidden object-contain" />}
                  <span className="text-foreground text-xs font-medium">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <SectionHeader title="ᴘʀᴏᴊᴇᴄᴛs" id="projects" />
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="ʜᴀᴄᴋᴀᴛʜᴏɴ">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>

      <BottomButtons onOpenMusic={() => setIsMusicPlayerOpen(true)} />

      {searchQuery && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs shadow-lg z-50">
          🔍 Searching: "{searchQuery}"
        </div>
      )}
    </main>
  );
            }
