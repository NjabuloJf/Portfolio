
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  Plus, 
  Send, 
  Trash2, 
  Edit2, 
  Copy, 
  Check,
  Upload,
  Image,
  Code,
  FileText,
  Sparkles,
  Bot,
  User,
  MoreVertical,
  Settings,
  Moon,
  Sun,
  Download,
  Share2,
  Heart,
  Star,
  Zap,
  Shield,
  Cpu,
  Brain,
  Mic,
  Paperclip,
  Smile,
  Link as LinkIcon
} from "lucide-react";
import { DATA } from "@/data/resume";

// AI Model Configuration
const AI_MODELS = {
  "gpt-5.4-nano": {
    name: "GPT-5.4 Nano",
    api: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4",
    icon: <Zap className="size-4 text-green-500" />,
    description: "Fast & efficient"
  },
  "gpt-5.4-mini": {
    name: "GPT-5.4 Mini",
    api: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4-mini",
    icon: <Cpu className="size-4 text-blue-500" />,
    description: "Balanced performance"
  },
  "gemini-3.1-flash": {
    name: "Gemini 3.1 Flash",
    api: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
    model: "gemini-2.0-flash-exp",
    icon: <Brain className="size-4 text-purple-500" />,
    description: "Google's latest AI"
  },
  "llama-scout": {
    name: "Llama Scout",
    api: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.1-70b-versatile",
    icon: <Shield className="size-4 text-orange-500" />,
    description: "Open source model"
  }
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  images?: string[];
  code?: string;
  edited?: boolean;
};

type Chat = {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  model: string;
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

// Model Selector Component
function ModelSelector({ selectedModel, onSelect }: { selectedModel: string; onSelect: (model: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-all"
      >
        {AI_MODELS[selectedModel as keyof typeof AI_MODELS]?.icon}
        <span className="text-sm font-medium">{AI_MODELS[selectedModel as keyof typeof AI_MODELS]?.name}</span>
        <ChevronDownIcon className="size-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-card border rounded-lg shadow-lg z-50">
          {Object.entries(AI_MODELS).map(([key, model]) => (
            <button
              key={key}
              onClick={() => {
                onSelect(key);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors ${
                selectedModel === key ? "bg-accent" : ""
              }`}
            >
              {model.icon}
              <div className="text-left">
                <div className="text-sm font-medium">{model.name}</div>
                <div className="text-xs text-muted-foreground">{model.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Code Block Component
function CodeBlock({ code, onCopy }: { code: string; onCopy: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-black/90 text-green-400 p-3 rounded-lg overflow-x-auto text-xs font-mono">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      </button>
    </div>
  );
}

// Image Uploader Component
function ImageUploader({ onImageUpload }: { onImageUpload: (image: string) => void }) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="cursor-pointer p-2 hover:bg-accent rounded-full transition-colors">
      <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      <Image className="size-5 text-muted-foreground" />
    </label>
  );
}

// Chat Message Component
function ChatMessage({ message, onEdit, onCopy }: { message: Message; onEdit: (newContent: string) => void; onCopy: (content: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const handleSaveEdit = () => {
    onEdit(editContent);
    setIsEditing(false);
  };

  return (
    <div className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} group`}>
      <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}>
        <div className="flex items-center gap-2 mb-1">
          {message.role === "user" ? (
            <User className="size-4 text-muted-foreground" />
          ) : (
            <Bot className="size-4 text-primary" />
          )}
          <span className="text-xs text-muted-foreground">
            {message.role === "user" ? "You" : "Njabulo AI"}
          </span>
          {message.edited && <span className="text-xs text-muted-foreground">(edited)</span>}
        </div>
        
        {isEditing ? (
          <div className="flex gap-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 p-2 border rounded-lg bg-background text-sm"
              rows={3}
            />
            <button onClick={handleSaveEdit} className="px-2 py-1 bg-primary text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-2 py-1 border rounded">Cancel</button>
          </div>
        ) : (
          <div className="bg-muted rounded-lg p-3">
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            {message.images?.map((img, idx) => (
              <img key={idx} src={img} alt="Uploaded" className="mt-2 max-w-full rounded-lg max-h-48 object-cover" />
            ))}
            {message.code && <CodeBlock code={message.code} onCopy={() => onCopy(message.code!)} />}
          </div>
        )}
        
        <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="p-1 hover:bg-accent rounded">
            <Edit2 className="size-3 text-muted-foreground" />
          </button>
          <button onClick={() => onCopy(message.content)} className="p-1 hover:bg-accent rounded">
            <Copy className="size-3 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function ChatsAIPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-5.4-nano");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("njabulo-ai-chats");
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) setCurrentChatId(parsed[0].id);
    } else {
      // Create welcome chat
      const welcomeChat: Chat = {
        id: Date.now().toString(),
        name: "Welcome to Njabulo AI",
        messages: [
          {
            id: "1",
            role: "assistant",
            content: "Hello! I'm Njabulo AI, your intelligent assistant. I can help you with:\n\n• Answering questions\n• Writing code\n• Creating images\n• Analyzing documents\n• And much more!\n\nWhat would you like help with today?",
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        model: "gpt-5.4-nano",
      };
      setChats([welcomeChat]);
      setCurrentChatId(welcomeChat.id);
    }
  }, []);

  // Save chats to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("njabulo-ai-chats", JSON.stringify(chats));
    }
  }, [chats]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId]);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `New Chat ${chats.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      model: selectedModel,
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (currentChatId === chatId && updatedChats.length > 0) {
      setCurrentChatId(updatedChats[0].id);
    } else if (updatedChats.length === 0) {
      createNewChat();
    }
  };

  const renameChat = (chatId: string, newName: string) => {
    const updatedChats = chats.map(chat =>
      chat.id === chatId ? { ...chat, name: newName } : chat
    );
    setChats(updatedChats);
  };

  const generateAIResponse = (message: string, model: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes("code") || lowerMsg.includes("script") || lowerMsg.includes("html")) {
      return `Here's a code example for you:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Njabulo AI Example</title>
    <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        .btn { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Created by Njabulo AI</h1>
    <button class="btn">Click Me</button>
    <script>
        document.querySelector('.btn').addEventListener('click', () => {
            alert('Hello from Njabulo AI!');
        });
    </script>
</body>
</html>
\`\`\`

You can copy this code and use it in your project! Need any modifications?`;
    }
    
    if (lowerMsg.includes("image") || lowerMsg.includes("picture") || lowerMsg.includes("photo")) {
      return "I can help you create images! Currently, I can analyze images you upload. To generate new images, I'd need DALL-E integration. Would you like me to help you set that up?";
    }
    
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return "Hello! 👋 I'm Njabulo AI. How can I assist you today? I can write code, answer questions, help with projects, and much more!";
    }
    
    if (lowerMsg.includes("thank")) {
      return "You're welcome! 😊 Is there anything else I can help you with? I'm here 24/7!";
    }
    
    return `Thanks for your message! I'm Njabulo AI, your intelligent assistant powered by ${AI_MODELS[model as keyof typeof AI_MODELS]?.name}.

I can help you with:
• Writing code in any language
• Creating HTML/CSS/JavaScript projects
• Answering technical questions
• Debugging your code
• Generating content ideas

What specific help do you need?`;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() && uploadedImages.length === 0) return;
    if (!currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
      images: uploadedImages.length > 0 ? uploadedImages : undefined,
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
    setUploadedImages([]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(inputMessage, selectedModel),
        timestamp: new Date(),
      };
      
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
        updatedAt: new Date(),
      };
      const finalChats = updatedChats.map(chat =>
        chat.id === currentChat.id ? finalChat : chat
      );
      setChats(finalChats);
      setIsTyping(false);
    }, 1500);
  };

  const editMessage = (messageId: string, newContent: string) => {
    if (!currentChat) return;
    const updatedMessages = currentChat.messages.map(msg =>
      msg.id === messageId ? { ...msg, content: newContent, edited: true } : msg
    );
    const updatedChat = { ...currentChat, messages: updatedMessages };
    const updatedChats = chats.map(chat =>
      chat.id === currentChat.id ? updatedChat : chat
    );
    setChats(updatedChats);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-80" : "w-16"} border-r border-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Bot className="size-6 text-primary" />
              <span className="font-semibold">Njabulo AI</span>
              <div className="flex items-center gap-1 ml-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-500">Online</span>
              </div>
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
          className="m-3 flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
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
              <Bot className="size-4 shrink-0 text-muted-foreground" />
              {sidebarOpen && (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{chat.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {chat.messages[chat.messages.length - 1]?.content.substring(0, 40) || "Empty chat"}
                    </div>
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
                <p className="text-xs text-muted-foreground">Verified AI Assistant</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{currentChat?.name || "Njabulo AI"}</h1>
            <p className="text-xs text-muted-foreground">AI Assistant • Powered by Njabulo AI</p>
          </div>
          <ModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentChat?.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-4">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-pulse" />
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <img src={DATA.avatarUrl} alt={DATA.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <CheckIcon className="size-3 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Njabulo AI Assistant</h2>
              <p className="text-muted-foreground mb-4">Verified AI • Ready to help</p>
              <div className="flex gap-2">
                <button onClick={createNewChat} className="px-4 py-2 bg-primary text-white rounded-lg">Start a conversation</button>
              </div>
            </div>
          ) : (
            currentChat?.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onEdit={(newContent) => editMessage(message.id, newContent)}
                onCopy={copyMessage}
              />
            ))
          )}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask Njabulo AI anything..."
                className="w-full p-3 pr-24 border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <ImageUploader onImageUpload={(img) => setUploadedImages([...uploadedImages, img])} />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() && uploadedImages.length === 0}
                  className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </div>
          {uploadedImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {uploadedImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img} alt="Preview" className="w-12 h-12 rounded object-cover" />
                  <button
                    onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== idx))}
                    className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full"
                  >
                    <Trash2 className="size-2" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
      }
