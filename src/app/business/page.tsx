"use client";

import { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  Star,
  Wrench,
  Gift,
  Briefcase,
  Database,
  Cloud,
  Eye,
  Headphones,
  Rocket,
  Globe,
  Store,
  Pizza,
  ShoppingBag,
  Smartphone,
  Layout,
  CreditCard,
  Truck,
  Coffee,
  Cake,
  Apple,
  Utensils
} from "lucide-react";
import { DATA } from "@/data/resume";

export default function BusinessPage() {
  const [selectedScript, setSelectedScript] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scripts = [
    {
      id: 1,
      name: "WhatsApp Bot Creator",
      priceUSD: 5,
      priceBWP: 65,
      category: "whatsapp",
      icon: <Bot className="size-8 text-green-500" />,
      description: "Complete WhatsApp bot creation script with multi-device support",
      features: ["Multi-device support", "Auto-reply system", "AI integration", "Group management", "Anti-spam", "Media downloader"],
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
      features: ["Channel management", "Auto-forwarding", "Inline keyboard", "Command handler", "User tracking", "Voice support"],
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
      features: ["Easy config panel", "Env setup", "Auto-deploy", "Session management", "Multi-language", "Backup system"],
      file: "config-bot.js"
    },
    {
      id: 4,
      name: "Security Protection",
      priceUSD: 5,
      priceBWP: 65,
      category: "security",
      icon: <Shield className="size-8 text-red-500" />,
      description: "Security script to protect your bot from attacks",
      features: ["Anti-hack", "Spam filter", "Rate limiter", "Blacklist", "Security logs", "2FA support"],
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
      features: ["Auto file generator", "Folder structure", "Template system", "Batch creation", "File editor"],
      file: "file-manager.js"
    },
    {
      id: 6,
      name: "Command Creator",
      priceUSD: 5,
      priceBWP: 65,
      category: "commands",
      icon: <Terminal className="size-8 text-green-500" />,
      description: "Easy command creator for WhatsApp/Telegram bots",
      features: ["Command generator", "Prefix settings", "Permission system", "Categories", "Help auto"],
      file: "command-creator.js"
    },
    {
      id: 7,
      name: "Index.js Template",
      priceUSD: 5,
      priceBWP: 65,
      category: "templates",
      icon: <Code2 className="size-8 text-cyan-500" />,
      description: "Complete index.js bot starter template",
      features: ["Ready index.js", "Event handlers", "Error handling", "Connection manager", "Auto-reconnect"],
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
      features: ["Auto-send", "Scheduled broadcasts", "Auto-reply", "Media handling", "Analytics"],
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
      features: ["OpenAI API", "Gemini integration", "Context memory", "Multiple AI models", "Chat history"],
      file: "ai-chatbot.js"
    },
    {
      id: 10,
      name: "Analytics Dashboard",
      priceUSD: 5,
      priceBWP: 65,
      category: "analytics",
      icon: <TrendingUp className="size-8 text-orange-500" />,
      description: "Track your bot performance and usage",
      features: ["User stats", "Command usage", "Active charts", "Export reports", "Real-time"],
      file: "bot-analytics.js"
    },
    {
      id: 11,
      name: "Database Manager",
      priceUSD: 5,
      priceBWP: 65,
      category: "database",
      icon: <Database className="size-8 text-blue-500" />,
      description: "Complete database management for your bot",
      features: ["MongoDB", "PostgreSQL", "Redis cache", "Auto-backup", "Data migration"],
      file: "database-manager.js"
    },
    {
      id: 12,
      name: "Deploy Script",
      priceUSD: 5,
      priceBWP: 65,
      category: "deploy",
      icon: <Cloud className="size-8 text-purple-500" />,
      description: "Auto-deploy your bot to any platform",
      features: ["Heroku deploy", "Render deploy", "Railway", "Vercel", "Auto-updates"],
      file: "deploy-script.js"
    }
  ];

  // New Services for Website, Online Selling, AI Bot, Food, Shops
  const customServices = [
    {
      id: 1,
      name: "🌐 Create Website",
      priceUSD: 10,
      priceBWP: 130,
      icon: <Globe className="size-10 text-blue-500" />,
      description: "Professional website for your business or portfolio",
      features: [
        "Custom design",
        "Mobile responsive",
        "SEO optimized",
        "Contact forms",
        "Social media integration",
        "Fast loading"
      ],
      popular: true
    },
    {
      id: 2,
      name: "🛒 Sell Online Store",
      priceUSD: 10,
      priceBWP: 130,
      icon: <Store className="size-10 text-green-500" />,
      description: "Complete e-commerce website to sell products online",
      features: [
        "Product catalog",
        "Shopping cart",
        "Payment integration",
        "Order management",
        "Customer accounts",
        "Inventory system"
      ],
      popular: true
    },
    {
      id: 3,
      name: "🤖 AI Business Bot",
      priceUSD: 10,
      priceBWP: 130,
      icon: <Bot className="size-10 text-purple-500" />,
      description: "AI chatbot for your website to auto-reply to customers",
      features: [
        "24/7 auto-reply",
        "Customer support",
        "Lead generation",
        "FAQ automation",
        "Order tracking",
        "Multi-language"
      ],
      popular: true
    },
    {
      id: 4,
      name: "🍕 Food Delivery Website",
      priceUSD: 10,
      priceBWP: 130,
      icon: <Pizza className="size-10 text-orange-500" />,
      description: "Complete food delivery and restaurant ordering system",
      features: [
        "Menu management",
        "Online ordering",
        "Delivery tracking",
        "Payment gateway",
        "Restaurant dashboard",
        "Order notifications"
      ],
      popular: true
    },
    {
      id: 5,
      name: "🏪 Online Shop Creator",
      priceUSD: 10,
      priceBWP: 130,
      icon: <ShoppingBag className="size-10 text-pink-500" />,
      description: "Create your online shop to sell any products",
      features: [
        "Product management",
        "Secure checkout",
        "Multiple payment methods",
        "Shipping calculator",
        "Customer reviews",
        "Discount coupons"
      ],
      popular: true
    },
    {
      id: 6,
      name: "📱 Mobile App Builder",
      priceUSD: 10,
      priceBWP: 130,
      icon: <Smartphone className="size-10 text-cyan-500" />,
      description: "Custom mobile app for your business (iOS/Android)",
      features: [
        "Push notifications",
        "User login",
        "Product catalog",
        "Chat support",
        "Order tracking",
        "App store ready"
      ],
      popular: false
    },
    {
      id: 7,
      name: "☕ Coffee Shop Website",
      priceUSD: 10,
      priceBWP: 130,
      icon: <Coffee className="size-10 text-amber-500" />,
      description: "Beautiful website for coffee shops and cafes",
      features: [
        "Menu display",
        "Online reservations",
        "Loyalty program",
        "Gallery section",
        "Event calendar",
        "Contact map"
      ],
      popular: false
    },
    {
      id: 8,
      name: "🎂 Bakery Online Store",
      priceUSD: 10,
      priceBWP: 130,
      icon: <Cake className="size-10 text-rose-500" />,
      description: "Online ordering system for bakeries and pastry shops",
      features: [
        "Product gallery",
        "Custom orders",
        "Delivery schedule",
        "Special offers",
        "Customer reviews",
        "WhatsApp integration"
      ],
      popular: false
    }
  ];

  const categories = [
    { id: "all", name: "All Scripts", icon: <Code2 className="size-4" />, color: "bg-primary" },
    { id: "whatsapp", name: "WhatsApp Bots", icon: <Bot className="size-4" />, color: "bg-green-500" },
    { id: "telegram", name: "Telegram Bots", icon: <Send className="size-4" />, color: "bg-blue-500" },
    { id: "security", name: "Security", icon: <Shield className="size-4" />, color: "bg-red-500" },
    { id: "database", name: "Database", icon: <Database className="size-4" />, color: "bg-cyan-500" },
    { id: "ai", name: "AI Scripts", icon: <Sparkles className="size-4" />, color: "bg-purple-500" }
  ];

  const freeServices = [
    { name: "Script Fix", description: "Fix any broken script", icon: <Wrench className="size-5" /> },
    { name: "Code Review", description: "Review your code", icon: <Eye className="size-5" /> },
    { name: "Bug Fixing", description: "Fix bugs and errors", icon: <Shield className="size-5" /> },
    { name: "Consultation", description: "30-min tech consultation", icon: <Headphones className="size-5" /> },
    { name: "Customization", description: "Customize scripts", icon: <Wrench className="size-5" /> },
    { name: "Deployment Help", description: "Help deploy your bot", icon: <Rocket className="size-5" /> }
  ];

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

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const filteredScripts = scripts.filter(script => 
    activeTab === "all" || script.category === activeTab
  );

  const openPurchase = (script: any) => {
    setSelectedScript(script);
    setShowModal(true);
  };

  const openServiceOrder = (service: any) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedScript(null);
    setShowServiceModal(false);
    setSelectedService(null);
  };

  const sendWhatsApp = () => {
    const message = `Hello Njabulo-Jb! I want to purchase: ${selectedScript?.name}\n\nPrice: $${selectedScript?.priceUSD} USD / ${selectedScript?.priceBWP} BWP\n\nPlease send me payment details.`;
    window.open(`https://wa.me/26777821911?text=${encodeURIComponent(message)}`, "_blank");
    closeModal();
  };

  const sendServiceWhatsApp = () => {
    const autoReplyMessage = `🤖 *NJABULO-JB AUTO REPLY*\n\n✅ *Thank you for your message!*\n\n📌 *Service Requested:* ${selectedService?.name}\n💰 *Price:* $${selectedService?.priceUSD} USD / ${selectedService?.priceBWP} BWP\n\n⏰ *Response Time:* I will get back to you within 5-10 minutes\n\n📞 *Contact:* +267 77 821 911\n\n💬 *Please send your requirements and I'll start working on your project immediately!*\n\n✨ *Services I offer:*\n• Website Development\n• Online Store Creation\n• AI Business Bot\n• Food Delivery Website\n• Mobile App Development\n• And more!\n\n⚡ *Payment methods accepted:*\n• Orange Money\n• BTC\n• PayPal\n• Bank Transfer\n\n*Njabulo-Jb Tech - Your Trusted Developer* 🚀`;
    
    const message = `Hello Njabulo-Jb! I'm interested in: ${selectedService?.name}\n\nPrice: $${selectedService?.priceUSD} USD / ${selectedService?.priceBWP} BWP\n\nPlease tell me more about this service.`;
    
    window.open(`https://wa.me/26777821911?text=${encodeURIComponent(message + "\n\n---\n\nAuto-reply message will be sent by the bot.")}`, "_blank");
    closeModal();
  };

  const requestFreeFix = () => {
    window.open(`https://wa.me/26777821911?text=${encodeURIComponent("Hello Njabulo-Jb! I need help with fixing my bot script. Can you assist?")}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          
          {/* Profile Card */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white">
                  <img src={DATA.avatarUrl} alt={DATA.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-1 shadow-lg">
                  <CheckCircle className="size-3 text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="text-2xl md:text-3xl font-bold">Njabulo Jb</h1>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-0.5">
                    <CheckCircle className="size-3.5 text-white" />
                  </div>
                  <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full">Verified</span>
                </div>
                <p className="text-muted-foreground text-sm">JavaScript/React.js/Next.js Expert | Bot & Web Developer</p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                  <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full">Web Developer</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded-full">Bot Creator</span>
                  <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-600 rounded-full">E-commerce Expert</span>
                </div>
              </div>
              <div className="ml-auto">
                <a href="https://wa.me/26777821911" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <Send className="size-4" />
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Njabulo-Jb Scripts & Services Store
            </h1>
            <p className="text-muted-foreground">Professional scripts from $5 USD | Custom websites from $10 USD</p>
          </div>
        </div>

        {/* Custom Services Section - NEW */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-3">
              <Rocket className="size-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">🚀 Custom Services & Website Development</h2>
            <p className="text-muted-foreground">Starting from only $10 USD / 130 BWP</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customServices.map((service) => (
              <div key={service.id} className="group relative border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {service.popular && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="text-xs px-2 py-0.5 bg-yellow-500 text-white rounded-full flex items-center gap-1">
                      <Star className="size-3" />
                      Popular
                    </span>
                  </div>
                )}
                <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  {service.icon}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">{feature}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="size-4 text-green-500" />
                        <span className="text-xl font-bold">${service.priceUSD}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">or {service.priceBWP} BWP</div>
                    </div>
                    <button
                      onClick={() => openServiceOrder(service)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      <ShoppingCart className="size-4" />
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Navigation with Arrows */}
        <div className="relative mb-8">
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background border shadow-lg hover:bg-accent transition-all -ml-4"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-2 px-8 py-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeTab === cat.id
                    ? `${cat.color} text-white shadow-lg scale-105`
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat.icon}
                {cat.name}
                {activeTab === cat.id && (
                  <span className="ml-1 text-xs bg-white/20 rounded-full px-1.5 py-0.5">
                    {filteredScripts.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background border shadow-lg hover:bg-accent transition-all -mr-4"
          >
            <ChevronRight className="size-5" />
          </button>

          {showScrollHint && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full">
                <ChevronLeft className="size-3" />
                <span>Scroll to see more categories</span>
                <ChevronRight className="size-3" />
              </div>
            </div>
          )}
        </div>

        {/* Current Category Indicator */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full">
            {categories.find(c => c.id === activeTab)?.icon}
            <span className="text-sm font-medium">
              Showing {filteredScripts.length} scripts in {categories.find(c => c.id === activeTab)?.name}
            </span>
          </span>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-green-500">20+</div>
            <div className="text-xs text-muted-foreground">Products</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-blue-500">$5</div>
            <div className="text-xs text-muted-foreground">Start Price</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-purple-500">24/7</div>
            <div className="text-xs text-muted-foreground">Support</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-orange-500">Free</div>
            <div className="text-xs text-muted-foreground">Fixes</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-cyan-500">100%</div>
            <div className="text-xs text-muted-foreground">Guarantee</div>
          </div>
          <div className="p-3 text-center border rounded-lg bg-card/50">
            <div className="text-xl font-bold text-pink-500">500+</div>
            <div className="text-xs text-muted-foreground">Customers</div>
          </div>
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
              <div className="h-28 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
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
                    <span key={idx} className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">{feature}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="size-4 text-green-500" />
                      <span className="text-xl font-bold">${script.priceUSD}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">or {script.priceBWP} BWP</div>
                  </div>
                  <button onClick={() => openPurchase(script)} className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                    <ShoppingCart className="size-4" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Services */}
        <div className="mb-12 p-6 border rounded-xl bg-gradient-to-r from-green-500/5 to-transparent">
          <div className="text-center mb-6">
            <Gift className="size-10 text-green-500 mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Free Services & Fixes</h2>
            <p className="text-muted-foreground">I offer free help for your bot scripts</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {freeServices.map((service, idx) => (
              <div key={idx} className="p-3 border rounded-lg text-center hover:bg-accent/50">
                <div className="flex justify-center mb-2">{service.icon}</div>
                <h3 className="font-semibold text-sm">{service.name}</h3>
                <p className="text-xs text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button onClick={requestFreeFix} className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Wrench className="size-4" />
              Request Free Fix
            </button>
          </div>
        </div>

        {/* Tech Services */}
        <div className="mb-12 p-6 border rounded-xl">
          <div className="text-center mb-6">
            <Briefcase className="size-10 text-primary mx-auto mb-2" />
            <h2 className="text-2xl font-bold">What I Do</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {techServices.map((service, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 border rounded-lg">
                <CheckCircle className="size-4 text-green-500" />
                <span className="text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Banner */}
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
          <Send className="size-10 text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Need a Custom Website or Script?</h3>
          <p className="text-muted-foreground mb-4">Contact me directly on WhatsApp for custom projects</p>
          <a href="https://wa.me/26777821911" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <Send className="size-4" />
            Message Me on WhatsApp
          </a>
          <p className="text-xs text-muted-foreground mt-3">📞 +267 77 821 911 | Auto-reply with service info</p>
        </div>

        {/* Service Modal */}
        {showServiceModal && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl max-w-md w-full mx-4 p-6 border">
              <div className="flex items-center gap-3 mb-4">
                {selectedService.icon}
                <h2 className="text-xl font-bold">{selectedService.name}</h2>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground mb-2">{selectedService.description}</p>
                <div className="flex justify-between pt-2 border-t">
                  <span>Price:</span>
                  <span className="text-xl font-bold text-green-500">${selectedService.priceUSD} USD</span>
                </div>
                <div className="flex justify-end">
                  <span className="text-sm">or {selectedService.priceBWP} BWP</span>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                <p className="text-xs text-blue-600">
                  🤖 *Auto-reply enabled* - You'll receive an instant response with service details
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={sendServiceWhatsApp} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <Send className="size-4" />
                  Order via WhatsApp
                </button>
                <button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-accent">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Script Modal */}
        {showModal && selectedScript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl max-md w-full mx-4 p-6 border">
              <div className="flex items-center gap-3 mb-4">
                {selectedScript.icon}
                <h2 className="text-xl font-bold">{selectedScript.name}</h2>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg mb-4">
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="text-xl font-bold text-green-500">${selectedScript.priceUSD} USD</span>
                </div>
                <div className="flex justify-end">
                  <span className="text-sm">or {selectedScript.priceBWP} BWP</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={sendWhatsApp} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <Send className="size-4" />
                  Buy via WhatsApp
                </button>
                <button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-accent">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">© 2026 Njabulo-Jb Tech | Web Developer | Bot Creator | E-commerce Expert</p>
          <p className="text-xs text-muted-foreground mt-1">🤖 Auto-reply enabled on WhatsApp | Response within 5-10 minutes</p>
        </div>
      </div>
    </div>
  );
}
