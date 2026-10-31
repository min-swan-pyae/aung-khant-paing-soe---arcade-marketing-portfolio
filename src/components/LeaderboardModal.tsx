import React, { useEffect, useState } from 'react';
import { LeaderboardEntry } from '../types/portfolio';
import { StorageService } from '../utils/storage';
import { arcadeSound } from '../utils/audio';
import { Trophy, X, Medal, Sparkles, UserPlus } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScore: number;
  currentCoins: number;
  currentMode: 'kart' | 'fighter';
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentScore,
  currentCoins,
  currentMode,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => StorageService.getLeaderboard());
  const [initials, setInitials] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEntries(StorageService.getLeaderboard());
      setInitials('');
      setSubmitted(false);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted || (currentScore <= 0 && currentCoins <= 0)) return;
    const cleanInitials = (initials.trim().toUpperCase() || 'PLY').slice(0, 3);
    
    const entry = {
      initials: cleanInitials,
      score: currentScore,
      coins: currentCoins,
      distanceMeters: currentScore,
      character: currentMode,
      timeFormatted: '01:05.4',
    };

    try {
      const updated = StorageService.addLeaderboardEntry(entry);
      arcadeSound.playCoin();
      setEntries(updated);
      setSubmitted(true);
      setError('');
    } catch {
      setError('Your score could not be saved. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#11121d] border border-amber-500/40 rounded-2xl p-6 shadow-2xl shadow-amber-950/40">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-arcade text-xs text-amber-400">ARCADE LEADERBOARD</h3>
              <p className="text-xs text-slate-400">Top Marketing Racers & Fighters</p>
            </div>
          </div>
          <button
            onClick={() => {
              arcadeSound.playSelect();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Run Score Banner */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-800/40 to-cyan-500/10 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400">YOUR CURRENT RUN</div>
            <div className="text-xl font-bold font-mono text-white flex items-center gap-2">
              <span>{currentScore.toLocaleString()} PTS</span>
              <span className="text-xs text-amber-400">({currentCoins} Coins)</span>
            </div>
            {error && <p className="mt-2 text-xs text-rose-400 font-mono">{error}</p>}
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmitScore} className="flex items-center gap-2">
              <input
                type="text"
                maxLength={3}
                placeholder="AAA"
                value={initials}
                onChange={e => setInitials(e.target.value.toUpperCase())}
                className="w-16 px-2 py-1.5 text-center font-arcade text-xs uppercase bg-slate-900 border border-amber-500/50 rounded-lg text-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="submit"
                disabled={currentScore <= 0 && currentCoins <= 0}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-arcade text-[9px] font-bold transition-colors shrink-0"
              >
                {currentScore <= 0 && currentCoins <= 0 ? 'PLAY FIRST' : 'SUBMIT'}
              </button>
            </form>
          ) : (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              RECORDED!
            </span>
          )}
        </div>

        {/* High Scores List */}
        <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
          {entries.map((entry, idx) => {
            const isTop3 = idx < 3;
            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-colors ${
                  idx === 0
                    ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
                    : idx === 1
                    ? 'bg-slate-300/10 border-slate-400/30 text-slate-200'
                    : idx === 2
                    ? 'bg-amber-800/10 border-amber-700/30 text-amber-600'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 text-center font-bold">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </span>
                  <span className="font-arcade text-white tracking-widest">{entry.initials}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                    {entry.character}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-slate-400 text-[11px]">{entry.coins} ★</span>
                  <span className="font-bold text-white tabular-nums text-sm">
                    {entry.score.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Close Button */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              arcadeSound.playSelect();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Back to Arcade
          </button>
        </div>
      </div>
    </div>
  );
};
