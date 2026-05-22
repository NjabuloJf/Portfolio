"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Bot, Send, Mic, Image, Code, FileText, 
  Sparkles, Zap, Shield, Cpu, Brain, 
  MessageSquare, Heart, Copy, Check,
  Loader2, User, Settings, Sun, Moon,
  Plus, Trash2, Edit2, Menu, X,
  ChevronDown, ChevronUp, Download, Share2,
  Volume2, VolumeX, Play, Pause, StopCircle,
  Github, Cloud, Server, Clock, QrCode
} from "lucide-react";
import { DATA } from "@/data/resume";
import { ButtonsUiPairs } from "@/components/buttonsui-pairs";
import { NjabuloUiFeatures } from "@/components/njabuloui-features";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  code?: string;
};

type Chat = {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

export default function NjabuloUiBotPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("njabulo-uibot-chats");
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) setCurrentChatId(parsed[0].id);
    } else {
      createWelcomeChat();
    }
  }, []);

  // Save chats to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("njabulo-uibot-chats", JSON.stringify(chats));
    }
  }, [chats]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId, isLoading]);

  const createWelcomeChat = () => {
    const welcomeChat: Chat = {
      id: Date.now().toString(),
      name: "Welcome to Njabulo UI Bot",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: `👋 Hello! I'm **Njabulo UI Bot**, your intelligent assistant for coding and development.

I can help you with:

✨ **Code Generation** - Write, debug, and explain code
🎨 **UI Components** - Create React/Vue/Next.js components
📝 **API Integration** - Connect to APIs and databases
🔧 **Deployment** - Deploy to Heroku, Render, Vercel
💡 **Problem Solving** - Answer technical questions

**Try asking me:**
• "Generate a React component for a navbar"
• "How to deploy to Heroku?"
• "Create a WhatsApp bot script"
• "Write a Python function for data analysis"

What would you like help with today?`,
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats([welcomeChat]);
    setCurrentChatId(welcomeChat.id);
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `New Chat ${chats.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    setInputMessage("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (currentChatId === chatId && updatedChats.length > 0) {
      setCurrentChatId(updatedChats[0].id);
    } else if (updatedChats.length === 0) {
      createWelcomeChat();
    }
  };

  const renameChat = (chatId: string, newName: string) => {
    const updatedChats = chats.map(chat =>
      chat.id === chatId ? { ...chat, name: newName } : chat
    );
    setChats(updatedChats);
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Code generation responses
    if (lowerMsg.includes("react") && (lowerMsg.includes("component") || lowerMsg.includes("navbar"))) {
      return `Here's a responsive React Navbar component:

\`\`\`jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">Njabulo UI</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="hover:bg-purple-700 px-3 py-2 rounded-md">Home</a>
              <a href="/about" className="hover:bg-purple-700 px-3 py-2 rounded-md">About</a>
              <a href="/services" className="hover:bg-purple-700 px-3 py-2 rounded-md">Services</a>
              <a href="/contact" className="hover:bg-purple-700 px-3 py-2 rounded-md">Contact</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block hover:bg-purple-700 px-3 py-2 rounded-md">Home</a>
            <a href="/about" className="block hover:bg-purple-700 px-3 py-2 rounded-md">About</a>
            <a href="/services" className="block hover:bg-purple-700 px-3 py-2 rounded-md">Services</a>
            <a href="/contact" className="block hover:bg-purple-700 px-3 py-2 rounded-md">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
\`\`\`

This component includes:
- Responsive mobile menu
- Hover effects
- Gradient background
- Easy to customize colors

Need any modifications?`;
    }
    
    if (lowerMsg.includes("deploy") && (lowerMsg.includes("heroku") || lowerMsg.includes("render"))) {
      return `Here's a complete deployment guide:

**🚀 Deploy to Heroku:**

1. Create a \`Procfile\`:
\`\`\`
web: npm start
\`\`\`

2. Add to \`package.json\`:
\`\`\`json
{
  "scripts": {
    "start": "node index.js"
  }
}
\`\`\`

3. Deploy:
\`\`\`bash
git push heroku main
\`\`\`

**🚀 Deploy to Render:**

1. Connect your GitHub repository
2. Add environment variables
3. Click "Deploy"

**📦 Download your bot files:**
Use the Download ZIP button on this page to get the complete bot package!

Need help with a specific platform?`;
    }
    
    if (lowerMsg.includes("whatsapp") && lowerMsg.includes("bot")) {
      return `Here's a WhatsApp bot setup guide:

**🤖 WhatsApp Bot Setup:**

\`\`\`javascript
// WhatsApp Bot Configuration
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    if (message.body === '!ping') {
        await message.reply('pong');
    }
});

client.initialize();
\`\`\`

**Features included:**
- Auto-reply system
- Group management
- Media downloader
- Anti-spam protection

Want the complete script? Use the Download ZIP button!`;
    }
    
    if (lowerMsg.includes("api") && lowerMsg.includes("key")) {
      return `**🔑 API Keys Setup:**

Create a \`.env\` file with your keys:

\`\`\`env
# Njabulo UI Bot Configuration
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
MONGODB_URI=mongodb://localhost:27017
PORT=3000
SESSION_ID=your_session_id
\`\`\`

**Where to get API keys:**
- OpenAI: platform.openai.com
- Groq: console.groq.com
- MongoDB: mongodb.com

Use the Copy .env button above to get the full template!`;
    }
    
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return `Hello! 👋 Welcome to Njabulo UI Bot!

I'm here to help you with:
- 📝 Code generation
- 🚀 Deployment guides
- 🤖 WhatsApp bot setup
- 🔧 Technical support

Try asking me:
• "Generate a React component"
• "How to deploy to Heroku?"
• "Create a WhatsApp bot"
• "Get API keys"

What would you like to work on today? ✨`;
    }
    
    if (lowerMsg.includes("thank")) {
      return `You're very welcome! 😊

I'm glad I could help. Here's what you can do next:

1. **Copy the .env template** - Use the Copy .env button
2. **Download the ZIP** - Get the complete bot package
3. **Deploy your bot** - Use Heroku or Render buttons
4. **Set up monitoring** - Use UptimeRobot

Is there anything else you'd like to know? 🚀`;
    }
    
    // Default response
    return `Thanks for your message! I'm Njabulo UI Bot.

**I can help you with:**

📝 **Code Generation** - React, Next.js, Node.js, Python
🚀 **Deployment** - Heroku, Render, Vercel guides
🤖 **Bot Development** - WhatsApp, Telegram bots
🔧 **Technical Support** - Debugging and optimization

**Quick actions:**
• Click "Copy .env" to get configuration template
• Click "Download ZIP" to get bot files
• Click "Deploy to Heroku/Render" to deploy

What specific help do you need? ✨`;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
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

    setTimeout(async () => {
      const aiResponse = await generateResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
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
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("✅ Message copied to clipboard!");
  };

  const startVoiceRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        alert("Voice recognition failed. Please try again.");
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert("Voice recognition is not supported in your browser.");
    }
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
                    <Check className="size-2 text-white" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">UI Bot Developer</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with ButtonsUiPairs */}
        <div className="p-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-semibold">{currentChat?.name || "Njabulo UI Bot"}</h1>
              <p className="text-xs text-muted-foreground">AI Assistant • Code Generator • Deployment Helper</p>
            </div>
          </div>
          {/* Buttons UI Pairs */}
          <ButtonsUiPairs />
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="size-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Njabulo UI Bot</h2>
              <p className="text-muted-foreground mb-6">Your intelligent AI assistant for coding and deployment</p>
              <div className="flex gap-3">
                <button
                  onClick={createNewChat}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Start a conversation
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {currentChat.messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="size-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{message.role === "user" ? "You" : "Njabulo AI"}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.role === "user" 
                        ? "bg-purple-500 text-white" 
                        : "bg-muted"
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    </div>
                    <div className="flex gap-1 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                      <button onClick={() => copyMessage(message.content)} className="p-1 hover:bg-accent rounded">
                        <Copy className="size-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 order-1">
                      <img src={DATA.avatarUrl} alt="User" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="size-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin text-purple-500" />
                      <span className="text-sm text-muted-foreground">Njabulo AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Njabulo UI Bot anything... (Press Enter to send)"
                  className="w-full p-3 pr-24 border rounded-xl bg-background resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={2}
                  disabled={isLoading}
                />
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <button
                    onClick={startVoiceRecording}
                    className={`p-2 hover:bg-accent rounded-full transition-colors ${isRecording ? "bg-red-500/20 text-red-500" : ""}`}
                  >
                    <Mic className="size-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-all"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            {isRecording && (
              <div className="mt-2 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs text-red-500">Recording... Speak now</span>
                </div>
              </div>
            )}
            <div className="flex justify-center mt-2">
              <p className="text-[10px] text-muted-foreground">
                Njabulo UI Bot • Code Generator • Deployment Helper • Free to use
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Component */}
      <NjabuloUiFeatures />
    </div>
  );
}

// Helper component for Check icon
function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
  }
