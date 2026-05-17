"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Menu, Plus, Send, Trash2, Edit2, Copy, Check,
  Image, Code, Bot, User, Zap, Shield, Cpu, Brain,
  Search, Settings, LogOut, Sun, Moon, Sparkles,
  MessageCircle, Heart, Share2, Download, FileText,
  Mic, Paperclip, Smile, Link as LinkIcon, Github,
  Twitter, Globe, ChevronDown, ChevronUp, X,
  Loader2, AlertCircle, Wifi, WifiOff
} from "lucide-react";
import { DATA } from "@/data/resume";

// AI Models Configuration
const AI_MODELS = {
  "deepseek-chat": {
    name: "DeepSeek Chat",
    api: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-chat",
    icon: <Sparkles className="size-4 text-blue-500" />,
    description: "Advanced AI assistant",
    provider: "DeepSeek",
    requiresKey: true
  },
  "deepseek-coder": {
    name: "DeepSeek Coder",
    api: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-coder",
    icon: <Code className="size-4 text-green-500" />,
    description: "Expert coding assistant",
    provider: "DeepSeek",
    requiresKey: true
  },
  "gpt-4o-mini": {
    name: "GPT-4o Mini",
    api: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    icon: <Zap className="size-4 text-purple-500" />,
    description: "Fast & efficient",
    provider: "OpenAI",
    requiresKey: true
  },
  "llama-3.1-70b": {
    name: "Llama 3.1 70B",
    api: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.1-70b-versatile",
    icon: <Bot className="size-4 text-yellow-500" />,
    description: "Open source leader",
    provider: "Groq",
    requiresKey: true
  }
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  images?: string[];
  thinking?: boolean;
  model?: string;
};

type Chat = {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  model: string;
  deepThink: boolean;
  webSearch: boolean;
};

// Helper Components
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Model Selector
function ModelSelector({ selectedModel, onSelect }: { selectedModel: string; onSelect: (model: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-all text-sm"
      >
        {AI_MODELS[selectedModel as keyof typeof AI_MODELS]?.icon}
        <span>{AI_MODELS[selectedModel as keyof typeof AI_MODELS]?.name}</span>
        <ChevronDownIcon className="size-3" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 w-56 bg-card border rounded-lg shadow-xl z-50">
          {Object.entries(AI_MODELS).map(([key, model]) => (
            <button
              key={key}
              onClick={() => {
                onSelect(key);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 p-2 hover:bg-accent transition-colors text-left ${
                selectedModel === key ? "bg-accent" : ""
              }`}
            >
              {model.icon}
              <div>
                <div className="text-sm">{model.name}</div>
                <div className="text-xs text-muted-foreground">{model.provider}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Message Component
function MessageBubble({ message, onCopy }: { message: Message; onCopy: (content: string) => void }) {
  return (
    <div className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      {message.role === "assistant" && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <Bot className="size-4 text-white" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[85%] ${message.role === "user" ? "order-2" : "order-1"}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          message.role === "user" 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        }`}>
          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        </div>
        <div className="flex gap-2 mt-1">
          <button onClick={() => onCopy(message.content)} className="p-1 hover:bg-accent rounded">
            <Copy className="size-3 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      {message.role === "user" && (
        <div className="flex-shrink-0 order-1">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
            <img src={DATA.avatarUrl} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}

// Main Page Component - Like DeepSeek
export default function ChatsAIPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("deepseek-chat");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deepThink, setDeepThink] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiModal, setShowApiModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("njabulo-ai-chats");
    const savedApiKey = localStorage.getItem("njabulo-ai-api-key");
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) setCurrentChatId(parsed[0].id);
    } else {
      createNewChat();
    }
  }, []);

  // Save chats
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("njabulo-ai-chats", JSON.stringify(chats));
    }
  }, [chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId, isLoading]);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `新对话 ${chats.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      model: selectedModel,
      deepThink: false,
      webSearch: false,
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (currentChatId === chatId && updatedChats.length > 0) {
      setCurrentChatId(updatedChats[0].id);
    }
  };

  const renameChat = (chatId: string, newName: string) => {
    const updatedChats = chats.map(chat =>
      chat.id === chatId ? { ...chat, name: newName } : chat
    );
    setChats(updatedChats);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    if (!apiKey) {
      setShowApiModal(true);
      return;
    }
    if (!currentChat) {
      createNewChat();
      setTimeout(() => sendMessage(), 100);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      updatedAt: new Date(),
    };
    const updatedChats = chats.map(chat =>
      chat.id === currentChat.id ? updatedChat : chat
    );
    setChats(updatedChats);
    setInputMessage("");
    setIsLoading(true);

    try {
      const model = AI_MODELS[selectedModel as keyof typeof AI_MODELS];
      
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          model: model.model,
          apiKey: apiKey,
          deepThink: deepThink,
          webSearch: webSearch,
          history: updatedChat.messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "Sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date(),
        model: selectedModel,
      };
      
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiMessage],
        updatedAt: new Date(),
      };
      const finalChats = updatedChats.map(chat =>
        chat.id === currentChat.id ? finalChat : chat
      );
      setChats(finalChats);
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "API Error: Please check your API key and try again.",
        timestamp: new Date(),
      };
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, errorMessage],
        updatedAt: new Date(),
      };
      const finalChats = updatedChats.map(chat =>
        chat.id === currentChat.id ? finalChat : chat
      );
      setChats(finalChats);
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const saveApiKey = () => {
    localStorage.setItem("njabulo-ai-api-key", apiKey);
    setShowApiModal(false);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-72" : "w-16"} border-r border-gray-200 transition-all duration-300 flex flex-col bg-gray-50`}>
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center">
                <Bot className="size-4 text-white" />
              </div>
              <span className="font-medium text-sm">Njabulo AI</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-gray-200 rounded-lg">
            <Menu className="size-4" />
          </button>
        </div>

        <button
          onClick={createNewChat}
          className="m-2 flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          <Plus className="size-4" />
          {sidebarOpen && <span>新对话</span>}
        </button>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all text-sm ${
                currentChatId === chat.id ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setCurrentChatId(chat.id)}
            >
              <MessageCircle className="size-4 shrink-0 text-gray-500" />
              {sidebarOpen && (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{chat.name}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newName = prompt("重命名对话:", chat.name);
                      if (newName) renameChat(chat.id, newName);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                  >
                    <Edit2 className="size-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("删除此对话?")) deleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-500"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {sidebarOpen && (
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={DATA.avatarUrl} alt={DATA.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{DATA.name}</span>
                  <div className="bg-blue-500 rounded-full p-0.5">
                    <CheckIcon className="size-2 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Njabulo AI</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area - Like DeepSeek */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header with Model Selector */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />
          </div>
          <button
            onClick={() => setShowApiModal(true)}
            className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            {apiKey ? "API已配置" : "配置API密钥"}
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 mb-4">
                <img src={DATA.avatarUrl} alt="Njabulo AI" className="w-full h-full rounded-full object-cover" />
              </div>
              <h1 className="text-2xl font-semibold mb-2">Njabulo AI</h1>
              <p className="text-gray-500 mb-6">How can I help you today?</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setDeepThink(!deepThink)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm border transition-all ${
                    deepThink ? "bg-blue-50 border-blue-500 text-blue-600" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Brain className="size-4" />
                  DeepThink
                </button>
                <button
                  onClick={() => setWebSearch(!webSearch)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm border transition-all ${
                    webSearch ? "bg-blue-50 border-blue-500 text-blue-600" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Search className="size-4" />
                  联网搜索
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {currentChat.messages.map((message) => (
                <MessageBubble key={message.id} message={message} onCopy={copyMessage} />
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot className="size-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin text-blue-500" />
                      <span className="text-sm text-gray-500">
                        {deepThink ? "深度思考中..." : webSearch ? "联网搜索中..." : "思考中..."}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - Like DeepSeek */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto">
            {/* DeepThink and Search buttons */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setDeepThink(!deepThink)}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1 transition-all ${
                  deepThink 
                    ? "bg-blue-100 text-blue-600 border border-blue-300" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Brain className="size-3" />
                DeepThink
                {deepThink && <X className="size-3 ml-1" onClick={(e) => { e.stopPropagation(); setDeepThink(false); }} />}
              </button>
              <button
                onClick={() => setWebSearch(!webSearch)}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1 transition-all ${
                  webSearch 
                    ? "bg-green-100 text-green-600 border border-green-300" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Search className="size-3" />
                联网搜索
                {webSearch && <X className="size-3 ml-1" onClick={(e) => { e.stopPropagation(); setWebSearch(false); }} />}
              </button>
            </div>

            {/* Input box */}
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="给 Njabulo AI 发送消息..."
                className="w-full p-4 pr-24 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute bottom-3 right-3 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="size-4" />
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              AI-generated, for reference only
            </p>
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">配置 API 密钥</h2>
            <p className="text-sm text-gray-500 mb-4">
              输入你的 {AI_MODELS[selectedModel as keyof typeof AI_MODELS]?.provider} API 密钥
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="flex gap-3">
              <button onClick={saveApiKey} className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                保存
              </button>
              <button onClick={() => setShowApiModal(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">
                取消
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              支持: DeepSeek, OpenAI, Groq API
            </p>
          </div>
        </div>
      )}
    </div>
  );
}