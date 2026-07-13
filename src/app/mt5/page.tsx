"use client";

import { useState, useEffect } from "react";
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
  Cpu, Battery, Wifi, WifiOff, Signal, Power
} from "lucide-react";

// Types
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
};

type Notification = {
  id: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
  time: string;
  read: boolean;
};

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  country: string;
  avatar: string;
  joined: string;
  tier: "basic" | "pro" | "premium";
  apiKey: string;
};

type ChartData = {
  time: string;
  value: number;
};

export default function MT5Page() {
  const [selectedSymbol, setSelectedSymbol] = useState("EURUSD");
  const [robotRunning, setRobotRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profitMode, setProfitMode] = useState("auto");

  // User Profile State
  const [profile, setProfile] = useState<UserProfile>({
    name: "Njabulo Jb",
    email: "njabulo@example.com",
    phone: "+267 77 821 911",
    country: "Botswana",
    avatar: "/me.png",
    joined: "2026-01-15",
    tier: "pro",
    apiKey: "MT5-API-7X8K9L2M4N6P8Q9R1S3T5U7V9W1X3Y5Z7"
  });

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

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", type: "success", message: "Njabulo Trend Bot started successfully", time: "2 min ago", read: false },
    { id: "2", type: "info", message: "New BUY signal detected on EURUSD", time: "15 min ago", read: false },
    { id: "3", type: "warning", message: "Stop Loss hit on XAUUSD trade", time: "1 hour ago", read: false },
    { id: "4", type: "success", message: "Profit target reached on GBPUSD", time: "2 hours ago", read: true },
    { id: "5", type: "error", message: "Connection lost to MT5 server", time: "3 hours ago", read: true },
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
    serverStatus: "online"
  });

  const [chartData] = useState<ChartData[]>([
    { time: "09:00", value: 1.0900 },
    { time: "09:30", value: 1.0915 },
    { time: "10:00", value: 1.0920 },
    { time: "10:30", value: 1.0935 },
    { time: "11:00", value: 1.0950 },
    { time: "11:30", value: 1.0965 },
    { time: "12:00", value: 1.0952 },
    { time: "12:30", value: 1.0970 },
    { time: "13:00", value: 1.0968 },
    { time: "13:30", value: 1.0982 },
    { time: "14:00", value: 1.0975 },
    { time: "14:30", value: 1.0987 }
  ]);

  const symbols = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "NZDUSD", "XAUUSD", "BTCUSD"];

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleRobot = () => {
    setLoading(true);
    setTimeout(() => {
      setRobotRunning(!robotRunning);
      setRobotStatus({
        ...robotStatus,
        running: !robotRunning
      });
      // Add notification
      const newNotif: Notification = {
        id: Date.now().toString(),
        type: robotRunning ? "warning" : "success",
        message: robotRunning ? "Njabulo Trend Bot stopped" : "Njabulo Trend Bot started successfully",
        time: "Just now",
        read: false
      };
      setNotifications([newNotif, ...notifications]);
      setLoading(false);
    }, 1500);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoading(false);
      const newNotif: Notification = {
        id: Date.now().toString(),
        type: "success",
        message: "Successfully logged in to MT5 Dashboard",
        time: "Just now",
        read: false
      };
      setNotifications([newNotif, ...notifications]);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(true);
    const newNotif: Notification = {
      id: Date.now().toString(),
      type: "info",
      message: "Logged out of MT5 Dashboard",
      time: "Just now",
      read: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setShowImageUpload(false);
        const newNotif: Notification = {
          id: Date.now().toString(),
          type: "success",
          message: "Chart screenshot uploaded successfully",
          time: "Just now",
          read: false
        };
        setNotifications([newNotif, ...notifications]);
      };
      reader.readAsDataURL(file);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? "text-green-500" : "text-red-500";
  };

  const getProfitBg = (profit: number) => {
    return profit >= 0 ? "bg-green-500/10" : "bg-red-500/10";
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

  // Quick profit mode settings
  const profitModes = ["auto", "aggressive", "conservative", "scalping"];

  // Login Screen
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
              <Bot className="size-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Njabulo Trend Bot
            </h1>
            <p className="text-muted-foreground">MT5 Forex Trading Platform</p>
          </div>
          
          <div className="border rounded-xl p-6 bg-card/50">
            <h2 className="text-xl font-semibold mb-4 text-center">Login to Dashboard</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="njabulo@example.com"
                  className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold disabled:opacity-50"
              >
                {loading ? <RefreshCw className="size-5 animate-spin mx-auto" /> : "Login"}
              </button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-accent transition-colors">
                  <Facebook className="size-5 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-accent transition-colors">
                  <Chrome className="size-5 text-red-500" />
                  <span className="text-sm">Google</span>
                </button>
              </div>
              
              <div className="text-center">
                <button className="text-sm text-muted-foreground hover:text-foreground">
                  Forgot password?
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Bot className="size-6 text-blue-500" />
              <span className="font-bold">Njabulo Trend</span>
            </div>
            <div className="hidden md:flex gap-4">
              <button onClick={() => setActiveTab("dashboard")} className={`text-sm px-3 py-1 rounded-lg ${activeTab === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                Dashboard
              </button>
              <button onClick={() => setActiveTab("trades")} className={`text-sm px-3 py-1 rounded-lg ${activeTab === "trades" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                Trades
              </button>
              <button onClick={() => setActiveTab("signals")} className={`text-sm px-3 py-1 rounded-lg ${activeTab === "signals" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                Signals
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Profile */}
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1.5 hover:bg-accent rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm hidden md:inline">{profile.name}</span>
            </button>
            
            {/* Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Settings className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute right-4 top-16 z-50 w-72 border rounded-xl bg-card shadow-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full">
                {profile.tier.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={() => setEditingProfile(!editingProfile)} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg text-sm">
              <User className="size-4" /> Edit Profile
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-lg text-sm">
              <Lock className="size-4" /> Change Password
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-500/10 rounded-lg text-sm text-red-500">
              <LogIn className="size-4" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-4 top-16 z-50 w-80 border rounded-xl bg-card shadow-xl max-h-96 overflow-y-auto">
          <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-card">
            <h3 className="font-semibold">Notifications</h3>
            <button onClick={clearNotifications} className="text-xs text-muted-foreground hover:text-foreground">
              Clear all
            </button>
          </div>
          <div className="p-2 space-y-2">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No notifications</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${notif.read ? "opacity-60" : "border-blue-500/30 bg-blue-500/5"}`}
                >
                  <div className="flex items-start gap-2">
                    {notif.type === "success" && <CheckCircle className="size-4 text-green-500 mt-0.5" />}
                    {notif.type === "error" && <AlertCircle className="size-4 text-red-500 mt-0.5" />}
                    {notif.type === "warning" && <AlertCircle className="size-4 text-yellow-500 mt-0.5" />}
                    {notif.type === "info" && <Bell className="size-4 text-blue-500 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute right-4 top-16 z-50 w-72 border rounded-xl bg-card shadow-xl p-4">
          <h3 className="font-semibold mb-3">Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
              <span className="text-sm">Profit Mode</span>
              <select
                value={profitMode}
                onChange={(e) => setProfitMode(e.target.value)}
                className="px-2 py-1 text-sm border rounded-lg bg-background"
              >
                {profitModes.map((mode) => (
                  <option key={mode} value={mode}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
              <span className="text-sm">Server Status</span>
              <span className={`flex items-center gap-1 text-sm ${robotStatus.serverStatus === "online" ? "text-green-500" : "text-red-500"}`}>
                {robotStatus.serverStatus === "online" ? <Wifi className="size-3" /> : <WifiOff className="size-3" />}
                {robotStatus.serverStatus}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
              <span className="text-sm">Uptime</span>
              <span className="text-sm">{robotStatus.uptime}</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
              <span className="text-sm">API Key</span>
              <span className="text-xs text-muted-foreground font-mono">{profile.apiKey.substring(0, 12)}...</span>
            </div>
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Njabulo Trend Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">24/7 Automated Trading • No Stop Loss • Guaranteed Profit</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${robotRunning ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
              <div className={`w-2 h-2 rounded-full ${robotRunning ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
              <span className="text-sm font-medium">{robotRunning ? "Running" : "Stopped"}</span>
            </div>
            <button
              onClick={toggleRobot}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                robotRunning 
                  ? "bg-red-500 text-white hover:bg-red-600" 
                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
              } disabled:opacity-50`}
            >
              {loading ? <RefreshCw className="size-4 animate-spin" /> : robotRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
              {robotRunning ? "Stop Bot" : "Start Bot"}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 border rounded-xl bg-card/30 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Profit</p>
                <p className={`text-xl font-bold ${robotStatus.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ${robotStatus.profit.toFixed(2)}
                </p>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="size-5 text-green-500" />
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-xl bg-card/30 hover:shadow-lg transition-all">
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
          <div className="p-4 border rounded-xl bg-card/30 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Trades</p>
                <p className="text-xl font-bold">{robotStatus.totalTrades}</p>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="size-5 text-purple-500" />
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-xl bg-card/30 hover:shadow-lg transition-all">
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
        <div className="border rounded-xl p-4 bg-card/30 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <LineChart className="size-5 text-blue-500" />
              <h3 className="font-semibold">Live Price Chart</h3>
              <span className="text-xs text-muted-foreground">{selectedSymbol}</span>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="px-2 py-1 text-sm border rounded-lg bg-background"
              >
                {symbols.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button className="px-2 py-1 text-sm border rounded-lg hover:bg-accent">
                <RefreshCw className="size-4" />
              </button>
            </div>
          </div>
          <div className="h-64 relative">
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

        {/* Signals & Trades */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Signals */}
          <div className="border rounded-xl p-4 bg-card/30">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="size-5 text-yellow-500" />
              <h3 className="font-semibold">Live Signals</h3>
              <span className="text-xs text-muted-foreground">Auto-generated</span>
            </div>
            <div className="space-y-3">
              {signals.map((signal, idx) => (
                <div key={idx} className="p-3 border rounded-lg hover:bg-accent/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{signal.symbol}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      signal.action === "BUY" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}>
                      {signal.action}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {signal.trend === "Bullish" ? (
                      <TrendingUp className="size-4 text-green-500" />
                    ) : (
                      <TrendingDown className="size-4 text-red-500" />
                    )}
                    <span className="text-sm">{signal.trend}</span>
                    <span className="text-xs text-muted-foreground">Strength: {signal.strength}%</span>
                  </div>
                  <div className="mt-1">
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${signal.trend === "Bullish" ? "bg-green-500" : "bg-red-500"}`}
                        style={{ width: `${signal.confidence}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                      <span>Entry: {signal.entry}</span>
                      <span>Target: {signal.target}</span>
                      <span>Stop: {signal.stop}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Trades */}
          <div className="border rounded-xl p-4 bg-card/30">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="size-5 text-blue-500" />
              <h3 className="font-semibold">Open Trades</h3>
              <span className="text-xs text-muted-foreground">{trades.filter(t => t.status === "open").length} active</span>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {trades.filter(t => t.status === "open").map((trade) => (
                <div key={trade.id} className="p-3 border rounded-lg hover:bg-accent/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{trade.symbol}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        trade.type === "buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                      }`}>
                        {trade.type.toUpperCase()}
                      </span>
                    </div>
                    <span className={`font-medium ${getProfitColor(trade.profit)}`}>
                      ${trade.profit.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>Open: {trade.openPrice}</span>
                    <span>Current: {trade.currentPrice}</span>
                    <span>Vol: {trade.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screenshot Upload */}
        <div className="border rounded-xl p-4 bg-card/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Image className="size-5 text-purple-500" />
              <h3 className="font-semibold">MT5 Screenshot</h3>
              <span className="text-xs text-muted-foreground">Upload chart screenshot</span>
            </div>
            <button
              onClick={() => setShowImageUpload(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              <Upload className="size-4" />
              Upload Image
            </button>
          </div>
          
          {uploadedImage ? (
            <div className="relative">
              <img 
                src={uploadedImage} 
                alt="MT5 Chart" 
                className="w-full rounded-lg max-h-96 object-contain"
              />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
              <Image className="size-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground">No screenshot uploaded</p>
              <p className="text-xs text-muted-foreground mt-1">Upload a screenshot from your MT5 platform</p>
            </div>
          )}
        </div>

        {/* Image Upload Modal */}
        {showImageUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl p-6 max-w-md w-full mx-4 border shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upload MT5 Screenshot</h3>
                <button onClick={() => setShowImageUpload(false)} className="p-1 hover:bg-accent rounded">
                  <X className="size-5" />
                </button>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center relative">
                <Image className="size-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground mb-2">Drag & drop or click to upload</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-accent"
                >
                  Cancel
                </button>
                <label className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-center cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Njabulo Trend Robot | MT5 Forex Trading Bot
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            ⚠️ Risk Warning: Trading forex involves significant risk. Past performance is not indicative of future results.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="text-[10px] text-green-500">✅ 24/7 Active</span>
            <span className="text-[10px] text-blue-500">📈 Auto Profit</span>
            <span className="text-[10px] text-purple-500">🔒 Secure</span>
            <span className="text-[10px] text-orange-500">⚡ No Stop Loss</span>
          </div>
        </div>
      </div>
    </div>
  );
  }
