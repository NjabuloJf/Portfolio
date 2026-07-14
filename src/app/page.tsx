/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
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
import { ArrowUpRight, MessageCircle, Search, X, Rocket, Music, CheckCircle, Download, Smartphone, X as CloseIcon } from "lucide-react";
import { MusicPlayer } from "@/components/music-player";
import { ImageCarousel } from "@/components/image-carousel";

const BLUR_FADE_DELAY = 0.04;

// Loading Screen
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      {/* Round Avatar with Verified Badge */}
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

// 🆕 Install App Notification Component
function InstallAppNotification() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      setIsMobile(true);
    }

    // Check if already installed (PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      setIsVisible(false);
    }

    // Check if notification was dismissed
    const dismissed = localStorage.getItem('install-notification-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('install-notification-dismissed', 'true');
  };

  if (!isVisible || !isMobile || isInstalled) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-bottom-4">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Smartphone className="size-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold text-sm">Install Njabulo Jb App</h4>
            <p className="text-white/80 text-xs mt-1">
              Get the best experience with our Android app
            </p>
            <div className="flex gap-2 mt-2">
              <a
                href="/downloads/Njabulo-Jb.apk"
                download
                className="px-3 py-1.5 bg-white text-purple-600 rounded-lg text-xs font-medium hover:bg-white/90 transition-colors"
              >
                <Download className="size-3 inline mr-1" />
                Download APK
              </a>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs hover:bg-white/30 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-white/60 hover:text-white">
            <CloseIcon className="size-4" />
          </button>
        </div>
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
      {/* Music Button */}
      <button
        onClick={onOpenMusic}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 group shadow-lg backdrop-blur-sm"
        aria-label="Open Music Player"
      >
        <Music className="size-5 text-green-500 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-green-600 hidden sm:inline">Music Player</span>
      </button>
      
      {/* Download APK Button */}
      <a
        href="/downloads/Njabulo-Jb.apk"
        download
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group shadow-lg backdrop-blur-sm"
        aria-label="Download APK"
      >
        <Smartphone className="size-5 text-blue-500 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-blue-600 hidden sm:inline">Download APK</span>
      </a>
      
      {/* Projects Button */}
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

const carouselImages = [
  { src: "/images/image1.png", alt: "Njabulo Jb Project 1", link: "/business" },
  { src: "/images/image2.png", alt: "Njabulo Jb Project 2", link: "https://github.com/NjabuloJf/Njabulo-Jb" },
  { src: "images/image3.png", alt: "Njabulo Jb Project 3", link: "https://github.com/NjabuloJf/GWM-XMD" },
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

      {/* Hero Section */}
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

      {/* Image Carousel Section */}
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

      {/* About Section */}
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

      {/* Work Section */}
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

      {/* Education Section */}
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

      {/* Skills Section */}
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

      {/* Projects Section */}
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <SectionHeader title="ᴘʀᴏᴊᴇᴄᴛs" id="projects" />
          <ProjectsSection />
        </BlurFade>
      </section>

      {/* Hackathons Section */}
      <section id="ʜᴀᴄᴋᴀᴛʜᴏɴ">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>

      {/* 🆕 Install App Notification */}
      <InstallAppNotification />

      <BottomButtons onOpenMusic={() => setIsMusicPlayerOpen(true)} />

      {searchQuery && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs shadow-lg z-50">
          🔍 Searching: "{searchQuery}"
        </div>
      )}
    </main>
  );
        }
