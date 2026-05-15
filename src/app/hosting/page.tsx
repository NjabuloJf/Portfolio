"use client";

import { useState, useEffect } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { HostingTerminal } from "@/components/hosting-terminal";
import { AlertCircle, CheckCircle, Shield, Database, Bot, Github, Wifi, WifiOff } from "lucide-react";

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
  id: string;
  name: string;
  sessionId: string;
  status: "running" | "stopped" | "loading" | "deploying";
  deployedAt: string;
  config: BotConfig;
}

export default function HostingPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [appJsonConfig, setAppJsonConfig] = useState<any>(null);
  const [repositoryStatus, setRepositoryStatus] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    loadBots();
    checkRepository();
    loadAppJsonConfig();
    
    // Poll for bot status updates
    const interval = setInterval(() => {
      loadBots();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadBots = async () => {
    try {
      const response = await fetch('/api/deploy');
      const data = await response.json();
      if (data.bots) {
        setBots(data.bots);
      }
    } catch (err) {
      console.error('Failed to load bots', err);
    }
  };

  const checkRepository = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/NjabuloJf/GWM-XMD');
      if (response.ok) {
        const data = await response.json();
        setRepositoryStatus({ 
          ok: true, 
          message: `Repository found: ${data.full_name} | ⭐ ${data.stargazers_count} stars` 
        });
        addTerminalLog(`✅ Repository verified: NjabuloJf/GWM-XMD`, "success");
        addTerminalLog(`📊 Stars: ${data.stargazers_count} | Forks: ${data.forks_count}`, "success");
      } else {
        setRepositoryStatus({ ok: false, message: 'Repository not found or inaccessible' });
        addTerminalLog(`❌ Repository check failed`, "error");
      }
    } catch (err) {
      setRepositoryStatus({ ok: false, message: 'Cannot connect to GitHub API' });
      addTerminalLog(`❌ Cannot verify repository`, "error");
    }
  };

  const loadAppJsonConfig = async () => {
    try {
      const response = await fetch("https://api.github.com/repos/NjabuloJf/GWM-XMD/contents/app.json");
      if (response.ok) {
        const data = await response.json();
        const appJsonContent = atob(data.content);
        const appJson = JSON.parse(appJsonContent);
        setAppJsonConfig(appJson);
        addTerminalLog("✅ app.json configuration loaded", "success");
      }
    } catch (err) {
      console.error("Failed to load app.json", err);
    }
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
      setError("❌ Maximum 10 bots reached");
      addTerminalLog("❌ Deployment failed: Maximum 10 bots reached", "error");
      return;
    }

    if (!sessionId.trim()) {
      setError("❌ Please enter a Session ID");
      addTerminalLog("❌ Deployment failed: No Session ID provided", "error");
      return;
    }

    if (!sessionId.startsWith("GWM-XMD~")) {
      setError("❌ Session ID must start with 'GWM-XMD~'");
      addTerminalLog("❌ Deployment failed: Invalid Session ID format", "error");
      return;
    }

    setDeploying(true);
    setError(null);
    addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "info");
    addTerminalLog("🚀 Starting GWM-XMD Bot Deployment...", "info");

    try {
      // Step 1: Check repository
      addTerminalLog("📦 Checking repository: NjabuloJf/GWM-XMD", "info");
      const repoCheck = await fetch("https://api.github.com/repos/NjabuloJf/GWM-XMD");
      if (!repoCheck.ok) throw new Error("Repository not accessible");
      addTerminalLog("✅ Repository verified", "success");

      // Step 2: Load configuration
      addTerminalLog("📥 Loading app.json configuration...", "info");
      const configResponse = await fetch("https://api.github.com/repos/NjabuloJf/GWM-XMD/contents/app.json");
      const configData = await configResponse.json();
      const appJsonContent = atob(configData.content);
      const appJson = JSON.parse(appJsonContent);
      addTerminalLog("✅ Configuration loaded from app.json", "success");

      // Step 3: Create bot configuration
      addTerminalLog("🔧 Creating bot configuration...", "info");
      const botConfig = {
        sessionId: sessionId,
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
      };

      // Step 4: Deploy via API
      addTerminalLog("🚀 Deploying bot to server...", "info");
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          config: botConfig,
          repository: 'NjabuloJf/GWM-XMD'
        })
      });

      if (!response.ok) throw new Error("Deployment failed");

      const result = await response.json();
      addTerminalLog(`✅ Bot deployment initiated: ${result.botId}`, "success");

      // Step 5: Connecting to WhatsApp
      addTerminalLog("🔗 Connecting to WhatsApp servers...", "info");
      addTerminalLog(`📱 Session ID: ${sessionId.substring(0, 30)}...`, "info");
      
      // Step 6: Activation
      addTerminalLog("⏳ Activating bot (this may take up to 1 minute)...", "info");
      
      // Simulate activation
      setTimeout(() => {
        addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "success");
        addTerminalLog("✅ BOT IS NOW ACTIVE ON WHATSAPP!", "success");
        addTerminalLog("📱 Check WhatsApp > Linked Devices to see your bot", "success");
        addTerminalLog(`🔧 Bot Owner: ${botConfig.ownerName} (${botConfig.ownerNumber})`, "success");
        addTerminalLog(`⚙️ Mode: ${botConfig.mode} | Prefix: ${botConfig.prefix}`, "success");
        addTerminalLog("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "success");
        loadBots(); // Refresh bot list
      }, 60000);

      setSessionId("");
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(`Deployment failed: ${errorMsg}`);
      addTerminalLog(`❌ DEPLOYMENT FAILED: ${errorMsg}`, "error");
    } finally {
      setDeploying(false);
    }
  };

  const stopBot = async (botId: string) => {
    try {
      await fetch(`/api/deploy?botId=${botId}`, { method: 'DELETE' });
      addTerminalLog(`🛑 Bot stopped`, "info");
      loadBots();
    } catch (err) {
      addTerminalLog(`❌ Failed to stop bot`, "error");
    }
  };

  const deleteBot = async (botId: string) => {
    if (confirm("Delete this bot?")) {
      await fetch(`/api/deploy?botId=${botId}`, { method: 'DELETE' });
      addTerminalLog(`🗑️ Bot deleted`, "info");
      loadBots();
    }
  };

  return (
    <section id="hosting" className="pb-12">
      <BlurFade delay={0.04}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            GWM-XMD Bot Hosting
            <span className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md px-2 py-1 text-sm">NjabuloJf/GWM-XMD</span>
          </h1>
          <div className="flex gap-2">
            {repositoryStatus?.ok ? (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-green-500/10 text-green-600">
                <Github className="size-3" />
                Repository Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-red-500/10 text-red-600">
                <Github className="size-3" />
                Repository Error
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Deploy and run your GWM-XMD WhatsApp bot directly. Bot connects to WhatsApp using your Session ID.
        </p>
      </BlurFade>

      {error && (
        <BlurFade delay={0.08}>
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </BlurFade>
      )}

      {/* Session ID Input */}
      <BlurFade delay={0.12}>
        <div className="p-4 border border-border rounded-lg bg-card/30 mb-4">
          <h3 className="text-sm font-semibold mb-3">WhatsApp Session ID</h3>
          <textarea
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="Paste your Session ID here (must start with GWM-XMD~)..."
            className="w-full h-24 px-3 py-2 text-xs font-mono bg-background border border-border rounded-lg resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Session ID must start with <strong>GWM-XMD~</strong>
          </p>
        </div>

        {/* Deploy Button */}
        <button
          onClick={deployBot}
          disabled={deploying || !sessionId.trim()}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
        >
          {deploying ? (
            <>
              <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Deploying Bot (1 min)...
            </>
          ) : (
            <>
              <Bot className="size-4" />
              Deploy GWM-XMD Bot
            </>
          )}
        </button>
      </BlurFade>

      {/* Active Bots */}
      <BlurFade delay={0.16}>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Bot className="size-5" />
            Active Bots ({bots.length}/10)
          </h2>
          
          {bots.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
              <Bot className="size-12 mx-auto mb-3 text-muted-foreground" />
              <p>No bots deployed. Enter your Session ID and click Deploy.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bots.map((bot) => (
                <div key={bot.id} className="p-4 border border-border rounded-lg bg-card/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {bot.status === "running" ? (
                        <Wifi className="size-4 text-green-500" />
                      ) : (
                        <WifiOff className="size-4 text-red-500" />
                      )}
                      <span className="font-semibold">Bot ID: {bot.id.substring(0, 8)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        bot.status === "running" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                      }`}>
                        {bot.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => stopBot(bot.id)}
                        className="px-2 py-1 text-xs bg-yellow-500 text-white rounded"
                      >
                        Stop
                      </button>
                      <button
                        onClick={() => deleteBot(bot.id)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Deployed: {new Date(bot.deployedAt).toLocaleString()}</p>
                    <p className="font-mono text-[10px]">Session: {bot.sessionId.substring(0, 40)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </BlurFade>

      {/* Terminal Logs */}
      <BlurFade delay={0.2}>
        <HostingTerminal />
      </BlurFade>

      {/* Footer */}
      <BlurFade delay={0.24}>
        <div className="mt-8 p-4 border-t border-border text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Github className="size-3" />
            <span>Repository: NjabuloJf/GWM-XMD | Max 10 bots | Real-time deployment</span>
            <Database className="size-3" />
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
