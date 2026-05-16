"use client";

import { useState } from "react";
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
  CreditCard
} from "lucide-react";

export default function BusinessPage() {
  const [selectedScript, setSelectedScript] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const scripts = [
    {
      id: 1,
      name: "Create Bot Script",
      priceUSD: 5,
      priceBWP: 65,
      icon: <Bot className="size-8 text-purple-500" />,
      description: "Complete WhatsApp bot creation script with multi-device support",
      features: [
        "Auto-reply system",
        "AI integration ready",
        "Group management",
        "Anti-spam protection",
        "Welcome messages"
      ],
      file: "createbot.js",
      preview: "/images/createbot-preview.png"
    },
    {
      id: 2,
      name: "Config Bot Script",
      priceUSD: 5,
      priceBWP: 65,
      icon: <Zap className="size-8 text-yellow-500" />,
      description: "Advanced configuration bot with easy setup system",
      features: [
        "Easy configuration panel",
        "Environment variables setup",
        "Auto-deploy ready",
        "Session management",
        "Multi-language support"
      ],
      file: "configbot.js",
      preview: "/images/configbot-preview.png"
    },
    {
      id: 3,
      name: "Hack Protection Script",
      priceUSD: 5,
      priceBWP: 65,
      icon: <Shield className="size-8 text-red-500" />,
      description: "Security script to protect your bot from attacks",
      features: [
        "Anti-hack protection",
        "Spam filter",
        "Rate limiter",
        "Blacklist system",
        "Security logs"
      ],
      file: "hack-protection.js",
      preview: "/images/hack-preview.png"
    },
    {
      id: 4,
      name: "Create Files Script",
      priceUSD: 5,
      priceBWP: 65,
      icon: <FileCode className="size-8 text-blue-500" />,
      description: "Auto-create bot files and folders structure",
      features: [
        "Auto file generator",
        "Folder structure setup",
        "Template system",
        "Custom file types",
        "Batch creation"
      ],
      file: "create-files.js",
      preview: "/images/createfiles-preview.png"
    },
    {
      id: 5,
      name: "Create Commands Script",
      priceUSD: 5,
      priceBWP: 65,
      icon: <Terminal className="size-8 text-green-500" />,
      description: "Easy command creator for WhatsApp bot",
      features: [
        "Command generator",
        "Prefix settings",
        "Permission system",
        "Command categories",
        "Help menu auto"
      ],
      file: "create-commands.js",
      preview: "/images/commands-preview.png"
    },
    {
      id: 6,
      name: "Create Index.js Bot",
      priceUSD: 5,
      priceBWP: 65,
      icon: <Code2 className="size-8 text-cyan-500" />,
      description: "Complete index.js bot starter template",
      features: [
        "Ready-to-use index.js",
        "Event handlers",
        "Error handling",
        "Connection manager",
        "Auto-reconnect"
      ],
      file: "index.js",
      preview: "/images/index-preview.png"
    },
    {
      id: 7,
      name: "WhatsApp Automation Script",
      priceUSD: 5,
      priceBWP: 65,
      icon: <MessageSquare className="size-8 text-green-500" />,
      description: "Full WhatsApp automation with advanced features",
      features: [
        "Auto-send messages",
        "Scheduled broadcasts",
        "Auto-reply rules",
        "Media handling",
        "Contact management"
      ],
      file: "whatsapp-auto.js",
      preview: "/images/whatsapp-preview.png"
    },
    {
      id: 8,
      name: "AI Chatbot Script",
      priceUSD: 5,
      priceBWP: 65,
      icon: <Sparkles className="size-8 text-purple-500" />,
      description: "AI-powered chatbot with OpenAI integration",
      features: [
        "OpenAI API ready",
        "Custom responses",
        "Context memory",
        "Multiple AI models",
        "Chat history"
      ],
      file: "ai-chatbot.js",
      preview: "/images/ai-preview.png"
    },
    {
      id: 9,
      name: "Bot Analytics Script",
      priceUSD: 5,
      priceBWP: 65,
      icon: <TrendingUp className="size-8 text-orange-500" />,
      description: "Track your bot performance and usage",
      features: [
        "User statistics",
        "Command usage",
        "Active users chart",
        "Response time",
        "Export reports"
      ],
      file: "bot-analytics.js",
      preview: "/images/analytics-preview.png"
    }
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
    const message = `Hello Njabulo-Jb, I want to purchase: ${selectedScript?.name}\n\nPrice: $${selectedScript?.priceUSD} USD / ${selectedScript?.priceBWP} BWP\n\nPlease send me payment details. My WhatsApp number is:`;
    window.open(`https://wa.me/26777821911?text=${encodeURIComponent(message)}`, "_blank");
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Njabulo-Jb Scripts Store
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional WhatsApp bot scripts starting from only $5 USD / 65 BWP
              <br />
              <span className="text-sm">Contact: +267 77 821 911</span>
            </p>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 text-center border rounded-lg bg-card/50">
            <div className="text-2xl font-bold text-green-500">9+</div>
            <div className="text-xs text-muted-foreground">Premium Scripts</div>
          </div>
          <div className="p-4 text-center border rounded-lg bg-card/50">
            <div className="text-2xl font-bold text-blue-500">$5</div>
            <div className="text-xs text-muted-foreground">Starting Price</div>
          </div>
          <div className="p-4 text-center border rounded-lg bg-card/50">
            <div className="text-2xl font-bold text-purple-500">24/7</div>
            <div className="text-xs text-muted-foreground">Support</div>
          </div>
          <div className="p-4 text-center border rounded-lg bg-card/50">
            <div className="text-2xl font-bold text-orange-500">100+</div>
            <div className="text-xs text-muted-foreground">Happy Customers</div>
          </div>
        </div>

        {/* Scripts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <div key={script.id} className="group relative border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Image Preview Placeholder */}
              <div className="h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-center">
                  {script.icon}
                  <p className="text-xs text-muted-foreground mt-2">Preview: {script.file}</p>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{script.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{script.file}</p>
                  </div>
                  {script.icon}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{script.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {script.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-primary/10 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {script.features.length > 3 && (
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                      +{script.features.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="size-4 text-green-500" />
                      <span className="text-xl font-bold">${script.priceUSD}</span>
                      <span className="text-xs text-muted-foreground">USD</span>
                    </div>
                    <div className="text-xs text-muted-foreground">or {script.priceBWP} BWP</div>
                  </div>
                  <button
                    onClick={() => openPurchase(script)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all group-hover:scale-105"
                  >
                    <ShoppingCart className="size-4" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Contact Banner */}
        <div className="mt-12 p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
          <Send className="size-8 text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Need Help or Custom Script?</h3>
          <p className="text-muted-foreground mb-4">
            Contact me directly on WhatsApp for custom scripts or bulk purchases
          </p>
          <a
            href="https://wa.me/26777821911"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            <Send className="size-4" />
            Message Me on WhatsApp
          </a>
          <p className="text-xs text-muted-foreground mt-3">+267 77 821 911</p>
        </div>

        {/* Purchase Modal */}
        {showModal && selectedScript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl max-w-md w-full mx-4 p-6 border shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Purchase Script</h2>
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
        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            All scripts are original and tested | 30-day money-back guarantee | 24/7 support
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2026 Njabulo-Jb Tech | JavaScript | React.js | Next.js Developer
          </p>
        </div>
      </div>
    </div>
  );
        }
