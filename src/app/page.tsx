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
import { ArrowUpRight, MessageCircle, Search, X, Rocket, Music } from "lucide-react";
import { MusicPlayer } from "@/components/music-player";
import { ImageCarousel } from "@/components/image-carousel";

const BLUR_FADE_DELAY = 0.04;

// Loading Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-green-500/30" />
        <div className="relative bg-green-500 rounded-full p-6 shadow-lg">
          <MessageCircle className="size-12 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-foreground">
        Njabulo Jb
      </h2>
      <p className="text-sm text-muted-foreground mb-4">Loading...</p>
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
    <div className="relative w-full max-w-md mx-auto mb-8">
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

// Bottom Buttons Component (Only Song and Rocket)
function BottomButtons({ onOpenMusic }: { onOpenMusic: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
      {/* Music Button */}
      <button
        onClick={onOpenMusic}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 group"
        aria-label="Open Music Player"
      >
        <Music className="size-4 text-green-500 group-hover:scale-110 transition-transform" />
        <span className="text-xs text-green-600 hidden sm:inline">Music</span>
      </button>
      
      {/* Rocket - Projects Button */}
      <button
        onClick={scrollToProjects}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 transition-all duration-300 group"
        aria-label="Go to Projects"
      >
        <Rocket className="size-4 text-orange-500 group-hover:scale-110 group-hover:-translate-y-1 transition-transform" />
        <span className="text-xs text-orange-600 hidden sm:inline">Projects</span>
      </button>
    </div>
  );
}

// 5 Images from public folder - Replace with your actual image names
// Place your images in /public/images/ folder
const carouselImages = [
  {
    src: "/images/image1.png",
    alt: "Njabulo Jb Project 1",
    link: "https://github.com/NjabuloJf/GWM-XMD",
    onClick: () => console.log("Image 1 clicked")
  },
  {
    src: "/images/image2.png",
    alt: "Njabulo Jb Project 2",
    link: "https://github.com/NjabuloJf/njabulo-bot",
    onClick: () => console.log("Image 2 clicked")
  },
  {
    src: "/images/image3.png",
    alt: "Njabulo Jb Project 3",
    link: "https://github.com/NjabuloJf/Portfolio",
    onClick: () => console.log("Image 3 clicked")
  },
  {
    src: "/images/image4.png",
    alt: "Njabulo Jb Project 4",
    link: "https://t.me/njabulojbbot",
    onClick: () => console.log("Image 4 clicked")
  },
  {
    src: "/images/image5.png",
    alt: "Njabulo Jb Project 5",
    link: "https://wa.me/27791234567",
    onClick: () => console.log("Image 5 clicked")
  }
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
    <main className="min-h-dvh flex flex-col gap-14 relative pb-20">
      {/* Music Player */}
      <MusicPlayer isOpen={isMusicPlayerOpen} onClose={() => setIsMusicPlayerOpen(false)} />

      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm py-4 border-b border-border">
        <SearchBar onSearch={setSearchQuery} searchQuery={searchQuery} />
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-[calc(100vh-200px)] flex items-center">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Image Carousel Section - Rectangular Images */}
      <section id="carousel" className="py-8">
        <div className="container mx-auto px-4">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-2xl font-bold text-center mb-6">My Projects Gallery</h2>
            <p className="text-center text-muted-foreground mb-8">
              Click on any image to view the project
            </p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
            <ImageCarousel images={carouselImages} autoScrollInterval={4000} />
          </BlurFade>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
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
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
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
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">{education.degree}</div>
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
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain" />}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>

      {/* Hackathons Section */}
      <section id="hackathons">
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

      {/* Bottom Buttons */}
      <BottomButtons onOpenMusic={() => setIsMusicPlayerOpen(true)} />

      {/* Search Indicator */}
      {searchQuery && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs shadow-lg z-50">
          🔍 Searching: "{searchQuery}"
        </div>
      )}
    </main>
  );
        }
