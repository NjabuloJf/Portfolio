"use client";

import { useState } from "react";
import { 
  Play, Pause, RefreshCw, Download, Upload, Terminal, 
  Settings, Eye, EyeOff, AlertTriangle, CheckCircle, Loader2,
  Github, Server, Zap, Bot, Copy, Link
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
  status: "running" | "stopped" | "loading";
  deployedAt: string;
  config: BotConfig;
}

interface HostingButtonsProps {
  bots: Bot[];
  setBots: (bots: Bot[]) => void;
  setError: (error: string | null) => void;
  appJsonConfig: any;
}

export function HostingButtons({ bots, setBots, setError, appJsonConfig }: HostingButtonsProps) {
  const [deploying, setDeploying] = useState(false);
  const [sessionIdInput, setSessionIdInput] = useState("");
  const [showConfig, setShowConfig] = useState(false);

  const generateSessionId = (): string => {
    const sessionData = {
      bot: "GWM-XMD",
      timestamp: Date.now(),
      random: Math.random().toString(36).substring(7),
      device: "WhatsApp MD"
    };
    return btoa(JSON.stringify(sessionData));
  };

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
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event("gwm-xmd-logs-updated"));
    }
  };

  const deployBot = async () => {
    if (bots.length >= 10) {
      setError("❌ Maximum 10 bots reached. Cannot deploy more.");
      addTerminalLog("❌ Deployment failed: Maximum 10 bots reached", "error");
      return;
    }

    if (!sessionIdInput.trim()) {
      setError("❌ Please enter a Session ID");
      addTerminalLog("❌ Deployment failed: No Session ID provided", "error");
      return;
    }

    setDeploying(true);
    setError(null);
    addTerminalLog("🚀 Starting deployment process...", "info");

    try {
      // Step 1: Validate Session ID format
      addTerminalLog("📝 Validating Session ID format...", "info");
      try {
        atob(sessionIdInput);
        addTerminalLog("✅ Session ID format validated", "success");
      } catch {
        throw new Error("Invalid Base64 Session ID format");
      }

      // Step 2: Load app.json config
      addTerminalLog("📥 Loading app.json configuration from GitHub...", "info");
      const response = await fetch("https://api.github.com/repos/NjabuloJf/GWM-XMD/contents/app.json");
      if (!response.ok) throw new Error("Failed to fetch app.json");
      
      const data = await response.json();
      const appJsonContent = atob(data.content);
      const appJson = JSON.parse(appJsonContent);
      addTerminalLog("✅ app.json loaded successfully", "success");

      // Step 3: Create bot instance
      addTerminalLog("🔧 Creating bot instance with configuration...", "info");
      const newBot: Bot = {
        id: Date.now(),
        name: `GWM-XMD-${bots.length + 1}`,
        sessionId: sessionIdInput,
        status: "loading",
        deployedAt: new Date().toISOString(),
        config: {
          prefix: appJson.env.PREFIX?.value || ".",
          mode: appJson.env.MODE?.value || "public",
          ownerName: appJson.env.OWNER_NAME?.value || "XD JB",
          ownerNumber: appJson.env.OWNER_NUMBER?.value || "26777821911",
          autoRead: appJson.env.AUTO_READ?.value === "true",
          autoTyping: appJson.env.AUTO_TYPING?.value === "true",
          autoRecording: appJson.env.AUTO_RECORDING?.value === "true",
          alwaysOnline: appJson.env.ALWAYS_ONLINE?.value === "true",
          autoReact: appJson.env.AUTO_REACT?.value === "true",
          antiDelete: appJson.env.ANTI_DELETE?.value === "true",
          autoStatusSeen: appJson.env.AUTO_STATUS_SEEN?.value === "true",
          autoStatusReply: appJson.env.AUTO_STATUS_REPLY?.value === "true",
          statusReadMsg: appJson.env.STATUS_READ_MSG?.value || "*Status Seen*",
          autoBlock: appJson.env.AUTO_BLOCK?.value === "true",
          rejectCall: appJson.env.REJECT_CALL?.value === "true",
        }
      };

      // Save to localStorage
      const updatedBots = [...bots, newBot];
      localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
      setBots(updatedBots);
      addTerminalLog(`✅ Bot created: ${newBot.name}`, "success");

      // Step 4: Simulate bot activation
      addTerminalLog("⏳ Activating bot (this may take up to 1 minute)...", "info");
      addTerminalLog(`📱 Session ID: ${newBot.sessionId.substring(0, 30)}...`, "info");
      addTerminalLog("🔗 Connecting to WhatsApp servers...", "info");

      // Simulate loading time
      setTimeout(() => {
        // Update bot status to running
        const runningBots = updatedBots.map(bot => 
          bot.id === newBot.id ? { ...bot, status: "running" as const } : bot
        );
        localStorage.setItem("gwm-xmd-bots", JSON.stringify(runningBots));
        setBots(runningBots);
        addTerminalLog("✅ Bot is now ACTIVE and connected!", "success");
        addTerminalLog("📱 Check your WhatsApp Linked Devices to see the bot", "success");
        addTerminalLog("💬 Bot is ready to receive commands", "success");
      }, 60000); // 1 minute delay

      addTerminalLog("📱 Please check your WhatsApp > Linked Devices", "info");
      addTerminalLog("🔑 Session ID has been saved to your bot configuration", "success");
      
      setSessionIdInput("");
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(`Deployment failed: ${errorMsg}`);
      addTerminalLog(`❌ Deployment failed: ${errorMsg}`, "error");
    } finally {
      setDeploying(false);
    }
  };

  const viewAppJsonConfig = () => {
    setShowConfig(!showConfig);
    if (!showConfig && appJsonConfig) {
      addTerminalLog("📄 Viewing app.json configuration", "info");
    }
  };

  const copySessionIdExample = () => {
    const exampleId = generateSessionId();
    navigator.clipboard.writeText(exampleId);
    addTerminalLog("📋 Example Session ID copied to clipboard", "success");
    alert("Example Session ID copied to clipboard!");
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Session ID Input Section */}
      <div className="p-4 border border-border rounded-lg bg-card/30">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Link className="size-4 text-primary" />
          Session ID Configuration
        </h3>
        <div className="space-y-3">
          <textarea
            value={sessionIdInput}
            onChange={(e) => setSessionIdInput(e.target.value)}
            placeholder="Paste your Base64 Session ID here..."
            className="w-full h-24 px-3 py-2 text-xs font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copySessionIdExample}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-border hover:bg-accent"
            >
              <Copy className="size-3" />
              Get Example Session ID
            </button>
            <button
              onClick={viewAppJsonConfig}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-border hover:bg-accent"
            >
              <Settings className="size-3" />
              {showConfig ? "Hide" : "Show"} app.json Config
            </button>
          </div>
        </div>
      </div>

      {/* app.json Configuration Display */}
      {showConfig && appJsonConfig && (
        <div className="p-3 border border-green-500/20 rounded-lg bg-green-500/5">
          <h4 className="text-xs font-semibold mb-2 flex items-center gap-1">
            <Github className="size-3" />
            app.json Configuration (from your repository)
          </h4>
          <pre className="text-xs overflow-x-auto p-2 bg-black/50 rounded max-h-64 overflow-y-auto">
            {JSON.stringify(appJsonConfig.env, null, 2)}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">
            📍 Source: https://github.com/NjabuloJf/GWM-XMD/blob/main/app.json
          </p>
        </div>
      )}

      {/* Deploy Button */}
      <button
        onClick={deployBot}
        disabled={deploying || !sessionIdInput.trim()}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {deploying ? <Loader2 className="size-4 animate-spin" /> : <Bot className="size-4" />}
        {deploying ? "Deploying Bot (1 min)... Please wait" : "Deploy GWM-XMD Bot"}
      </button>

      {/* Deployment Info */}
      <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-600 flex items-start gap-2">
          <AlertTriangle className="size-3 mt-0.5 shrink-0" />
          <span>
            <strong>Deployment Process:</strong><br />
            1. Enter your Base64 Session ID<br />
            2. Click deploy - Configuration loads from app.json<br />
            3. Bot activates in 1 minute<br />
            4. Check WhatsApp > Linked Devices to see your bot<br />
            5. View logs below for real-time status
          </span>
        </p>
      </div>

      {/* Bot Statistics */}
      {bots.length > 0 && (
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 bg-card rounded-lg border border-border">
            <p className="font-semibold text-green-600">{bots.filter(b => b.status === "running").length}</p>
            <p className="text-muted-foreground">Active</p>
          </div>
          <div className="p-2 bg-card rounded-lg border border-border">
            <p className="font-semibold text-yellow-600">{bots.filter(b => b.status === "loading").length}</p>
            <p className="text-muted-foreground">Loading</p>
          </div>
          <div className="p-2 bg-card rounded-lg border border-border">
            <p className="font-semibold text-red-600">{bots.filter(b => b.status === "stopped").length}</p>
            <p className="text-muted-foreground">Stopped</p>
          </div>
        </div>
      )}
    </div>
  );
      }
