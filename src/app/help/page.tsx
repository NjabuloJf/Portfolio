"use client";

import Link from "next/link";
import { ArrowLeft, Copy, Check, Code } from "lucide-react";
import { useState } from "react";

export default function HelpPage() {
  const [copied, setCopied] = useState(false);

  const helpScript = `// Njabulo-Jb Help Center - JavaScript/Next.js/React.js Expert
const njabuloJbHelp = {
  developer: "Njabulo Jb",
  expertise: {
    languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    frameworks: ["React.js", "Next.js", "Node.js", "Express"],
    tools: ["Git", "Docker", "Vercel", "Netlify"]
  },
  
  faq: [
    {
      question: "What JavaScript frameworks does Njabulo-Jb specialize in?",
      answer: "React.js and Next.js for frontend, Node.js for backend"
    },
    {
      question: "Is business portfolio available?",
      answer: "YES! Njabulo-Jb offers custom development services"
    },
    {
      question: "How to get coding help?",
      answer: "Email support@njabulojb.dev for JavaScript/React/Next.js assistance"
    },
    {
      question: "Response time for support?",
      answer: "24-48 hours for email, instant during business hours for live chat"
    }
  ],
  
  // Search help
  searchHelp: (query) => {
    const results = njabuloJbHelp.faq.filter(item => 
      item.question.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  },
  
  // Get coding resources
  getCodingResources: () => {
    return {
      javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      react: "https://react.dev",
      nextjs: "https://nextjs.org/docs"
    };
  }
};

// Search for JavaScript help
const results = njabuloJbHelp.searchHelp("JavaScript");
console.log("JavaScript help results:", results);`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(helpScript);
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
        
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground mb-6">JavaScript | React.js | Next.js Coding Help</p>
        
        <div className="grid gap-4 mb-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Code className="size-5 text-blue-500" />
              JavaScript/React/Next.js Help
            </h2>
            <p className="text-muted-foreground">Expert assistance with your coding problems</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">How to contact support?</h2>
            <p className="text-muted-foreground">Email us at support@njabulojb.dev or use live chat</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Response time?</h2>
            <p className="text-muted-foreground">We typically respond within 24-48 hours</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Business hours?</h2>
            <p className="text-muted-foreground">Monday-Friday, 9 AM - 6 PM SAST</p>
          </div>
        </div>

        {/* Copyable Script Section */}
        <div className="p-6 border rounded-lg bg-muted/30">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">📋 Njabulo-Jb Help Center Script</h2>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Script"}
            </button>
          </div>
          <pre className="bg-black/80 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono">
            <code>{helpScript}</code>
          </pre>
          <p className="text-xs text-muted-foreground mt-3">
            Copy this script to add Njabulo-Jb help center to your JavaScript/React/Next.js project
          </p>
        </div>
      </div>
    </div>
  );
  }
