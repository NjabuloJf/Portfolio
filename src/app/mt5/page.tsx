"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, DollarSign, BarChart3,
  Activity, Clock, Calendar, Settings, Play, Pause,
  RefreshCw, Upload, Image, X, CheckCircle, AlertCircle,
  Zap, Shield, Bot, LineChart, PieChart, ArrowUpRight,
  ArrowDownRight, Wallet, Star, Award, Target, Eye,
  Users, Bell, LogIn, User, Edit, Lock, Save, Trash2,
  Menu, Home, Github, Twitter, Linkedin, Mail, Phone,
  MapPin, Globe, Server, Cpu, Battery, Wifi, WifiOff,
  Signal, Power, Terminal, Maximize, Minimize, ChevronRight,
  ChevronDown, Filter, Grid3x3, List, Download, UploadCloud,
  Volume2, VolumeX, Mic, MicOff, MonitorPlay, Radio, Waves,
  ArrowUp, ArrowDown, Minus, Plus, Maximize2, Minimize2,
  Square, Circle, AlertTriangle, Info, HelpCircle,
  Rocket, Sparkles, Crown, Diamond, Flame, Zap as ZapIcon,
  Brain, Cpu as CpuIcon, ChartLine, ChartBar, ChartScatter, ChartPie,
  Clock4, Clock8, Clock12, AlarmClock, Timer,
  Cloud, CloudRain, CloudSnow, CloudSun, CloudMoon,
  Sun, Moon, Heart, ThumbsUp, ThumbsDown,
  MessageCircle, MessageSquare, Send, MailPlus, PhoneCall,
  Video, Camera, Film, Music, Headphones,
  Tv, Monitor, Smartphone, Tablet, Laptop,
  Watch, Glasses, Briefcase, ShoppingBag, Coffee,
  Book, BookOpen, GraduationCap, School, University,
  Building, Factory, Warehouse, Truck, Car, Bus,
  Train, Plane, Rocket as RocketIcon, Satellite,
  Compass, Map, Navigation, Anchor, Ship, Sailboat,
  Fish, Bird, Dog, Cat, Tree, Flower, Leaf,
  Mountain, Cloud as CloudIcon, Sun as SunIcon,
  Moon as MoonIcon, Star as StarIcon2, Heart as HeartIcon,
  Award as AwardIcon2, Trophy, Medal, Ribbon,
  Gift, Gem, Crown as CrownIcon, Diamond as DiamondIcon,
  Sparkles as SparklesIcon, Zap as ZapIcon2,
  Loader2
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
  type: "info" | "success" | "error" | "warning" | "signal";
};

type TrendData = {
  symbol: string;
  trend: "bullish" | "bearish" | "neutral";
  strength: number;
  confidence: number;
  entry: number;
  target: number;
  stop: number;
  time: string;
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profitMode, setProfitMode] = useState("auto");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [terminalHeight, setTerminalHeight] = useState(280);
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedTrend, setSelectedTrend] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
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
    { id: "1", time: "14:32:15", message: "✓ Njabulo Trend Bot started successfully", type: "success" },
    { id: "2", time: "14:30:22", message: "▲ BUY signal detected on EURUSD at 1.09845", type: "signal" },
    { id: "3", time: "14:28:10", message: "⟳ Trailing Stop updated to 1.09750", type: "info" },
    { id: "4", time: "14:25:33", message: "● Profit target reached on GBPUSD +$45.20", type: "success" },
    { id: "5", time: "14:20:18", message: "⚠ Stop Loss hit on XAUUSD -$22.10", type: "warning" },
    { id: "6", time: "14:15:05", message: "✕ Connection lost to server, reconnecting...", type: "error" },
    { id: "7", time: "14:10:00", message: "✓ Server reconnected successfully", type: "success" },
  ]);

  const [trends, setTrends] = useState<TrendData[]>([
    { symbol: "EURUSD", trend: "bullish", strength: 85, confidence: 88, entry: 1.0950, target: 1.1050, stop: 1.0880, time: "14:30" },
    { symbol: "GBPUSD", trend: "bearish", strength: 72, confidence: 76, entry: 1.2790, target: 1.2700, stop: 1.2860, time: "14:25" },
    { symbol: "USDJPY", trend: "bullish", strength: 68, confidence: 70, entry: 149.50, target: 151.00, stop: 148.00, time: "14:20" },
    { symbol: "XAUUSD", trend: "bullish", strength: 92, confidence: 94, entry: 2365.00, target: 2400.00, stop: 2340.00, time: "14:15" },
    { symbol: "AUDUSD", trend: "neutral", strength: 55, confidence: 60, entry: 0.6750, target: 0.6850, stop: 0.6650, time: "14:10" },
    { symbol: "USDCAD", trend: "bearish", strength: 65, confidence: 68, entry: 1.3650, target: 1.3550, stop: 1.3720, time: "14:05" },
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

  const timeframes = ["M1", "M5", "M15", "M30", "H1", "H4", "D1", "W1", "MN"];

  const toggleRobot = () => {
    setLoading(true);
    const newStatus = !robotRunning;
    setRobotRunning(newStatus);
    setRobotStatus({
      ...robotStatus,
      running: newStatus
    });
    
    const log: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      message: newStatus ? "✓ Njabulo Trend Bot started successfully" : "⏹ Njabulo Trend Bot stopped",
      type: newStatus ? "success" : "warning"
    };
    setLogs([log, ...logs]);
    setLoading(false);
  };

  const addLog = (message: string, type: "info" | "success" | "error" | "warning" | "signal" = "info") => {
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
        
        setTimeout(() => {
          setIsAnalyzing(true);
          const insights = [
            "📊 Trend Analysis: Strong bullish momentum detected on EURUSD. Consider BUY entries.",
            "🔍 Key Levels: Resistance at 1.1050, Support at 1.0880. Watch for breakout.",
            "📈 Volume: Increasing volume confirms trend strength. Confidence: 88%",
            "⚡ Signal: BUY entry at 1.0950, target 1.1050, stop loss 1.0880",
            "💡 AI Insight: Based on chart patterns, price likely to continue upward."
          ];
          let i = 0;
          const interval = setInterval(() => {
            if (i < insights.length) {
              setAiInsight(insights[i]);
              addLog(`🤖 AI Analysis: ${insights[i]}`, "signal");
              i++;
            } else {
              clearInterval(interval);
              setIsAnalyzing(false);
            }
          }, 1500);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    addLog("🔍 Starting Njabulo Trend Analysis...", "info");
    addLog("📊 Scanning all symbols for entry signals...", "info");
    
    setTimeout(() => {
      addLog("✓ Signal detected on EURUSD - STRONG BUY", "signal");
      addLog("✓ Signal detected on XAUUSD - BUY", "signal");
      addLog("✓ Signal detected on GBPUSD - SELL", "signal");
      addLog("● Trade executed on EURUSD at 1.09845", "success");
      setIsAnalyzing(false);
    }, 3000);
  };

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case "bullish": return "text-green-500";
      case "bearish": return "text-red-500";
      default: return "text-yellow-500";
    }
  };

  const getTrendBg = (trend: string) => {
    switch(trend) {
      case "bullish": return "bg-green-500/20";
      case "bearish": return "bg-red-500/20";
      default: return "bg-yellow-500/20";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case "bullish": return <TrendingUp className="size-3" />;
      case "bearish": return <TrendingDown className="size-3" />;
      default: return <Minus className="size-3" />;
    }
  };

  const getTrendText = (trend: string) => {
    switch(trend) {
      case "bullish": return "Bullish";
      case "bearish": return "Bearish";
      default: return "Neutral";
    }
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg animate-pulse">
                <Bot className="size-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Njabulo Trend</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full animate-pulse">24/7</span>
              <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">AI-Powered</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setActiveTab("dashboard")} className={`px-3 py-1 text-sm rounded-lg transition-all ${activeTab === "dashboard" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-slate-800"}`}>
                <Home className="size-4 inline mr-1" /> Dashboard
              </button>
              <button onClick={() => setActiveTab("signals")} className={`px-3 py-1 text-sm rounded-lg transition-all ${activeTab === "signals" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-slate-800"}`}>
                <Zap className="size-4 inline mr-1" /> Signals
              </button>
              <button onClick={() => setActiveTab("trades")} className={`px-3 py-1 text-sm rounded-lg transition-all ${activeTab === "trades" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-slate-800"}`}>
                <Activity className="size-4 inline mr-1" /> Trades
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={runAnalysis} className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 text-sm">
              <Rocket className="size-4" /> Run
            </button>
            
            <button onClick={() => setShowTerminal(!showTerminal)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-gray-400 hover:text-white">
              <Terminal className="size-5" />
            </button>
            
            <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-gray-400 hover:text-white">
              <Settings className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute right-4 top-14 z-50 w-80 border border-purple-900/30 rounded-xl bg-slate-950 shadow-2xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-white"><Settings className="size-4" /> Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-slate-800 rounded-lg">
              <span className="text-sm text-gray-300">Mode</span>
              <select value={profitMode} onChange={(e) => setProfitMode(e.target.value)} className="px-2 py-1 text-sm border border-slate-700 rounded-lg bg-slate-900 text-white">
                <option value="auto">Auto</option>
                <option value="aggressive">Aggressive</option>
                <option value="conservative">Conservative</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-slate-800 rounded-lg">
              <span className="text-sm text-gray-300">Timeframe</span>
              <select className="px-2 py-1 text-sm border border-slate-700 rounded-lg bg-slate-900 text-white">
                {timeframes.map((tf) => <option key={tf} value={tf}>{tf}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-slate-800 rounded-lg">
              <span className="text-sm text-gray-300">View</span>
              <div className="flex gap-1">
                <button onClick={() => setViewMode("grid")} className={`p-1 rounded ${viewMode === "grid" ? "bg-purple-600" : "hover:bg-slate-800"}`}>
                  <Grid3x3 className="size-4" />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-1 rounded ${viewMode === "list" ? "bg-purple-600" : "hover:bg-slate-800"}`}>
                  <List className="size-4" />
                </button>
              </div>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Status Bar */}
        <div className="flex items-center gap-4 flex-wrap mb-4 p-3 bg-slate-900/50 rounded-xl border border-purple-900/30">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${robotRunning ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            <span className="text-sm font-medium text-white">{robotRunning ? "Active" : "Stopped"}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <Server className="size-4" />
            {robotStatus.currentSymbol} @ <span className="text-green-400">{robotStatus.currentPrice.toFixed(4)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <Waves className="size-4" />
            Spread: {robotStatus.spread} pips
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <Clock className="size-4" />
            {robotStatus.uptime}
          </div>
          <div className="flex-1" />
          <button onClick={toggleRobot} disabled={loading} className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all text-sm ${robotRunning ? "bg-red-500 text-white hover:bg-red-600" : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"}`}>
            {loading ? <RefreshCw className="size-4 animate-spin" /> : robotRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
            {robotRunning ? "Stop" : "Start"}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="p-3 border border-purple-900/30 rounded-xl bg-slate-900/30 hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Profit</p>
                <p className={`text-xl font-bold ${robotStatus.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ${robotStatus.profit.toFixed(2)}
                </p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="size-5 text-green-500" />
              </div>
            </div>
          </div>
          <div className="p-3 border border-purple-900/30 rounded-xl bg-slate-900/30 hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Win Rate</p>
                <p className="text-xl font-bold text-blue-400">{robotStatus.winRate}%</p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Target className="size-5 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="p-3 border border-purple-900/30 rounded-xl bg-slate-900/30 hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Trades</p>
                <p className="text-xl font-bold text-purple-400">{robotStatus.totalTrades}</p>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="size-5 text-purple-400" />
              </div>
            </div>
          </div>
          <div className="p-3 border border-purple-900/30 rounded-xl bg-slate-900/30 hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Equity</p>
                <p className="text-xl font-bold text-orange-400">${robotStatus.equity.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Wallet className="size-5 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="border border-purple-900/30 rounded-xl p-3 bg-slate-900/30 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <LineChart className="size-5 text-purple-400" />
              <h3 className="font-semibold text-white">Price Chart</h3>
              <span className="text-xs text-gray-400">{selectedSymbol}</span>
            </div>
            <div className="flex gap-2">
              <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)} className="px-2 py-1 text-sm border border-slate-700 rounded-lg bg-slate-900 text-white">
                {symbols.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button className="px-2 py-1 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 text-gray-400">
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
                    <div className={`w-full max-w-[30px] rounded-t-sm transition-all ${isUp ? "bg-green-500" : "bg-red-500"}`} style={{ height: `${height}%` }} />
                    <span className="text-[10px] text-gray-500 mt-1">{point.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        {aiInsight && (
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <Brain className="size-5 text-purple-400 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-purple-300">AI Analysis</p>
                <p className="text-sm text-gray-300">{aiInsight}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Analysis */}
        {isAnalyzing && (
          <div className="mb-4 p-3 bg-slate-900/50 border border-purple-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <Loader2 className="size-5 animate-spin text-purple-400" />
              <span className="text-sm text-gray-300">Analyzing charts with AI...</span>
            </div>
          </div>
        )}

        {/* Trends Section */}
        <div className="border border-purple-900/30 rounded-xl p-3 bg-slate-900/30 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="size-5 text-purple-400 animate-bounce" />
            <h3 className="font-semibold text-white">Live Trends</h3>
            <span className="text-xs text-gray-400">Auto-updating</span>
            <span className="text-xs text-green-400 ml-2">● {trends.length} active</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {trends.map((trend, idx) => (
              <div 
                key={idx} 
                className={`p-2 border rounded-lg transition-all cursor-pointer hover:border-purple-500/50 ${selectedTrend === idx ? "border-purple-500 bg-purple-500/10" : "border-slate-700/50"}`}
                onClick={() => setSelectedTrend(idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white text-sm">{trend.symbol}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${getTrendBg(trend.trend)} ${getTrendColor(trend.trend)}`}>
                    {getTrendIcon(trend.trend)} {getTrendText(trend.trend)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">Strength: {trend.strength}%</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">Conf: {trend.confidence}%</span>
                </div>
                <div className="mt-1">
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${trend.trend === "bullish" ? "bg-green-500" : trend.trend === "bearish" ? "bg-red-500" : "bg-yellow-500"}`} style={{ width: `${trend.confidence}%` }} />
                  </div>
                </div>
                <div className="flex gap-2 mt-1 text-[10px] text-gray-500">
                  <span>Entry: {trend.entry}</span>
                  <span>Target: {trend.target}</span>
                  <span>Stop: {trend.stop}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal */}
        {showTerminal && (
          <div ref={terminalRef} className="border border-purple-900/30 rounded-xl overflow-hidden bg-slate-950 text-white mb-4" style={{ height: terminalHeight }}>
            <div className="flex items-center justify-between p-2 bg-slate-900 border-b border-purple-900/30">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-300">Njabulo Trend Terminal</span>
                <span className="text-[10px] text-gray-500">{logs.length} logs</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setShowTerminal(false)} className="p-1 hover:bg-slate-800 rounded">
                  <Minimize className="size-3 text-gray-400" />
                </button>
                <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 hover:bg-slate-800 rounded">
                  {isMaximized ? <Minimize2 className="size-3 text-gray-400" /> : <Maximize2 className="size-3 text-gray-400" />}
                </button>
              </div>
            </div>
            <div className="p-2 overflow-y-auto" style={{ height: terminalHeight - 40 }}>
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 text-xs py-0.5 font-mono border-b border-slate-900/50">
                  <span className="text-gray-500 shrink-0">[{log.time}]</span>
                  <span className={`${
                    log.type === "success" ? "text-green-400" :
                    log.type === "error" ? "text-red-400" :
                    log.type === "warning" ? "text-yellow-400" :
                    log.type === "signal" ? "text-purple-400" :
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
        <div className="border border-purple-900/30 rounded-xl p-3 bg-slate-900/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Image className="size-5 text-purple-400" />
              <h3 className="font-semibold text-white">Screenshots</h3>
              <span className="text-xs text-gray-400">Upload & analyze</span>
            </div>
            <button onClick={() => setShowImageUpload(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600">
              <Upload className="size-4" /> Upload
            </button>
          </div>
          
          {uploadedImage ? (
            <div className="relative">
              <img src={uploadedImage} alt="MT5 Chart" className="w-full rounded-lg max-h-64 object-contain border border-purple-900/30" />
              <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-purple-900/30 rounded-lg p-8 text-center">
              <Image className="size-10 mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-400">No screenshot uploaded</p>
              <p className="text-xs text-gray-500">Upload to get AI analysis</p>
            </div>
          )}
        </div>

        {/* Image Upload Modal */}
        {showImageUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-slate-950 rounded-xl p-6 max-w-md w-full mx-4 border border-purple-500/30 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Upload Screenshot</h3>
                <button onClick={() => setShowImageUpload(false)} className="p-1 hover:bg-slate-800 rounded">
                  <X className="size-5 text-gray-400" />
                </button>
              </div>
              <div className="border-2 border-dashed border-purple-900/30 rounded-lg p-8 text-center relative">
                <Image className="size-12 mx-auto mb-3 text-gray-500" />
                <p className="text-sm text-gray-400 mb-2">Click or drag to upload</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setShowImageUpload(false)} className="flex-1 px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 text-gray-400">
                  Cancel
                </button>
                <label className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 text-center cursor-pointer">
                  Choose File
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-purple-900/30 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Njabulo Trend Robot | MT5 Forex Trading Bot | 24/7 Active
          </p>
          <div className="flex items-center justify-center gap-4 mt-1">
            <span className="text-[10px] text-green-400 flex items-center gap-1"><Wifi className="size-3" /> Active</span>
            <span className="text-[10px] text-blue-400 flex items-center gap-1"><TrendingUp className="size-3" /> Profit</span>
            <span className="text-[10px] text-purple-400 flex items-center gap-1"><Shield className="size-3" /> Secure</span>
            <span className="text-[10px] text-orange-400 flex items-center gap-1"><Zap className="size-3" /> Auto</span>
            <span className="text-[10px] text-pink-400 flex items-center gap-1"><Brain className="size-3" /> AI</span>
          </div>
        </div>
      </div>
    </div>
  );
  }
