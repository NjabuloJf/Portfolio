"use client";

import { 
  MessageCircle, Users, Radio, Phone, Video, 
  Music, Camera, Send, Globe, Heart, 
  Shield, Clock, Mail, MapPin, Coffee, 
  Headphones, Sparkles, Trophy, Rocket, Zap
} from "lucide-react";

export function ContainsFeatures() {
  const contactFeatures = [
    // Communication Features
    { icon: <MessageCircle className="size-5" />, name: "Instant Response", description: "Get quick replies on WhatsApp & Telegram", color: "text-green-500" },
    { icon: <Headphones className="size-5" />, name: "24/7 Support", description: "Round-the-clock assistance for premium users", color: "text-blue-500" },
    { icon: <Mail className="size-5" />, name: "Email Support", description: "Detailed responses within 24 hours", color: "text-red-500" },
    { icon: <Phone className="size-5" />, name: "Phone Support", description: "Direct calls during business hours", color: "text-green-600" },
    
    // Social Platforms
    { icon: <Users className="size-5" />, name: "Community Groups", description: "Join our active communities", color: "text-blue-600" },
    { icon: <Video className="size-5" />, name: "Video Tutorials", description: "YouTube guides and tutorials", color: "text-red-600" },
    { icon: <Music className="size-5" />, name: "TikTok Content", description: "Tech tips and updates", color: "text-black" },
    { icon: <Camera className="size-5" />, name: "Instagram Updates", description: "Daily tech content", color: "text-pink-600" },
    
    // Support Features
    { icon: <Shield className="size-5" />, name: "Bug Reporting", description: "Report issues instantly", color: "text-yellow-600" },
    { icon: <Sparkles className="size-5" />, name: "Feature Requests", description: "Suggest new features", color: "text-purple-600" },
    { icon: <Coffee className="size-5" />, name: "Consultation", description: "1-on-1 tech consultation", color: "text-brown-600" },
    { icon: <Rocket className="size-5" />, name: "Project Collaboration", description: "Work together on projects", color: "text-orange-600" },
    
    // Response Times
    { icon: <Clock className="size-5" />, name: "Fast Response", description: "Under 1 hour (Premium)", color: "text-green-500" },
    { icon: <Zap className="size-5" />, name: "Priority Support", description: "Premium member priority", color: "text-yellow-500" },
    { icon: <Trophy className="size-5" />, name: "Verified Support", description: "Official support channels only", color: "text-gold-600" },
    { icon: <Globe className="size-5" />, name: "Global Reach", description: "Support for international users", color: "text-blue-500" },
  ];

  return (
    <div className="mb-6 p-4 border border-border rounded-xl bg-card/50">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Heart className="size-5 text-red-500" />
          Why Connect With Us?
        </h2>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 flex items-center gap-1">
            <Clock className="size-3" />
            Fast Response
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20 flex items-center gap-1">
            <Heart className="size-3" />
            24/7 Support
          </span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {contactFeatures.map((feature, idx) => (
          <div 
            key={idx} 
            className="group flex items-start gap-2 p-2 rounded-lg hover:bg-accent/30 transition-all duration-200 hover:scale-[1.02] transform"
          >
            <span className={`shrink-0 mt-0.5 transition-transform group-hover:scale-110 ${feature.color}`}>
              {feature.icon}
            </span>
            <div>
              <p className="text-sm font-medium">{feature.name}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Response Time Stats */}
      <div className="mt-4 pt-3 border-t border-border">
        <h3 className="text-sm font-semibold mb-2">⏱️ Average Response Times</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <p className="font-semibold text-green-600">&lt; 5 min</p>
            <p className="text-muted-foreground">WhatsApp</p>
          </div>
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <p className="font-semibold text-blue-600">&lt; 15 min</p>
            <p className="text-muted-foreground">Telegram</p>
          </div>
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <p className="font-semibold text-yellow-600">&lt; 2 hours</p>
            <p className="text-muted-foreground">Email</p>
          </div>
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <p className="font-semibold text-purple-600">&lt; 1 hour</p>
            <p className="text-muted-foreground">Premium Support</p>
          </div>
        </div>
      </div>

      {/* Availability Note */}
      <div className="mt-3 p-2 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-xs text-center text-muted-foreground">
          🌟 Premium members get priority support with guaranteed response within 1 hour!
          <br />
          📍 All times are in South Africa Standard Time (SAST)
        </p>
      </div>
    </div>
  );
      }
