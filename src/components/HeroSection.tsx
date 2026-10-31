import React from 'react';
import { arcadeSound } from '../utils/audio';
import { StorageService } from '../utils/storage';
import { ArrowRight, Trophy, Sparkles, MapPin, Download, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenLeaderboard: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onOpenLeaderboard,
  onContactClick,
}) => {
  return (
    <section className="relative w-full overflow-hidden border-b border-slate-800/80">
      {/* Cityscape Background with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_arcade_cityscape_1792267366513.jpg"
          alt="Neon Retro Arcade Cityscape"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/85 to-[#0a0a0f]/60" />
        <div className="absolute inset-0 bg-[#0a0a0f]/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16">
        {/* Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-4 tracking-wider">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
            OPEN FOR HIGH-IMPACT ROLES & CONSULTING
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Bangkok, Thailand · Myanmar · Global
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08] mb-6 font-display">
          Data-Driven Marketing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 drop-shadow-md">
            Championship Performance.
          </span>
        </h1>

        {/* Lead Copy */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-body">
          I am <strong className="text-white font-semibold">Aung Khant Paing Soe</strong>, a Digital Marketing Specialist with over 5 years of hands-on experience optimizing Google Ads, Meta Ads, GA4 conversion architecture, and influencer UGC campaigns that deliver measurable return on investment.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={() => {
              arcadeSound.playBoost();
              onExploreProjects();
            }}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#roi-simulator"
            onClick={() => arcadeSound.playSelect()}
            className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Launch ROI Simulator</span>
          </a>

          <button
            onClick={() => {
              arcadeSound.playCoin();
              onOpenLeaderboard();
            }}
            className="px-4 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-amber-300 font-mono text-xs border border-amber-500/40 transition-colors flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Arcade Records</span>
          </button>
        </div>

        {/* Quantitative Proof Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              +40%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Monthly Google Ads ROI (Richd Gerik)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
              9.2M+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Viral Campaign Views (Tecno Mobile)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
              3.4x
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Shopify E-commerce ROAS (Aurora Ring)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono tabular-nums">
              5+ Yrs
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Hands-On Multi-Market Growth
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
