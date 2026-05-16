"use client";

import Link from "next/link";
import { ArrowLeft, Copy, Check, Code, Briefcase, Rocket } from "lucide-react";
import { useState } from "react";

export default function ServicesPage() {
  const [copied, setCopied] = useState(false);

  const servicesScript = `// Njabulo-Jb Services - JavaScript/Next.js/React.js Expert
const njabuloJbServices = {
  developer: "Njabulo Jb",
  title: "JavaScript/Next.js/React.js Developer",
  
  // Business Portfolio Status
  businessPortfolio: {
    status: "AVAILABLE FOR HIRE",
    description: "Custom development solutions using JavaScript, React.js, Next.js"
  },
  
  // Available Services
  services: [
    {
      name: "Web Development",
      icon: "🎨",
      description: "Modern JavaScript websites and web applications",
      technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      features: ["Responsive Design", "SEO Optimization", "Fast Performance"]
    },
    {
      name: "React/Next.js Development",
      icon: "⚛️",
      description: "Expert React.js and Next.js applications",
      technologies: ["React Hooks", "Next.js App Router", "Server Components", "API Routes"],
      features: ["SSR", "SSG", "ISR", "Edge Functions"]
    },
    {
      name: "Bot Development",
      icon: "🤖",
      description: "Custom automation solutions",
      technologies: ["JavaScript", "Node.js", "WhatsApp API", "Telegram API"],
      features: ["AI Integration", "Automation", "24/7 Uptime"]
    },
    {
      name: "Technical Consulting",
      icon: "🔧",
      description: "Expert advice for JavaScript/React/Next.js projects",
      features: ["Code Review", "Architecture Design", "Performance Optimization", "Team Training"]
    }
  ],
  
  // Get service info
  getService: (serviceName) => {
    return njabuloJbServices.services.find(s => s.name === serviceName);
  },
  
  // Get all services
  getAllServices: () => {
    return njabuloJbServices.services;
  }
};

// Example: Get web development service
const webDev = njabuloJbServices.getService("Web Development");
console.log("Service:", webDev);
console.log("Business Portfolio:", njabuloJbServices.businessPortfolio.status);`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(servicesScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">Our Services</h1>
        <p className="text-muted-foreground mb-6">JavaScript | React.js | Next.js Development</p>
        
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
          <Briefcase className="size-6 text-green-500 mx-auto mb-2" />
          <p className="font-semibold text-green-600">Business Portfolio Available</p>
          <p className="text-sm text-muted-foreground">Custom development solutions using modern JavaScript technologies</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Code className="size-5 text-blue-500" />
              Web Development
            </h2>
            <p className="text-muted-foreground">Modern JavaScript websites and web applications</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-xs px-2 py-0.5 bg-blue-500/10 rounded">React.js</span>
              <span className="text-xs px-2 py-0.5 bg-blue-500/10 rounded">Next.js</span>
              <span className="text-xs px-2 py-0.5 bg-blue-500/10 rounded">TypeScript</span>
            </div>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Rocket className="size-5 text-cyan-500" />
              React/Next.js Expert
            </h2>
            <p className="text-muted-foreground">Professional React.js and Next.js applications</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-xs px-2 py-0.5 bg-cyan-500/10 rounded">SSR/SSG</span>
              <span className="text-xs px-2 py-0.5 bg-cyan-500/10 rounded">API Routes</span>
              <span className="text-xs px-2 py-0.5 bg-cyan-500/10 rounded">Server Components</span>
            </div>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">🤖 Bot Development</h2>
            <p className="text-muted-foreground">Custom automation solutions</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">🔧 Technical Consulting</h2>
            <p className="text-muted-foreground">Expert advice and solutions</p>
          </div>
        </div>

        {/* Copyable Script Section */}
        <div className="p-6 border rounded-lg bg-muted/30">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">📋 Njabulo-Jb Services Script</h2>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Script"}
            </button>
          </div>
          <pre className="bg-black/80 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono">
            <code>{servicesScript}</code>
          </pre>
          <p className="text-xs text-muted-foreground mt-3">
            Copy this script to add Njabulo-Jb services to your JavaScript/React/Next.js project
          </p>
        </div>
      </div>
    </div>
  );
              }
