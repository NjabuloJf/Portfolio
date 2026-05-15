"use client";

import { useState } from "react";
import { 
  Bot, Play, Pause, Trash2, Link, RefreshCw, AlertTriangle, Edit,
  Eye, Loader2, Settings, CheckCircle
} from "lucide-react";

interface BotConfig {
  sessionId: string;
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

interface HostingBotManagerProps {
  bots: Bot[];
  setBots: (bots: Bot[]) => void;
  setError: (error: string | null) => void;
}

export function HostingBotManager({ bots, setBots, setError }: HostingBotManagerProps) {
  const [selectedBot, setSelectedBot] = useState<number | null>(null);
  const [editingBot, setEditingBot] = useState<number | null>(null);

  const addTerminalLog = (message: string, type: "success" | "error" | "info" = "info") => {
    const logs = localStorage.getItem("gwm-xmd-logs") || "[]";
    const logsArray = JSON.parse(logs);
    logsArray.unshift({
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
      type
    });
    const trimmedLogs = logsArray.slice(0, 200);
    localStorage.setItem("gwm-xmd-logs", JSON.stringify(trimmedLogs));
    window.dispatchEvent(new Event("gwm-xmd-logs-updated"));
  };

  const startBot = (id: number) => {
    const bot = bots.find(b => b.id === id);
    if (!bot) return;
    
    addTerminalLog(`🚀 Starting bot: ${bot.name}...`, "info");
    
    const loadingBots = bots.map(b => 
      b.id === id ? { ...b, status: "loading" as const } : b
    );
    localStorage.setItem("gwm-xmd-bots", JSON.stringify(loadingBots));
    setBots(loadingBots);
    
    setTimeout(() => {
      const runningBots = loadingBots.map(b => 
        b.id === id ? { ...b, status: "running" as const } : b
      );
      localStorage.setItem("gwm-xmd-bots", JSON.stringify(runningBots));
      setBots(runningBots);
      addTerminalLog(`✅ Bot ${bot.name} is now ACTIVE`, "success");
      addTerminalLog(`📱 Check WhatsApp > Linked Devices`, "info");
    }, 60000);
  };

  const stopBot = (id: number) => {
    const bot = bots.find(b => b.id === id);
    if (!bot) return;
    
    const updatedBots = bots.map(b => 
      b.id === id ? { ...b, status: "stopped" as const } : b
    );
    localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
    setBots(updatedBots);
    addTerminalLog(`🛑 Bot ${bot.name} stopped`, "info");
  };

  const deleteBot = (id: number) => {
    const bot = bots.find(b => b.id === id);
    if (!bot) return;
    
    if (confirm(`⚠️ Are you sure you want to delete ${bot.name}? This action cannot be undone!`)) {
      const updatedBots = bots.filter(b => b.id !== id);
      localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
      setBots(updatedBots);
      addTerminalLog(`🗑️ Bot deleted: ${bot.name}`, "error");
    }
  };

  const editBotConfig = (bot: Bot) => {
    setEditingBot(bot.id);
    const configStr = JSON.stringify({
      prefix: bot.config.prefix,
      mode: bot.config.mode,
      ownerName: bot.config.ownerName,
      ownerNumber: bot.config.ownerNumber,
      autoRead: bot.config.autoRead,
      autoTyping: bot.config.autoTyping,
      autoRecording: bot.config.autoRecording,
      alwaysOnline: bot.config.alwaysOnline,
      autoReact: bot.config.autoReact,
      antiDelete: bot.config.antiDelete,
      autoStatusSeen: bot.config.autoStatusSeen,
      autoStatusReply: bot.config.autoStatusReply,
      statusReadMsg: bot.config.statusReadMsg,
      autoBlock: bot.config.autoBlock,
      rejectCall: bot.config.rejectCall,
    }, null, 2);
    
    const newConfig = prompt(`Edit configuration for ${bot.name}:`, configStr);
    if (newConfig) {
      try {
        const parsedConfig = JSON.parse(newConfig);
        const updatedBots = bots.map(b => 
          b.id === bot.id ? { 
            ...b, 
            config: { ...b.config, ...parsedConfig }
          } : b
        );
        localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
        setBots(updatedBots);
        setEditingBot(null);
        addTerminalLog(`✏️ Bot ${bot.name} configuration updated`, "success");
      } catch (err) {
        setError("Invalid JSON configuration");
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "running": return <div className="size-2 rounded-full bg-green-500 animate-pulse" />;
      case "loading": return <Loader2 className="size-3 text-yellow-500 animate-spin" />;
      default: return <div className="size-2 rounded-full bg-red-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "running": return "Active";
      case "loading": return "Loading (1 min)";
      default: return "Stopped";
    }
  };

  if (bots.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
        <Bot className="size-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-1">No Bots Deployed</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your Session ID above and click "Deploy GWM-XMD Bot"
        </p>
        <div className="text-xs text-muted-foreground">
          Maximum 10 bots allowed per account | Repository: NjabuloJf/GWM-XMD
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Bot className="size-5" />
        Deployed Bots ({bots.length}/10)
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {bots.map((bot) => (
          <div key={bot.id} className="border border-border rounded-lg p-4 bg-card/30 hover:bg-card/50 transition-colors">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(bot.status)}
                <h3 className="font-semibold">{bot.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  bot.status === "running" ? "bg-green-500/10 text-green-600" :
                  bot.status === "loading" ? "bg-yellow-500/10 text-yellow-600" :
                  "bg-red-500/10 text-red-600"
                }`}>
                  {getStatusText(bot.status)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Deployed: {new Date(bot.deployedAt).toLocaleString()}
              </div>
            </div>

            {/* Bot Info */}
            <div className="mb-3 p-2 bg-accent/20 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Owner:</span>
                  <span>{bot.config.ownerName} ({bot.config.ownerNumber})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Mode:</span>
                  <span className="capitalize">{bot.config.mode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Prefix:</span>
                  <span className="font-mono">{bot.config.prefix}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Auto Status:</span>
                  <span>{bot.config.autoStatusSeen ? "✅ Enabled" : "❌ Disabled"}</span>
                </div>
              </div>
            </div>

            {/* Config Preview */}
            <div className="mb-3 text-xs">
              <details>
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                  <
