"use client";

import { useState } from "react";
import { 
  Bot, Play, Pause, Trash2, Settings, Copy, Check,
  QrCode, Link, RefreshCw, AlertTriangle, Edit,
  Eye, Terminal, Zap
} from "lucide-react";

// Define proper types
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
  status: "running" | "stopped";
  deployedAt: string;
  config: BotConfig;
}

interface HostingBotManagerProps {
  bots: Bot[];
  setBots: (bots: Bot[]) => void;
  setError: (error: string | null) => void;
}

export function HostingBotManager({ bots, setBots, setError }: HostingBotManagerProps) {
  const [copiedSessionId, setCopiedSessionId] = useState<number | null>(null);
  const [selectedBot, setSelectedBot] = useState<number | null>(null);

  const copySessionId = async (id: number, sessionId: string) => {
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopiedSessionId(id);
      setTimeout(() => setCopiedSessionId(null), 2000);
    } catch (err) {
      setError("Failed to copy session ID");
    }
  };

  const startBot = (id: number) => {
    const updatedBots: Bot[] = bots.map(bot => 
      bot.id === id ? { ...bot, status: "running" as const } : bot
    );
    localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
    setBots(updatedBots);
    addTerminalLog(`🚀 Bot ${bots.find(b => b.id === id)?.name} started`);
  };

  const stopBot = (id: number) => {
    const updatedBots: Bot[] = bots.map(bot => 
      bot.id === id ? { ...bot, status: "stopped" as const } : bot
    );
    localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
    setBots(updatedBots);
    addTerminalLog(`🛑 Bot ${bots.find(b => b.id === id)?.name} stopped`);
  };

  const deleteBot = (id: number) => {
    if (confirm("⚠️ Are you sure you want to delete this bot? This action cannot be undone!")) {
      const updatedBots: Bot[] = bots.filter(bot => bot.id !== id);
      localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
      setBots(updatedBots);
      addTerminalLog(`🗑️ Bot deleted: ${bots.find(b => b.id === id)?.name}`);
    }
  };

  const editBot = (bot: Bot) => {
    setSelectedBot(bot.id);
    const newConfig = prompt("Edit bot configuration (JSON format):", JSON.stringify(bot.config, null, 2));
    if (newConfig) {
      try {
        const parsedConfig = JSON.parse(newConfig) as BotConfig;
        const updatedBots: Bot[] = bots.map(b => 
          b.id === bot.id ? { ...b, config: parsedConfig } : b
        );
        localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
        setBots(updatedBots);
        setSelectedBot(null);
        addTerminalLog(`✏️ Bot ${bot.name} configuration updated`);
      } catch (err) {
        setError("Invalid JSON configuration");
      }
    }
  };

  const addTerminalLog = (message: string) => {
    const logs = localStorage.getItem("gwm-xmd-logs") || "[]";
    const logsArray = JSON.parse(logs);
    logsArray.unshift({
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
      type: message.includes("✅") || message.includes("🚀") ? "success" : 
             message.includes("❌") || message.includes("⚠️") ? "error" : "info"
    });
    const trimmedLogs = logsArray.slice(0, 100);
    localStorage.setItem("gwm-xmd-logs", JSON.stringify(trimmedLogs));
    window.dispatchEvent(new Event("gwm-xmd-logs-updated"));
  };

  const viewSessionDetails = (bot: Bot) => {
    try {
      const decoded = atob(bot.sessionId);
      alert(`Session Details:\n\nEncoded: ${bot.sessionId.substring(0, 50)}...\nDecoded: ${decoded}`);
    } catch {
      alert(`Session ID: ${bot.sessionId}`);
    }
  };

  if (bots.length === 0) {
    return (
      <div className="p-8 border border-dashed border-border rounded-lg text-center">
        <Bot className="size-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-1">No Bots Deployed</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click "Deploy New Bot from app.json" to get started
        </p>
        <div className="text-xs text-muted-foreground">
          Maximum 10 bots allowed per account
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
                <Bot className={`size-5 ${bot.status === "running" ? "text-green-500" : "text-red-500"}`} />
                <h3 className="font-semibold">{bot.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${bot.status === "running" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                  {bot.status === "running" ? "Active" : "Stopped"}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Deployed: {new Date(bot.deployedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Session ID */}
            <div className="mb-3 p-2 bg-accent/20 rounded-lg">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Link className="size-3 text-muted-foreground" />
                  <span className="text-xs font-mono">
                    Session ID: {bot.sessionId.substring(0, 30)}...
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => copySessionId(bot.id, bot.sessionId)}
                    className="p-1 hover:bg-accent rounded transition-colors"
                    title="Copy full session ID"
                  >
                    {copiedSessionId === bot.id ? <Check className="size-3 text-green-500" /> : <Copy className="size-3" />}
                  </button>
                  <button
                    onClick={() => viewSessionDetails(bot)}
                    className="p-1 hover:bg-accent rounded transition-colors"
                    title="View session details"
                  >
                    <Eye className="size-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Config Preview */}
            <div className="mb-3 text-xs">
              <details>
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                  Configuration (from app.json)
                </summary>
                <pre className="mt-2 p-2 bg-black/50 rounded overflow-x-auto text-muted-foreground">
                  {JSON.stringify(bot.config, null, 2)}
                </pre>
              </details>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {bot.status === "stopped" ? (
                <button
                  onClick={() => startBot(bot.id)}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  <Play className="size-3" />
                  Start
                </button>
              ) : (
                <button
                  onClick={() => stopBot(bot.id)}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  <Pause className="size-3" />
                  Stop
                </button>
              )}
              <button
                onClick={() => editBot(bot)}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-border hover:bg-accent"
              >
                <Edit className="size-3" />
                Edit Config
              </button>
              <button
                onClick={() => deleteBot(bot.id)}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-red-500/50 text-red-600 hover:bg-red-500/10"
              >
                <Trash2 className="size-3" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Warning when reaching limit */}
      {bots.length >= 8 && bots.length < 10 && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-2">
          <AlertTriangle className="size-4 text-yellow-500" />
          <p className="text-xs text-yellow-600">
            You have {bots.length}/10 bots. {10 - bots.length} slots remaining.
          </p>
        </div>
      )}

      {bots.length >= 10 && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
          <AlertTriangle className="size-4 text-red-500" />
          <p className="text-xs text-red-600">
            Maximum 10 bots reached. Delete some bots to deploy more.
          </p>
        </div>
      )}
    </div>
  );
}
