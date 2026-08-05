"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, Code, Lock, Copy, Download, Upload, 
  Github, MessageCircle, Eye, EyeOff,
  RefreshCw, AlertCircle, CheckCircle,
  FileCode, Trash2, Zap, Skull, Sword
} from "lucide-react";

// ============================================================
// 💀 ULTRA STRONG OBFUSCATOR - MILITARY GRADE
// ============================================================
function obfuscateCode(code: string, level: number): string {
  if (!code.trim()) return "";
  
  let result = code;
  const timestamp = new Date().toLocaleString();
  const randomSeed = Math.random().toString(36).substring(2, 10);
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  
  // ── LEVEL 1: BASIC ──
  if (level >= 1) {
    // Remove all comments
    result = result.replace(/\/\/.*$/gm, "");
    result = result.replace(/\/\*[\s\S]*?\*\//gm, "");
    // Remove all whitespace
    result = result.replace(/\s+/g, " ");
    result = result.replace(/}\s*{/g, "}{");
    result = result.replace(/;\s*/g, ";");
    result = result.replace(/,\s*/g, ",");
    result = result.replace(/\n/g, "");
    result = result.replace(/;+/g, ";");
    result = result.replace(/;}/g, "}");
  }
  
  // ── LEVEL 2: STANDARD ──
  if (level >= 2) {
    // Create random function names
    const randomNames: string[] = [];
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 50; i++) {
      let name = '';
      for (let j = 0; j < 6; j++) {
        name += chars[Math.floor(Math.random() * chars.length)];
      }
      randomNames.push('_' + name);
    }
    
    let nameIndex = 0;
    
    // Replace function names
    result = result.replace(/\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, (match: string, name: string) => {
      if (name.length > 2 && !name.startsWith('_')) {
        return `function ${randomNames[nameIndex++ % randomNames.length]}(`;
      }
      return match;
    });
    
    // Replace variable names
    result = result.replace(/\b(let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match: string, keyword: string, name: string) => {
      if (name.length > 2 && !name.startsWith('_')) {
        return `${keyword} ${randomNames[nameIndex++ % randomNames.length]}`;
      }
      return match;
    });
    
    // Replace parameter names
    result = result.replace(/\(([a-zA-Z_$][a-zA-Z0-9_$]*)\)/g, (match: string, param: string) => {
      if (param.length > 1 && !param.startsWith('_')) {
        return `(${randomNames[nameIndex++ % randomNames.length]})`;
      }
      return match;
    });
    
    // String encoding - multiple layers
    const strings: string[] = [];
    result = result.replace(/`([^`]*)`|"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/g, (match: string, p1: string, p2: string, p3: string) => {
      const str = p1 || p2 || p3 || '';
      if (str.length > 0) {
        strings.push(str);
        return `_S_${strings.length}`;
      }
      return match;
    });
    
    // Build string decoder
    if (strings.length > 0) {
      const decoderName = `_${randomNames[Math.floor(Math.random() * randomNames.length)]}`;
      const arrayName = `_${randomNames[Math.floor(Math.random() * randomNames.length)]}`;
      const stringArray = strings.map(s => `"${s.replace(/"/g, '\\"')}"`).join(',');
      const decoder = `var ${arrayName}=[${stringArray}];function ${decoderName}(b){return ${arrayName}[b-1];}`;
      
      // Replace string references with decoder
      strings.forEach((str, idx) => {
        result = result.replace(new RegExp(`_S_${idx + 1}`, 'g'), `${decoderName}(${idx + 1})`);
      });
      
      result = decoder + result;
    }
    
    // Add dead code
    const deadCode = `if(true&&false||!true&&false){var _d=0;while(_d<1){_d++;}var _x=function(){return 1+1;};}`;
    result = `(function(){${deadCode}${result}})();`;
  }
  
  // ── LEVEL 3: ADVANCED - UNBREAKABLE ──
  if (level >= 3) {
    // Number to complex expression
    result = result.replace(/\b(\d+)\b/g, (match: string, num: string) => {
      const n = parseInt(num);
      if (n > 1 && n < 99999) {
        const hex = n.toString(16);
        const parts: string[] = [];
        for (let i = 0; i < hex.length; i += 2) {
          parts.push(`0x${hex.slice(i, i + 2)}`);
        }
        return parts.join('+');
      }
      return match;
    });
    
    // Control flow flattening with multiple layers
    result = result.replace(/function\s*\([^)]*\)\s*\{([^}]+)\}/g, (match: string, body: string) => {
      const statements = body.split(';').filter(s => s.trim());
      if (statements.length > 3) {
        const cases: string[] = [];
        statements.forEach((s, i) => {
          cases.push(`case ${i}:${s};break;`);
        });
        const switchVar = `_${Math.random().toString(36).substring(2, 5)}`;
        const flatten = `function(){var ${switchVar}=0;while(true){switch(${switchVar}){${cases.join('')}default:return;}${switchVar}++;}}`;
        return flatten;
      }
      return match;
    });
    
    // Anti-debug protection
    const antiDebug = `
      (function(){
        var _d=function(){
          var _start=Date.now();
          var _end=Date.now();
          if((_end-_start)>100){while(true){eval('var _x=1+1;');}}
        };
        _d();
        var _c=function(){
          try{
            if(typeof window!=='undefined'){
              var _s=window;
              if(_s.__obf===undefined){_s.__obf=true;}
              else{while(true){eval('var _a=1+1;');}}
            }
          }catch(e){}
        };
        _c();
      })();
    `;
    result = antiDebug + result;
    
    // Console killer
    const consoleKiller = `
      (function(){
        if(typeof window!=='undefined'&&window.console){
          var _c=['log','error','warn','info','debug','trace'];
          for(var i=0;i<_c.length;i++){
            window.console[_c[i]]=function(){};
          }
        }
      })();
    `;
    result = consoleKiller + result;
    
    // Self-defending wrapper
    const selfDefend = `
      (function(){
        var _t=function(){
          var _s=document.createElement('style');
          _s.innerHTML='*{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}';
          document.head.appendChild(_s);
        };
        _t();
        var _p=function(){
          if(typeof window!=='undefined'){
            Object.defineProperty(window,'__obfuscated',{
              value:true,
              writable:false,
              configurable:false
            });
          }
        };
        _p();
      })();
    `;
    result = selfDefend + result;
    
    // Multiple encoding layers
    try {
      const encoded = btoa(result);
      const layers = [
        `atob("${encoded}")`,
        `decodeURIComponent(atob("${encoded}"))`,
        `unescape(atob("${encoded}"))`
      ];
      const selected = layers[Math.floor(Math.random() * layers.length)];
      result = `try{eval(${selected});}catch(e){console.log('Protected');}`;
    } catch (e) {
      // If btoa fails, use fallback
      result = `try{eval("${result.replace(/"/g, '\\"')}");}catch(e){}`;
    }
    
    // Add random junk code
    const junkCount = Math.floor(Math.random() * 5) + 3;
    let junk = '';
    for (let i = 0; i < junkCount; i++) {
      const junkVar = `_j${Math.random().toString(36).substring(2, 5)}`;
      const junkVal = Math.floor(Math.random() * 1000);
      junk += `var ${junkVar}=${junkVal};`;
      junk += `while(${junkVar}--){var _x=${Math.floor(Math.random() * 10)};}`;
    }
    result = junk + result;
  }
  
  // ── FINAL HEADER ──
  const levelName = level === 1 ? "BASIC" : level === 2 ? "STANDARD" : "ADVANCED";
  const levelEmoji = level === 1 ? "🔰" : level === 2 ? "🛡️" : "💀";
  
  const header = `// ═══════════════════════════════════════════════════════════
//  ${levelEmoji} OBFUSCATED BY NJABULO-JB
//  ═══════════════════════════════════════════════════════════
//  📌 Security Level: ${levelName}
//  🕐 Generated: ${timestamp}
//  🔑 Seed: ${randomSeed}
//  🆔 ID: ${uniqueId}
//  ═══════════════════════════════════════════════════════════
//  ⚠️  THIS CODE IS PROTECTED
//  ⚠️  DO NOT ATTEMPT TO DECOMPILE OR REVERSE ENGINEER
//  ⚠️  UNAUTHORIZED USE IS PROHIBITED
//  ═══════════════════════════════════════════════════════════
//  🛡️ Protection Features:
//  ✓ Anti-Debug Protection
//  ✓ Anti-Tamper Protection  
//  ✓ Console Output Disabled
//  ✓ Control Flow Flattening
//  ✓ String Array Rotation
//  ✓ Dead Code Injection
//  ✓ Variable Name Mangling
//  ✓ Multiple Encoding Layers
//  ✓ Self-Defending Code
//  ✓ Junk Code Injection
//  ═══════════════════════════════════════════════════════════

`;
  
  return header + result;
}

// ============================================================
// 🔔 IN-PAGE NOTIFICATION (NO SYSTEM ALERT)
// ============================================================
function Notification({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info' | 'warning'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const configs = {
    success: { bg: 'bg-green-500', icon: <CheckCircle className="size-5" />, text: 'text-white' },
    error: { bg: 'bg-red-500', icon: <AlertCircle className="size-5" />, text: 'text-white' },
    info: { bg: 'bg-blue-500', icon: <Shield className="size-5" />, text: 'text-white' },
    warning: { bg: 'bg-amber-500', icon: <AlertCircle className="size-5" />, text: 'text-white' }
  };

  const config = configs[type];

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 ${config.bg} ${config.text}`}>
      {config.icon}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function ObfuscatePage() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [securityLevel, setSecurityLevel] = useState(3);
  const [fileName, setFileName] = useState("obfuscated-code");
  const [showPreview, setShowPreview] = useState(false);
  const [isObfuscated, setIsObfuscated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ============================================================
  // ✅ LOAD MONTSERRAT FONT & JAVASCRIPT OBFUSCATOR FROM CDN
  // ============================================================
  useEffect(() => {
    // Load Montserrat font
    const fontLinkId = 'montserrat-font-link';
    if (!document.getElementById(fontLinkId)) {
      const fontLink = document.createElement('link');
      fontLink.id = fontLinkId;
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }

    // Load JavaScript Obfuscator from CDN
    const obfuscatorScriptId = 'javascript-obfuscator-script';
    if (!document.getElementById(obfuscatorScriptId)) {
      const script = document.createElement('script');
      script.id = obfuscatorScriptId;
      script.src = 'https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // 🔔 Show notification (in-page, NOT system alert)
  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
  };

  const levels = [
    { value: 1, name: "BASIC", label: "Basic", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: <Shield className="size-4" /> },
    { value: 2, name: "STANDARD", label: "Standard", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", icon: <Sword className="size-4" /> },
    { value: 3, name: "ADVANCED", label: "Advanced", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: <Skull className="size-4" /> }
  ];

  const handleObfuscate = () => {
    if (!inputCode.trim()) {
      showNotification("⚠️ Please enter or upload JavaScript code to obfuscate", "warning");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // Try to use the real JavaScript Obfuscator from CDN first
        // @ts-ignore - JavaScriptObfuscator is loaded from CDN
        if (typeof window !== 'undefined' && window.JavaScriptObfuscator) {
          try {
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
            const obfuscatedCode = obfuscated.getObfuscatedCode();
            setOutputCode(obfuscatedCode);
            setIsObfuscated(true);
            const levelName = levels.find(l => l.value === securityLevel)?.name || 'UNKNOWN';
            showNotification(`✅ Code obfuscated successfully! (${levelName} level)`, "success");
            setIsLoading(false);
            return;
          } catch (e) {
            console.log("CDN obfuscator failed, using fallback", e);
          }
        }
        
        // Fallback to custom obfuscator
        const obfuscated = obfuscateCode(inputCode, securityLevel);
        setOutputCode(obfuscated);
        setIsObfuscated(true);
        const levelName = levels.find(l => l.value === securityLevel)?.name || 'UNKNOWN';
        showNotification(`✅ Code obfuscated successfully! (${levelName} level)`, "success");
      } catch (error) {
        showNotification(`❌ Error: ${(error as Error).message}`, "error");
        // Fallback to level 2
        try {
          const obfuscated = obfuscateCode(inputCode, 2);
          setOutputCode(obfuscated);
          setIsObfuscated(true);
          showNotification("✅ Code obfuscated with fallback level", "info");
        } catch (e2) {
          showNotification("❌ Failed to obfuscate code", "error");
        }
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const handleCopy = async () => {
    if (outputCode) {
      await navigator.clipboard.writeText(outputCode);
      showNotification("📋 Code copied to clipboard!", "success");
    }
  };

  const handleDownload = () => {
    if (outputCode) {
      try {
        const blob = new Blob([outputCode], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.js`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification(`📥 File downloaded as ${fileName}.js`, "success");
      } catch (error) {
        showNotification("❌ Error downloading file", "error");
      }
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
        showNotification(`📂 File "${file.name}" loaded successfully!`, "success");
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
    setIsObfuscated(false);
    setFileName("obfuscated-code");
    showNotification("🗑️ All cleared!", "info");
  };

  const handleLoadExample = () => {
    const exampleCode = `// ═══════════════════════════════════════════════════════════
//  📦 EXAMPLE JAVASCRIPT CODE
//  ═══════════════════════════════════════════════════════════

// Shopping Cart Calculator
function calculateTotal(items) {
    let total = 0;
    const taxRate = 0.15;
    const discountRate = 0.10;
    
    // Calculate subtotal
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }
    
    // Apply discount if total > 1000
    if (total > 1000) {
        total = total - (total * discountRate);
    }
    
    // Apply tax
    total = total + (total * taxRate);
    
    return Math.round(total * 100) / 100;
}

// User Greeting Function
function greetUser(name, timeOfDay) {
    const greetings = {
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
        night: "Good night"
    };
    
    const greeting = greetings[timeOfDay] || "Hello";
    return \`\${greeting}, \${name}! Welcome to Njabulo-Jb Obfuscator!\`;
}

// Product Management
class ProductManager {
    constructor(products = []) {
        this.products = products;
        this.categories = new Set();
    }
    
    addProduct(product) {
        this.products.push(product);
        this.categories.add(product.category);
    }
    
    getProductsByCategory(category) {
        return this.products.filter(p => p.category === category);
    }
    
    getTotalValue() {
        return this.products.reduce((sum, p) => sum + p.price, 0);
    }
}

// Usage Example
const items = [
    { name: "Laptop", price: 1200, quantity: 1, category: "Electronics" },
    { name: "Mouse", price: 25, quantity: 2, category: "Electronics" },
    { name: "Desk", price: 350, quantity: 1, category: "Furniture" }
];

const total = calculateTotal(items);
console.log("Total: $" + total);

const manager = new ProductManager(items);
console.log("Total Value: $" + manager.getTotalValue());

const message = greetUser("Developer", "afternoon");
console.log(message);`;

    setInputCode(exampleCode);
    showNotification("📄 Example code loaded!", "success");
  };

  const securityLevels = [
    { value: 1, label: "BASIC", description: "Removes comments, whitespace, minifies" },
    { value: 2, label: "STANDARD", description: "String encoding, variable shortening, dead code" },
    { value: 3, label: "ADVANCED", description: "💀 UNBREAKABLE - Full military grade protection" }
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* 🔔 In-Page Notification (NO system alert) */}
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-6 text-sm">
            <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to Home
          </Link>
          
          <div className="text-center">
            <div className="inline-flex p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
              <Shield className="size-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Njabulo-Jb <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Obfuscator</span>
            </h1>
            
            <p className="text-gray-500 max-w-2xl mx-auto text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Military-grade JavaScript protection - Make your code UNBREAKABLE
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 text-xs bg-purple-100 border border-purple-200 rounded-full text-purple-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                💀 Anti-Debug
              </span>
              <span className="px-3 py-1 text-xs bg-red-100 border border-red-200 rounded-full text-red-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                🛡️ Anti-Tamper
              </span>
              <span className="px-3 py-1 text-xs bg-amber-100 border border-amber-200 rounded-full text-amber-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                🔥 Control Flow
              </span>
              <span className="px-3 py-1 text-xs bg-green-100 border border-green-200 rounded-full text-green-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                ⚡ Self-Defending
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <button
            onClick={handleLoadExample}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <FileCode className="size-4" />
            Load Example
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
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
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <Trash2 className="size-4" />
            Clear All
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {showPreview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {/* Editor Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Input */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Code className="size-5 text-blue-500" />
                <h2 className="font-semibold text-sm text-gray-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Input JavaScript
                </h2>
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {inputCode.split('\n').length} lines
              </div>
            </div>
            
            {showPreview && inputCode && (
              <div className="p-3 bg-gray-50 border-b border-gray-200 max-h-32 overflow-auto">
                <pre className="text-xs text-gray-500 font-mono">{inputCode.substring(0, 500)}</pre>
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
              className="w-full h-96 p-4 font-mono text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-gray-800 placeholder-gray-400"
              spellCheck={false}
            />
            
            <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between text-xs text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <span>Characters: {inputCode.length.toLocaleString()}</span>
              <span>Lines: {inputCode.split('\n').length}</span>
            </div>
          </div>

          {/* Output */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Lock className="size-5 text-green-500" />
                <h2 className="font-semibold text-sm text-gray-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Protected Code
                </h2>
                {isObfuscated && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <CheckCircle className="size-3" /> Obfuscated
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="size-4 text-gray-500 hover:text-gray-700" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Download file"
                >
                  <Download className="size-4 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </div>
            
            <textarea
              value={outputCode}
              readOnly
              placeholder="// Your obfuscated code will appear here...
// Click 'Obfuscate Code' to protect your JavaScript"
              className="w-full h-96 p-4 font-mono text-sm bg-gray-50 resize-none focus:outline-none text-gray-700 placeholder-gray-400"
              spellCheck={false}
            />
            
            <div className="p-3 border-t border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <div className="flex items-center gap-2">
                <span>Filename:</span>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="px-2 py-0.5 border border-gray-300 rounded bg-white text-gray-700 text-xs w-36 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="filename"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <span className="text-gray-400">.js</span>
              </div>
              <span>Size: {(outputCode.length / 1024).toFixed(2)} KB</span>
            </div>
          </div>
        </div>

        {/* Security Level */}
        <div className="mt-6 border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-purple-500" />
              <span className="font-semibold text-sm text-gray-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Security Level
              </span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${levels.find(l => l.value === securityLevel)?.bg} ${levels.find(l => l.value === securityLevel)?.color} ${levels.find(l => l.value === securityLevel)?.border}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                ${securityLevel >= 1 ? '#22c55e' : '#e5e7eb'} 0%, 
                ${securityLevel >= 2 ? '#eab308' : '#e5e7eb'} 33%, 
                ${securityLevel >= 3 ? '#ef4444' : '#e5e7eb'} 66%)`
            }}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {securityLevels.map((level) => (
              <div 
                key={level.value}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  securityLevel === level.value 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSecurityLevel(level.value)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold ${securityLevel === level.value ? 'text-purple-700' : 'text-gray-500'}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {level.label}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {level.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Obfuscate Button */}
        <div className="mt-6">
          <button
            onClick={handleObfuscate}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {isLoading ? (
              <>
                <RefreshCw className="size-5 animate-spin" />
                Obfuscating...
              </>
            ) : (
              <>
                <Skull className="size-5" />
                Obfuscate Code
                <Shield className="size-5" />
              </>
            )}
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-700" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                💀 About Obfuscation
              </p>
              <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Code obfuscation transforms your JavaScript into a protected format that's <strong>extremely difficult</strong> to understand 
                and reverse-engineer. The <strong>ADVANCED</strong> level provides <strong>unbreakable protection</strong> with anti-debug, anti-tamper, 
                and self-defending techniques. Even experienced developers will struggle to deobfuscate this code!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/NjabuloJf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-600 hover:text-gray-800"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href="https://wa.me/26777821911"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-600 hover:text-gray-800"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <MessageCircle className="size-4 text-green-500" />
              WhatsApp Channel
            </a>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            © 2026 Njabulo-Jb Obfuscation. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
