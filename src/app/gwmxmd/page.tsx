import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { ButtonPair } from "@/components/button-pair";
import { GWMXFeatures } from "@/components/gwm-features";

export const metadata: Metadata = {
  title: "GWM-XMD | WhatsApp Bot",
  description: "GWM-XMD WhatsApp Bot - Advanced WhatsApp bot with AI, games, group management, and deployment features.",
  openGraph: {
    title: "GWM-XMD WhatsApp Bot",
    description: "Deploy your own WhatsApp bot with AI capabilities, media downloader, and group management tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GWM-XMD WhatsApp Bot",
    description: "Deploy your own WhatsApp bot with AI capabilities.",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function GWMXMPage() {
  return (
    <section id="gwmxmd">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          ɢᴡᴍ-xᴍᴅ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ 
          <span className="ml-2 bg-primary/10 border border-primary/20 rounded-md px-2 py-1 text-primary text-sm">v2.0.0</span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Advanced WhatsApp bot with AI, games, and group management features. Easy deployment to Heroku, Render, and more.
        </p>
      </BlurFade>

      {/* Interactive Components */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <ButtonPair />
        <GWMXFeatures />
      </BlurFade>

      {/* Quick Start Guide */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mt-8 p-6 border border-border rounded-xl bg-card/30">
          <h2 className="text-lg font-semibold mb-4">ǫᴜɪᴄᴋ sᴛᴀʀᴛ ɢᴜɪᴅᴇ</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
              <div>
                <p className="font-medium">Copy or Download .env file</p>
                <p className="text-sm text-muted-foreground">Get the environment template with all configuration options</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
              <div>
                <p className="font-medium">Configure your settings</p>
                <p className="text-sm text-muted-foreground">Add your API keys, bot number, and feature preferences</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
              <div>
                <p className="font-medium">Deploy to your preferred platform</p>
                <p className="text-sm text-muted-foreground">One-click deploy to Heroku, Render, or self-host</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
              <div>
                <p className="font-medium">Set up UptimeRobot monitoring</p>
                <p className="text-sm text-muted-foreground">Keep your bot running 24/7 with free monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Documentation Links */}
      <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link
            href="/docs/gwmxmd/setup"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            Documentation
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/docs/gwmxmd/commands"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            Commands List
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/docs/gwmxmd/api"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            API Reference
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </BlurFade>
    </section>
  );
              }
