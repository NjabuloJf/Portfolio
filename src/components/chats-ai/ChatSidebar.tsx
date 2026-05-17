"use client";

import { Bot, Plus, Edit2, Trash2, Menu, Check } from "lucide-react";
import { DATA } from "@/data/resume";

interface Chat {
  id: string;
  name: string;
  messages: any[];
  updatedAt: Date;
}

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newName: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function ChatSidebar({
  chats,
  currentChatId,
  sidebarOpen,
  onToggleSidebar,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
}: ChatSidebarProps) {
  return (
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
        <button onClick={onToggleSidebar} className="p-2 hover:bg-accent rounded-lg transition-colors">
          <Menu className="size-5" />
        </button>
      </div>

      <button
        onClick={onNewChat}
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
            onClick={() => onSelectChat(chat.id)}
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
                    if (newName) onRenameChat(chat.id, newName);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded"
                >
                  <Edit2 className="size-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete this chat?")) onDeleteChat(chat.id);
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
              <p className="text-xs text-muted-foreground">Verified AI Assistant</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
