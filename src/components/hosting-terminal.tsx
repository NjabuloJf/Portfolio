"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Trash2, Copy, Check, AlertCircle, Info, CheckCircle, Github } from "lucide-react";

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
    
    const interval = setInterval(loadLogs, 3000);
    
    return () => {
      window.removeEventListener("gwm-xmd-logs-updated", handleLogUpdate);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
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
      case "success": return <CheckCircle className="size-3 text-green-600 shrink-0" />;
      case "error": return <AlertCircle className="size-3 text-red-600 shrink-0" />;
      default: return <Info className="size-3 text-blue-600 shrink-0" />;
    }
  };

  const getLogBgColor = (type: string) => {
    switch(type) {
      case "success": return "bg-green-50";
      case "error": return "bg-red-50";
      default: return "bg-blue-50";
    }
  };

  return (
    <div className="mt-6 border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-800">Deployment Terminal</h3>
          <span className="text-xs text-gray-500">({logs.length} logs)</span>
          {logs.length > 0 && (
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`text-xs px-2 py-0.5 rounded ${autoScroll ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {autoScroll ? "Auto-scroll ON" : "Auto-scroll OFF"}
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyLogs}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Copy logs"
          >
            {copied ? <Check className="size-3 text-green-600" /> : <Copy className="size-3 text-gray-600" />}
          </button>
          <button
            onClick={clearLogs}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Clear logs"
          >
            <Trash2 className="size-3 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-96 overflow-y-auto bg-white p-3 font-mono text-xs"
      >
        {logs.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            <Terminal className="size-8 mx-auto mb-2 opacity-50" />
            <p>No logs yet. Deploy a bot to see terminal output.</p>
            <p className="text-xs mt-2">Repository: NjabuloJf/GWM-XMD</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={`mb-2 p-2 rounded ${getLogBgColor(log.type)} border-l-4 ${
              log.type === "success" ? "border-l-green-500" : 
              log.type === "error" ? "border-l-red-500" : 
              "border-l-blue-500"
            }`}>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0 text-[10px]">
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                <span className="shrink-0 mt-0.5">{getLogIcon(log.type)}</span>
                <span className={`text-gray-800 break-all ${
                  log.type === "success" ? "font-medium" : ""
                }`}>
                  {log.message}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-2 bg-gray-50 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
          <Github className="size-3" />
          Repository: NjabuloJf/GWM-XMD | Real-time logs | Auto-refresh every 3 seconds
        </p>
      </div>
    </div>
  );
              }
