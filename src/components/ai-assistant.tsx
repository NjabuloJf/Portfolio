"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Sparkles, Send, X, User, Loader2, MessageCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Njabulo's AI Assistant. How can I help you today? You can ask me about:\n\n• Njabulo's skills and experience\n• Projects and work\n• Contact information\n• Education background\n• And more!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Knowledge base about Njabulo Jb
    const knowledgeBase = {
      skills: "Njabulo Jb is skilled in JavaScript, TypeScript, React, Next.js, Node.js, Python, WhatsApp Bot Development (Baileys), Telegram Bot Development, MongoDB, PostgreSQL, Redis, Docker, Git, and UI/UX Design.",
      work: "Njabulo Jb has experience as a Full Stack Developer, Bot Developer, and Technical Consultant. He specializes in creating WhatsApp and Telegram bots with AI capabilities.",
      projects: "Njabulo's projects include:\n• GWM-XMD - Advanced WhatsApp bot\n• Njabulo-Jb Bot - Multi-device WhatsApp bot\n• Telegram Bot - AI-powered Telegram assistant\n• Portfolio website - Modern portfolio with search and AI features",
      education: "Njabulo Jb has studied Computer Science and Software Engineering. He continuously learns new technologies and stays updated with the latest trends in bot development and AI.",
      contact: "You can contact Njabulo Jb through:\n• WhatsApp: Available on the contacts page\n• Email: info@njabulojb.dev\n• Telegram: @njabulojbbot\n• GitHub: NjabuloJf",
      about: "Njabulo Jb is a passionate developer and tech entrepreneur specializing in WhatsApp and Telegram bot development. He creates innovative solutions that help businesses automate their communication and engage with customers effectively.",
      bot: "Njabulo develops WhatsApp and Telegram bots with features like AI chat, media downloader, group management, auto-reply, anti-spam, and 24/7 uptime using platforms like Heroku, Render, and Railway.",
    };

    const lowerMessage = userMessage.toLowerCase();

    // Check for keywords in user message
    if (lowerMessage.includes("skill") || lowerMessage.includes("technolog") || lowerMessage.includes("language")) {
      return knowledgeBase.skills;
    } else if (lowerMessage.includes("work") || lowerMessage.includes("experience") || lowerMessage.includes("job")) {
      return knowledgeBase.work;
    } else if (lowerMessage.includes("project") || lowerMessage.includes("bot") || lowerMessage.includes("whatsapp") || lowerMessage.includes("telegram")) {
      return knowledgeBase.projects;
    } else if (lowerMessage.includes("education") || lowerMessage.includes("study") || lowerMessage.includes("learn")) {
      return knowledgeBase.education;
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("whatsapp")) {
      return knowledgeBase.contact;
    } else if (lowerMessage.includes("about") || lowerMessage.includes("who is") || lowerMessage.includes("tell me about")) {
      return knowledgeBase.about;
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! 👋 How can I help you learn more about Njabulo Jb today?";
    } else if (lowerMessage.includes("thank")) {
      return "You're welcome! 😊 Is there anything else you'd like to know about Njabulo Jb?";
    } else {
      return "I'm here to help you learn about Njabulo Jb! You can ask me about his skills, projects, work experience, education, contact information, or the bots he develops. What would you like to know?";
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const aiResponse = await getAIResponse(inputMessage);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-blue-900/95 to-purple-900/95 rounded-2xl shadow-2xl w-[500px] max-w-[90%] h-[600px] max-h-[90%] flex flex-col border border-blue-500/30 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-blue-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <Bot className="size-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
              <p className="text-xs text-blue-300">Powered by Njabulo Jb</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="size-5 text-white" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === "user" ? (
                    <User className="size-3" />
                  ) : (
                    <Sparkles className="size-3 text-yellow-400" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.sender === "user" ? "You" : "AI Assistant"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 text-white animate-spin" />
                  <span className="text-sm text-white">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-blue-500/30">
          <div className="flex gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Njabulo Jb..."
              className="flex-1 px-3 py-2 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 resize-none text-sm"
              rows={2}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="size-5 text-white" />
            </button>
          </div>
          <p className="text-xs text-blue-300 mt-2 text-center">
            Ask about skills, projects, experience, or contact info
          </p>
        </div>
      </div>
    </div>
  );
}
