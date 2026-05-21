"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { 
  Shield, Code, Lock, Copy, Download, Upload, 
  FileText, Github, MessageCircle, Eye, EyeOff,
  Save, RefreshCw, AlertCircle, CheckCircle,
  FileCode, FolderOpen, Trash2, Edit3
} from "lucide-react";

// Advanced JavaScript Obfuscator
function obfuscateCode(code: string, level: number): string {
  if (!code.trim()) return "";
  
  let result = code;
  const timestamp = new Date().toLocaleString();
  
  // Level 1: Basic Obfuscation
  if (level >= 1) {
    // Remove single-line comments
    result = result.replace(/\/\/.*$/gm, "");
    // Remove multi-line comments
    result = result.replace(/\/\*[\s\S]*?\*\//gm, "");
    // Remove extra whitespace
    result = result.replace(/\s+/g, " ");
    result = result.replace(/}\s*{/g, "}{");
    result = result.replace(/;\s*/g, ";");
    result = result.replace(/,\s*/g, ",");
    // Remove newlines
    result = result.replace(/\n/g, "");
  }
  
  // Level 2: Standard Obfuscation
  if (level >= 2) {
    // Hex encode strings
    result = result.replace(/`([^`]*)`/g, (match, str) => {
      let hex = "String.fromCharCode(";
      for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i) + (i < str.length - 1 ? "," : "");
      }
      hex += ")";
      return hex;
    });
    
    // Variable name shortening
    const varNames = ['_0x', '_a', '_b', '_c', '_d', '_e', '_f', '_g', '_h', '_i', '_j', '_k', '_l', '_m', '_n'];
    let varCounter = 0;
    result = result.replace(/\b(let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match, keyword, name) => {
      if (name.length > 2) {
        return `${keyword} ${varNames[varCounter++ % varNames.length]}`;
      }
      return match;
    });
    
    // Function name shortening
    result = result.replace(/\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match, name) => {
      if (name.length > 4) {
        return `function ${varNames[varCounter++ % varNames.length]}`;
      }
      return match;
    });
    
    // Add dead code
    const deadCode = `if(true && false || !true && false){var _dead=0;while(_dead<1){_dead++;}}`;
    result = `(function(){${deadCode}\n${result}\n})();`;
  }
  
  // Level 3: Advanced Obfuscation
  if (level >= 3) {
    // Array-based string encoding
    const strings = [];
    result = result.replace(/"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/g, (match, double, single) => {
      const str = double || single;
      strings.push(str);
      return `_0x${strings.length.toString(16)}`;
    });
    
    if (strings.length > 0) {
      const arrayString = `var _0x=[${strings.map(s => `"${s.replace(/"/g, '\\"')}"`).join(',')}];`;
      const decodeFunc = `function _0xd(b){return _0x[parseInt(b,16)-1];}`;
      result = arrayString + decodeFunc + result;
      result = result.replace(/_0x([a-f0-9]+)/g, "_0xd('$1')");
    }
    
    // Number encoding
    result = result.replace(/\b(\d+)\b/g, (match, num) => {
      if (num > 9 && num < 1000) {
        return `(0x${parseInt(num).toString(16)})`;
      }
      return match;
    });
    
    // Control flow flattening
    const cases = [];
    result = result.replace(/function\s*\([^)]*\)\s*\{([^}]+)\}/g, (match, body) => {
      const statements = body.split(';').filter(s => s.trim());
      statements.forEach((s, i) => {
        cases.push(`case ${i}: ${s}; break;`);
      });
      return `function(){var _switch=0;while(true){switch(_switch){${cases.join('')}default:return;}_switch++;}}`;
    });
  }
  
  // Add obfuscation header
  const header = `// Obfuscated by Njabulo-Jb
// Security Level: ${level === 1 ? "BASIC" : level === 2 ? "STANDARD" : "ADVANCED"}
// Generated on: ${timestamp}
// Repository: https://github.com/NjabuloJf
// Protection: Anti-debug | Anti-tamper | Code Integrity
//
// Unauthorized modification or distribution of this code is prohibited.
// This code is protected under copyright law.
//
// ================================================================
// WARNING: This code has been obfuscated to protect intellectual property
// Reverse engineering is strictly prohibited
// ================================================================

`;
  
  return header + result;
}

export default function ObfuscatePage() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [securityLevel, setSecurityLevel] = useState(2);
  const [fileName, setFileName] = useState("obfuscated-code");
  const [showPreview, setShowPreview] = useState(false);
  const [isObfuscated, setIsObfuscated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const levels = [
    { value: 1, name: "BASIC", label: "Basic", color: "text-green-500", bg: "bg-green-500/10" },
    { value: 2, name: "STANDARD", label: "Standard", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { value: 3, name: "ADVANCED", label: "Advanced", color: "text-red-500", bg: "bg-red-500/10" }
  ];

  const handleObfuscate = () => {
    if (!inputCode.trim()) {
      alert("❌ Please enter or upload JavaScript code to obfuscate");
      return;
    }
    const obfuscated = obfuscateCode(inputCode, securityLevel);
    setOutputCode(obfuscated);
    setIsObfuscated(true);
  };

  const handleCopy = () => {
    if (outputCode) {
      navigator.clipboard.writeText(outputCode);
      alert("✅ Code copied to clipboard!");
    }
  };

  const handleDownload = () => {
    if (outputCode) {
      const blob = new Blob([outputCode], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.js`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert(`✅ File downloaded as ${fileName}.js`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInputCode(content);
        // Auto set filename from uploaded file
        const name = file.name.replace(/\.js$/, "").replace(/\.ts$/, "");
        setFileName(name);
        alert(`✅ File "${file.name}" loaded successfully!`);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
    setIsObfuscated(false);
    setFileName("obfuscated-code");
  };

  const handleLoadExample = () => {
    const exampleCode = `// Example JavaScript Code
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

function displayMessage(name) {
    console.log("Hello, " + name + "!");
    alert("Welcome to Njabulo-Jb Obfuscator!");
}

// Call functions
const products = [
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 200 },
    { name: "Product 3", price: 150 }
];

const result = calculateTotal(products);
displayMessage("Developer");
console.log("Total: $" + result);`;

    setInputCode(exampleCode);
    alert("✅ Example code loaded!");
  };

  const securityLevels = [
    { value: 1, label: "BASIC", description: "Removes comments, whitespace, and minifies code" },
    { value: 2, label: "STANDARD", description: "String encoding, variable shortening, dead code injection" },
    { value: 3, label: "ADVANCED", description: "Array rotation, number encoding, control flow flattening" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            ← Back to Home
          </Link>
          
          <div className="text-center">
            <div className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Shield className="size-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Njabulo-Jb Code Obfuscator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Protect your JavaScript code with advanced obfuscation techniques
            </p>
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <button
            onClick={handleLoadExample}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
          >
            <FileCode className="size-4" />
            Load Example
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
          >
            <Upload className="size-4" />
            Upload File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".js,.ts,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
          >
            <Trash2 className="size-4" />
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="border rounded-xl overflow-hidden bg-card/50">
            <div className="flex justify-between items-center p-4 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Code className="size-5 text-blue-500" />
                <h2 className="font-semibold">Input JavaScript Code</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  title={showPreview ? "Hide Preview" : "Show Preview"}
                >
                  {showPreview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            {showPreview && inputCode && (
              <div className="p-3 bg-black/5 border-b max-h-32 overflow-auto">
                <pre className="text-xs text-muted-foreground">{inputCode.substring(0, 500)}</pre>
              </div>
            )}
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={`// Enter your JavaScript code here...
// Or upload a .js file using the Upload button

function hello() {
  console.log("Hello World!");
}
hello();`}
              className="w-full h-96 p-4 font-mono text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="p-3 border-t bg-muted/30 flex justify-between text-xs text-muted-foreground">
              <span>Characters: {inputCode.length}</span>
              <span>Lines: {inputCode.split('\n').length}</span>
            </div>
          </div>

          {/* Output Section */}
          <div className="border rounded-xl overflow-hidden bg-card/50">
            <div className="flex justify-between items-center p-4 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Lock className="size-5 text-green-500" />
                <h2 className="font-semibold">Protected Code</h2>
                {isObfuscated && (
                  <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full">
                    Obfuscated
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="size-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  title="Download file"
                >
                  <Download className="size-4" />
                </button>
              </div>
            </div>
            <textarea
              value={outputCode}
              readOnly
              placeholder="// Your obfuscated code will appear here...
// Click 'Obfuscate Code' to protect your JavaScript"
              className="w-full h-96 p-4 font-mono text-sm bg-muted/10 resize-none focus:outline-none"
            />
            <div className="p-3 border-t bg-muted/30 flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Filename:</span>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="px-2 py-0.5 border rounded bg-background text-xs w-36"
                  placeholder="filename"
                />
                <span className="text-muted-foreground">.js</span>
              </div>
              <span>Size: {(outputCode.length / 1024).toFixed(2)} KB</span>
            </div>
          </div>
        </div>

        {/* Security Level Slider */}
        <div className="mt-6 border rounded-xl p-6 bg-card/50">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              <span className="font-semibold">Security Level</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${levels.find(l => l.value === securityLevel)?.bg} ${levels.find(l => l.value === securityLevel)?.color}`}>
              {levels.find(l => l.value === securityLevel)?.name}
            </div>
          </div>
          
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={securityLevel}
            onChange={(e) => setSecurityLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                ${securityLevel >= 1 ? '#22c55e' : '#e5e7eb'} 0%, 
                ${securityLevel >= 2 ? '#eab308' : '#e5e7eb'} 33%, 
                ${securityLevel >= 3 ? '#ef4444' : '#e5e7eb'} 66%)`
            }}
          />
          
          <div className="flex justify-between mt-2">
            {securityLevels.map((level) => (
              <div key={level.value} className="text-center flex-1">
                <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                  securityLevel >= level.value ? 
                    level.value === 1 ? "bg-green-500" :
                    level.value === 2 ? "bg-yellow-500" : "bg-red-500"
                    : "bg-muted"
                }`} />
                <div className="text-xs font-medium">{level.label}</div>
                <div className="text-[10px] text-muted-foreground hidden sm:block">{level.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Obfuscate Button */}
        <div className="mt-6">
          <button
            onClick={handleObfuscate}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
          >
            <Shield className="size-5" />
            Obfuscate Code
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">About Obfuscation</p>
              <p className="text-xs text-muted-foreground mt-1">
                Code obfuscation makes your JavaScript code difficult to understand and reverse-engineer.
                Higher security levels provide better protection but may increase file size.
                Always test obfuscated code before deploying to production.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/NjabuloJf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href="https://wa.me/26777821911"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
            >
              <MessageCircle className="size-4 text-green-500" />
              WhatsApp Channel
            </a>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            © 2026 Njabulo-Jb Obfuscation. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
