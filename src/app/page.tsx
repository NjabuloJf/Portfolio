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
import { ArrowUpRight, MessageCircle, Search, X } from "lucide-react";

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
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
}

// Rest of your wrapper components (WorkSectionWithSearch, ProjectsSectionWithSearch, etc.)
// ... (keep all the wrapper functions from previous code)

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
      {/* SEARCH BAR - This should be visible */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm py-4 border-b border-border">
        <SearchBar onSearch={setSearchQuery} searchQuery={searchQuery} />
      </div>

      <section id="hero">
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

      {/* About Section */}
      {(!searchQuery || (DATA.summary && DATA.summary.toLowerCase().includes(searchQuery.toLowerCase()))) && (
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
      )}

      {/* Skills Section - Easy to test search */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills
              .filter(skill => 
                !searchQuery || 
                skill.name?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((skill, id) => (
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

      {/* Contact Section */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
      }
