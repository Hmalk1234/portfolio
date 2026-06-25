import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, MessageSquare, Play, Sparkles, FolderCode } from 'lucide-react';

export default function AICodingWebMockup() {
  const [chatMessage, setChatMessage] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'code'>('code');

  const fullChatText = "Creating modern space-themed React portfolio component for ALFA...\n> Setting up interactive black hole...\n> Completed successfully!";
  const fullCodeText = `import React from 'react';\nimport { Canvas } from '@react-three/fiber';\n\nexport default function EventHorizon() {\n  return (\n    <div className="relative bg-[#050505]">\n      <Singularity mass={1e6} />\n      <AccretionDisk spin={true} />\n    </div>\n  );\n}`;

  useEffect(() => {
    let chatIndex = 0;
    let codeIndex = 0;

    const chatInterval = setInterval(() => {
      if (chatIndex < fullChatText.length) {
        setChatMessage((prev) => prev + fullChatText.charAt(chatIndex));
        chatIndex++;
      }
    }, 45);

    const codeInterval = setInterval(() => {
      if (codeIndex < fullCodeText.length) {
        setCodeSnippet((prev) => prev + fullCodeText.charAt(codeIndex));
        codeIndex++;
      }
    }, 25);

    return () => {
      clearInterval(chatInterval);
      clearInterval(codeInterval);
    };
  }, []);

  return (
    <div className="w-full bg-[#080809] rounded-xl border border-zinc-800 overflow-hidden shadow-2xl transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">
      {/* Browser Bar Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-b border-zinc-800/80 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-950 text-zinc-400 text-[10px] font-mono px-3 py-1 rounded-md border border-zinc-800 w-1/2 justify-center">
          <FolderCode className="w-3 h-3 text-zinc-400" />
          floating-ai-coder44.vercel.app
        </div>
        <div className="flex items-center gap-1.5 text-[10px] bg-white/5 text-zinc-300 font-mono px-2 py-0.5 rounded border border-zinc-800">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 font-sans h-[320px]">
        {/* Workspace Sidebar (Col 3) */}
        <div className="hidden md:flex md:col-span-3 flex-col bg-zinc-950 p-3 select-none">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono font-medium tracking-wide mb-3 px-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-600 animate-spin" style={{ animationDuration: '6s' }} />
            MODELS
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-white bg-zinc-900 border border-zinc-800 px-2 py-1.5 rounded-md">
              <Sparkles className="w-3 h-3 text-zinc-400" />
              Gemini 2.5 Flash
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 px-2 py-1.5 rounded-md hover:bg-zinc-900/50 hover:text-zinc-400 transition-colors">
              <Terminal className="w-3 h-3" />
              Claude 3.5 Sonnet
            </div>
          </div>
          <div className="mt-auto border-t border-zinc-900 pt-3">
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono px-1">
              <span>Token Usage</span>
              <span className="text-white">35.4k</span>
            </div>
            <div className="w-full bg-zinc-900 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: '42%' }} />
            </div>
          </div>
        </div>

        {/* Workspace Center - Dual Panels (Col 9) */}
        <div className="col-span-12 md:col-span-9 flex flex-col bg-zinc-900/10">
          {/* Tabs */}
          <div className="flex bg-zinc-950 border-b border-zinc-900">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-r border-zinc-900 transition-colors ${activeTab === 'code' ? 'bg-zinc-900/40 text-white border-t-2 border-t-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              EventHorizon.tsx
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-r border-zinc-900 transition-colors ${activeTab === 'chat' ? 'bg-zinc-900/40 text-white border-t-2 border-t-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
              AI Chat logs
            </button>
          </div>

          {/* Active Panel View */}
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed">
            {activeTab === 'code' ? (
              <pre className="text-zinc-300">
                <code>
                  {codeSnippet.split('\n').map((line, i) => {
                    let colorClass = 'text-zinc-400';
                    if (line.trim().startsWith('import') || line.trim().startsWith('export')) {
                      colorClass = 'text-zinc-200';
                    } else if (line.trim().startsWith('return') || line.trim().startsWith('function')) {
                      colorClass = 'text-white font-bold';
                    } else if (line.includes('<') || line.includes('/>')) {
                      colorClass = 'text-zinc-300';
                    }
                    return (
                      <div key={i} className="flex gap-4">
                        <span className="text-[10px] text-zinc-600 w-4 text-right select-none">{i + 1}</span>
                        <span className={colorClass}>{line}</span>
                      </div>
                    );
                  })}
                  <span className="w-1.5 h-4 bg-white inline-block animate-pulse ml-0.5 align-middle" />
                </code>
              </pre>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300 flex items-center justify-center border border-zinc-700">
                    U
                  </div>
                  <div className="bg-zinc-900/90 text-zinc-300 border border-zinc-800 rounded-md p-2 max-w-[85%] text-[11px]">
                    Create standard workspace layouts for Alfa's space-themed project.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded bg-zinc-100 text-[10px] font-mono text-black flex items-center justify-center shadow-lg shadow-white/10 font-bold">
                    AI
                  </div>
                  <div className="bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-md p-2 max-w-[85%] text-[11px] whitespace-pre-line">
                    {chatMessage}
                    <span className="w-1 h-3.5 bg-zinc-400 inline-block animate-pulse ml-0.5 align-middle" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Code Footer Status */}
          <div className="bg-zinc-950 px-4 py-2 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                UTF-8
              </span>
              <span>React 19.0</span>
            </div>
            <span className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer">
              <Play className="w-3 h-3 text-zinc-400" />
              Run Sandbox
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
