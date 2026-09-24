import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  FileText,
  Cpu,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import HeroSection from '../../components/ui/glassmorphism-trust-hero';

export const LandingPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full flex flex-col items-center max-w-7xl mx-auto px-4 space-y-12 pb-12 font-sans">
      {/* Hero Section */}
      <HeroSection 
        onReportLost={() => navigate('/student/report-lost')}
        onReportFound={() => navigate('/student/report-found')}
        onBrowse={() => navigate('/student/browse')}
      />

      {/* 3-Step Process: Report -> Match -> Recover */}
      <section className="w-full relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 sm:p-12 text-white shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Simple 3-Step Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How Foundly Works
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            Three seamless steps to return lost campus items to their rightful owners
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Report */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 text-white font-bold text-lg">
                  1
                </div>
                <FileText className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">Report</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Log what you lost or found with key details, approximate campus location, and photos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-zinc-300">
              <span>Quick structured form</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Step 2: Match */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 text-white font-bold text-lg">
                  2
                </div>
                <Cpu className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">Match</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Smart suggestions cross-reference reports within your college to discover potential matches.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-zinc-300">
              <span>AI-assisted matching</span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          </div>

          {/* Step 3: Recover */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 text-white font-bold text-lg">
                  3
                </div>
                <UserCheck className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight">Recover</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Submit an identity claim. Your campus administrator verifies ownership and facilitates safe handover.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-zinc-300">
              <span>Verified admin handover</span>
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Pillars */}
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-base font-semibold text-white">College-Based</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Separated per campus community</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <h4 className="text-base font-semibold text-white">Secure & Private</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Identifying marks protected</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 shrink-0">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-left">
                <h4 className="text-base font-semibold text-white">AI-Assisted</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Intelligent item matching</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College Admin CTA banner */}
      <section className="w-full">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-indigo-950/80 to-zinc-950 p-8 sm:p-10 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          {/* Card Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Are you a campus staff member or representative?
            </h3>
            <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
              Apply for College Admin privileges to manage your campus lost and found center.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/admin-application')}
            className="relative z-10 group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98] shrink-0 cursor-pointer shadow-lg"
          >
            Apply for Admin
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};
