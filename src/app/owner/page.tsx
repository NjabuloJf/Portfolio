"use client";

import Link from "next/link";
import { ArrowLeft, Copy, Check, Code, Briefcase, Github, Twitter, Mail } from "lucide-react";
import { useState } from "react";

export default function OwnerPage() {
  const [copied, setCopied] = useState(false);

  const ownerScript = `// Njabulo-Jb - JavaScript/Next.js/React.js Developer
const njabuloJb = {
  name: "Njabulo Jb",
  title: "JavaScript/Next.js/React.js Developer",
  role: "Founder & Lead Developer",
  
  // Tech Stack
  techStack: {
    frontend: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Python", "Express"],
    databases: ["MongoDB", "PostgreSQL", "Redis"],
    tools: ["Git", "Docker", "Vercel", "Netlify"]
  },
  
  // Business Portfolio
  businessPortfolio: {
    status: "AVAILABLE",
    description: "Open for business - Custom JavaScript/React/Next.js development",
    contact: "info@njabulojb.dev"
  },
  
  // Contact
  contact: {
    email: "info@njabulojb.dev",
    github: "https://github.com/NjabuloJf",
    twitter: "https://twitter.com/njabulojb",
    website: "https://njabulojb.dev"
  },
  
  // Bio
  bio: "Full-stack JavaScript developer specializing in React.js and Next.js. Creator of innovative web solutions and bot development with over 5K+ active users.",
  
  // Get owner info
  getInfo: () => {
    return {
      name: njabuloJb.name,
      title: njabuloJb.title,
      techStack: njabuloJb.techStack,
      businessPortfolio: njabuloJb.businessPortfolio.status
    };
  }
};

// Display owner information
console.log("Njabulo Jb - JavaScript/Next.js/React.js Developer");
console.log("Tech Stack:", njabuloJb.techStack);
console.log("Business Portfolio:", njabuloJb.businessPortfolio.status);
console.log("Email:", njabuloJb.contact.email);`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(ownerScript);
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
        
        <h1 className="text-3xl font-bold mb-2">About the Owner</h1>
        <p className="text-muted-foreground mb-6">JavaScript | React.js | Next.js Expert Developer</p>
        
        <div className="grid gap-6">
          <div className="p-6 border rounded-lg text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-4xl">
              👨‍💻
            </div>
            <h2 className="text-2xl font-semibold mb-1">Njabulo Jb</h2>
            <p className="text-muted-foreground mb-2">JavaScript/Next.js/React.js Developer</p>
            <div className="flex justify-center gap-2 mb-4">
              <span className="text-xs px-2 py-0.5 bg-blue-500/10 rounded-full">JavaScript</span>
              <span className="text-xs px-2 py-0.5 bg-blue-500/10 rounded-full">TypeScript</span>
              <span className="text-xs px-2 py-0.5 bg-black/10 rounded-full">React.js</span>
              <span className="text-xs px-2 py-0.5 bg-black/10 rounded-full">Next.js</span>
            </div>
            <div className="mb-4 p-2 bg-green-500/10 rounded-lg inline-block">
              <Briefcase className="size-4 text-green-500 inline mr-1" />
              <span className="text-sm text-green-600">Business Portfolio Available</span>
            </div>
            <p className="text-muted-foreground">
              Full-stack JavaScript developer specializing in React.js and Next.js. 
              Creating innovative web solutions with modern technologies.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="https://github.com/NjabuloJf" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Github className="size-5" />
              </Link>
              <Link href="https://twitter.com/njabulojb" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Twitter className="size-5" />
              </Link>
              <Link href="mailto:info@njabulojb.dev" className="text-muted-foreground hover:text-foreground">
                <Mail className="size-5" />
              </Link>
            </div>
          </div>

          {/* Copyable Script Section */}
          <div className="p-6 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">📋 Njabulo-Jb Developer Script</h2>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>
            <pre className="bg-black/80 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono">
              <code>{ownerScript}</code>
            </pre>
            <p className="text-xs text-muted-foreground mt-3">
              Copy this script to add Njabulo-Jb developer information to your JavaScript/React/Next.js project
            </p>
          </div>
        </div>
      </div>
    </div>
  );
    }
