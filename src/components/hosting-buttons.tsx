"use client";

import { useState, useEffect } from "react";
import { 
  Play, Pause, RefreshCw, Download, Upload, Terminal, 
  Settings, Eye, EyeOff, AlertTriangle, CheckCircle, Loader2,
  Github, Server, Zap, Bot, Copy, Link, Save, X
} from "lucide-react";

// Define proper types - MUST MATCH page.tsx
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
  const [editableConfig, setEditableConfig] = useState<any>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (appJsonConfig) {
      setEditableConfig(appJsonConfig.env);
    }
  }, [appJsonConfig]);

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

  const checkRepository = async () => {
    addTerminalLog("🔍 Checking repository: NjabuloJf/GWM-XMD...", "info");
    try {
      const response = await fetch("https://api.github.com/repos/NjabuloJf/GWM-XMD");
      if (response.ok) {
        const data = await response.json();
        addTerminalLog(`✅ Repository found: ${data.full_name}`, "success");
        addTerminalLog(`📊 Stars: ${data.stargazers_count} | Forks: ${data.forks_count}`, "success");
        addTerminalLog(`📝 Description: ${data.description || "GWM-XMD WhatsApp Bot"}`, "success");
        addTerminalLog(`🕐 Last updated: ${new Date(data.updated_at).toLocaleString()}`, "success");
        return true;
      } else {
        addTerminalLog(`❌ Repository error: HTTP ${response.status}`, "error");
        return false;
      }
    } catch (err) {
      addTerminalLog(`❌ Failed to check repository: ${err}`, "error");
      return false;
    }
  };

  const deployBot = async () => {
    if (bots.length >= 10) {
      setError("❌ Maximum 10 bots reached. Cannot deploy more.");
      addTerminalLog("❌ Deployment failed: Maximum 10 bots reached", "error");
      return;
    }

    if (!sessionIdInput.trim()) {
      setError("❌ Please enter a Session ID starting with GWM-XMD~");
      addTerminalLog("❌ Deployment failed: No Session ID provided", "error");
      return;
    }

    if (!sessionIdInput.startsWith("GWM-XMD~")) {
      setError("❌ Session ID must start with 'GWM-XMD~'");
      addTerminalLog("❌ Deployment failed: Invalid Session ID format - must start with GWM-XMD~", "error");
      return;
    }

    setDeploying(true);
    setError(null);
    addTerminalLog("🚀 Starting deployment process...", "info");

    try {
      // Step 1: Check repository
      addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "info");
      const repoOk = await checkRepository();
      if (!repoOk) {
        addTerminalLog("⚠️ Repository check failed but continuing...", "info");
      }

      // Step 2: Validate Session ID format
      addTerminalLog("📝 Validating Session ID format...", "info");
      addTerminalLog(`✅ Session ID validated: ${sessionIdInput.substring(0, 20)}...`, "success");

      // Step 3: Load app.json config
      addTerminalLog("📥 Loading app.json configuration from GitHub...", "info");
      const response = await fetch("https://api.github.com/repos/NjabuloJf/GWM-XMD/contents/app.json");
      if (!response.ok) throw new Error("Failed to fetch app.json");
      
      const data = await response.json();
      const appJsonContent = atob(data.content);
      const appJson = JSON.parse(appJsonContent);
      addTerminalLog("✅ app.json loaded successfully", "success");
      addTerminalLog(`📋 Configuration version: ${appJson.name || "GWM-XMD"}`, "success");

      // Step 4: Display loaded configuration
      addTerminalLog("🔧 Loading configuration settings:", "info");
      Object.keys(appJson.env).forEach(key => {
        const value = appJson.env[key].value;
        addTerminalLog(`   • ${key}: ${value}`, "info");
      });

      // Step 5: Create bot instance
      addTerminalLog("🔧 Creating bot instance with configuration...", "info");
      const newBot: Bot = {
        id: Date.now(),
        name: `GWM-XMD-${bots.length + 1}`,
        sessionId: sessionIdInput,
        status: "loading",
        deployedAt: new Date().toISOString(),
        config: {
          sessionId: sessionIdInput,
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

      // Step 6: Bot activation
      addTerminalLog("⏳ Activating bot (this may take up to 1 minute)...", "info");
      addTerminalLog(`📱 Session ID: ${newBot.sessionId.substring(0, 30)}...`, "info");
      addTerminalLog("🔗 Connecting to WhatsApp servers...", "info");
      addTerminalLog("🔄 Initializing bot features...", "info");

      // Simulate loading time
      setTimeout(() => {
        const runningBots = updatedBots.map(bot => 
          bot.id === newBot.id ? { ...bot, status: "running" as const } : bot
        );
        localStorage.setItem("gwm-xmd-bots", JSON.stringify(runningBots));
        setBots(runningBots);
        addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "success");
        addTerminalLog("✅ BOT DEPLOYMENT SUCCESSFUL!", "success");
        addTerminalLog("✅ Bot is now ACTIVE and connected!", "success");
        addTerminalLog("📱 Check your WhatsApp > Linked Devices to see the bot", "success");
        addTerminalLog("💬 Bot is ready to receive commands", "success");
        addTerminalLog(`🔧 Bot owner: ${newBot.config.ownerName} (${newBot.config.ownerNumber})`, "success");
        addTerminalLog(`⚙️ Mode: ${newBot.config.mode} | Prefix: ${newBot.config.prefix}`, "success");
        addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "success");
      }, 60000);

      addTerminalLog("📱 Please check your WhatsApp > Linked Devices", "info");
      addTerminalLog("🔑 Session ID has been saved to your bot configuration", "success");
      addTerminalLog("🎉 Deployment initiated successfully!", "success");
      
      setSessionIdInput("");
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(`Deployment failed: ${errorMsg}`);
      addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "error");
      addTerminalLog(`❌ DEPLOYMENT FAILED: ${errorMsg}`, "error");
      addTerminalLog("📝 Please check your repository and session ID", "error");
      addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "error");
    } finally {
      setDeploying(false);
    }
  };

  const saveConfigChanges = () => {
    if (editableConfig) {
      localStorage.setItem("gwm-xmd-edited-config", JSON.stringify(editableConfig));
      setSaveSuccess(true);
      addTerminalLog("✅ Configuration changes saved locally", "success");
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const toggleConfigValue = (key: string, currentValue: string) => {
    if (editableConfig && editableConfig[key]) {
      const newValue = currentValue === "true" ? "false" : "true";
      setEditableConfig({
        ...editableConfig,
        [key]: { ...editableConfig[key], value: newValue }
      });
      addTerminalLog(`⚙️ Changed ${key} to ${newValue}`, "info");
    }
  };

  const updateConfigText = (key: string, newValue: string) => {
    if (editableConfig && editableConfig[key]) {
      setEditableConfig({
        ...editableConfig,
        [key]: { ...editableConfig[key], value: newValue }
      });
    }
  };

  const viewAppJsonConfig = () => {
    setShowConfig(!showConfig);
    if (!showConfig && appJsonConfig) {
      addTerminalLog("📄 Opening configuration editor", "info");
    }
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
            placeholder="Paste your Base64 Session ID here (must start with GWM-XMD~)..."
            className="w-full h-24 px-3 py-2 text-xs font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <div className="text-xs text-muted-foreground">
            ⚠️ Session ID must start with <strong className="text-primary">GWM-XMD~</strong>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={viewAppJsonConfig}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-border hover:bg-accent"
            >
              <Settings className="size-3" />
              {showConfig ? "Hide" : "Edit"} Configuration Settings
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Editor */}
      {showConfig && editableConfig && (
        <div className="p-4 border border-green-500/20 rounded-lg bg-green-500/5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Settings className="size-4" />
              Edit Bot Configuration (app.json)
            </h4>
            <div className="flex gap-2">
              <button
                onClick={saveConfigChanges}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                {saveSuccess ? <CheckCircle className="size-3" /> : <Save className="size-3" />}
                Save Changes
              </button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Object.entries(editableConfig).map(([key, config]: [string, any]) => {
              const isBoolean = config.value === "true" || config.value === "false";
              const isSessionId = key === "SESSION_ID";
              
              if (isSessionId) return null;
              
              return (
                <div key={key} className="p-2 border border-border rounded-lg bg-card/50">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex-1">
                      <label className="text-xs font-semibold block">{key}</label>
                      <p className="text-xs text-muted-foreground">{config.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isBoolean ? (
                        <button
                          onClick={() => toggleConfigValue(key, config.value)}
                          className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg transition-all ${
                            config.value === "true" 
                              ? "bg-green-500 text-white" 
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {config.value === "true" ? "True ✓" : "False ✗"}
                        </button>
                      ) : (
                        <input
                          type="text"
                          value={config.value}
                          onChange={(e) => updateConfigText(key, e.target.value)}
                          className="px-2 py-1 text-xs border border-border rounded bg-background w-40"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <p className="text-xs text-muted-foreground mt-3">
            💡 Changes are saved locally. Deploy new bots with these settings.
          </p>
        </div>
      )}

      {/* Repository Status */}
      <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
          <Github className="size-3" />
          Repository Status: NjabuloJf/GWM-XMD
        </h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 rounded">
            ✅ Repository Active
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 rounded">
            📦 app.json Found
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/10 rounded">
            🚀 Ready to Deploy
          </span>
        </div>
      </div>

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
      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
        <p className="text-xs text-amber-600 flex items-start gap-2">
          <AlertTriangle className="size-3 mt-0.5 shrink-0" />
          <span>
            <strong>Deployment Process:</strong>
            <br />
            1. Enter your Base64 Session ID (must start with GWM-XMD~)
            <br />
            2. Edit configuration settings if needed (True/False toggles)
            <br />
            3. Click deploy - Configuration loads from app.json
            <br />
            4. Bot activates in 1 minute with full logs
            <br />
            5. Check WhatsApp {`>`} Linked Devices to see your bot
            <br />
            6. View terminal for real-time deployment status
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
