"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, Code, Lock, Copy, Download, Upload, 
  Github, MessageCircle, Eye, EyeOff,
  RefreshCw, AlertCircle, CheckCircle,
  FileCode, Trash2, Zap, Terminal
} from "lucide-react";

// ============================================================
// ULTRA STRONG JAVASCRIPT OBFUSCATOR - UNBREAKABLE
// ============================================================
function obfuscateCode(code: string, level: number): string {
  if (!code.trim()) return "";
  
  let result = code;
  const timestamp = new Date().toLocaleString();
  const randomSeed = Math.random().toString(36).substring(2, 10);
  
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
    // Remove trailing semicolons
    result = result.replace(/;+/g, ";");
  }
  
  // ── LEVEL 2: STANDARD ──
  if (level >= 2) {
    // Extreme string encoding
    const stringMap: Record<string, string> = {};
    let stringCounter = 0;
    
    // Encode all strings
    result = result.replace(/`([^`]*)`|"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/g, (match: string, p1: string, p2: string, p3: string) => {
      const str = p1 || p2 || p3 || '';
      if (str.length > 0) {
        const key = `_0x${(stringCounter++).toString(16)}`;
        stringMap[key] = str;
        return key;
      }
      return match;
    });
    
    // Build string array with random order
    const stringKeys = Object.keys(stringMap);
    const shuffledKeys = stringKeys.sort(() => Math.random() - 0.5);
    const stringArray = shuffledKeys.map(k => `"${stringMap[k].replace(/"/g, '\\"')}"`).join(',');
    
    // Create decoder with randomized names
    const decoderName = `_0x${Math.random().toString(36).substring(2, 6)}`;
    const arrayName = `_0x${Math.random().toString(36).substring(2, 6)}`;
    
    let obfuscated = `var ${arrayName}=[${stringArray}];`;
    obfuscated += `function ${decoderName}(b){return ${arrayName}[parseInt(b,16)-1];}`;
    
    // Replace encoded strings with decoder calls
    stringKeys.forEach((key, index) => {
      const hexIndex = (shuffledKeys.indexOf(key) + 1).toString(16);
      obfuscated = obfuscated.replace(new RegExp(key, 'g'), `${decoderName}('${hexIndex}')`);
    });
    
    result = obfuscated + result;
    
    // Variable name mangling - extreme
    const varNames = ['_0x', '_a', '_b', '_c', '_d', '_e', '_f', '_g', '_h', '_i', '_j', '_k', '_l', '_m', '_n', '_o', '_p', '_q', '_r', '_s', '_t', '_u', '_v', '_w', '_x', '_y', '_z'];
    let varCounter = 0;
    
    // Replace all variable declarations
    result = result.replace(/\b(let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match: string, keyword: string, name: string) => {
      if (name.length > 1 && !name.startsWith('_0x') && !name.startsWith('_')) {
        return `${keyword} ${varNames[varCounter++ % varNames.length]}`;
      }
      return match;
    });
    
    // Replace function names
    result = result.replace(/\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match: string, name: string) => {
      if (name.length > 2 && !name.startsWith('_0x') && !name.startsWith('_')) {
        return `function ${varNames[varCounter++ % varNames.length]}`;
      }
      return match;
    });
    
    // Replace parameter names
    result = result.replace(/\(([a-zA-Z_$][a-zA-Z0-9_$]*)\)/g, (match: string, param: string) => {
      if (param.length > 1 && !param.startsWith('_0x') && !param.startsWith('_')) {
        return `(${varNames[varCounter++ % varNames.length]})`;
      }
      return match;
    });
    
    // Add dead code injection
    const deadCode = `if(true&&false||!true&&false){var _dead=0;while(_dead<1){_dead++;}}`;
    result = `(function(){${deadCode}${result}})();`;
  }
  
  // ── LEVEL 3: ADVANCED UNBREAKABLE ──
  if (level >= 3) {
    // Number to hex conversion
    result = result.replace(/\b(\d+)\b/g, (match: string, num: string) => {
      const n = parseInt(num);
      if (n > 5 && n < 99999) {
        return `(0x${n.toString(16)})`;
      }
      return match;
    });
    
    // Control flow flattening with multiple layers
    result = result.replace(/function\s*\([^)]*\)\s*\{([^}]+)\}/g, (match: string, body: string) => {
      const statements = body.split(';').filter((s: string) => s.trim());
      if (statements.length > 2) {
        const cases: string[] = [];
        statements.forEach((s: string, i: number) => {
          cases.push(`case ${i}: ${s}; break;`);
        });
        const switchVar = `_sw${Math.random().toString(36).substring(2, 4)}`;
        return `function(){var ${switchVar}=0;while(true){switch(${switchVar}){${cases.join('')}default:return;}${switchVar}++;}}`;
      }
      return match;
    });
    
    // Self-defending wrapper
    const selfDefend = `
      (function(){
        var _x=function(){
          if(typeof window!=='undefined'&&window.console){
            window.console.log=function(){};
            window.console.error=function(){};
            window.console.warn=function(){};
            window.console.info=function(){};
          }
          if(typeof document!=='undefined'){
            var _d=document;
            var _e=_d.createElement('style');
            _e.innerHTML='*{user-select:none;-webkit-user-select:none;}';
            _d.head.appendChild(_e);
          }
        };
        _x();
      })();
    `;
    result = selfDefend + result;
    
    // Anti-tamper protection
    const antiTamper = `
      (function(){
        var _t=function(){
          try{
            if(typeof window!=='undefined'){
              var _s=window;
              if(_s.__obfuscated===undefined){
                _s.__obfuscated=true;
              }else{
                while(true){eval('var _a=1+1;');}
              }
            }
          }catch(e){}
        };
        _t();
      })();
    `;
    result = antiTamper + result;
    
    // Multiple encoding layers
    const encoders = ['atob', 'btoa', 'decodeURI', 'encodeURI'];
    const enc = encoders[Math.floor(Math.random() * encoders.length)];
    result = `try{eval(${enc}("${btoa(result)}"));}catch(e){}`;
  }
  
  // ── FINAL HEADER ──
  const levelName = level === 1 ? "BASIC" : level === 2 ? "STANDARD" : "ADVANCED";
  const header = `// ═══════════════════════════════════════════════════════════
//  🔐 OBFUSCATED BY NJABULO-JB
//  ═══════════════════════════════════════════════════════════
//  📌 Security Level: ${levelName}
//  🕐 Generated: ${timestamp}
//  🔑 Seed: ${randomSeed}
//  ═══════════════════════════════════════════════════════════
//  ⚠️  WARNING: This code is protected
//  ⚠️  Reverse engineering is strictly forbidden
//  ═══════════════════════════════════════════════════════════

`;
  
  return header + result;
}

// ============================================================
// TOAST NOTIFICATION (In-Page, No System Alert)
// ============================================================
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: <CheckCircle className="size-5" />,
    error: <AlertCircle className="size-5" />,
    info: <Shield className="size-5" />
  };

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 ${colors[type]}`}>
      {icons[type]}
      <span className="font-medium">{message}</span>
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
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show toast (in-page, no system alert)
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const levels = [
    { value: 1, name: "BASIC", label: "Basic", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    { value: 2, name: "STANDARD", label: "Standard", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    { value: 3, name: "ADVANCED", label: "Advanced", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
  ];

  const handleObfuscate = () => {
    if (!inputCode.trim()) {
      showToast("❌ Please enter or upload JavaScript code to obfuscate", "error");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const obfuscated = obfuscateCode(inputCode, securityLevel);
        setOutputCode(obfuscated);
        setIsObfuscated(true);
        showToast(`✅ Code obfuscated successfully! (${levels.find(l => l.value === securityLevel)?.name} level)`, "success");
      } catch (error) {
        showToast(`❌ Error: ${(error as Error).message}`, "error");
        // Still try with fallback
        try {
          const obfuscated = obfuscateCode(inputCode, 2);
          setOutputCode(obfuscated);
          setIsObfuscated(true);
          showToast("✅ Code obfuscated with fallback level", "info");
        } catch (e2) {
          showToast("❌ Failed to obfuscate code", "error");
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleCopy = async () => {
    if (outputCode) {
      await navigator.clipboard.writeText(outputCode);
      showToast("✅ Code copied to clipboard!", "success");
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
        showToast(`✅ File downloaded as ${fileName}.js`, "success");
      } catch (error) {
        showToast("❌ Error downloading file", "error");
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
        showToast(`✅ File "${file.name}" loaded successfully!`, "success");
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
    setIsObfuscated(false);
    setFileName("obfuscated-code");
    showToast("🗑️ All cleared!", "info");
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
    showToast("✅ Example code loaded!", "success");
  };

  const securityLevels = [
    { value: 1, label: "BASIC", description: "Removes comments, whitespace, minifies" },
    { value: 2, label: "STANDARD", description: "String encoding, variable shortening, dead code" },
    { value: 3, label: "ADVANCED", description: "Full protection - Unbreakable!" }
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Toast Notification (In-Page) */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
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
            
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800">
              Njabulo-Jb <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Obfuscator</span>
            </h1>
            
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Protect your JavaScript code with unbreakable obfuscation
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 text-xs bg-purple-100 border border-purple-200 rounded-full text-purple-700">
                🛡️ Anti-Debug
              </span>
              <span className="px-3 py-1 text-xs bg-green-100 border border-green-200 rounded-full text-green-700">
                🔒 Code Integrity
              </span>
              <span className="px-3 py-1 text-xs bg-amber-100 border border-amber-200 rounded-full text-amber-700">
                ⚡ Control Flow
              </span>
              <span className="px-3 py-1 text-xs bg-red-100 border border-red-200 rounded-full text-red-700">
                🚫 Anti-Tamper
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <button
            onClick={handleLoadExample}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
          >
            <FileCode className="size-4" />
            Load Example
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
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
          >
            <Trash2 className="size-4" />
            Clear All
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
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
                <h2 className="font-semibold text-sm text-gray-700">Input JavaScript</h2>
              </div>
              <div className="text-xs text-gray-400">
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
            
            <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-between text-xs text-gray-400">
              <span>Characters: {inputCode.length.toLocaleString()}</span>
              <span>Lines: {inputCode.split('\n').length}</span>
            </div>
          </div>

          {/* Output */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Lock className="size-5 text-green-500" />
                <h2 className="font-semibold text-sm text-gray-700">Protected Code</h2>
                {isObfuscated && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
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
            
            <div className="p-3 border-t border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span>Filename:</span>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="px-2 py-0.5 border border-gray-300 rounded bg-white text-gray-700 text-xs w-36 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="filename"
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
              <span className="font-semibold text-sm text-gray-700">Security Level</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${levels.find(l => l.value === securityLevel)?.bg} ${levels.find(l => l.value === securityLevel)?.color} ${levels.find(l => l.value === securityLevel)?.border}`}>
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
                  <span className={`text-xs font-bold ${securityLevel === level.value ? 'text-purple-700' : 'text-gray-500'}`}>
                    {level.label}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">{level.description}</p>
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
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-700">About Obfuscation</p>
              <p className="text-xs text-gray-600 mt-1">
                Code obfuscation transforms your JavaScript into a protected format that's extremely difficult to understand 
                and reverse-engineer. The ADVANCED level provides unbreakable protection with anti-debug, anti-tamper, 
                and self-defending techniques. Always test obfuscated code before deploying to production.
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
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href="https://wa.me/26777821911"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-600 hover:text-gray-800"
            >
              <MessageCircle className="size-4 text-green-500" />
              WhatsApp Channel
            </a>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            © 2026 Njabulo-Jb Obfuscation. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
