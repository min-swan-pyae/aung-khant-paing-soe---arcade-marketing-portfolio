import React from 'react';
import { Lock, ArrowUp } from 'lucide-react';
import { arcadeSound } from '../utils/audio';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    arcadeSound.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#080911] border-t border-slate-800/80 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        {/* Left: Identity */}
        <div>
          <span className="text-slate-300 font-semibold">Aung Khant Paing Soe</span>
          <span className="mx-2">·</span>
          <span>Digital Marketing Specialist (Bangkok, Thailand)</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-6">
          <a href="#experience" className="hover:text-slate-300 transition-colors">
            Case Studies
          </a>
          <a href="#roi-simulator" className="hover:text-slate-300 transition-colors">
            ROI Lab
          </a>
          <a href="#skills" className="hover:text-slate-300 transition-colors">
            Credentials
          </a>
          <a href="#contact" className="hover:text-slate-300 transition-colors">
            Contact
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              arcadeSound.playSelect();
              onOpenAdmin();
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors"
            title="Admin Dashboard"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin PIN</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
