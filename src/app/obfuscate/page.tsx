"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, Code, Lock, Copy, Download, Upload, 
  FileText, Github, MessageCircle, Eye, EyeOff,
  Save, RefreshCw, AlertCircle, CheckCircle,
  FileCode, FolderOpen, Trash2, Edit3, Zap
} from "lucide-react";

// ============================================================
// ADVANCED JAVASCRIPT OBFUSCATOR ENGINE
// ============================================================
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
    result = result.replace(/`([^`]*)`/g, (match: string, str: string) => {
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
    result = result.replace(/\b(let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match: string, keyword: string, name: string) => {
      if (name.length > 2) {
        return `${keyword} ${varNames[varCounter++ % varNames.length]}`;
      }
      return match;
    });
    
    // Function name shortening
    result = result.replace(/\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match: string, name: string) => {
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
    const strings: string[] = [];
    result = result.replace(/"[^"\\]*(\\.[^"\\]*)*"|'[^'\\]*(\\.[^'\\]*)*'/g, (match: string) => {
      const str = match.slice(1, -1);
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
    result = result.replace(/\b(\d+)\b/g, (match: string, num: string) => {
      const n = parseInt(num);
      if (n > 9 && n < 1000) {
        return `(0x${n.toString(16)})`;
      }
      return match;
    });
    
    // Control flow flattening
    result = result.replace(/function\s*\([^)]*\)\s*\{([^}]+)\}/g, (match: string, body: string) => {
      const statements = body.split(';').filter((s: string) => s.trim());
      const cases: string[] = [];
      statements.forEach((s: string, i: number) => {
        cases.push(`case ${i}: ${s}; break;`);
      });
      return `function(){var _switch=0;while(true){switch(_switch){${cases.join('')}default:return;}_switch++;}}`;
    });
  }
  
  // Add obfuscation header
  const levelName = level === 1 ? "BASIC" : level === 2 ? "STANDARD" : "ADVANCED";
  const header = `// Obfuscated by Njabulo-Jb
// Security Level: ${levelName}
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
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Montserrat font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Load JavaScript Obfuscator
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

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
    
    setIsLoading(true);
    
    // Use the real JavaScript Obfuscator if available
    setTimeout(() => {
      try {
        // @ts-ignore - JavaScriptObfuscator is loaded from CDN
        if (typeof window !== 'undefined' && window.JavaScriptObfuscator) {
          // @ts-ignore
          const obfuscated = window.JavaScriptObfuscator.obfuscate(inputCode, {
            compact: true,
            controlFlowFlattening: securityLevel >= 2,
            controlFlowFlatteningThreshold: securityLevel === 3 ? 0.75 : 0.5,
            deadCodeInjection: securityLevel >= 2,
            deadCodeInjectionThreshold: securityLevel === 3 ? 0.5 : 0.3,
            debugProtection: securityLevel === 3,
            debugProtectionInterval: securityLevel === 3 ? 2000 : 0,
            disableConsoleOutput: securityLevel === 3,
            identifierNamesGenerator: securityLevel === 3 ? 'mangled' : 'hexadecimal',
            renameGlobals: securityLevel === 3,
            rotateStringArray: true,
            selfDefending: securityLevel === 3,
            stringArray: true,
            stringArrayEncoding: securityLevel === 3 ? ['rc4'] : ['base64'],
            stringArrayThreshold: securityLevel === 3 ? 0.8 : 0.5,
            unicodeEscapeSequence: securityLevel === 3,
          });
          setOutputCode(obfuscated.getObfuscatedCode());
        } else {
          // Fallback to custom obfuscator
          const obfuscated = obfuscateCode(inputCode, securityLevel);
          setOutputCode(obfuscated);
        }
        setIsObfuscated(true);
      } catch (error) {
        alert("❌ Error obfuscating code: " + (error as Error).message);
        // Fallback to custom obfuscator
        const obfuscated = obfuscateCode(inputCode, securityLevel);
        setOutputCode(obfuscated);
        setIsObfuscated(true);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleCopy = async () => {
    if (outputCode) {
      await navigator.clipboard.writeText(outputCode);
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
        const name = file.name.replace(/\.js$/, "").replace(/\.ts$/, "").replace(/\.txt$/, "");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/10 to-slate-950 py-8 px-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm">
            <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to Home
          </Link>
          
          <div className="text-center relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-3xl" />
            
            <div className="inline-flex p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-2xl shadow-purple-500/30">
              <Shield className="size-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              CRISS VEVO CODE OBFUSCATION
            </h1>
            
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              Protect your JavaScript code with enterprise-grade obfuscation techniques
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 text-xs bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400">
                🛡️ Anti-Debug
              </span>
              <span className="px-3 py-1 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
                🔒 Code Integrity
              </span>
              <span className="px-3 py-1 text-xs bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400">
                ⚡ Control Flow
              </span>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <button
            onClick={handleLoadExample}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
          >
            <FileCode className="size-4" />
            Load Example
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
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
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
          >
            <Trash2 className="size-4" />
            Clear All
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
          >
            {showPreview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {/* Editor Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-800/30">
              <div className="flex items-center gap-2">
                <Code className="size-5 text-blue-400" />
                <h2 className="font-semibold text-sm text-slate-200">Input JavaScript Code</h2>
              </div>
              <div className="text-xs text-slate-500">
                {inputCode.split('\n').length} lines
              </div>
            </div>
            
            {showPreview && inputCode && (
              <div className="p-3 bg-slate-800/20 border-b border-slate-800 max-h-32 overflow-auto">
                <pre className="text-xs text-slate-400 font-mono">{inputCode.substring(0, 500)}</pre>
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
              className="w-full h-96 p-4 font-mono text-sm bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-slate-200 placeholder-slate-600"
              spellCheck={false}
            />
            
            <div className="p-3 border-t border-slate-800 bg-slate-800/30 flex justify-between text-xs text-slate-500">
              <span>Characters: {inputCode.length.toLocaleString()}</span>
              <span>Lines: {inputCode.split('\n').length}</span>
            </div>
          </div>

          {/* Output Section */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-800/30">
              <div className="flex items-center gap-2">
                <Lock className="size-5 text-emerald-400" />
                <h2 className="font-semibold text-sm text-slate-200">Protected Code</h2>
                {isObfuscated && (
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1">
                    <CheckCircle className="size-3" /> Obfuscated
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="size-4 text-slate-400 hover:text-white" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                  title="Download file"
                >
                  <Download className="size-4 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>
            
            <textarea
              value={outputCode}
              readOnly
              placeholder="// Your obfuscated code will appear here...
// Click 'Obfuscate Code' to protect your JavaScript"
              className="w-full h-96 p-4 font-mono text-sm bg-slate-900/30 resize-none focus:outline-none text-emerald-300/80 placeholder-slate-600"
              spellCheck={false}
            />
            
            <div className="p-3 border-t border-slate-800 bg-slate-800/30 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Filename:</span>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="px-2 py-0.5 border border-slate-700 rounded bg-slate-800 text-slate-300 text-xs w-36 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="filename"
                />
                <span className="text-slate-600">.js</span>
              </div>
              <span>Size: {(outputCode.length / 1024).toFixed(2)} KB</span>
            </div>
          </div>
        </div>

        {/* Security Level */}
        <div className="mt-6 border border-slate-800 rounded-xl p-6 bg-slate-900/50 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-purple-400" />
              <span className="font-semibold text-sm text-slate-200">Security Level</span>
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
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                ${securityLevel >= 1 ? '#22c55e' : '#334155'} 0%, 
                ${securityLevel >= 2 ? '#eab308' : '#334155'} 33%, 
                ${securityLevel >= 3 ? '#ef4444' : '#334155'} 66%)`
            }}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {securityLevels.map((level) => (
              <div 
                key={level.value}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  securityLevel === level.value 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => setSecurityLevel(level.value)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold ${securityLevel === level.value ? 'text-white' : 'text-slate-400'}`}>
                    {level.label}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">{level.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Obfuscate Button */}
        <div className="mt-6">
          <button
            onClick={handleObfuscate}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-lg shadow-2xl shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="size-5 animate-spin" />
                Obfuscating...
              </>
            ) : (
              <>
                <Zap className="size-5" />
                Obfuscate Code
                <Shield className="size-5" />
              </>
            )}
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-300">About Obfuscation</p>
              <p className="text-xs text-slate-400 mt-1">
                Code obfuscation transforms your JavaScript into a protected format that's difficult to understand 
                and reverse-engineer. Higher security levels provide better protection but may increase file size 
                and impact performance. Always test obfuscated code before deploying to production.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-800">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/NjabuloJf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 transition-all text-slate-400 hover:text-white"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href="https://wa.me/26777821911"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 transition-all text-slate-400 hover:text-white"
            >
              <MessageCircle className="size-4 text-green-500" />
              WhatsApp Channel
            </a>
          </div>
          <p className="text-center text-xs text-slate-600 mt-4">
            © 2026 Njabulo-Jb Obfuscation. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
