"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Zap, 
  Bot, 
  Shield, 
  FileCode, 
  Terminal,
  MessageSquare,
  Code2,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Send,
  DollarSign,
  CreditCard,
  Wrench,
  Gift,
  Star,
  Users,
  Globe,
  Clock,
  Headphones,
  Database,
  Cloud,
  Lock,
  Eye,
  Heart,
  Award,
  Rocket,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Server,
  Cpu,
  Smartphone,
  Tv,
  Radio,
  Video,
  Music,
  Image,
  BookOpen,
  Coffee,
  Pizza,
  Cake
} from "lucide-react";
import { DATA } from "@/data/resume";

export default function BusinessPage() {
  const [selectedScript, setSelectedScript] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("scripts");

  const scripts = [
    {
      id: 1,
      name: "WhatsApp Bot Creator",
      priceUSD: 5,
      priceBWP: 65,
      category: "whatsapp",
      icon: <Bot className="size-8 text-green-500" />,
      description: "Complete WhatsApp bot creation script with multi-device support",
      features: [
        "Multi-device support",
        "Auto-reply system",
        "AI integration ready",
        "Group management",
        "Anti-spam protection",
        "Welcome messages",
        "Auto-status view",
        "Media downloader"
      ],
      file: "whatsapp-bot-creator.js",
      popular: true
    },
    {
      id: 2,
      name: "Telegram Bot Creator",
      priceUSD: 5,
      priceBWP: 65,
      category: "telegram",
      icon: <Send className="size-8 text-blue-500" />,
      description: "Complete Telegram bot creation script with channel management",
      features: [
        "Channel management",
        "Auto-forwarding",
        "Inline keyboard",
        "Command handler",
        "User tracking",
        "Payment integration",
        "File sharing",
        "Voice support"
      ],
      file: "telegram-bot-creator.js",
      popular: true
    },
    {
      id: 3,
      name: "Config Bot Script",
      priceUSD: 5,
      priceBWP: 65,
      category: "config",
      icon: <Zap className="size-8 text-yellow-500" />,
      description: "Advanced configuration bot with easy setup system",
      features: [
        "Easy configuration panel",
        "Environment variables setup",
        "Auto-deploy ready",
        "Session management",
        "Multi-language support",
        "Backup system",
        "Restore feature"
      ],
      file: "config-bot.js"
    },
    {
      id: 4,
      name: "Security Protection Script",
      priceUSD: 5,
      priceBWP: 65,
      category: "security",
      icon: <Shield className="size-8 text-red-500" />,
      description: "Security script to protect your bot from attacks",
      features: [
        "Anti-hack protection",
        "Spam filter",
        "Rate limiter",
        "Blacklist system",
        "Security logs",
        "2FA support",
        "IP blocking"
      ],
      file: "security-protection.js"
    },
    {
      id: 5,
      name: "File Manager Script",
      priceUSD: 5,
      priceBWP: 65,
      category: "files",
      icon: <FileCode className="size-8 text-blue-500" />,
      description: "Auto-create and manage bot files and folders",
      features: [
        "Auto file generator",
        "Folder structure setup",
        "Template system",
        "Custom file types",
        "Batch creation",
        "File editor",
        "Backup manager"
      ],
      file: "file-manager.js"
    },
    {
      id: 6,
      name: "Command Creator Script",
      priceUSD: 5,
      priceBWP: 65,
      category: "commands",
      icon: <Terminal className="size-8 text-green-500" />,
      description: "Easy command creator for WhatsApp/Telegram bots",
      features: [
        "Command generator",
        "Prefix settings",
        "Permission system",
        "Command categories",
        "Help menu auto",
        "Custom responses",
        "Cooldown settings"
      ],
      file: "command-creator.js"
    },
    {
      id: 7,
      name: "Index.js Bot Template",
      priceUSD: 5,
      priceBWP: 65,
      category: "templates",
      icon: <Code2 className="size-8 text-cyan-500" />,
      description: "Complete index.js bot starter template",
      features: [
        "Ready-to-use index.js",
        "Event handlers",
        "Error handling",
        "Connection manager",
        "Auto-reconnect",
        "Logger system",
        "Plugin support"
      ],
      file: "index-template.js"
    },
    {
      id: 8,
      name: "WhatsApp Automation",
      priceUSD: 5,
      priceBWP: 65,
      category: "whatsapp",
      icon: <MessageSquare className="size-8 text-green-500" />,
      description: "Full WhatsApp automation with advanced features",
      features: [
        "Auto-send messages",
        "Scheduled broadcasts",
        "Auto-reply rules",
        "Media handling",
        "Contact management",
        "Broadcast lists",
        "Analytics dashboard"
      ],
      file: "whatsapp-automation.js"
    },
    {
      id: 9,
      name: "AI Chatbot Script",
      priceUSD: 5,
      priceBWP: 65,
      category: "ai",
      icon: <Sparkles className="size-8 text-purple-500" />,
      description: "AI-powered chatbot with OpenAI/Gemini integration",
      features: [
        "OpenAI API ready",
        "Gemini integration",
        "Custom responses",
        "Context memory",
        "Multiple AI models",
        "Chat history",
        "Image recognition"
      ],
      file: "ai-chatbot.js"
    },
    {
      id: 10,
      name: "Bot Analytics Dashboard",
      priceUSD: 5,
      priceBWP: 65,
      category: "analytics",
      icon: <TrendingUp className="size-8 text-orange-500" />,
      description: "Track your bot performance and usage statistics",
      features: [
        "User statistics",
        "Command usage",
        "Active users chart",
        "Response time",
        "Export reports",
        "Real-time updates",
        "Performance metrics"
      ],
      file: "bot-analytics.js"
    },
    {
      id: 11,
      name: "Database Manager Script",
      priceUSD: 5,
      priceBWP: 65,
      category: "database",
      icon: <Database className="size-8 text-blue-500" />,
      description: "Complete database management for your bot",
      features: [
        "MongoDB support",
        "PostgreSQL support",
        "Redis cache",
        "Auto-backup",
        "Data migration",
        "Query builder",
        "Data encryption"
      ],
      file: "database-manager.js"
    },
    {
      id: 12,
      name: "Deploy Script (Heroku/Render)",
      priceUSD: 5,
      priceBWP: 65,
      category: "deploy",
      icon: <Cloud className="size-8 text-purple-500" />,
      description: "Auto-deploy your bot to any platform",
      features: [
        "Heroku deploy",
        "Render deploy",
        "Railway support",
        "Vercel support",
        "Auto-updates",
        "Environment config",
        "Logs manager"
      ],
      file: "deploy-script.js"
    }
  ];

  // Free services / fixes
  const freeServices = [
    {
      name: "Script Fix",
      description: "Fix any broken script or error in your bot",
      icon: <Wrench className="size-6 text-blue-500" />,
      availability: "Free"
    },
    {
      name: "Code Review",
      description: "Review your code and suggest improvements",
      icon: <Eye className="size-6 text-green-500" />,
      availability: "Free"
    },
    {
      name: "Bug Fixing",
      description: "Fix bugs and errors in your bot scripts",
      icon: <Shield className="size-6 text-red-500" />,
      availability: "Free"
    },
    {
      name: "Consultation",
      description: "30-min tech consultation about your project",
      icon: <Headphones className="size-6 text-purple-500" />,
      availability: "Free"
    },
    {
      name: "Script Customization",
      description: "Customize scripts to fit your needs",
      icon: <Wrench className="size-6 text-orange-500" />,
      availability: "Free"
    },
    {
      name: "Deployment Help",
      description: "Help deploy your bot to any platform",
      icon: <Rocket className="size-6 text-cyan-500" />,
      availability: "Free"
    }
  ];

  // My skills/services
  const techServices = [
    "Full WhatsApp Bot Development",
    "Full Telegram Bot Development",
    "JavaScript/TypeScript Expert",
    "React.js/Next.js Developer",
    "Bot Scripts Creation",
    "AI Integration",
    "Database Management",
    "API Development",
    "Custom Automation",
    "24/7 Bot Monitoring",
    "Bug Fixing & Support",
    "Script Customization"
  ];

  const openPurchase = (script: any) => {
    setSelectedScript(script);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedScript(null);
  };

  const sendWhatsApp = () => {
    const message = `Hello Njabulo-Jb! I want to purchase: ${selectedScript?.name}\n\nPrice: $${selectedScript?.priceUSD} USD / ${selectedScript?.priceBWP} BWP\n\nPlease send me payment details. My WhatsApp number is:`;
    window.open(`https://wa.me/26777821911?text=${encodeURIComponent(message)}`, "_blank");
    closeModal();
  };

  const requestFreeFix = () => {
    window.open(`https://wa.me/26777821911?text=${encodeURIComponent("Hello Njabulo-Jb! I need help with fixing my bot script. Can you assist?")}`, "_blank");
  };

  const filteredScripts = scripts.filter(script => 
    activeTab === "all" || script.category === activeTab
  );

  const categories = [
    { id: "all", name: "All Scripts", icon: <Code2 className="size-4" /> },
    { id: "whatsapp", name: "WhatsApp Bots", icon: <Bot className="size-4" /> },
    { id: "telegram", name: "Telegram Bots", icon: <Send className="size-4" /> },
    { id: "security", name: "Security", icon: <Shield className="size-4" /> },
    { id: "database", name: "Database", icon: <Database className="size-4" /> },
    { id: "ai", name: "AI Scripts", icon: <Sparkles className="size-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Profile */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          
          {/* Profile Card */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={DATA.avatarUrl} 
                    alt={DATA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-1 shadow-lg">
                  <CheckCircle className="size-3 text-white" />
                </div>
              </div>
              
              {/* Info */}
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="text-2xl md:text-3xl font-bold">Njabulo Jb</h1>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-0.5">
                    <CheckCircle className="size-3.5 text-white" />
                  </div>
                  <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full">
                    Meta Verified
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  JavaScript/React.js/Next.js Expert | Bot Developer
                </p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full">WhatsApp Bot Expert</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded-full">Telegram Bot Expert</span>
                  <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-600 rounded-full">Script Creator</span>
                </div>
              </div>
              
              {/* Contact Button */}
              <div className="ml-auto">
                <a
                  href="https://wa.me/26777821911"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                  <Send className="size-4" />
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Njabulo-Jb Scripts & Services Store
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional WhatsApp & Telegram bot scripts starting from only $5 USD / 65 BWP
              <br />
              <span className="text-sm">📞 Contact: +267 77 821 911 | ✉️ Email: scripts@njabulojb.dev</span>
            </p>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-green-500">12+</div>
            <div className="text-xs text-muted-foreground">Premium Scripts</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-blue-500">$5</div>
            <div className="text-xs text-muted-foreground">Starting Price</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-purple-500">24/7</div>
            <div className="text-xs text-muted-foreground">Support</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-orange-500">Free</div>
            <div className="text-xs text-muted-foreground">Fixes Available</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-cyan-500">100%</div>
            <div className="text-xs text-muted-foreground">Satisfaction</div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Scripts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredScripts.map((script) => (
            <div key={script.id} className="group relative border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {script.popular && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="text-xs px-2 py-0.5 bg-yellow-500 text-white rounded-full flex items-center gap-1">
                    <Star className="size-3" />
                    Popular
                  </span>
                </div>
              )}
              <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  {script.icon}
                  <p className="text-xs text-muted-foreground mt-1">{script.file}</p>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{script.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{script.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {script.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {script.features.length > 3 && (
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                      +{script.features.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="size-4 text-green-500" />
                      <span className="text-xl font-bold">${script.priceUSD}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">or {script.priceBWP} BWP</div>
                  </div>
                  <button
                    onClick={() => openPurchase(script)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all group-hover:scale-105"
                  >
                    <ShoppingCart className="size-4" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Services Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-green-500/10 rounded-full mb-3">
              <Gift className="size-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Free Services & Fixes</h2>
            <p className="text-muted-foreground">I offer free help for your bot scripts</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freeServices.map((service, idx) => (
              <div key={idx} className="p-4 border rounded-lg flex items-center gap-3 hover:bg-accent/50 transition-all">
                {service.icon}
                <div className="flex-1">
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/10 text-green-600 rounded-full">
                  {service.availability}
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <button
              onClick={requestFreeFix}
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              <Wrench className="size-4" />
              Request Free Fix
            </button>
          </div>
        </div>

        {/* Tech Services Section */}
        <div className="mb-12 p-6 border rounded-xl bg-gradient-to-r from-primary/5 to-transparent">
          <div className="text-center mb-6">
            <Briefcase className="size-10 text-primary mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">What I Do</h2>
            <p className="text-muted-foreground">Professional tech services available</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {techServices.map((service, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 border rounded-lg">
                <CheckCircle className="size-4 text-green-500" />
                <span className="text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Contact Banner */}
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center mb-8">
          <Send className="size-10 text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Need a Custom Script?</h3>
          <p className="text-muted-foreground mb-4">
            Contact me directly on WhatsApp for custom scripts, bulk purchases, or any questions
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/26777821911"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              <Send className="size-4" />
              Message Me on WhatsApp
            </a>
            <a
              href="mailto:scripts@njabulojb.dev"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              <Mail className="size-4" />
              Email Me
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-3">📞 +267 77 821 911 | ✉️ scripts@njabulojb.dev</p>
        </div>

        {/* Purchase Modal */}
        {showModal && selectedScript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl max-w-md w-full mx-4 p-6 border shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                {selectedScript.icon}
                <h2 className="text-xl font-bold">Purchase Script</h2>
              </div>
              <p className="text-muted-foreground mb-4">Complete your purchase of {selectedScript.name}</p>
              
              <div className="p-4 bg-muted/30 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span>Script Name:</span>
                  <span className="font-semibold">{selectedScript.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>File:</span>
                  <span className="font-mono text-sm">{selectedScript.file}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Price:</span>
                  <span className="text-xl font-bold text-green-500">${selectedScript.priceUSD} USD</span>
                </div>
                <div className="flex justify-end">
                  <span className="text-sm text-muted-foreground">or {selectedScript.priceBWP} BWP</span>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
                <p className="text-xs text-yellow-600">
                  💡 After payment, send your payment proof on WhatsApp. You'll receive the script within 5 minutes.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={sendWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <Send className="size-4" />
                  Purchase via WhatsApp
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg hover:bg-accent"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            All scripts are original, tested, and come with 30-day support | 100% Money-back guarantee
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2026 Njabulo-Jb Tech | JavaScript/React.js/Next.js Expert | WhatsApp/Telegram Bot Developer
          </p>
        </div>
      </div>
    </div>
  );
  }
