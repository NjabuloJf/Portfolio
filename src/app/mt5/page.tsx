"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, DollarSign, BarChart3,
  Activity, Clock, Calendar, Settings, Play, Pause,
  RefreshCw, Upload, Image, X, CheckCircle, AlertCircle,
  Zap, Shield, Bot, LineChart, PieChart, ArrowUpRight,
  ArrowDownRight, Wallet, Star, Award, Target, Eye,
  Users, Bell, LogIn, Facebook, Chrome, User, Edit,
  Lock, Save, Trash2, Menu, Home, Github, Twitter,
  Linkedin, Mail, Phone, MapPin, Globe, Server,
  Cpu, Battery, Wifi, WifiOff, Signal, Power,
  Terminal, Maximize, Minimize, ChevronRight, ChevronDown,
  Filter, Grid3x3, List, Download, UploadCloud,
  Volume2, VolumeX, Mic, MicOff, MonitorPlay,
  Radio, Waves, ArrowUp, ArrowDown, Minus, Plus,
  Maximize2, Minimize2, Square, Circle, AlertTriangle,
  Info, HelpCircle, Command, ShoppingBag, Gift,
  Coffee, BookOpen, Award as AwardIcon, Sparkles
} from "lucide-react";

type Trade = {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  openPrice: number;
  currentPrice: number;
  profit: number;
  volume: number;
  openTime: string;
  sl: number;
  tp: number;
  status: "open" | "closed" | "pending";
};

type RobotStatus = {
  running: boolean;
  totalTrades: number;
  winRate: number;
  profit: number;
  activeTrades: number;
  equity: number;
  balance: number;
  drawdown: number;
  uptime: string;
  serverStatus: "online" | "offline" | "connecting";
  currentSymbol: string;
  currentPrice: number;
  spread: number;
};

type LogEntry = {
  id: string;
  time: string;
  message: string;
  type: "info" | "success" | "error" | "warning";
};

type ChartData = {
  time: string;
  value: number;
  volume: number;
};

export default function MT5Page() {
  const [selectedSymbol, setSelectedSymbol] = useState("EURUSD");
  const [robotRunning, setRobotRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showSignals, setShowSignals] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profitMode, setProfitMode] = useState("auto");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [terminalHeight, setTerminalHeight] = useState(300);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(1.0987);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [trades, setTrades] = useState<Trade[]>([
    {
      id: "1",
      symbol: "EURUSD",
      type: "buy",
      openPrice: 1.09234,
      currentPrice: 1.09867,
      profit: 63.30,
      volume: 0.10,
      openTime: "2026-07-13 10:30:00",
      sl: 1.08800,
      tp: 1.10500,
      status: "open"
    },
    {
      id: "2",
      symbol: "GBPUSD",
      type: "sell",
      openPrice: 1.28567,
      currentPrice: 1.27934,
      profit: 63.30,
      volume: 0.10,
      openTime: "2026-07-13 09:15:00",
      sl: 1.29000,
      tp: 1.27000,
      status: "open"
    },
    {
      id: "3",
      symbol: "USDJPY",
      type: "buy",
      openPrice: 148.234,
      currentPrice: 149.567,
      profit: 133.30,
      volume: 0.05,
      openTime: "2026-07-13 08:45:00",
      sl: 147.500,
      tp: 150.500,
      status: "open"
    },
    {
      id: "4",
      symbol: "XAUUSD",
      type: "buy",
      openPrice: 2350.00,
      currentPrice: 2365.50,
      profit: 155.00,
      volume: 0.01,
      openTime: "2026-07-13 07:30:00",
      sl: 2340.00,
      tp: 2380.00,
      status: "closed"
    }
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", time: "14:32:15", message: "✅ Njabulo Trend Bot started successfully", type: "success" },
    { id: "2", time: "14:30:22", message: "📈 BUY signal detected on EURUSD at 1.09845", type: "info" },
    { id: "3", time: "14:28:10", message: "🔄 Trailing Stop updated to 1.09750", type: "info" },
    { id: "4", time: "14:25:33", message: "💰 Profit target reached on GBPUSD +$45.20", type: "success" },
    { id: "5", time: "14:20:18", message: "⚠️ Stop Loss hit on XAUUSD -$22.10", type: "warning" },
    { id: "6", time: "14:15:05", message: "❌ Connection lost to server, reconnecting...", type: "error" },
    { id: "7", time: "14:10:00", message: "✅ Server reconnected successfully", type: "success" },
  ]);

  const [robotStatus, setRobotStatus] = useState<RobotStatus>({
    running: false,
    totalTrades: 47,
    winRate: 76.8,
    profit: 2845.60,
    activeTrades: 3,
    equity: 12845.60,
    balance: 10000.00,
    drawdown: 2.1,
    uptime: "12h 34m",
    serverStatus: "online",
    currentSymbol: "EURUSD",
    currentPrice: 1.09867,
    spread: 1.2
  });

  const [chartData] = useState<ChartData[]>([
    { time: "09:00", value: 1.0900, volume: 120 },
    { time: "09:30", value: 1.0915, volume: 85 },
    { time: "10:00", value: 1.0920, volume: 95 },
    { time: "10:30", value: 1.0935, volume: 110 },
    { time: "11:00", value: 1.0950, volume: 130 },
    { time: "11:30", value: 1.0965, volume: 75 },
    { time: "12:00", value: 1.0952, volume: 90 },
    { time: "12:30", value: 1.0970, volume: 140 },
    { time: "13:00", value: 1.0968, volume: 80 },
    { time: "13:30", value: 1.0982, volume: 160 },
    { time: "14:00", value: 1.0975, volume: 70 },
    { time: "14:30", value: 1.0987, volume: 150 }
  ]);

  const symbols = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "NZDUSD", "XAUUSD", "BTCUSD"];

  const toggleRobot = () => {
    setLoading(true);
    const newStatus = !robotRunning;
    setRobotRunning(newStatus);
    setRobotStatus({
      ...robotStatus,
      running: newStatus
    });
    
    // Add log
    const log: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      message: newStatus ? "✅ Njabulo Trend Bot started successfully" : "⏹️ Njabulo Trend Bot stopped",
      type: newStatus ? "success" : "warning"
    };
    setLogs([log, ...logs]);
    setLoading(false);
  };

  const addLog = (message: string, type: "info" | "success" | "error" | "warning" = "info") => {
    const log: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      message,
      type
    };
    setLogs([log, ...logs]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setShowImageUpload(false);
        addLog("📸 Chart screenshot uploaded successfully", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const runBot = () => {
    addLog("🤖 Running Njabulo Trend analysis...", "info");
    addLog("📊 Scanning for entry signals...", "info");
    addLog("✅ Signal detected on EURUSD - BUY", "success");
    addLog("💰 Trade executed at 1.09845", "success");
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? "text-green-500" : "text-red-500";
  };

  const generateSignals = () => {
    return [
      { symbol: "EURUSD", trend: "Bullish", strength: 85, action: "BUY", confidence: 88, entry: 1.0950, target: 1.1050, stop: 1.0880 },
      { symbol: "GBPUSD", trend: "Bearish", strength: 72, action: "SELL", confidence: 76, entry: 1.2790, target: 1.2700, stop: 1.2860 },
      { symbol: "USDJPY", trend: "Bullish", strength: 68, action: "BUY", confidence: 70, entry: 149.50, target: 151.00, stop: 148.00 },
      { symbol: "XAUUSD", trend: "Bullish", strength: 92, action: "BUY", confidence: 94, entry: 2365.00, target: 2400.00, stop: 2340.00 },
    ];
  };

  const signals = generateSignals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Bot className="size-5 text-white" />
              </div>
              <span className="font-bold text-lg">Njabulo Trend</span>
              <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">24/7</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setActiveTab("dashboard")} className={`px-3 py-1 text-sm rounded-lg transition-all ${activeTab === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                <Home className="size-4 inline mr-1" /> Dashboard
              </button>
              <button onClick={() => setActiveTab("signals")} className={`px-3 py-1 text-sm rounded-lg transition-all ${activeTab === "signals" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                <Zap className="size-4 inline mr-1" /> Signals
              </button>
              <button onClick={() => setActiveTab("trades")} className={`px-3 py-1 text-sm rounded-lg transition-all ${activeTab === "trades" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                <Activity className="size-4 inline mr-1" /> Trades
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Run Bot Button */}
            <button
              onClick={runBot}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
            >
              <Play className="size-4" />
              Run Now
            </button>
            
            {/* Toggle Terminal */}
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Terminal className="size-5" />
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Settings className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute right-4 top-14 z-50 w-80 border rounded-xl bg-card shadow-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Settings className="size-4" /> Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
              <span className="text-sm">Profit Mode</span>
              <select value={profitMode} onChange={(e) => setProfitMode(e.target.value)} className="px-2 py-1 text-sm border rounded-lg bg-background">
                <option value="auto">Auto</option>
                <option value="aggressive">Aggressive</option>
                <option value="conservative">Conservative</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
              <span className="text-sm">Server</span>
              <span className={`flex items-center gap-1 text-sm ${robotStatus.serverStatus === "online" ? "text-green-500" : "text-red-500"}`}>
                {robotStatus.serverStatus === "online" ? <Wifi className="size-3" /> : <WifiOff className="size-3" />}
                {robotStatus.serverStatus}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
              <span className="text-sm">View</span>
              <div className="flex gap-1">
                <button onClick={() => setViewMode("grid")} className={`p-1 rounded ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                  <Grid3x3 className="size-4" />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-1 rounded ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                  <List className="size-4" />
                </button>
              </div>
            </div>
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Status Bar */}
        <div className="flex items-center gap-4 flex-wrap mb-4 p-3 bg-card/30 rounded-xl border">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${robotRunning ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            <span className="text-sm font-medium">{robotRunning ? "Active" : "Stopped"}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Server className="size-4" />
            {robotStatus.currentSymbol} @ {robotStatus.currentPrice.toFixed(4)}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Waves className="size-4" />
            Spread: {robotStatus.spread} pips
          </div>
          <div className="flex-1" />
          <button
            onClick={toggleRobot}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all text-sm ${
              robotRunning 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
            }`}
          >
            {loading ? <RefreshCw className="size-4 animate-spin" /> : robotRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
            {robotRunning ? "Stop" : "Start"}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="p-3 border rounded-xl bg-card/30 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Profit</p>
                <p className={`text-xl font-bold ${robotStatus.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ${robotStatus.profit.toFixed(2)}
                </p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="size-5 text-green-500" />
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-xl bg-card/30 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Win Rate</p>
                <p className="text-xl font-bold text-blue-500">{robotStatus.winRate}%</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Target className="size-5 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-xl bg-card/30 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Trades</p>
                <p className="text-xl font-bold">{robotStatus.totalTrades}</p>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="size-5 text-purple-500" />
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-xl bg-card/30 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Equity</p>
                <p className="text-xl font-bold">${robotStatus.equity.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Wallet className="size-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="border rounded-xl p-3 bg-card/30 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <LineChart className="size-5 text-blue-500" />
              <h3 className="font-semibold">Price Chart</h3>
              <span className="text-xs text-muted-foreground">{selectedSymbol}</span>
            </div>
            <div className="flex gap-2">
              <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)} className="px-2 py-1 text-sm border rounded-lg bg-background">
                {symbols.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button className="px-2 py-1 text-sm border rounded-lg hover:bg-accent">
                <RefreshCw className="size-4" />
              </button>
            </div>
          </div>
          <div className="h-48 relative">
            <div className="absolute inset-0 flex items-end">
              {chartData.map((point, idx) => {
                const maxValue = Math.max(...chartData.map(p => p.value));
                const minValue = Math.min(...chartData.map(p => p.value));
                const height = ((point.value - minValue) / (maxValue - minValue)) * 90 + 5;
                const isUp = idx > 0 && point.value > chartData[idx-1].value;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full max-w-[30px] rounded-t-sm transition-all ${isUp ? "bg-green-500" : "bg-red-500"}`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground mt-1">{point.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Signals */}
        <div className="border rounded-xl p-3 bg-card/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="size-5 text-yellow-500" />
            <h3 className="font-semibold">Live Signals</h3>
            <button className="text-xs text-muted-foreground hover:text-foreground">Auto-refresh</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {signals.map((signal, idx) => (
              <div key={idx} className="p-2 border rounded-lg hover:bg-accent/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{signal.symbol}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${signal.action === "BUY" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                    {signal.action}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {signal.trend === "Bullish" ? <TrendingUp className="size-3 text-green-500" /> : <TrendingDown className="size-3 text-red-500" />}
                  <span className="text-xs">{signal.trend}</span>
                  <span className="text-[10px] text-muted-foreground">{signal.confidence}%</span>
                </div>
                <div className="mt-1">
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${signal.trend === "Bullish" ? "bg-green-500" : "bg-red-500"}`} style={{ width: `${signal.confidence}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal */}
        {showTerminal && (
          <div ref={terminalRef} className="border rounded-xl overflow-hidden bg-black text-white mb-4" style={{ height: terminalHeight }}>
            <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-300">Njabulo Trend Terminal</span>
                <span className="text-[10px] text-gray-500">{logs.length} logs</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setShowTerminal(false)} className="p-1 hover:bg-gray-800 rounded">
                  <Minimize className="size-3 text-gray-400" />
                </button>
                <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 hover:bg-gray-800 rounded">
                  {isMaximized ? <Minimize2 className="size-3 text-gray-400" /> : <Maximize2 className="size-3 text-gray-400" />}
                </button>
              </div>
            </div>
            <div className={`p-2 overflow-y-auto ${isMaximized ? "h-[calc(100%-40px)]" : "h-[calc(100%-40px)]"}`} style={{ height: terminalHeight - 40 }}>
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 text-xs py-0.5 font-mono border-b border-gray-900">
                  <span className="text-gray-500 shrink-0">[{log.time}]</span>
                  <span className={`${
                    log.type === "success" ? "text-green-400" :
                    log.type === "error" ? "text-red-400" :
                    log.type === "warning" ? "text-yellow-400" :
                    "text-gray-300"
                  }`}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screenshot Upload */}
        <div className="border rounded-xl p-3 bg-card/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Image className="size-5 text-purple-500" />
              <h3 className="font-semibold">Screenshots</h3>
            </div>
            <button onClick={() => setShowImageUpload(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              <Upload className="size-4" /> Upload
            </button>
          </div>
          
          {uploadedImage ? (
            <div className="relative">
              <img src={uploadedImage} alt="MT5 Chart" className="w-full rounded-lg max-h-64 object-contain" />
              <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Image className="size-10 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No screenshot uploaded</p>
            </div>
          )}
        </div>

        {/* Image Upload Modal */}
        {showImageUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl p-6 max-w-md w-full mx-4 border shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upload Screenshot</h3>
                <button onClick={() => setShowImageUpload(false)} className="p-1 hover:bg-accent rounded">
                  <X className="size-5" />
                </button>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center relative">
                <Image className="size-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground mb-2">Click or drag to upload</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setShowImageUpload(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-accent">
                  Cancel
                </button>
                <label className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-center cursor-pointer">
                  Choose File
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Njabulo Trend Robot | MT5 Forex Trading Bot | 24/7 Active
          </p>
          <div className="flex items-center justify-center gap-4 mt-1">
            <span className="text-[10px] text-green-500">✅ Active</span>
            <span className="text-[10px] text-blue-500">📈 Profit</span>
            <span className="text-[10px] text-purple-500">🔒 Secure</span>
            <span className="text-[10px] text-orange-500">⚡ Auto</span>
          </div>
        </div>
      </div>
    </div>
  );
  }
