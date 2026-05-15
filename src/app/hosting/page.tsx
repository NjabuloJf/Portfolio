"use client";

import { useState, useEffect } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { HostingButtons } from "@/components/hosting-buttons";
import { HostingTerminal } from "@/components/hosting-terminal";
import { HostingBotManager } from "@/components/hosting-bot-manager";
import { AlertCircle, CheckCircle, Server, Database, Shield, Bot } from "lucide-react";

// Define types
interface BotConfig {
  prefix: string;
  mode: string;
  ownerName: string;
  ownerNumber: string;
  autoRead: boolean;
  autoTyping: boolean;
  autoRecording: boolean;
  alwaysOnline: boolean;
  autoReact: boolean;
  antiDelete: boolean;
  autoStatusSeen: boolean;
  autoStatusReply: boolean;
  statusReadMsg: string;
  autoBlock: boolean;
  rejectCall: boolean;
}

interface Bot {
  id: number;
  name: string;
  sessionId: string;
  status: "running" | "stopped" | "loading";
  deployedAt: string;
  config: BotConfig;
}

export default function HostingPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [appJsonConfig, setAppJsonConfig] = useState<any>(null);

  // Load bots from localStorage on mount
  useEffect(() => {
    try {
      const savedBots = localStorage.getItem("gwm-xmd-bots");
      if (savedBots) {
        const parsed = JSON.parse(savedBots);
        if (Array.isArray(parsed) && parsed.length <= 10) {
          setBots(parsed);
        } else {
          setError("Maximum 10 bots allowed. Please remove some bots first.");
        }
      }
      
      // Load app.json config
      loadAppJsonConfig();
    } catch (err) {
      setError("Failed to load bot data");
    }
  }, []);

  const loadAppJsonConfig = async () => {
    try {
      const response = await fetch("https://api.github.com/repos/NjabuloJf/GWM-XMD/contents/app.json");
      if (response.ok) {
        const data = await response.json();
        const appJsonContent = atob(data.content);
        const appJson = JSON.parse(appJsonContent);
        setAppJsonConfig(appJson);
      }
    } catch (err) {
      console.error("Failed to load app.json", err);
    }
  };

  return (
    <section id="hosting" className="pb-12">
      <BlurFade delay={0.04}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            GWM-XMD Bot Hosting
            <span className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md px-2 py-1 text-sm">Deploy & Manage</span>
          </h1>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-green-500/10 text-green-600 border border-green-500/20">
              <Bot className="size-3" />
              {bots.filter(b => b.status === "running").length}/{bots.length} Active
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Deploy your GWM-XMD WhatsApp bot directly from app.json. Manage sessions, view logs, and keep your bot alive 24/7.
        </p>
      </BlurFade>

      {/* Error Display */}
      {error && (
        <BlurFade delay={0.08}>
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
            <AlertCircle className="size-4 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-600">Error</p>
              <p className="text-xs text-red-600/80">{error}</p>
            </div>
          </div>
        </BlurFade>
      )}

      {/* Success Message */}
      {bots.length > 0 && bots.length < 10 && (
        <BlurFade delay={0.08}>
          <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-2">
            <CheckCircle className="size-4 text-green-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-600">System Ready</p>
              <p className="text-xs text-green-600/80">You have {bots.length} bot(s) deployed. Maximum 10 bots allowed.</p>
            </div>
          </div>
        </BlurFade>
      )}

      {/* Main Controls */}
      <BlurFade delay={0.12}>
        <HostingButtons bots={bots} setBots={setBots} setError={setError} appJsonConfig={appJsonConfig} />
      </BlurFade>

      {/* Bot Manager */}
      <BlurFade delay={0.16}>
        <HostingBotManager bots={bots} setBots={setBots} setError={setError} />
      </BlurFade>

      {/* Terminal Logs */}
      <BlurFade delay={0.2}>
        <HostingTerminal />
      </BlurFade>

      {/* Info Footer */}
      <BlurFade delay={0.24}>
        <div className="mt-8 p-4 border-t border-border text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="size-3" />
            <span>GWM-XMD Bot | Session ID encoded in Base64 | Max 10 bots per account</span>
            <Database className="size-3" />
          </div>
        </div>
      </BlurFade>
    </section>
  );
              }
