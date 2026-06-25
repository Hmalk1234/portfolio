import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  User, 
  Globe2, 
  Orbit, 
  ExternalLink, 
  ArrowRight, 
  BookOpen, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowLeftRight,
  MessageSquare,
  ChevronRight,
  MousePointerClick
} from 'lucide-react';
import { Language, translations } from './types';
import StarsBackground from './components/StarsBackground';
import InteractiveBlackHole from './components/InteractiveBlackHole';
import AICodingWebMockup from './components/AICodingWebMockup';
import { useRef } from 'react';

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [showIntro, setShowIntro] = useState(true);
  const [introFade, setIntroFade] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dynamic parameters for the relativistic black hole model
  const [blackHoleMass, setBlackHoleMass] = useState(1.0);
  const [blackHoleSpeed, setBlackHoleSpeed] = useState(1.0);

  // Space Drone ambient synthesizer refs & state
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const toggleSound = () => {
    if (isSoundOn) {
      try {
        oscRef.current?.stop();
        lfoRef.current?.stop();
        audioCtxRef.current?.close();
      } catch (e) {
        console.error(e);
      }
      audioCtxRef.current = null;
      oscRef.current = null;
      lfoRef.current = null;
      setIsSoundOn(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(85, ctx.currentTime); // Deep resonant bass hum
        oscRef.current = osc;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filter.Q.setValueAtTime(6.0, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime); // Soft, unobtrusive gain

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // Slow, therapeutic cosmic cycle
        lfoRef.current = lfo;

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(45, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(0);
        lfo.start(0);
        setIsSoundOn(true);
      } catch (e) {
        console.error("Audio Context initialization failed or user action required", e);
      }
    }
  };

  // Safe cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        oscRef.current?.stop();
        lfoRef.current?.stop();
        audioCtxRef.current?.close();
      } catch (e) {
        // Safe skip
      }
    };
  }, []);

  const t = translations[lang];

  // 1. Language Reset Mechanism
  useEffect(() => {
    setTypedLength(0);
    setIsDeleting(false);
    setRoleIndex(0);
  }, [lang]);

  // 2. Hero Text Typewriter Sequencing
  useEffect(() => {
    const fullText = t.roles[roleIndex] || "";
    
    if (!isDeleting) {
      // Typing phase: add one character
      if (typedLength < fullText.length) {
        const timer = setTimeout(() => {
          setTypedLength((prev) => prev + 1);
        }, 60); // typing speed (muncul perlahan)
        return () => clearTimeout(timer);
      } else {
        // Fully typed: wait 3 seconds (tunggu 3 detik)
        const timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3000); // Wait 3 seconds
        return () => clearTimeout(timer);
      }
    } else {
      // Deleting phase: backspace (menghilang perlahan kayak di backspace tapi perlahan)
      if (typedLength > 0) {
        const timer = setTimeout(() => {
          setTypedLength((prev) => prev - 1);
        }, 35); // deleting speed
        return () => clearTimeout(timer);
      } else {
        // Fully deleted: go to the next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % t.roles.length);
      }
    }
  }, [typedLength, isDeleting, roleIndex, t.roles]);

  const renderTypedRole = (roleText: string, len: number) => {
    const isAlfa = roleText.includes("ALFA");
    const isQlp = roleText.includes("QLP");

    if (isAlfa) {
      const idx = roleText.indexOf("ALFA");
      const prefix = roleText.substring(0, idx);
      const suffix = roleText.substring(idx + 4);
      
      if (len <= idx) {
        return (
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            {roleText.substring(0, len)}
            <span className="inline-block w-1 h-7 sm:h-9 bg-white ml-1 animate-[blink_1s_infinite] align-middle" />
          </h2>
        );
      } else if (len <= idx + 4) {
        const nameTyped = "ALFA".substring(0, len - idx);
        return (
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            {prefix}
            <span className="bg-white text-black px-2 py-0.5 select-none font-black shadow-lg inline-block">
              {nameTyped}
            </span>
            <span className="inline-block w-1 h-7 sm:h-9 bg-white ml-1 animate-[blink_1s_infinite] align-middle" />
          </h2>
        );
      } else {
        const suffixTyped = suffix.substring(0, len - idx - 4);
        return (
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            {prefix}
            <span className="bg-white text-black px-2 py-0.5 select-none font-black shadow-lg inline-block">
              ALFA
            </span>
            {suffixTyped}
            <span className="inline-block w-1 h-7 sm:h-9 bg-white ml-1 animate-[blink_1s_infinite] align-middle" />
          </h2>
        );
      }
    }

    if (isQlp) {
      const idx = roleText.indexOf("QLP");
      const prefix = roleText.substring(0, idx);
      const suffix = roleText.substring(idx + 3);
      
      if (len <= idx) {
        return (
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            {roleText.substring(0, len)}
            <span className="inline-block w-1 h-7 sm:h-9 bg-white ml-1 animate-[blink_1s_infinite] align-middle" />
          </h2>
        );
      } else if (len <= idx + 3) {
        const qlpTyped = "QLP".substring(0, len - idx);
        return (
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            {prefix}
            <span className="border border-white px-2 py-0.5 inline-block">{qlpTyped}</span>
            <span className="inline-block w-1 h-7 sm:h-9 bg-white ml-1 animate-[blink_1s_infinite] align-middle" />
          </h2>
        );
      } else {
        const suffixTyped = suffix.substring(0, len - idx - 3);
        return (
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            {prefix}
            <span className="border border-white px-2 py-0.5 inline-block mr-2">QLP</span>
            <span className="text-zinc-400 text-xl sm:text-2xl block mt-2 font-mono tracking-tight">
              {suffixTyped}
            </span>
            <span className="inline-block w-1 h-7 sm:h-9 bg-white ml-1 animate-[blink_1s_infinite] align-middle" />
          </h2>
        );
      }
    }

    return (
      <h2 className="text-2xl sm:text-4xl font-sans font-bold tracking-tight text-white leading-tight">
        {roleText.substring(0, len)}
        <span className="inline-block w-1 h-6 sm:h-8 bg-white ml-1 animate-[blink_1s_infinite] align-middle" />
      </h2>
    );
  };

  const handleSkipIntro = () => {
    setIntroFade(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-white/20 selection:text-white relative">
      {/* Immersive Starry Space Background with High Density Radial Glow */}
      <StarsBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* ==================== INTRO SCREEN ==================== */}
      {showIntro && (
        <div 
          className={`fixed inset-0 bg-[#020203] z-50 flex flex-col items-center justify-center px-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${introFade ? 'opacity-0 scale-105 blur-md pointer-events-none' : 'opacity-100 scale-100'}`}
        >
          {/* Pulsating Glowing Orb Backdrop with Orbit Horizon */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/[0.03] filter blur-3xl animate-pulse" />
          <div className="absolute w-[240px] h-[240px] rounded-full border border-white/5 animate-spin pointer-events-none" style={{ animationDuration: '40s' }} />
          <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-white/10 animate-spin pointer-events-none" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

          <div className="relative flex flex-col items-center max-w-lg text-center gap-6">
            {/* Top Icons Row with custom entrance drift */}
            <div className="flex items-center gap-6 text-zinc-400 animate-[fadeSlideDown_1.2s_ease-out_both]">
              <div className="p-3.5 bg-zinc-900/60 rounded-full border border-zinc-800/80 flex items-center justify-center animate-bounce shadow-xl" style={{ animationDuration: '3s' }}>
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div className="p-3.5 bg-zinc-900/60 rounded-full border border-zinc-800/80 flex items-center justify-center animate-bounce shadow-xl" style={{ animationDuration: '3.5s', animationDelay: '0.15s' }}>
                <User className="w-5 h-5 text-zinc-300" />
              </div>
              <div className="p-3.5 bg-zinc-900/60 rounded-full border border-zinc-800/80 flex items-center justify-center animate-bounce shadow-xl" style={{ animationDuration: '4s', animationDelay: '0.3s' }}>
                <Globe2 className="w-5 h-5 text-zinc-400" />
              </div>
            </div>

            {/* Central Welcome Text with Cosmic Letter Spacing entry */}
            <h1 className="text-2xl sm:text-4xl font-sans font-bold tracking-widest text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] mt-4 animate-[cosmicTracking_1.6s_ease-out_both] select-none">
              {t.introWelcome}
            </h1>

            {/* Bottom URL with dynamic sweeping glow bar */}
            <div className="relative overflow-hidden bg-zinc-900/70 px-5 py-2 rounded-full border border-zinc-800 shadow-md animate-[fadeSlideUp_1.2s_ease-out_both_0.4s] group">
              <span className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[sweepGlow_4s_infinite_linear]" />
              <p className="font-mono text-xs sm:text-sm text-white/90 tracking-widest uppercase">
                {t.introUrl}
              </p>
            </div>

            {/* Skip Button */}
            <button 
              onClick={handleSkipIntro}
              className="mt-8 flex items-center gap-2.5 px-6 py-3 bg-zinc-900/80 hover:bg-white hover:text-black border border-zinc-800 hover:border-transparent rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-500 text-zinc-400 hover:text-black group shadow-lg animate-[fadeSlideUp_1.2s_ease-out_both_0.7s]"
            >
              Skip Intro
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Injected custom layout animations specifically for the portal */}
          <style>{`
            @keyframes fadeSlideDown {
              0% { opacity: 0; transform: translateY(-30px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeSlideUp {
              0% { opacity: 0; transform: translateY(30px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes cosmicTracking {
              0% { opacity: 0; letter-spacing: 0.4em; filter: blur(8px); }
              100% { opacity: 1; letter-spacing: 0.15em; filter: blur(0); }
            }
            @keyframes sweepGlow {
              0% { left: -100%; }
              50% { left: 150%; }
              100% { left: 150%; }
            }
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* ==================== PORTFOLIO NAVIGATION ==================== */}
      <nav className="sticky top-0 z-40 bg-[#030303]/80 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer shrink-0">
            <div className="relative p-1.5 bg-zinc-900/60 rounded-lg border border-zinc-800 group-hover:border-zinc-500 transition-colors">
              <Orbit className="w-4 h-4 sm:w-5 h-5 text-white animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <span className="font-sans font-bold text-xs sm:text-base md:text-lg tracking-wider text-white uppercase group-hover:text-zinc-400 transition-colors">
              {t.logoText}
            </span>
          </div>

          {/* Controls Panel */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Space Synthesizer Trigger */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-all duration-300 select-none cursor-pointer shrink-0 ${
                isSoundOn 
                  ? 'bg-white text-black border-transparent shadow-lg shadow-white/10' 
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isSoundOn ? (
                  <span className="flex items-center gap-0.5">
                    <span className="w-0.5 h-2 bg-black animate-[soundWave_1s_infinite_ease-in-out]" style={{ animationDelay: '0.1s' }} />
                    <span className="w-0.5 h-3 bg-black animate-[soundWave_1s_infinite_ease-in-out]" style={{ animationDelay: '0.3s' }} />
                    <span className="w-0.5 h-1.5 bg-black animate-[soundWave_1s_infinite_ease-in-out]" style={{ animationDelay: '0.5s' }} />
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" />
                )}
                <span className="hidden sm:inline">AMBIENT HUM: {isSoundOn ? 'ON' : 'OFF'}</span>
                <span className="sm:hidden">{isSoundOn ? 'ON' : 'OFF'}</span>
              </div>
            </button>

            {/* Localization Bar */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-zinc-900/50 p-1 rounded-full border border-zinc-800 overflow-x-auto max-w-[110px] xs:max-w-[130px] sm:max-w-none">
              {(['id', 'en', 'zh', 'ja', 'ko'] as Language[]).map((langId) => {
                const langNames: Record<Language, string> = {
                  id: 'ID',
                  en: 'EN',
                  zh: 'CN',
                  ja: 'JP',
                  ko: 'KR'
                };
                return (
                  <button
                    key={langId}
                    onClick={() => setLang(langId)}
                    className={`px-1.5 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider rounded-full transition-all duration-300 ${lang === langId ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {langNames[langId]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Style tag to support dynamic audio visual wave rendering */}
        <style>{`
          @keyframes soundWave {
            0%, 100% { transform: scaleY(0.4); }
            50% { transform: scaleY(1.3); }
          }
        `}</style>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <header className="relative py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Greeting Bento Box */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full text-[10px] text-zinc-400 font-mono w-fit mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                STATUS: ACTIVE
              </div>

              {/* Dynamic Roles Cycle (Typewriter) */}
              <div className="relative min-h-[110px] sm:min-h-[130px] py-2 flex items-center overflow-hidden">
                <div className="w-full relative h-full flex items-center">
                  {renderTypedRole(t.roles[roleIndex] || "", typedLength)}
                </div>
              </div>

              {/* Descriptive Subtitle */}
              <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-xl border-l border-zinc-800 pl-4 py-1 mt-6">
                {t.roleDesc}
              </p>

              {/* Social Buttons (Integrated with High Density Theme Style) */}
              <div className="flex flex-wrap items-center gap-3 mt-8">
                {/* GitHub Button */}
                <a
                  href="https://github.com/Hmalk1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] py-3 sm:py-2.5 bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700/80 rounded-lg flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white transition-all duration-300"
                >
                  <span className="font-bold text-zinc-300">GH</span> {t.github}
                </a>

                {/* TikTok Button */}
                <a
                  href="https://www.tiktok.com/@ragfasyar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] py-3 sm:py-2.5 bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700/80 rounded-lg flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white transition-all duration-300"
                >
                  <span className="font-bold text-zinc-400">TT</span> {t.tiktok}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Draggable Playable Black Hole with Space-Hardware Control Console */}
          <div className="lg:col-span-5 flex flex-col gap-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Interactive Horizon</span>
              <span className="text-[9px] bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono px-2 py-0.5 rounded">www.alfa.vercel.app</span>
            </div>

            <div className="flex-1 flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
              <InteractiveBlackHole massMultiplier={blackHoleMass} speedMultiplier={blackHoleSpeed} />
            </div>

            {/* Quantum Simulator Hardware Console Panel */}
            <div className="bg-zinc-950/70 border border-zinc-800/60 rounded-xl p-4 space-y-3 z-10 font-mono text-[10px]">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="flex items-center gap-1.5 text-zinc-400 font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  GRAVITATIONAL SIMULATOR
                </span>
                <span className="text-[8px] text-zinc-500">RELATIVISTIC CONSTANTS</span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-zinc-400">
                  <span>SCHWARZSCHILD MASS</span>
                  <span className="text-white font-bold">{blackHoleMass.toFixed(2)}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.3" 
                  max="2.5" 
                  step="0.05"
                  value={blackHoleMass}
                  onChange={(e) => setBlackHoleMass(parseFloat(e.target.value))}
                  className="w-full accent-white bg-zinc-800 h-1 rounded-full cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-zinc-400">
                  <span>ACCRETION VELOCITY</span>
                  <span className="text-white font-bold">{blackHoleSpeed.toFixed(2)}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.0" 
                  max="3.0" 
                  step="0.1"
                  value={blackHoleSpeed}
                  onChange={(e) => setBlackHoleSpeed(parseFloat(e.target.value))}
                  className="w-full accent-white bg-zinc-800 h-1 rounded-full cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="flex items-center justify-between pt-1 text-[8px] text-zinc-600 border-t border-zinc-900">
                <span>WARPED COORDINATE MODEL</span>
                <button 
                  onClick={() => { setBlackHoleMass(1.0); setBlackHoleSpeed(1.0); }}
                  className="text-zinc-500 hover:text-white transition-colors underline cursor-pointer"
                >
                  RESET CONSTANTS
                </button>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ==================== SCROLL INDICATOR ==================== */}
      <div className="flex flex-col items-center justify-center py-6 select-none animate-bounce z-10 relative">
        <span className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">Scroll Down</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600 rotate-90 mt-1" />
      </div>

      {/* ==================== QUOTES SECTION ==================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-6 z-10 relative">
        {t.quotes.map((quote, idx) => (
          <div 
            key={idx}
            className="relative p-6 sm:p-8 bg-zinc-900/20 border border-zinc-800/80 rounded-xl hover:border-zinc-700 transition-all duration-300 group"
          >
            <p className="text-sm sm:text-base italic text-zinc-300 text-center leading-relaxed font-light">
              "{quote.text}"
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-4 h-px bg-zinc-800" />
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                {quote.author}
              </span>
              <span className="w-4 h-px bg-zinc-800" />
            </div>
          </div>
        ))}
      </section>

      {/* ==================== PROFIL DAN KEAHLIAN (PROFILE & SKILLS) ==================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10 relative">
        {/* Left Aligned Section Title resembling the screenshot */}
        <div className="flex flex-col items-start mb-8 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white capitalize">
            {t.profileTitle}
          </h2>
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Developer Profile Card (Span 4) */}
          <div className="lg:col-span-4 flex">
            <div className="relative w-full bg-[#0d0d0f]/80 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between group transition-all duration-300 hover:border-zinc-700/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-white/[0.01] filter blur-xl pointer-events-none" />
              
              <div className="relative flex flex-col items-center w-full">
                {/* Photo of Black Hole Avatar resembling the screenshot */}
                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-zinc-800/80 bg-zinc-950 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-zinc-600">
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: '40s' }} />
                  {/* Styled minimalist hoodie character portrait in dark glowing background */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-300">
                    <defs>
                      <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#52525b" />
                      </linearGradient>
                    </defs>
                    <rect width="100" height="100" fill="#050507" />
                    <circle cx="50" cy="50" r="40" fill="url(#glowGrad)" />
                    {/* Shadow figure resembling the screenshot avatar */}
                    <path d="M20,95 C24,80 34,68 50,68 C66,68 76,80 80,95" fill="#121214" stroke="#222226" strokeWidth="1.5" />
                    <path d="M32,64 C32,36 68,36 68,64 C68,68 62,72 50,72 C38,72 32,68 32,64 Z" fill="#18181b" stroke="#222226" strokeWidth="1.5" />
                    {/* Glowing face / hand mask */}
                    <path d="M44,60 C44,50 56,50 56,60 C56,64 53,66 50,66 C47,66 44,64 44,60 Z" fill="#ffffff" className="animate-pulse" />
                    {/* Hair strands */}
                    <path d="M35,52 Q42,34 50,36 Q58,34 65,52 Q50,45 35,52 Z" fill="url(#hairGrad)" />
                    <path d="M40,42 Q50,28 60,42" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white tracking-wider font-sans mt-4">
                  ALFA
                </h3>

                {/* Subtitle - Pengembang / Insinyur */}
                <span className="mt-2 text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-300 bg-zinc-900 border border-zinc-800/80 px-4 py-1.5 rounded-full shadow-inner">
                  {t.profileRole}
                </span>

                {/* Facts Details Grid resembling the screenshot precisely */}
                <div className="w-full mt-8 space-y-4 font-mono text-[11px]">
                  <div className="flex justify-between items-center border-b border-zinc-800/40 pb-2.5">
                    <span className="text-zinc-500 uppercase tracking-widest">{t.profileLabels.age}</span>
                    <span className="text-zinc-300 font-bold">{t.profileValues.age}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-800/40 pb-2.5">
                    <span className="text-zinc-500 uppercase tracking-widest">{t.profileLabels.education}</span>
                    <span className="text-zinc-300 font-bold">{t.profileValues.education}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-800/40 pb-2.5">
                    <span className="text-zinc-500 uppercase tracking-widest">{t.profileLabels.location}</span>
                    <span className="text-zinc-300 font-bold">{t.profileValues.location}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-800/40 pb-2.5">
                    <span className="text-zinc-500 uppercase tracking-widest">{t.profileLabels.experience}</span>
                    <span className="text-zinc-300 font-bold">{t.profileValues.experience}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills Bento Block (Span 8) */}
          <div className="lg:col-span-8 flex">
            <div className="w-full bg-[#0d0d0f]/80 border border-zinc-800/90 rounded-2xl p-5 sm:p-8 flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {/* Left Column Skills */}
                <div className="flex flex-col gap-4">
                  {t.skillsLeft.map((skill, index) => (
                    <div 
                      key={index} 
                      className="p-5 bg-[#141417]/40 border border-zinc-800/60 rounded-xl hover:border-zinc-700/80 hover:bg-[#18181c]/50 transition-all duration-300 group flex flex-col justify-center"
                    >
                      <h4 className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider group-hover:text-zinc-200">
                        {skill.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed mt-1.5 font-sans font-light">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right Column Skills */}
                <div className="flex flex-col gap-4">
                  {t.skillsRight.map((skill, index) => (
                    <div 
                      key={index} 
                      className="p-5 bg-[#141417]/40 border border-zinc-800/60 rounded-xl hover:border-zinc-700/80 hover:bg-[#18181c]/50 transition-all duration-300 group flex flex-col justify-center"
                    >
                      <h4 className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider group-hover:text-zinc-200">
                        {skill.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed mt-1.5 font-sans font-light">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== TENTANG SAYA (ABOUT ME) ==================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto z-10 relative">
        <div className="relative bg-zinc-900/20 border border-zinc-800 rounded-2xl p-6 sm:p-10 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full filter blur-2xl pointer-events-none" />

          {/* Section Title */}
          <div className="flex flex-col items-center sm:items-start space-y-2 mb-8">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Biography</p>
            <h2 className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-white uppercase">
              {t.aboutTitle}
            </h2>
            <div className="w-8 h-0.5 bg-white rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Story Details */}
            <div className="md:col-span-8 space-y-5 text-zinc-400 font-sans leading-relaxed text-xs sm:text-sm">
              <h3 className="text-base sm:text-lg font-mono font-bold text-white tracking-tight flex items-center gap-2">
                <span className="inline-block w-1.5 h-4 bg-white" />
                {t.aboutName}
              </h3>
              <p>{t.aboutDesc1}</p>
              <p className="text-zinc-500">{t.aboutDesc2}</p>
            </div>

            {/* Glowing Statistics (Aligned to High Density Grid style) */}
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 w-full">
              {/* Stat 1: 5 Bulan Coding */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center group">
                <span className="text-3xl font-mono font-bold text-white tracking-tight">
                  {t.stats.monthsTitle}
                </span>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 mt-1">
                  {t.stats.monthsSub}
                </p>
              </div>

              {/* Stat 2: 1 Project Selesai */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-center group">
                <span className="text-3xl font-mono font-bold text-white tracking-tight">
                  {t.stats.projectsTitle}
                </span>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 mt-1">
                  {t.stats.projectsSub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PERJALANANKU (MY JOURNEY) ==================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto z-10 relative">
        {/* Section Title */}
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-white uppercase">
            {t.journeyTitle}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
        </div>

        {/* Elegant Timeline Layout */}
        <div className="relative">
          {/* Vertical line running down the timeline */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-900 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {t.journeyItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row items-start md:items-center justify-between ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-2 md:top-1/2 transform -translate-y-1/2 md:-translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center z-20">
                    <div className="w-3 h-3 rounded-full bg-white ring-4 ring-zinc-950 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                  </div>

                  {/* Card container */}
                  <div className="w-full md:w-[calc(50%-32px)] pl-10 md:pl-0">
                    <div className="p-6 bg-zinc-900/15 hover:bg-zinc-900/35 border border-zinc-900 hover:border-zinc-800 rounded-2xl transition-all duration-300 shadow-xl group">
                      <span className="text-[10px] sm:text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider block">
                        {item.period}
                      </span>
                      {item.title && (
                        <h3 className="text-base sm:text-lg font-sans font-bold text-white mt-1 group-hover:text-zinc-100 transition-colors">
                          {item.title}
                        </h3>
                      )}
                      <p className={`text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal ${item.title ? 'mt-2' : 'mt-1.5'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Empty spacer / Decorative element on the opposite side on desktop */}
                  <div className="hidden md:flex w-[calc(50%-32px)] items-center justify-center">
                    {/* Only show decorative arrow/cursor on the right side of Card 1 (isEven is true, so the spacer is on the right side) */}
                    {index === 0 && (
                      <div className="text-zinc-600/40 animate-pulse">
                        <svg className="w-5 h-5 rotate-[15deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS SHOWCASE ==================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto border-t border-zinc-900 z-10 relative">
        <div className="flex flex-col items-center text-center mb-10 space-y-2">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Showcase</p>
          <h2 className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-white uppercase">
            {t.projectTitle}
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            {t.projectSub}
          </p>
          <div className="w-8 h-0.5 bg-white rounded-full mt-2" />
        </div>

        {/* Live Interactive Project Mockup Card (Integrated into High Density styles) */}
        <div className="space-y-4">
          <AICodingWebMockup />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl gap-4">
            <div className="space-y-1">
              <p className="text-[9px] text-zinc-500 uppercase font-mono tracking-widest">LATEST PROJECT</p>
              <h3 className="text-sm sm:text-base font-sans font-bold text-white flex items-center gap-2">
                {t.projectCardTitle}
                <span className="bg-white text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                  WEB APP
                </span>
              </h3>
              <p className="text-xs text-zinc-400 max-w-xl">
                {t.projectCardDesc}
              </p>
            </div>

            {/* Launch Sandbox Button */}
            <a
              href="https://floating-ai-coder44.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-zinc-200 text-black font-mono text-[11px] font-bold tracking-wider uppercase rounded-lg transition-all duration-300 shadow-md select-none group w-fit self-end sm:self-center"
            >
              <span>{t.projectCardClick}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-10 bg-black border-t border-zinc-900 text-center text-zinc-500 font-mono text-[9px] tracking-widest uppercase z-10 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Alfa / Merancang untuk bersenang-senang</p>
          <p className="italic">A WEBSITE, AI, AND APPLICATION DEVELOPER</p>
        </div>
      </footer>
    </div>
  );
}
