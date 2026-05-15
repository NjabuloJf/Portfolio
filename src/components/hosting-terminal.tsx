"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Trash2, Copy, Check, AlertCircle, Info, CheckCircle, Loader2 } from "lucide-react";

interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
  type: "success" | "error" | "info";
}

export function HostingTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadLogs();
    
    const handleLogUpdate = () => loadLogs();
    window.addEventListener("gwm-xmd-logs-updated", handleLogUpdate);
    
    // Auto-refresh every 3 seconds
    const interval = setInterval(loadLogs, 3000);
    
    return () => {
      window.removeEventListener("gwm-xmd-logs-updated", handleLogUpdate);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (autoScroll && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const loadLogs = () => {
    const storedLogs = localStorage.getItem("gwm-xmd-logs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  };

  const clearLogs = () => {
    if (confirm("Clear all terminal logs?")) {
      localStorage.setItem("gwm-xmd-logs", "[]");
      setLogs([]);
    }
  };

  const copyLogs = () => {
    const logText = logs.map(log => `[${new Date(log.timestamp).toLocaleString()}] ${log.message}`).join("\n");
    navigator.clipboard.writeText(logText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLogIcon = (type: string) => {
    switch(type) {
      case "success": return <CheckCircle className="size-3 text-green-500 shrink-0" />;
      case "error": return <AlertCircle className="size-3 text-red-500 shrink-0" />;
      default: return <Info className="size-3 text-blue-500 shrink-0" />;
    }
  };

  const getLogColor = (type: string) => {
    switch(type) {
      case "success": return "text-green-400";
      case "error": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="mt-6 border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-card border-b border-border flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Deployment Terminal</h3>
          <span className="text-xs text-muted-foreground">({logs.length} logs)</span>
          {logs.length > 0 && (
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`text-xs px-2 py-0.5 rounded ${autoScroll ? 'bg-primary/20 text-primary' : 'bg-muted'}`}
            >
              {autoScroll ? "Auto-scroll ON" : "Auto-scroll OFF"}
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyLogs}
            className="p-1 hover:bg-accent rounded transition-colors"
            title="Copy logs"
          >
            {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3" />}
          </button>
          <button
            onClick={clearLogs}
            className="p-1 hover:bg-accent rounded transition-colors"
            title="Clear logs"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-80 overflow-y-auto bg-black/95 p-3 font-mono text-xs"
      >
        {logs.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">
            <Terminal className="size-8 mx-auto mb-2 opacity-50" />
            No logs yet. Deploy a bot to see terminal output.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="mb-2 pb-1 border-b border-gray-800 last:border-0 group">
              <div className="flex items-start gap-2">
                <span className="text-gray-600 shrink-0 text-[10px]">
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                <span className="shrink-0 mt-0.5">{getLogIcon(log.type)}</span>
                <span className={`${getLogColor(log.type)} break-all`}>
                  {log.message}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-2 bg-card border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          💡 Real-time logs | Auto-refresh every 3 seconds | Max 200 logs stored
        </p>
      </div>
    </div>
  );
            }
