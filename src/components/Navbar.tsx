import React from 'react';
import { arcadeSound } from '../utils/audio';
import { Volume2, VolumeX, Flame } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [isMuted, setIsMuted] = React.useState(arcadeSound.getMuted());

  const handleToggleSound = () => {
    const muted = arcadeSound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0f]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:text-amber-400 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 rotate-45 inline-block" />
          <span>Aung Khant Paing Soe</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <a 
            href="#experience" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Case Studies
          </a>
          <a 
            href="#roi-simulator" 
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            <span>ROI Simulator</span>
          </a>
          <a 
            href="#skills" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Credentials & GA4
          </a>
          <a 
            href="#contact" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action + subtle utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isMuted ? "Enable Sound" : "Mute Sound"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              arcadeSound.playJump();
              onContactClick();
            }}
            className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-amber-500/20"
          >
            Hire Aung Khant
          </button>
        </div>
      </div>
    </header>
  );
};
