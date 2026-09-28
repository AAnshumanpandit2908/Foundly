import React, { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";

const Counter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const CollegeMarquee = () => {
  const colleges = ["Stanford University", "MIT", "Harvard", "UC Berkeley", "Oxford", "Cambridge"];
  return (
    <div className="w-full overflow-hidden flex flex-col items-center mt-12 py-6 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-10 pointer-events-none"></div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-4 z-20">Trusted by top campuses globally</p>
      <div className="w-full flex">
        <div className="flex animate-marquee whitespace-nowrap z-20">
          {[...colleges, ...colleges].map((college, i) => (
            <span key={i} className="mx-8 text-xl font-bold text-white/40 tracking-tight">{college}</span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function HeroSection({
  onReportLost,
  onReportFound,
  onBrowse
}: {
  onReportLost?: () => void;
  onReportFound?: () => void;
  onBrowse?: () => void;
}) {
  return (
    <div className="relative w-full text-white font-sans flex flex-col items-center pt-24 pb-12 z-10 min-h-screen">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-md mb-8 animate-fade-in-up">
        <Sparkles className="w-4 h-4 text-indigo-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">
          CAMPUS-EXCLUSIVE LOST & FOUND
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-center max-w-4xl leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Helping Lost Items Find Their <br className="hidden md:block"/>
        <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
          Way Back Home
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-lg text-zinc-400 text-center max-w-2xl mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        A secure, intelligent platform dedicated to college communities. Report, match, and recover your lost belongings with ease.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <button 
          onClick={onReportLost}
          className="group relative px-6 py-3 text-sm font-bold text-zinc-900 bg-white rounded-full transition-all hover:scale-105"
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-100 group-hover:opacity-0 transition-opacity"></div>
          <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(99,102,241,0.6)]"></div>
          <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
            Report Lost Item <ChevronRight className="w-4 h-4" />
          </span>
        </button>
        
        <button 
          onClick={onReportFound}
          className="px-6 py-3 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-full backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 flex items-center gap-2"
        >
          Report Found Item
        </button>

        <button 
          onClick={onBrowse}
          className="px-6 py-3 text-sm font-semibold text-zinc-300 hover:text-white transition-colors underline decoration-white/30 hover:decoration-white underline-offset-4"
        >
          Browse Items
        </button>
      </div>

      {/* Glass Stats Panel (2x2 grid) */}
      <div className="w-full max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Tile 1 */}
          <div className="bg-zinc-950/80 p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl md:text-5xl font-black text-white mb-2"><Counter end={500} suffix="+" /></div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Items Reunited</div>
          </div>
          {/* Tile 2 */}
          <div className="bg-zinc-950/80 p-8 flex flex-col items-center justify-center text-center relative group">
            <svg className="absolute w-24 h-24 -rotate-90 opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
              <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="2" fill="none" className="text-indigo-500" strokeDasharray="276" strokeDashoffset="11" />
            </svg>
            <div className="text-4xl md:text-5xl font-black text-white mb-2 relative z-10"><Counter end={96} suffix="%" /></div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold relative z-10">Recovery Rate</div>
          </div>
          {/* Tile 3 */}
          <div className="bg-zinc-950/80 p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl md:text-5xl font-black text-white mb-2"><Counter end={100} suffix="%" /></div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Verified</div>
          </div>
          {/* Tile 4 */}
          <div className="bg-zinc-950/80 p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-2">Instant</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">AI Match</div>
          </div>
        </div>
        
        {/* Safe Handover Badge */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              Verified Safe Handover
            </span>
          </div>
        </div>
      </div>

      <CollegeMarquee />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
