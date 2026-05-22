import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Github, Star, GitFork, Users, Bot, Code, Cloud, Shield, Zap } from "lucide-react";
import { ButtonsUiPairs } from "@/components/buttonsui-pairs";
import { NjabuloUiFeatures } from "@/components/njabuloui-features";

export const metadata: Metadata = {
  title: "Njabulo UI Bot | Code & Deployment Assistant",
  description: "Njabulo UI Bot - Advanced code generation, deployment helper, and bot development tools with premium features.",
  openGraph: {
    title: "Njabulo UI Bot",
    description: "Code generation, deployment helper, and bot development tools with 24/7 support.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Njabulo UI Bot",
    description: "Code generator and deployment assistant.",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function NjabuloUiBotPage() {
  return (
    <section id="njabulo-uibot">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            ɴᴊᴀʙᴜʟᴏ UI ʙᴏᴛ
            <span className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md px-2 py-1 text-sm">ᴄᴏᴅᴇ & ᴅᴇᴘʟᴏʏ v1.0.0</span>
          </h1>
          <div className="flex gap-2">
            <Link 
              href="https://github.com/NjabuloJf/njabulo-ui-bot" 
              target="_blank"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-card border border-border hover:bg-accent/50"
            >
              <Github className="size-3" />
              <span>Star</span>
            </Link>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Advanced code generation, deployment helper, and bot development tools.
          Generate React components, deploy to cloud platforms, and create WhatsApp/Telegram bots with ease.
        </p>
      </BlurFade>

      {/* Stats Section */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Code className="size-5 mx-auto mb-1 text-purple-500" />
            <p className="text-lg font-bold">50+</p>
            <p className="text-xs text-muted-foreground">Code Templates</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Cloud className="size-5 mx-auto mb-1 text-blue-500" />
            <p className="text-lg font-bold">4+</p>
            <p className="text-xs text-muted-foreground">Platforms</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Bot className="size-5 mx-auto mb-1 text-green-500" />
            <p className="text-lg font-bold">2+</p>
            <p className="text-xs text-muted-foreground">Bot Types</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Users className="size-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">1K+</p>
            <p className="text-xs text-muted-foreground">Users</p>
          </div>
        </div>
      </BlurFade>

      {/* Buttons Pairs Component */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <ButtonsUiPairs />
      </BlurFade>

      {/* Features Component */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.8}>
        <NjabuloUiFeatures />
      </BlurFade>

      {/* Quick Start Guide */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mt-8 p-6 border border-border rounded-xl bg-gradient-to-br from-primary/5 to-transparent">
          <h2 className="text-lg font-semibold mb-4">🚀 ǫᴜɪᴄᴋ sᴛᴀʀᴛ ɢᴜɪᴅᴇ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                <div>
                  <p className="font-medium">Copy Environment Variables</p>
                  <p className="text-sm text-muted-foreground">Get the .env template with all configuration options</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                <div>
                  <p className="font-medium">Download Source Code</p>
                  <p className="text-sm text-muted-foreground">Get the complete bot package as ZIP file</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
                <div>
                  <p className="font-medium">Generate Code</p>
                  <p className="text-sm text-muted-foreground">Create React components, API routes, and more</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
                <div>
                  <p className="font-medium">Deploy to Cloud</p>
                  <p className="text-sm text-muted-foreground">One-click deploy to Heroku, Render, or Vercel</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">5</span>
                <div>
                  <p className="font-medium">Set Up Monitoring</p>
                  <p className="text-sm text-muted-foreground">Keep your bot alive with UptimeRobot</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">6</span>
                <div>
                  <p className="font-medium">Start Building</p>
                  <p className="text-sm text-muted-foreground">Use the tools and features to build your project</p>
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
            href="/docs/njabulo-uibot/setup"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Documentation
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/docs/njabulo-uibot/commands"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            API Reference
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/docs/njabulo-uibot/examples"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            Code Examples
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="https://github.com/NjabuloJf/njabulo-ui-bot"
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
            ⚡ Njabulo UI Bot | Code Generation | Deployment Helper | 24/7 Support | Free to Use
          </p>
        </div>
      </BlurFade>
    </section>
  );
        }
