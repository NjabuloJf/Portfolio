"use client";

import { useState, useEffect } from "react";
import { 
  Settings, AlertTriangle, CheckCircle, Loader2,
  Github, Bot, Copy, Link, Save, Rocket, Cloud, Server, ExternalLink
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
  deployedUrl?: string;
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
  const [deployPlatform, setDeployPlatform] = useState<"heroku" | "render" | "railway">("heroku");

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

  const deployToHeroku = () => {
    const herokuUrl = `https://heroku.com/deploy?template=https://github.com/NjabuloJf/GWM-XMD`;
    window.open(herokuUrl, "_blank");
    addTerminalLog("🌊 Opening Heroku deployment page...", "info");
    addTerminalLog("📝 Follow these steps on Heroku:", "info");
    addTerminalLog("   1. Click 'Deploy App'", "info");
    addTerminalLog("   2. Add your Session ID in Config Variables", "info");
    addTerminalLog("   3. Set SESSION_ID = " + sessionIdInput, "info");
    addTerminalLog("   4. Click 'Deploy Branch'", "info");
    addTerminalLog("   5. Wait for deployment to complete", "info");
  };

  const deployToRender = () => {
    const renderUrl = `https://render.com/deploy?repo=https://github.com/NjabuloJf/GWM-XMD`;
    window.open(renderUrl, "_blank");
    addTerminalLog("🚀 Opening Render deployment page...", "info");
    addTerminalLog("📝 Follow these steps on Render:", "info");
    addTerminalLog("   1. Connect your GitHub repository", "info");
    addTerminalLog("   2. Add Environment Variable: SESSION_ID", "info");
    addTerminalLog("   3. Set value = " + sessionIdInput, "info");
    addTerminalLog("   4. Click 'Apply'", "info");
    addTerminalLog("   5. Wait for deployment", "info");
  };

  const deployToRailway = () => {
    const railwayUrl = `https://railway.app/new/template?template=https://github.com/NjabuloJf/GWM-XMD`;
    window.open(railwayUrl, "_blank");
    addTerminalLog("🚂 Opening Railway deployment page...", "info");
    addTerminalLog("📝 Follow these steps on Railway:", "info");
    addTerminalLog("   1. Click 'Deploy'", "info");
    addTerminalLog("   2. Add Environment Variable: SESSION_ID", "info");
    addTerminalLog("   3. Set value = " + sessionIdInput, "info");
    addTerminalLog("   4. Deployment will start automatically", "info");
  };

  const saveBotToLocal = () => {
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

    try {
      const newBot: Bot = {
        id: Date.now(),
        name: `GWM-XMD-${bots.length + 1}`,
        sessionId: sessionIdInput,
        status: "stopped",
        deployedAt: new Date().toISOString(),
        config: {
          sessionId: sessionIdInput,
          prefix: editableConfig?.PREFIX?.value || ".",
          mode: editableConfig?.MODE?.value || "public",
          ownerName: editableConfig?.OWNER_NAME?.value || "XD JB",
          ownerNumber: editableConfig?.OWNER_NUMBER?.value || "26777821911",
          autoRead: editableConfig?.AUTO_READ?.value === "true",
          autoTyping: editableConfig?.AUTO_TYPING?.value === "true",
          autoRecording: editableConfig?.AUTO_RECORDING?.value === "true",
          alwaysOnline: editableConfig?.ALWAYS_ONLINE?.value === "true",
          autoReact: editableConfig?.AUTO_REACT?.value === "true",
          antiDelete: editableConfig?.ANTI_DELETE?.value === "true",
          autoStatusSeen: editableConfig?.AUTO_STATUS_SEEN?.value === "true",
          autoStatusReply: editableConfig?.AUTO_STATUS_REPLY?.value === "true",
          statusReadMsg: editableConfig?.STATUS_READ_MSG?.value || "*Status Seen*",
          autoBlock: editableConfig?.AUTO_BLOCK?.value === "true",
          rejectCall: editableConfig?.REJECT_CALL?.value === "true",
        }
      };

      const updatedBots = [...bots, newBot];
      localStorage.setItem("gwm-xmd-bots", JSON.stringify(updatedBots));
      setBots(updatedBots);
      
      addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "success");
      addTerminalLog(`✅ Bot configuration saved: ${newBot.name}`, "success");
      addTerminalLog("📋 NOW DEPLOY TO A HOSTING PLATFORM:", "info");
      addTerminalLog("   Click one of the buttons above (Heroku, Render, or Railway)", "info");
      addTerminalLog("   Add your Session ID as an environment variable", "info");
      addTerminalLog("   Your bot will be active on WhatsApp after deployment", "info");
      addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "success");
      
      setSessionIdInput("");
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to save: ${errorMsg}`);
      addTerminalLog(`❌ Failed to save: ${errorMsg}`, "error");
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
          WhatsApp Session ID
        </h3>
        <div className="space-y-3">
          <textarea
            value={sessionIdInput}
            onChange={(e) => setSessionIdInput(e.target.value)}
            placeholder="Paste your WhatsApp Session ID here (must start with GWM-XMD~)..."
            className="w-full h-24 px-3 py-2 text-xs font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <div className="text-xs text-muted-foreground">
            ⚠️ Session ID must start with <strong className="text-primary">GWM-XMD~</strong>
            <br />
            📱 Get your Session ID from WhatsApp {`>`} Linked Devices {`>`} QR Code
          </div>
        </div>
      </div>

      {/* Configuration Editor */}
      {showConfig && editableConfig && (
        <div className="p-4 border border-green-500/20 rounded-lg bg-green-500/5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Settings className="size-4" />
              Bot Configuration (app.json)
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
            💡 These settings will be used when you deploy to Heroku/Render/Railway
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={viewAppJsonConfig}
          className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-border hover:bg-accent"
        >
          <Settings className="size-3" />
          {showConfig ? "Hide" : "Edit"} Configuration
        </button>
      </div>

      {/* Repository Status */}
      <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
          <Github className="size-3" />
          Repository: NjabuloJf/GWM-XMD
        </h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 rounded">
            ✅ Repository Ready
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 rounded">
            📦 app.json Found
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/10 rounded">
            🚀 Deploy Ready
          </span>
        </div>
      </div>

      {/* REAL DEPLOYMENT PLATFORMS */}
      <div className="p-4 border-2 border-primary/30 rounded-lg bg-primary/5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Rocket className="size-4 text-primary" />
          Deploy to Real Hosting (Required for WhatsApp Connection)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <button
            onClick={deployToHeroku}
            disabled={!sessionIdInput.trim()}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all disabled:opacity-50"
          >
            <Cloud className="size-5" />
            <span className="text-sm font-semibold">Heroku</span>
            <span className="text-xs opacity-90">Free Tier Available</span>
          </button>
          
          <button
            onClick={deployToRender}
            disabled={!sessionIdInput.trim()}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Server className="size-5" />
            <span className="text-sm font-semibold">Render</span>
            <span className="text-xs opacity-90">Free Tier Available</span>
          </button>
          
          <button
            onClick={deployToRailway}
            disabled={!sessionIdInput.trim()}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            <ExternalLink className="size-5" />
            <span className="text-sm font-semibold">Railway</span>
            <span className="text-xs opacity-90">Free Tier Available</span>
          </button>
        </div>

        <div className="text-xs text-muted-foreground p-2 bg-card rounded">
          <p className="font-semibold mb-1">📋 Important Deployment Steps:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Click one of the platform buttons above</li>
            <li>Connect your GitHub account (NjabuloJf/GWM-XMD)</li>
            <li>Add Environment Variable: <strong className="text-primary">SESSION_ID</strong> = <span className="font-mono text-xs">{sessionIdInput || "your-session-id"}</span></li>
            <li>Click Deploy / Apply</li>
            <li>Wait 2-3 minutes for deployment</li>
            <li>Your bot will automatically connect to WhatsApp!</li>
          </ol>
        </div>
      </div>

      {/* Save to Local Button */}
      <button
        onClick={saveBotToLocal}
        disabled={deploying || !sessionIdInput.trim()}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-200 disabled:opacity-50"
      >
        {deploying ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Save Bot Configuration (Local)
      </button>

      {/* Deployment Info */}
      <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
        <p className="text-xs text-yellow-600 flex items-start gap-2">
          <AlertTriangle className="size-3 mt-0.5 shrink-0" />
          <span>
            <strong>⚠️ IMPORTANT:</strong> Your bot will NOT be active on WhatsApp until you deploy to a hosting platform (Heroku, Render, or Railway).<br />
            <br />
            <strong>Why?</strong> WhatsApp bots need a server running 24/7 to stay connected. Local saving only stores your configuration.<br />
            <br />
            <strong>Solution:</strong> Click Heroku, Render, or Railway button above → Add your Session ID → Deploy → Bot connects automatically!
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
            <p className="font-semibold text-gray-600">{bots.filter(b => b.status === "stopped").length}</p>
            <p className="text-muted-foreground">Stopped</p>
          </div>
        </div>
      )}
    </div>
  );
}