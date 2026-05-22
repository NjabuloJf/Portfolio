"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bot, Menu, Plus, Trash2, Edit2, MessageSquare,
  Copy, Check, Code, Cloud, Server, Clock, 
  QrCode, Github, FileArchive, Download, Zap, Box
} from "lucide-react";
import { DATA } from "@/data/resume";
import { ButtonsUiPairs } from "@/components/buttonsui-pairs";
import { NjabuloUiFeatures } from "@/components/njabuloui-features";

type Chat = {
  id: string;
  name: string;
  createdAt: Date;
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function NjabuloUiBotPage() {
  const [chats, setChats] = useState<Chat[]>(() => {
    const saved = localStorage.getItem("njabulo-uibot-chats");
    return saved ? JSON.parse(saved) : [
      { id: "1", name: "Welcome Chat", createdAt: new Date() },
      { id: "2", name: "Deployment Guide", createdAt: new Date() },
      { id: "3", name: "Code Examples", createdAt: new Date() }
    ];
  });
  const [currentChatId, setCurrentChatId] = useState<string | null>("1");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const saveChats = (newChats: Chat[]) => {
    setChats(newChats);
    localStorage.setItem("njabulo-uibot-chats", JSON.stringify(newChats));
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Chat ${chats.length + 1}`,
      createdAt: new Date(),
    };
    saveChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    saveChats(updatedChats);
    if (currentChatId === chatId && updatedChats.length > 0) {
      setCurrentChatId(updatedChats[0].id);
    }
  };

  const renameChat = (chatId: string, newName: string) => {
    const updatedChats = chats.map(chat =>
      chat.id === chatId ? { ...chat, name: newName } : chat
    );
    saveChats(updatedChats);
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-80" : "w-16"} border-r border-border transition-all duration-300 flex flex-col bg-card/50`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Bot className="size-6 text-purple-500" />
              <span className="font-semibold">Njabulo UI</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Menu className="size-5" />
          </button>
        </div>

        <button
          onClick={createNewChat}
          className="m-3 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          <Plus className="size-4" />
          {sidebarOpen && <span>New Chat</span>}
        </button>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                currentChatId === chat.id ? "bg-accent" : "hover:bg-accent/50"
              }`}
              onClick={() => setCurrentChatId(chat.id)}
            >
              <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
              {sidebarOpen && (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{chat.name}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newName = prompt("Enter new chat name:", chat.name);
                      if (newName) renameChat(chat.id, newName);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded"
                  >
                    <Edit2 className="size-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this chat?")) deleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-red-500"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {sidebarOpen && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={DATA.avatarUrl} alt={DATA.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{DATA.name}</span>
                  <div className="bg-blue-500 rounded-full p-0.5">
                    <CheckIcon className="size-2 text-white" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">UI Bot Developer</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with ButtonsUiPairs */}
        <div className="p-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="mb-3">
            <h1 className="text-lg font-semibold">{currentChat?.name || "Njabulo UI Bot"}</h1>
            <p className="text-xs text-muted-foreground">Code Generator • Deployment Helper • Bot Tools</p>
          </div>
          <ButtonsUiPairs />
        </div>

        {/* Welcome / Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Card */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="size-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Njabulo UI Bot</h2>
              <p className="text-muted-foreground">
                Your complete toolkit for code generation, deployment, and bot development
              </p>
            </div>

            {/* Quick Start Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 border rounded-xl bg-card/30">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="size-5 text-blue-500" />
                  <h3 className="font-semibold">Code Generation</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate React components, API routes, database schemas, and more
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-500/10 rounded-full">React</span>
                  <span className="text-xs px-2 py-1 bg-blue-500/10 rounded-full">Next.js</span>
                  <span className="text-xs px-2 py-1 bg-blue-500/10 rounded-full">Node.js</span>
                  <span className="text-xs px-2 py-1 bg-blue-500/10 rounded-full">Python</span>
                </div>
              </div>

              <div className="p-4 border rounded-xl bg-card/30">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="size-5 text-green-500" />
                  <h3 className="font-semibold">Deployment</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Deploy your apps to Heroku, Render, Vercel with one click
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-green-500/10 rounded-full">Heroku</span>
                  <span className="text-xs px-2 py-1 bg-green-500/10 rounded-full">Render</span>
                  <span className="text-xs px-2 py-1 bg-green-500/10 rounded-full">Vercel</span>
                </div>
              </div>

              <div className="p-4 border rounded-xl bg-card/30">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="size-5 text-purple-500" />
                  <h3 className="font-semibold">Bot Development</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Create WhatsApp and Telegram bots with full features
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-purple-500/10 rounded-full">WhatsApp</span>
                  <span className="text-xs px-2 py-1 bg-purple-500/10 rounded-full">Telegram</span>
                  <span className="text-xs px-2 py-1 bg-purple-500/10 rounded-full">AI Chat</span>
                </div>
              </div>

              <div className="p-4 border rounded-xl bg-card/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="size-5 text-red-500" />
                  <h3 className="font-semibold">Security & Tools</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Environment setup, API keys, monitoring, and security
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-red-500/10 rounded-full">API Keys</span>
                  <span className="text-xs px-2 py-1 bg-red-500/10 rounded-full">Monitoring</span>
                  <span className="text-xs px-2 py-1 bg-red-500/10 rounded-full">Rate Limit</span>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="p-6 border rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Copy className="size-5 text-purple-500" />
                  </div>
                  <p className="text-sm font-medium">1. Copy .env</p>
                  <p className="text-xs text-muted-foreground">Get configuration template</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Download className="size-5 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">2. Download ZIP</p>
                  <p className="text-xs text-muted-foreground">Get full source code</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Cloud className="size-5 text-green-500" />
                  </div>
                  <p className="text-sm font-medium">3. Deploy</p>
                  <p className="text-xs text-muted-foreground">Deploy to Heroku/Render</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border text-center">
          <p className="text-[10px] text-muted-foreground">
            Njabulo UI Bot • Code Generator • Deployment Helper • Bot Tools
          </p>
        </div>
      </div>

      {/* Features Component */}
      <NjabuloUiFeatures />
    </div>
  );
}

// Missing Shield import
import { Shield } from "lucide-react";
