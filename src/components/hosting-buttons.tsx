"use client";

import { useState } from "react";
import { 
  Play, Pause, RefreshCw, Download, Upload, Terminal, 
  Settings, Eye, EyeOff, AlertTriangle, CheckCircle, Loader2,
  Github, Cloud, Server, Zap
} from "lucide-react";

interface HostingButtonsProps {
  bots: any[];
  setBots: (bots: any[]) => void;
  setError: (error: string | null) => void;
}

export function HostingButtons({ bots, setBots, setError }: HostingButtonsProps) {
  const [deploying, setDeploying] = useState(false);
  const [showLogs, setShowLogs] = useState(true);
  const [selectedBot, setSelectedBot] = useState<number | null>(null);

  // Deploy new bot from app.json
  const deployFromAppJson = async () => {
    if (bots.length >= 10) {
      setError("❌ Maximum 10 bots reached. Cannot deploy more.");
      return;
    }

    setDeploying(true);
    setError(null);

    try {
      // Fetch app.json from GitHub
      const response = await fetch("https://api.github.com/repos/NjabuloJf/GWM-XMD/contents/app.json");
      if (!response.ok) throw new Error("Failed to fetch app.json");

      const data = await response.json();
      const appJsonContent = atob(data.content);
      const appJson = JSON.parse(appJsonContent);

      // Create new bot instance
      const newBot = {
        id: Date.now(),
        name: `GWM-XMD-${bots.length + 1}`,
        sessionId: generateSessionId(),
        status: "stopped",
        deployedAt: new Date().toISOString(),
        config: {
          prefix: appJson.env.PREFIX.value || ".",
          mode: appJson.env.MODE.value || "public",
          ownerName: appJson.env.OWNER_NAME.value || "XD JB",
          ownerNumber: appJson.env.OWNER_NUMBER.value || "26777821911",
          autoRead: appJson.env.AUTO_READ.value === "true",
          autoTyping: appJson.env.AUTO_TYPING.value === "true",
          autoRecording: appJson.env.AUTO_RECORDING.value === "true",
          alwaysOnline: appJson.env.ALWAYS_ONLINE.value === "true",
          autoReact: appJson.env.AUTO_REACT.value === "true",
          antiDelete: appJson.env.ANTI_DELETE.value === "true",
          autoStatusSeen: appJson.env.AUTO_STATUS_SEEN.value === "true",
          autoStatusReply: appJson.env.AUTO_STATUS_REPLY.value === "true",
          statusReadMsg: appJson.env.STATUS_READ_MSG.value || "*Status Seen*",
          autoBlock: appJson.env.AUTO_BLOCK.value === "true",
          rejectCall: appJson.env.REJECT_CALL.value === "true",
        }
      };

      // Save to localStorage
      const updatedBots = [...bots, newBot];
      localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
      setBots(updatedBots);
      
      // Add to terminal
      addTerminalLog(`✅ Bot deployed: ${newBot.name}`);
      addTerminalLog(`📱 Session ID: ${newBot.sessionId.substring(0, 20)}...`);
      addTerminalLog(`🔧 Configuration loaded from app.json`);
      
    } catch (err) {
      setError(`Deployment failed: ${err instanceof Error ? err.message : "Unknown error"}`);
      addTerminalLog(`❌ Deployment failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setDeploying(false);
    }
  };

  const generateSessionId = () => {
    // Generate base64 session ID similar to your example
    const sessionData = {
      bot: "GWM-XMD",
      timestamp: Date.now(),
      random: Math.random().toString(36).substring(7)
    };
    return btoa(JSON.stringify(sessionData));
  };

  const addTerminalLog = (message: string) => {
    const logs = localStorage.getItem("gwm-xmd-logs") || "[]";
    const logsArray = JSON.parse(logs);
    logsArray.unshift({
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
      type: message.includes("✅") ? "success" : message.includes("❌") ? "error" : "info"
    });
    // Keep only last 100 logs
    const trimmedLogs = logsArray.slice(0, 100);
    localStorage.setItem("gwm-xmd-logs", JSON.stringify(trimmedLogs));
    
    // Dispatch event for terminal component
    window.dispatchEvent(new Event("gwm-xmd-logs-updated"));
  };

  const startBot = (botId: number) => {
    const updatedBots = bots.map(bot => 
      bot.id === botId ? { ...bot, status: "running" } : bot
    );
    localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
    setBots(updatedBots);
    addTerminalLog(`🚀 Bot ${bots.find(b => b.id === botId)?.name} started`);
  };

  const stopBot = (botId: number) => {
    const updatedBots = bots.map(bot => 
      bot.id === botId ? { ...bot, status: "stopped" } : bot
    );
    localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
    setBots(updatedBots);
    addTerminalLog(`🛑 Bot ${bots.find(b => b.id === botId)?.name} stopped`);
  };

  const deleteBot = (botId: number) => {
    if (confirm("Are you sure you want to delete this bot?")) {
      const updatedBots = bots.filter(bot => bot.id !== botId);
      localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
      setBots(updatedBots);
      addTerminalLog(`🗑️ Bot deleted: ${bots.find(b => b.id === botId)?.name}`);
    }
  };

  const editBotConfig = (botId: number) => {
    const bot = bots.find(b => b.id === botId);
    if (!bot) return;
    
    const newConfig = prompt("Edit bot configuration (JSON format):", JSON.stringify(bot.config, null, 2));
    if (newConfig) {
      try {
        const parsedConfig = JSON.parse(newConfig);
        const updatedBots = bots.map(b => 
          b.id === botId ? { ...b, config: parsedConfig } : b
        );
        localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
        setBots(updatedBots);
        addTerminalLog(`✏️ Bot ${bot.name} configuration updated`);
      } catch (err) {
        setError("Invalid JSON configuration");
      }
    }
  };

  const deployToHeroku = () => {
    window.open("https://heroku.com/deploy?template=https://github.com/NjabuloJf/GWM-XMD", "_blank");
    addTerminalLog("🌊 Opening Heroku deployment page...");
  };

  const deployToRender = () => {
    window.open("https://render.com/deploy?repo=https://github.com/NjabuloJf/GWM-XMD", "_blank");
    addTerminalLog("🚀 Opening Render deployment page...");
  };

  const viewAppJson = () => {
    window.open("https://github.com/NjabuloJf/GWM-XMD/blob/main/app.json", "_blank");
    addTerminalLog("📄 Opening app.json on GitHub...");
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <button
          onClick={deployFromAppJson}
          disabled={deploying}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
        >
          {deploying ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
          {deploying ? "Deploying..." : "Deploy New Bot from app.json"}
        </button>
        
        <button
          onClick={deployToHeroku}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-purple-500/50 text-purple-600 hover:bg-purple-500/10 transition-all duration-200"
        >
          <Cloud className="size-4" />
          Deploy to Heroku
        </button>
        
        <button
          onClick={deployToRender}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-blue-500/50 text-blue-600 hover:bg-blue-500/10 transition-all duration-200"
        >
          <Server className="size-4" />
          Deploy to Render
        </button>
      </div>

      {/* Bot Control Buttons */}
      {bots.length > 0 && (
        <div className="p-3 border border-border rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Bot Controls</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => bots.forEach(b => startBot(b.id))}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              <Play className="size-3" />
              Start All
            </button>
            <button
              onClick={() => bots.forEach(b => stopBot(b.id))}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              <Pause className="size-3" />
              Stop All
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-accent"
            >
              <RefreshCw className="size-3" />
              Refresh Status
            </button>
            <button
              onClick={viewAppJson}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-accent"
            >
              <Github className="size-3" />
              View app.json
            </button>
          </div>
        </div>
      )}

      {/* Logs Toggle */}
      <div className="flex items-center justify-between p-2 border border-border rounded-lg">
        <span className="text-xs font-medium">Terminal Logs</span>
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {showLogs ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
          {showLogs ? "Hide Logs" : "Show Logs"}
        </button>
      </div>
    </div>
  );
        }
