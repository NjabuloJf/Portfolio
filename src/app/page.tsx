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
      {/* WhatsApp Icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-green-500/30" />
        <div className="relative bg-green-500 rounded-full p-6 shadow-lg">
          <MessageCircle className="size-12 text-white" />
        </div>
      </div>
      
      {/* Loading Text */}
      <h2 className="text-2xl font-semibold mb-2 text-foreground">
        Njabulo Jb
      </h2>
      <p className="text-sm text-muted-foreground mb-4">Loading...</p>
      
      {/* Green Loading Line */}
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full animate-loading-line" />
      </div>
      
      <style jsx>{`
        @keyframes loading-line {
          0% {
            width: 0%;
            opacity: 1;
          }
          50% {
            width: 100%;
            opacity: 1;
          }
          100% {
            width: 0%;
            opacity: 0;
          }
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
  const clearSearch = () => {
    onSearch("");
  };

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
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
}

// Wrapper component for WorkSection with search filtering
function WorkSectionWithSearch({ searchQuery }: { searchQuery: string }) {
  if (!searchQuery) {
    return <WorkSection />;
  }

  const filteredWork = DATA.work.filter(work => 
    work.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredWork.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No work experience found for "{searchQuery}"
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {filteredWork.map((work, id) => (
        <BlurFade key={work.company} delay={0.05 * id}>
          <Link
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 group"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold leading-none flex items-center gap-2">
                {work.title}
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {work.company}
              </div>
              <div className="text-sm text-muted-foreground/80 mt-2 line-clamp-2">
                {work.description}
              </div>
            </div>
            <div className="text-xs tabular-nums text-muted-foreground shrink-0">
              {work.start} - {work.end}
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}

// Wrapper component for ProjectsSection with search filtering (fixed - no 'tech' property)
function ProjectsSectionWithSearch({ searchQuery }: { searchQuery: string }) {
  if (!searchQuery) {
    return <ProjectsSection />;
  }

  // Filter projects based on title and description only (since tech property doesn't exist)
  const filteredProjects = DATA.projects?.filter(project => 
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredProjects?.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No projects found for "{searchQuery}"
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredProjects?.map((project, id) => (
        <BlurFade key={project.title} delay={0.05 * id}>
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-border rounded-lg hover:bg-accent/50 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </h3>
                {project.dates && (
                  <p className="text-xs text-muted-foreground mt-1">{project.dates}</p>
                )}
                <p className="text-sm text-muted-foreground/80 mt-2">{project.description}</p>
                {project.active !== undefined && (
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-2 ${project.active ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-600'}`}>
                    {project.active ? 'Active' : 'Inactive'}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}

// Wrapper component for HackathonsSection with search filtering
function HackathonsSectionWithSearch({ searchQuery }: { searchQuery: string }) {
  if (!searchQuery) {
    return <HackathonsSection />;
  }

  const filteredHackathons = DATA.hackathons?.filter(hackathon => 
    hackathon.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hackathon.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hackathon.organization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredHackathons?.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hackathons found for "{searchQuery}"
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {filteredHackathons?.map((hackathon, id) => (
        <BlurFade key={hackathon.name} delay={0.05 * id}>
          <Link
            href={hackathon.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-border rounded-lg hover:bg-accent/50 transition-all group"
          >
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  {hackathon.name}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{hackathon.organization}</p>
                <p className="text-sm text-muted-foreground/80 mt-2">{hackathon.description}</p>
              </div>
              <div className="text-xs tabular-nums text-muted-foreground">
                {hackathon.date}
              </div>
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate loading time
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
      {/* Search Bar */}
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

      {(!searchQuery || (DATA.summary && DATA.summary.toLowerCase().includes(searchQuery.toLowerCase()))) && (
        <section id="about">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-xl font-bold">About</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
                <Markdown>
                  {DATA.summary}
                </Markdown>
              </div>
            </BlurFade>
          </div>
        </section>
      )}

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Work Experience</h2>
              {searchQuery && (
                <span className="text-xs text-muted-foreground">
                  Filtered by: "{searchQuery}"
                </span>
              )}
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSectionWithSearch searchQuery={searchQuery} />
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education
              .filter(education => 
                !searchQuery || 
                education.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                education.degree?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((education, index) => (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + index * 0.05}
                >
                  <Link
                    href={education.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-3 justify-between group"
                  >
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      {education.logoUrl ? (
                        <img
                          src={education.logoUrl}
                          alt={education.school}
                          className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                        />
                      ) : (
                        <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold leading-none flex items-center gap-2">
                          {education.school}
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                        </div>
                        <div className="font-sans text-sm text-muted-foreground">
                          {education.degree}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                      <span>
                        {education.start} - {education.end}
                      </span>
                    </div>
                  </Link>
                </BlurFade>
              ))}
          </div>
        </div>
      </section>

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
          {searchQuery && DATA.skills.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              No skills found for "{searchQuery}"
            </p>
          )}
        </div>
      </section>

      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Projects</h2>
            {searchQuery && (
              <span className="text-xs text-muted-foreground">
                Filtered by: "{searchQuery}"
              </span>
            )}
          </div>
          <ProjectsSectionWithSearch searchQuery={searchQuery} />
        </BlurFade>
      </section>

      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Hackathons</h2>
            {searchQuery && (
              <span className="text-xs text-muted-foreground">
                Filtered by: "{searchQuery}"
              </span>
            )}
          </div>
          <HackathonsSectionWithSearch searchQuery={searchQuery} />
        </BlurFade>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>

      {/* Search Results Summary */}
      {searchQuery && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs shadow-lg z-50">
          🔍 Searching: "{searchQuery}"
        </div>
      )}
    </main>
  );
        }
