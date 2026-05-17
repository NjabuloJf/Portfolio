"use client";

import Link from "next/link";
import { ArrowLeft, Copy, Check, Code, Briefcase } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [copied, setCopied] = useState(false);

  const supportScript = `// Njabulo-Jb Support - JavaScript/Next.js/React.js Developer
const njabuloJbSupport = {
  developer: "Njabulo Jb",
  stack: {
    frontend: ["JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Python", "Express"],
    databases: ["MongoDB", "PostgreSQL", "Redis"]
  },
  
  // Business Portfolio Available
  businessPortfolio: {
    status: "AVAILABLE",
    services: ["Web Development", "Bot Development", "Mobile Apps", "Technical Consulting"],
    contact: "fanajb65@gmail.com",
    responseTime: "24-48 hours"
  },
  
  // Support Contact
  contact: {
    email: "support@njabulojb.dev",
    phone: "+26777821911",
    hours: "Monday-Friday, 9 AM - 6 PM SAST",
    liveChat: "Available during business hours"
  },
  
  // Code Help Function
  getCodeHelp: (problem) => {
    console.log(\`Helping with: \${problem}\`);
    console.log("Njabulo-Jb is a JavaScript/Next.js/React.js expert");
    return { status: "helping", responseTime: "24 hours" };
  }
};

// Display support info
console.log("Njabulo-Jb - JavaScript/Next.js/React.js Developer");
console.log("Business Portfolio:", njabuloJbSupport.businessPortfolio.status);
console.log("Email:", njabuloJbSupport.contact.email);`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(supportScript);
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
        
        <h1 className="text-3xl font-bold mb-2">Support Center</h1>
        <p className="text-muted-foreground mb-6">JavaScript | Next.js | React.js Expert Support</p>
        
        <div className="grid gap-4 mb-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Code className="size-5 text-blue-500" />
              Technical Support
            </h2>
            <p className="text-muted-foreground">Expert help with JavaScript, Next.js, React.js development</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="size-5 text-green-500" />
              Business Portfolio Available
            </h2>
            <p className="text-muted-foreground">Custom development solutions for your business needs</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">📧 Email Support</h2>
            <p className="text-muted-foreground">fanajb65@gmail.com</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">💬 Live Chat</h2>
            <p className="text-muted-foreground">Available Monday-Friday, 9 AM - 6 PM SAST</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">📞 Phone Support</h2>
            <p className="text-muted-foreground">+26777821911</p>
          </div>
        </div>

        {/* Copyable Script Section */}
        <div className="p-6 border rounded-lg bg-muted/30">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">📋 Njabulo-Jb Support Script</h2>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Script"}
            </button>
          </div>
          <pre className="bg-black/80 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono">
            <code>{supportScript}</code>
          </pre>
          <p className="text-xs text-muted-foreground mt-3">
            Copy this script to add Njabulo-Jb support information to your project
          </p>
        </div>
      </div>
    </div>
  );
    }
