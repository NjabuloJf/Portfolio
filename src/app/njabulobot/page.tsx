import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Github, Star, GitFork, Users, Bot } from "lucide-react";
import { ButtonsPairs } from "@/components/buttons-pairs";
import { NjabuloFeatures } from "@/components/njabulo-features";

export const metadata: Metadata = {
  title: "Njabulo-Jb Bot | Multi-Device WhatsApp Bot",
  description: "Njabulo-Jb - Advanced multi-device WhatsApp bot with AI, games, group management, and premium features.",
  openGraph: {
    title: "Njabulo-Jb Multi-Device WhatsApp Bot",
    description: "Deploy your own multi-device WhatsApp bot with advanced features, AI capabilities, and 24/7 uptime.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Njabulo-Jb WhatsApp Bot",
    description: "Multi-device WhatsApp bot with premium features.",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function NjabuloBotPage() {
  return (
    <section id="njabulobot">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">
             ɴᴊᴀʙᴜʟᴏ-ᴊʙ ʙᴏᴛ
            <span className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md px-2 py-1 text-sm">ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ v3.0.0</span>
          </h1>
          <div className="flex gap-2">
            <Link 
              href="https://github.com/NjabuloJf/Njabulo-Jb" 
              target="_blank"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-card border border-border hover:bg-accent/50"
            >
              <Github className="size-3" />
              <span>Star</span>
            </Link>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Advanced multi-device WhatsApp bot with AI, games, group management, and premium features. 
          Supports latest WhatsApp multi-device protocol with 24/7 uptime.
        </p>
      </BlurFade>

      {/* Stats Section */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Users className="size-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">10K+</p>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Github className="size-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">500+</p>
            <p className="text-xs text-muted-foreground">GitHub Stars</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <GitFork className="size-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">200+</p>
            <p className="text-xs text-muted-foreground">Forks</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Bot className="size-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">50+</p>
            <p className="text-xs text-muted-foreground">Commands</p>
          </div>
        </div>
      </BlurFade>

      {/* Buttons Pairs Component */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <ButtonsPairs botName="ɴᴊᴀʙᴜʟᴏ-ᴊʙ" />
      </BlurFade>

      {/* Features Component */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.8}>
        <NjabuloFeatures />
      </BlurFade>

      {/* Quick Start Guide */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mt-8 p-6 border border-border rounded-xl bg-gradient-to-br from-primary/5 to-transparent">
          <h2 className="text-lg font-semibold mb-4">🚀 ǫᴜɪᴄᴋ ᴅᴇᴘʟᴏʏᴍᴇɴᴛ ɢᴜɪᴅᴇ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                <div>
                  <p className="font-medium">Get Environment Variables</p>
                  <p className="text-sm text-muted-foreground">Copy or download .env template with all configurations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                <div>
                  <p className="font-medium">Configure Bot Settings</p>
                  <p className="text-sm text-muted-foreground">Add session ID, owner number, and API keys</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
                <div>
                  <p className="font-medium">Deploy to Cloud</p>
                  <p className="text-sm text-muted-foreground">One-click deploy to Heroku, Render, or Railway</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
                <div>
                  <p className="font-medium">Set Up Monitoring</p>
                  <p className="text-sm text-muted-foreground">Keep bot alive with UptimeRobot or Kaffeine</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
                <div>
                  <p className="font-medium">Scan QR Code</p>
                  <p className="text-sm text-muted-foreground">Connect your WhatsApp account securely</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">6</span>
                <div>
                  <p className="font-medium">Start Using Bot</p>
                  <p className="text-sm text-muted-foreground">Use commands and enjoy auto-reply features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Documentation & Support */}
      <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link
            href="/docs/njabulobot/setup"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Documentation
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/docs/njabulobot/commands"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            Commands List
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/docs/njabulobot/api"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            API Reference
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="https://github.com/NjabuloJf/Njabulo-Jb"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            GitHub Repository
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </BlurFade>

      {/* Support Section */}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="mt-8 text-center p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            ⚡ Njabulo-Jb Bot supports multi-device | 24/7 Active | Regular Updates | Premium Features
          </p>
        </div>
      </BlurFade>
    </section>
  );
              }
