import React, { useEffect, useRef, useState } from 'react';
import { arcadeSound } from '../utils/audio';
import { StorageService } from '../utils/storage';
import { Volume2, VolumeX, Trophy, RefreshCw, RotateCcw } from 'lucide-react';

interface ArcadeTrackProps {
  onOpenLeaderboard: () => void;
  onScoreEarned?: (score: number, coins: number, mode: 'kart' | 'fighter') => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Token {
  id: number;
  x: number;
  y: number;
  type: 'coin' | 'boost' | 'hadouken';
  label: string;
  collected: boolean;
  pulse: number;
}

export const ArcadeTrackCanvas: React.FC<ArcadeTrackProps> = ({ onOpenLeaderboard, onScoreEarned }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game state
  const [characterMode, setCharacterMode] = useState<'kart' | 'fighter'>('kart');
  const [isMuted, setIsMuted] = useState(arcadeSound.getMuted());
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [lapComplete, setLapComplete] = useState(false);

  // Physics refs to avoid React state lag in requestAnimationFrame
  const physicsRef = useRef({
    x: 120,
    y: 0,
    vy: 0,
    isGrounded: true,
    gravity: 0.7,
    jumpForce: -13,
    runFrame: 0,
    isBoosting: false,
    boostTimer: 0,
    isAttacking: false,
    attackTimer: 0,
    particles: [] as Particle[],
    tokens: [] as Token[],
    scrollOffset: 0,
    lastScrollY: 0,
    trackWidth: 2000,
  });

  // Toggle sound
  const handleToggleSound = () => {
    const muted = arcadeSound.toggleMute();
    setIsMuted(muted);
  };

  // Jump action
  const handleJump = () => {
    const p = physicsRef.current;
    if (p.isGrounded) {
      p.vy = p.jumpForce;
      p.isGrounded = false;
      arcadeSound.playJump();
      StorageService.incrementTelemetry('totalJumps');

      // Jump dust particles
      for (let i = 0; i < 8; i++) {
        p.particles.push({
          x: p.x + 20,
          y: 70,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 3,
          life: 0,
          maxLife: 20,
          color: characterMode === 'kart' ? '#38bdf8' : '#fbbf24',
          size: Math.random() * 4 + 2,
        });
      }
    }
  };

  // Attack / Nitro action
  const handleAction = () => {
    const p = physicsRef.current;
    if (characterMode === 'kart') {
      p.isBoosting = true;
      p.boostTimer = 35;
      arcadeSound.playBoost();
      setScore(s => s + 50);
      for (let i = 0; i < 15; i++) {
        p.particles.push({
          x: p.x - 10,
          y: 65 + (Math.random() - 0.5) * 10,
          vx: -Math.random() * 6 - 3,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: 25,
          color: '#f43f5e',
          size: Math.random() * 5 + 3,
        });
      }
    } else {
      p.isAttacking = true;
      p.attackTimer = 25;
      arcadeSound.playAttack();
      setScore(s => s + 50);
      // Spawn Hadouken projectile
      p.tokens.push({
        id: Date.now(),
        x: p.x + 35,
        y: p.y + 40,
        type: 'hadouken',
        label: 'ROI',
        collected: false,
        pulse: 0,
      });
    }
  };

  // Switch character mode
  const handleToggleMode = () => {
    arcadeSound.playSelect();
    setCharacterMode(m => (m === 'kart' ? 'fighter' : 'kart'));
  };

  const resetGame = () => {
    const p = physicsRef.current;
    p.x = 120;
    p.y = 0;
    p.vy = 0;
    p.isGrounded = true;
    p.isBoosting = false;
    p.boostTimer = 0;
    p.isAttacking = false;
    p.attackTimer = 0;
    p.particles = [];
    p.scrollOffset = 0;
    p.lastScrollY = window.scrollY;
    p.tokens.forEach(token => {
      token.collected = false;
      if (token.type === 'hadouken') token.collected = true;
    });
    setCoins(0);
    setScore(0);
    setComboMultiplier(1);
    setLapComplete(false);
    arcadeSound.playSelect();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting if focus is in an input or textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleJump();
      } else if (e.code === 'KeyF' || e.code === 'Enter' || e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        handleAction();
      } else if (e.code === 'KeyC') {
        e.preventDefault();
        handleToggleMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [characterMode]);

  // Scroll synchronization
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollPercent(Math.round(progress * 100));

      const p = physicsRef.current;
      const delta = scrollY - p.lastScrollY;
      p.lastScrollY = scrollY;
      p.scrollOffset += delta * 0.8;

      if (progress >= 0.98 && !lapComplete) {
        setLapComplete(true);
        setScore(s => s + 1000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lapComplete]);

  // Initialize track tokens
  useEffect(() => {
    const tokens: Token[] = [];
    const labels = ['$', 'ROI', 'CTR', 'GA4', 'SEO', 'KOL', 'CPC', 'ROAS'];
    for (let i = 0; i < 35; i++) {
      tokens.push({
        id: i,
        x: 300 + i * 180 + (Math.random() - 0.5) * 60,
        y: Math.random() > 0.4 ? 25 : 65, // in air or on ground
        type: i % 5 === 0 ? 'boost' : 'coin',
        label: labels[i % labels.length],
        collected: false,
        pulse: Math.random() * Math.PI,
      });
    }
    physicsRef.current.tokens = tokens;
  }, []);

  // Main Canvas Rendering & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      const p = physicsRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const groundY = height - 28;

      // Update physics
      if (!p.isGrounded) {
        p.vy += p.gravity;
        p.y += p.vy;

        if (p.y >= 0) {
          p.y = 0;
          p.vy = 0;
          p.isGrounded = true;
        }
      }

      // Boost / Attack timers
      if (p.isBoosting) {
        p.boostTimer--;
        if (p.boostTimer <= 0) p.isBoosting = false;
      }
      if (p.isAttacking) {
        p.attackTimer--;
        if (p.attackTimer <= 0) p.isAttacking = false;
      }

      // Horizontal position shifts dynamically with scroll + auto glide
      const currentWorldX = (p.scrollOffset * 1.5 + frameCount * 1.2) % 6000;
      p.runFrame = Math.floor(frameCount / 6) % 4;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Neon Track / Street Grid
      const trackGradient = ctx.createLinearGradient(0, groundY, 0, height);
      trackGradient.addColorStop(0, '#1e1b4b');
      trackGradient.addColorStop(0.3, '#0f172a');
      trackGradient.addColorStop(1, '#020617');
      ctx.fillStyle = trackGradient;
      ctx.fillRect(0, groundY, width, height - groundY);

      // Neon pavement curb line (Street Fighter / Mario Kart finish line pattern)
      const curbStripeOffset = (currentWorldX % 40);
      for (let x = -curbStripeOffset; x < width + 40; x += 30) {
        ctx.fillStyle = (Math.floor((x + currentWorldX) / 30) % 2 === 0) ? '#f43f5e' : '#fbbf24';
        ctx.fillRect(x, groundY - 3, 15, 3);
      }

      // Glowing track baseline
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // 2. Render & Check Tokens / Boost Pads
      p.tokens.forEach(token => {
        if (token.type === 'hadouken') {
          token.x += 8;
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(token.x, groundY - token.y, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px "Press Start 2P", monospace';
          ctx.fillText('ROI', token.x - 8, groundY - token.y + 3);
          ctx.shadowBlur = 0;
          return;
        }

        const screenX = (token.x - currentWorldX) % width;
        const normalizedX = screenX < -50 ? screenX + width : screenX;
        const screenY = groundY - token.y - 10;

        token.pulse += 0.05;

        if (!token.collected) {
          // Use the same coordinates for rendering and collision detection.
          const dist = Math.hypot(normalizedX - (p.x + 20), screenY - (groundY + p.y - 20));
          if (dist < 32) {
            token.collected = true;
            if (token.type === 'boost') {
              arcadeSound.playBoost();
              p.isBoosting = true;
              p.boostTimer = 40;
              setScore(s => s + 250);
              setComboMultiplier(c => Math.min(c + 1, 5));
            } else {
              arcadeSound.playCoin();
              setCoins(c => c + 1);
              setScore(s => s + 100 * comboMultiplier);
            }

            // Spawn pickup sparkle particles
            for (let i = 0; i < 10; i++) {
              p.particles.push({
                x: normalizedX,
                y: screenY,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 5 - 1,
                life: 0,
                maxLife: 30,
                color: token.type === 'boost' ? '#f43f5e' : '#fbbf24',
                size: Math.random() * 4 + 2,
              });
            }
          }

          // Draw Boost Pad or Coin
          if (token.type === 'boost') {
            // Neon Speed Boost Arrow
            const boostY = groundY - token.y;
            ctx.fillStyle = '#f43f5e';
            ctx.shadowColor = '#f43f5e';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.moveTo(normalizedX + 16, boostY);
            ctx.lineTo(normalizedX, boostY - 12);
            ctx.lineTo(normalizedX - 8, boostY - 12);
            ctx.lineTo(normalizedX + 4, boostY);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Floating 16-bit Gold Coin / Token
            const bob = Math.sin(token.pulse) * 4;
            ctx.save();
            ctx.translate(normalizedX, screenY + bob);
            ctx.fillStyle = '#fbbf24';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(0, 0, 11, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Inner token label
            ctx.fillStyle = '#78350f';
            ctx.font = 'bold 8px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(token.label, 0, 0);
            ctx.restore();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 3. Draw Character (Neon Kart vs Street Fighter)
      const charX = p.x;
      const charY = groundY + p.y;

      if (characterMode === 'kart') {
        // --- MARIO KART NEON RACER ---
        ctx.save();
        ctx.translate(charX, charY);

        // Exhaust boost flame when jumping or boosting
        if (p.isBoosting || !p.isGrounded) {
          ctx.fillStyle = p.boostTimer % 2 === 0 ? '#f43f5e' : '#fbbf24';
          ctx.beginPath();
          ctx.moveTo(-16, -12);
          ctx.lineTo(-32 - Math.random() * 12, -15);
          ctx.lineTo(-16, -18);
          ctx.closePath();
          ctx.fill();
        }

        // Kart Body Chassis (Futuristic Cyber Kart)
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = p.isBoosting ? 18 : 8;

        // Main cabin
        ctx.beginPath();
        ctx.roundRect(-12, -22, 42, 14, 4);
        ctx.fill();

        // Front nose / spoiler
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(18, -16, 14, 8);

        // Rear spoiler
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-14, -28, 4, 10);
        ctx.fillRect(-18, -30, 12, 4);

        // Driver Head with Red Helmet & Visor
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(8, -26, 8, 0, Math.PI * 2);
        ctx.fill();
        // Helmet Visor
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(10, -28, 6, 4);

        // Neon Glowing Wheels
        const wheelY = -6;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-8, wheelY - 6, 12, 12);
        ctx.fillRect(20, wheelY - 6, 12, 12);

        // Neon Rims
        ctx.fillStyle = p.isBoosting ? '#fbbf24' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(-2, wheelY, 4, 0, Math.PI * 2);
        ctx.arc(26, wheelY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.shadowBlur = 0;
      } else {
        // --- 16-BIT STREET FIGHTER WARRIOR ---
        ctx.save();
        ctx.translate(charX, charY);

        const legCycle = Math.sin(frameCount * 0.4);
        const isJumping = !p.isGrounded;

        // Shadow on ground
        if (!isJumping) {
          ctx.fillStyle = 'rgba(0,0,0,0.4)';
          ctx.beginPath();
          ctx.ellipse(12, -2, 14, 4, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Gi / Martial Arts Body
        ctx.fillStyle = '#f8fafc'; // White Gi
        ctx.shadowColor = '#e11d48';
        ctx.shadowBlur = p.isAttacking ? 16 : 4;

        if (isJumping) {
          // Flying Jump Kick Pose
          // Torso
          ctx.fillRect(4, -42, 16, 18);
          // Red belt
          ctx.fillStyle = '#e11d48';
          ctx.fillRect(4, -28, 18, 4);
          // Kicking leg forward
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(18, -32, 18, 8); // Kick extension
          ctx.fillRect(-2, -26, 10, 14); // Back bent leg
        } else {
          // Running / Fighting Stance
          // Torso
          ctx.fillRect(4, -44, 16, 20);
          // Red belt with fluttering ends
          ctx.fillStyle = '#e11d48';
          ctx.fillRect(2, -28, 18, 4);
          ctx.fillRect(-4, -26, 8, 3);

          // Legs walking animation
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(4 + legCycle * 4, -24, 7, 22);
          ctx.fillRect(12 - legCycle * 4, -24, 7, 22);
        }

        // Head & Iconic Red Bandana
        ctx.fillStyle = '#fed7aa'; // Skin
        ctx.beginPath();
        ctx.arc(12, -50, 7, 0, Math.PI * 2);
        ctx.fill();

        // Red Bandana
        ctx.fillStyle = '#e11d48';
        ctx.fillRect(5, -55, 14, 4);
        // Bandana tails fluttering behind
        ctx.fillRect(-2 - Math.random() * 4, -54, 8, 3);

        // Fists & Punching pose
        ctx.fillStyle = '#fed7aa';
        if (p.isAttacking) {
          // Hadouken Thrust Pose
          ctx.fillRect(22, -42, 16, 8);
        } else {
          ctx.fillRect(isJumping ? 18 : 14, -38, 8, 8);
        }

        ctx.restore();
        ctx.shadowBlur = 0;
      }

      // 4. Update and Render Particles
      for (let i = p.particles.length - 1; i >= 0; i--) {
        const pt = p.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life++;

        const alpha = Math.max(0, 1 - pt.life / pt.maxLife);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (pt.life >= pt.maxLife) {
          p.particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [characterMode, comboMultiplier]);

  // Notify parent of score
  useEffect(() => {
    if (onScoreEarned) {
      onScoreEarned(score, coins, characterMode);
    }
  }, [score, coins, characterMode, onScoreEarned]);

  return (
    <div className="relative w-full border-t border-b border-indigo-950/70 bg-[#0d0e17] overflow-hidden select-none">
      {/* Top Arcade HUD Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2 bg-[#090a12]/90 border-b border-slate-800 text-xs font-mono">
        {/* Left HUD: Score & Coins */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-arcade text-[10px]">SCORE</span>
            <span className="text-white font-bold text-sm tabular-nums tracking-wider">{score.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[9px] font-bold text-center leading-3">★</span>
            <span className="text-slate-300 font-bold tabular-nums">{coins} COINS</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <span>TRACK:</span>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 transition-all duration-150" 
                style={{ width: `${scrollPercent}%` }}
              />
            </div>
            <span className="text-[11px] tabular-nums">{scrollPercent}%</span>
          </div>
        </div>

        {/* Center: Controls hint */}
        <div className="hidden md:flex items-center gap-3 text-slate-400 text-[11px]">
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">SPACE</span>
          <span>Jump</span>
          <span className="text-slate-600">·</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">F</span>
          <span>{characterMode === 'kart' ? 'Nitro Boost' : 'Hadouken'}</span>
          <span className="text-slate-600">·</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">SCROLL</span>
          <span>Drive Track</span>
        </div>

        {/* Right HUD: Controls & Toggles */}
        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <button
            onClick={handleToggleMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors"
            title="Switch Character (Key C)"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span className="font-medium">
              {characterMode === 'kart' ? 'Kart Mode' : 'Fighter Mode'}
            </span>
          </button>

          <button
            onClick={resetGame}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Restart Run"
            aria-label="Restart Run"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Leaderboard Trigger */}
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>High Scores</span>
          </button>
        </div>
      </div>

      {/* Interactive 2D Canvas Track */}
      <div className="relative w-full h-32 md:h-36 bg-gradient-to-b from-[#0b0c16] via-[#101322] to-[#080911]">
        <canvas
          ref={canvasRef}
          width={1200}
          height={140}
          className="w-full h-full block cursor-pointer"
          onClick={handleJump}
        />

        {/* Mobile Tactile Arcade Buttons Overlay */}
        <div className="absolute right-4 bottom-3 flex items-center gap-2 z-10 md:hidden">
          <button
            onClick={(e) => { e.stopPropagation(); handleAction(); }}
            className="px-3 py-2 rounded-lg bg-rose-600/90 active:bg-rose-500 text-white font-arcade text-[10px] shadow-lg shadow-rose-900/40 border border-rose-400/50"
          >
            {characterMode === 'kart' ? 'BOOST' : 'PUNCH'}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleJump(); }}
            className="px-4 py-2 rounded-lg bg-amber-500/90 active:bg-amber-400 text-black font-arcade text-[10px] font-bold shadow-lg shadow-amber-900/40 border border-amber-300/50"
          >
            JUMP
          </button>
        </div>
      </div>
    </div>
  );
};
