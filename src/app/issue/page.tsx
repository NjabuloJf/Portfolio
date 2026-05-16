"use client";

import Link from "next/link";
import { ArrowLeft, Copy, Check, Bug, Code } from "lucide-react";
import { useState } from "react";

export default function IssuePage() {
  const [copied, setCopied] = useState(false);

  const issueScript = `// Njabulo-Jb Issue Reporter - JavaScript/Next.js/React.js
const njabuloJbIssueReporter = {
  developer: "Njabulo Jb",
  expertise: ["JavaScript", "TypeScript", "React.js", "Next.js", "Node.js"],
  
  // Report a bug
  reportBug: (title, description, severity) => {
    return {
      type: "bug",
      title: title,
      description: description,
      severity: severity || "normal",
      timestamp: new Date().toISOString(),
      reportedBy: "user",
      developer: "Njabulo-Jb (JavaScript/React/Next.js Expert)"
    };
  },
  
  // Report code issue
  reportCodeIssue: (language, codeSnippet, error) => {
    return {
      type: "code_issue",
      language: language, // JavaScript, TypeScript, React, Next.js
      code: codeSnippet,
      error: error,
      timestamp: new Date().toISOString()
    };
  },
  
  // Request feature
  requestFeature: (title, description, priority) => {
    return {
      type: "feature",
      title: title,
      description: description,
      priority: priority || "medium",
      timestamp: new Date().toISOString()
    };
  },
  
  // Submit issue
  submitIssue: (issue) => {
    console.log("Issue submitted to Njabulo-Jb Support");
    console.log("Developer:", "Njabulo Jb - JavaScript/Next.js/React.js Expert");
    console.log("Type:", issue.type);
    console.log("Title:", issue.title);
    return { status: "submitted", id: Date.now(), responseTime: "24-48 hours" };
  }
};

// Example usage:
const bug = njabuloJbIssueReporter.reportBug(
  "JavaScript error in Next.js app",
  "Component not rendering correctly",
  "high"
);
njabuloJbIssueReporter.submitIssue(bug);`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(issueScript);
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
        
        <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
        <p className="text-muted-foreground mb-6">Get help with JavaScript, Next.js, React.js problems</p>
        
        <div className="border rounded-lg p-6 mb-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Issue Type</label>
              <select className="w-full p-2 border rounded-lg bg-background">
                <option>JavaScript Issue</option>
                <option>Next.js / React.js Issue</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea rows={5} className="w-full p-2 border rounded-lg bg-background" placeholder="Describe your JavaScript/React/Next.js issue..."></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Code Snippet (optional)</label>
              <textarea rows={3} className="w-full p-2 border rounded-lg bg-background font-mono text-sm" placeholder="Paste your code here..."></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input type="email" className="w-full p-2 border rounded-lg bg-background" placeholder="your@email.com" />
            </div>
            
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90">
              Submit Issue
            </button>
          </form>
        </div>

        {/* Copyable Script Section */}
        <div className="p-6 border rounded-lg bg-muted/30">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">📋 Njabulo-Jb Issue Reporter Script</h2>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Script"}
            </button>
          </div>
          <pre className="bg-black/80 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono">
            <code>{issueScript}</code>
          </pre>
          <p className="text-xs text-muted-foreground mt-3">
            Copy this script to add issue reporting to your JavaScript/React/Next.js project
          </p>
        </div>
      </div>
    </div>
  );
        }
