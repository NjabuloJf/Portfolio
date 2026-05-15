"use client";

import { 
  MessageCircle, Users, Radio, Phone, Video, 
  Music, Camera, Send, Globe, Copy, Check,
  Mail, MapPin, Clock, Heart, Share2
} from "lucide-react";
import { useState } from "react";

export function ButtonszPairsZ() {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'number') {
        setCopiedNumber(true);
        setTimeout(() => setCopiedNumber(false), 2000);
      } else if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
      alert(`✅ ${text} copied to clipboard!`);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("❌ Failed to copy. Please copy manually.");
    }
  };

  // WhatsApp Links
  const openWhatsAppChat = () => {
    window.open("https://wa.me/27791234567?text=Hello%20Njabulo%20Jb%20Dev%20Tech%2C%20I%20need%20assistance%20with...", "_blank");
  };

  const openWhatsAppGroup = () => {
    window.open("https://chat.whatsapp.com/yourgroupinvitecode", "_blank");
  };

  const openWhatsAppChannel = () => {
    window.open("https://whatsapp.com/channel/yourchannelid", "_blank");
  };

  const callNumber = () => {
    window.open("tel:+27791234567");
  };

  // Social Media Links
  const openTikTok = () => {
    window.open("https://www.tiktok.com/@njabulojbdev", "_blank");
  };

  const openFacebook = () => {
    window.open("https://www.facebook.com/njabulojbdev", "_blank");
  };

  const openYouTube = () => {
    window.open("https://www.youtube.com/@njabulojbdev", "_blank");
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/njabulojbdev", "_blank");
  };

  const openTwitter = () => {
    window.open("https://twitter.com/njabulojbdev", "_blank");
  };

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/njabulojbdev", "_blank");
  };

  const openTelegram = () => {
    window.open("https://t.me/njabulojbdev", "_blank");
  };

  const openDiscord = () => {
    window.open("https://discord.gg/njabulojbdev", "_blank");
  };

  const openGitHub = () => {
    window.open("https://github.com/njabulojs", "_blank");
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Contact Info Section */}
      <div className="p-4 border border-border rounded-xl bg-card/30">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Phone className="size-4 text-green-500" />
          Direct Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Phone Number */}
          <div className="flex items-center justify-between p-2 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Phone className="size-4 text-green-500" />
              <span className="text-sm">+27 79 123 4567</span>
            </div>
            <button
              onClick={() => copyToClipboard("+27 79 123 4567", 'number')}
              className="p-1 hover:bg-accent rounded transition-colors"
            >
              {copiedNumber ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </button>
          </div>
          {/* Email */}
          <div className="flex items-center justify-between p-2 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-blue-500" />
              <span className="text-sm">info@njabulojb.dev</span>
            </div>
            <button
              onClick={() => copyToClipboard("info@njabulojb.dev", 'email')}
              className="p-1 hover:bg-accent rounded transition-colors"
            >
              {copiedEmail ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <MessageCircle className="size-4 text-green-500" />
          📱 WhatsApp Channels:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={openWhatsAppChat}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-200 hover:scale-105 transform"
          >
            <MessageCircle className="size-4" />
            WhatsApp Chat
          </button>
          <button
            onClick={openWhatsAppGroup}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200 hover:scale-105 transform"
          >
            <Users className="size-4" />
            WhatsApp Group
          </button>
          <button
            onClick={openWhatsAppChannel}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-green-700 text-white hover:bg-green-800 transition-all duration-200 hover:scale-105 transform"
          >
            <Radio className="size-4" />
            WhatsApp Channel
          </button>
          <button
            onClick={callNumber}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 transform"
          >
            <Phone className="size-4" />
            Call Me
          </button>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <Share2 className="size-4 text-primary" />
          🌐 Social Media:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            onClick={openTikTok}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105 transform"
          >
            <Music className="size-4" />
            TikTok
          </button>
          <button
            onClick={openFacebook}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 transform"
          >
            <Users className="size-4" />
            Facebook
          </button>
          <button
            onClick={openYouTube}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200 hover:scale-105 transform"
          >
            <Video className="size-4" />
            YouTube
          </button>
          <button
            onClick={openInstagram}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-all duration-200 hover:scale-105 transform"
          >
            <Camera className="size-4" />
            Instagram
          </button>
          <button
            onClick={openTwitter}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-all duration-200 hover:scale-105 transform"
          >
            <Send className="size-4" />
            X (Twitter)
          </button>
          <button
            onClick={openLinkedIn}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-all duration-200 hover:scale-105 transform"
          >
            <Users className="size-4" />
            LinkedIn
          </button>
          <button
            onClick={openTelegram}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 transform"
          >
            <Send className="size-4" />
            Telegram
          </button>
          <button
            onClick={openDiscord}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-200 hover:scale-105 transform"
          >
            <MessageCircle className="size-4" />
            Discord
          </button>
          <button
            onClick={openGitHub}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-all duration-200 hover:scale-105 transform"
          >
            <Globe className="size-4" />
            GitHub
          </button>
        </div>
      </div>

      {/* Contact Note */}
      <div className="text-xs text-muted-foreground mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
        <p className="font-semibold mb-1 flex items-center gap-1">💬 Connect With Us:</p>
        <ul className="list-disc list-inside ml-2 space-y-0.5">
          <li>📱 WhatsApp: Direct chat, group, and channel available</li>
          <li>📞 Call: Available during business hours</li>
          <li>🌐 Social: Follow us for updates and tech content</li>
          <li>💻 GitHub: Check out our open-source projects</li>
          <li>📧 Email: For business inquiries and support</li>
        </ul>
      </div>
    </div>
  );
            }
