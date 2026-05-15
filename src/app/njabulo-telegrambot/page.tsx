import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Telegram, Send, Users, MessageCircle, Bot, Zap, Shield, Database } from "lucide-react";
import { ButtonstPairst } from "@/components/buttonst-pairst";
import { NjabuloTelegramFeatures } from "@/components/njabulotelegram-features";

export const metadata: Metadata = {
  title: "Njabulo-Jb Telegram Bot | Multi-Platform Bot",
  description: "Njabulo-Jb Telegram Bot - Advanced Telegram bot with AI, channel management, group tools, and premium features.",
  openGraph: {
    title: "Njabulo-Jb Telegram Bot",
    description: "Deploy your own Telegram bot with advanced features, AI capabilities, and 24/7 uptime.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Njabulo-Jb Telegram Bot",
    description: "Multi-platform bot for Telegram with premium features.",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function NjabuloTelegramBotPage() {
  return (
    <section id="njabulo-telegrambot">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Njabulo-Jb Telegram Bot 
            <span className="ml-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md px-2 py-1 text-sm">Telegram v1.0.0</span>
          </h1>
          <div className="flex gap-2">
            <Link 
              href="https://t.me/njabulojbbot" 
              target="_blank"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500/20"
            >
              <Telegram className="size-3" />
              <span>@njabulojbbot</span>
            </Link>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Advanced Telegram bot with AI, channel management, group tools, and premium features. 
          Perfect for managing Telegram communities with 24/7 automation.
        </p>
      </BlurFade>

      {/* Stats Section */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Users className="size-5 mx-auto mb-1 text-blue-500" />
            <p className="text-lg font-bold">5K+</p>
            <p className="text-xs text-muted-foreground">Active Chats</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <MessageCircle className="size-5 mx-auto mb-1 text-blue-500" />
            <p className="text-lg font-bold">100+</p>
            <p className="text-xs text-muted-foreground">Commands</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Send className="size-5 mx-auto mb-1 text-blue-500" />
            <p className="text-lg font-bold">1M+</p>
            <p className="text-xs text-muted-foreground">Messages/mo</p>
          </div>
          <div className="p-3 border border-border rounded-lg text-center bg-card/30">
            <Bot className="size-5 mx-auto mb-1 text-blue-500" />
            <p className="text-lg font-bold">24/7</p>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
        </div>
      </BlurFade>

      {/* Buttons Pairs Component */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <ButtonstPairst />
      </BlurFade>

      {/* Features Component */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.8}>
        <NjabuloTelegramFeatures />
      </BlurFade>

      {/* Telegram Group & Channel Section */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mt-8 p-6 border border-border rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="size-5 text-blue-500" />
            Join Our Telegram Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telegram Group */}
            <div className="p-4 border border-border rounded-lg bg-card/50 hover:bg-accent/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <Users className="size-6 text-blue-500" />
                <h3 className="font-semibold">Telegram Group</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Join our community group for support, updates, and discussions about Njabulo-Jb Bot.
              </p>
              <Link
                href="https://t.me/njabulojbgroup"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors w-full justify-center"
              >
                <Users className="size-4" />
                Join Group
              </Link>
            </div>

            {/* Telegram Channel */}
            <div className="p-4 border border-border rounded-lg bg-card/50 hover:bg-accent/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <Send className="size-6 text-cyan-500" />
                <h3 className="font-semibold">Telegram Channel</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our channel for latest news, updates, and announcements.
              </p>
              <Link
                href="https://t.me/njabulojbchannel"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors w-full justify-center"
              >
                <Send className="size-4" />
                Join Channel
              </Link>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Bot Info Message */}
      <BlurFade delay={BLUR_FADE_DELAY * 2.3}>
        <div className="mt-6 p-4 border border-border rounded-xl bg-blue-500/5">
          <div className="flex items-start gap-3">
            <Bot className="size-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">About Njabulo-Jb Telegram Bot</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Njabulo-Jb Telegram Bot is a powerful multi-purpose bot designed for Telegram platforms. 
                It offers AI-powered responses, channel management, group administration, media processing, 
                and much more. Perfect for both small communities and large Telegram channels.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600">AI Chat</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">Group Tools</span>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600">Channel Admin</span>
                <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-600">Media Download</span>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Documentation & Support */}
      <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link
            href="/docs/njabulo-telegrambot/setup"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Documentation
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/docs/njabulo-telegrambot/commands"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            Commands List
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/docs/njabulo-telegrambot/api"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            API Reference
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="https://github.com/njabulojs/njabulo-telegram-bot"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            GitHub Repository
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </BlurFade>

      {/* Footer */}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="mt-8 text-center p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            🤖 Njabulo-Jb Telegram Bot | Multi-Platform Support | 24/7 Active | Regular Updates | Premium Features
          </p>
        </div>
      </BlurFade>
    </section>
  );
              }
