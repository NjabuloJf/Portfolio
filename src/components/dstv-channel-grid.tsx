"use client";

import { Tv, Lock, Check } from "lucide-react";

type Channel = {
  id: number;
  name: string;
  category: string;
  logo: string;
  stream: string;
};

interface DstvChannelGridProps {
  channels: Channel[];
  selectedChannel: Channel;
  onSelectChannel: (channel: Channel) => void;
}

export function DstvChannelGrid({ channels, selectedChannel, onSelectChannel }: DstvChannelGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {channels.map((channel) => (
        <button
          key={channel.id}
          onClick={() => onSelectChannel(channel)}
          className={`group relative p-3 rounded-xl transition-all duration-300 ${
            selectedChannel.id === channel.id
              ? "bg-purple-500/20 border-2 border-purple-500"
              : "bg-white/5 hover:bg-white/10 border-2 border-transparent"
          }`}
        >
          {/* Channel Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
              <Tv className="size-6 text-white/70" />
            </div>
            <span className="text-xs font-medium text-center line-clamp-2">
              {channel.name}
            </span>
            <span className="text-[10px] text-gray-400">{channel.category}</span>
          </div>
          
          {/* Selected Indicator */}
          {selectedChannel.id === channel.id && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
              <Check className="size-3 text-white" />
            </div>
          )}
          
          {/* Hover Effect */}
          <div className="absolute inset-0 rounded-xl bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors" />
        </button>
      ))}
    </div>
  );
    }
