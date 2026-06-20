"use client";

import Link from "next/link";
import { 
  Home, Tv, Film, Clock, Heart, 
  Settings, LogOut, User, X, Menu,
  Github, Star, MessageCircle
} from "lucide-react";

interface DstvSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function DstvSidebar({ sidebarOpen, setSidebarOpen }: DstvSidebarProps) {
  const menuItems = [
    { icon: <Home className="size-5" />, label: "Home", href: "/" },
    { icon: <Tv className="size-5" />, label: "Channels", href: "/dstv-free" },
    { icon: <Film className="size-5" />, label: "Movies", href: "/dstv-free/movies" },
    { icon: <Clock className="size-5" />, label: "Watch Later", href: "/dstv-free/watch-later" },
    { icon: <Heart className="size-5" />, label: "Favorites", href: "/dstv-free/favorites" },
  ];

  return (
    <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-gradient-to-b from-black to-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <Tv className="size-6 text-purple-500" />
            <span className="font-bold text-sm">DStv Free</span>
          </div>
        ) : (
          <Tv className="size-6 text-purple-500 mx-auto" />
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/10 transition-colors ${
              item.href === "/dstv-free" ? "bg-white/10" : ""
            }`}
          >
            {item.icon}
            {sidebarOpen && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center">
            <User className="size-4" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Njabulo Jb</p>
              <p className="text-[10px] text-gray-400">Premium User</p>
            </div>
          )}
        </div>
        
        {sidebarOpen && (
          <div className="flex gap-2">
            <Link href="/contacts" className="flex-1 text-center text-xs py-1.5 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors">
              Contact
            </Link>
            <Link href="/business" className="flex-1 text-center text-xs py-1.5 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors">
              Support
            </Link>
          </div>
        )}
      </div>
    </div>
  );
  }
