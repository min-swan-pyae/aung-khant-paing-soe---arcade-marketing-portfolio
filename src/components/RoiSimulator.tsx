import React, { useState, useId } from 'react';
import { arcadeSound } from '../utils/audio';
import { StorageService } from '../utils/storage';
import { TrendingUp, DollarSign, Target, Award, ArrowUpRight, BarChart3, CheckCircle2, Sparkles } from 'lucide-react';

interface RoiSimulatorProps {
  onContactClick: () => void;
}

export const RoiSimulator: React.FC<RoiSimulatorProps> = ({ onContactClick }) => {
  const [budget, setBudget] = useState(5000);
  const [cpc, setCpc] = useState(1.20);
  const [cvr, setCvr] = useState(3.5);
  const [aov, setAov] = useState(85);
  const [industry, setIndustry] = useState<'ecommerce' | 'b2b' | 'mobile' | 'luxury'>('ecommerce');
  const [applyAkpBoost, setApplyAkpBoost] = useState(true);

  const budgetInputId = useId();
  const cpcInputId = useId();
  const cvrInputId = useId();
  const aovInputId = useId();

  // Baseline metrics
  const clicks = Math.round(budget / (cpc || 1));
  const baselineConversions = Math.round(clicks * (cvr / 100));
  const baselineRevenue = Math.round(baselineConversions * aov);
  const baselineRoas = budget > 0 ? (baselineRevenue / budget).toFixed(2) : '0';
  const baselineCac = baselineConversions > 0 ? Math.round(budget / baselineConversions) : 0;

  // With Aung Khant's 40% optimization boost (demonstrated at Richd Gerik)
  const multiplier = applyAkpBoost ? 1.4 : 1.0;
  const optimizedConversions = Math.round(baselineConversions * multiplier);
  const optimizedRevenue = Math.round(optimizedConversions * aov);
  const optimizedRoas = budget > 0 ? (optimizedRevenue / budget).toFixed(2) : '0';
  const optimizedCac = optimizedConversions > 0 ? Math.round(budget / optimizedConversions) : 0;
  const netProfit = optimizedRevenue - budget;

  const handleIndustryChange = (ind: 'ecommerce' | 'b2b' | 'mobile' | 'luxury') => {
    arcadeSound.playSelect();
    setIndustry(ind);
    if (ind === 'ecommerce') {
      setCpc(0.85);
      setCvr(3.8);
      setAov(75);
    } else if (ind === 'b2b') {
      setCpc(2.80);
      setCvr(2.4);
      setAov(650);
    } else if (ind === 'mobile') {
      setCpc(0.65);
      setCvr(4.5);
      setAov(45);
    } else if (ind === 'luxury') {
      setCpc(1.90);
      setCvr(1.8);
      setAov(420);
    }
  };

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value);
    StorageService.incrementTelemetry('simulationsRun');
  };

  return (
    <section id="roi-simulator" className="py-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <Target className="w-4 h-4" />
          <span>INTERACTIVE PERFORMANCE LAB</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
          Campaign ROI & ROAS Simulator
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Simulate ad spend scaling across Google Ads and Meta Ads. Test real-world media efficiency and see the revenue impact of high-intent conversion rate optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Control Deck */}
        <div className="lg:col-span-5 bg-[#121320] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Industry Profile</span>
            <div className="flex gap-1">
              {(['ecommerce', 'b2b', 'mobile', 'luxury'] as const).map(ind => (
                <button
                  key={ind}
                  onClick={() => handleIndustryChange(ind)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors capitalize ${
                    industry === ind
                      ? 'bg-amber-400 text-black font-semibold shadow'
                      : 'text-slate-400 hover:text-white bg-slate-800/60'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Monthly Budget */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={budgetInputId} className="text-xs font-medium text-slate-300">Monthly Ad Spend</label>
                <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                  ${budget.toLocaleString()}
                </span>
              </div>
              <input
                id={budgetInputId}
                type="range"
                min={500}
                max={50000}
                step={500}
                value={budget}
                onChange={e => handleSliderChange(setBudget, Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$500</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* CPC */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={cpcInputId} className="text-xs font-medium text-slate-300">Avg Cost Per Click (CPC)</label>
                <span className="font-mono text-sm font-bold text-cyan-400 tabular-nums">
                  ${cpc.toFixed(2)}
                </span>
              </div>
              <input
                id={cpcInputId}
                type="range"
                min={0.20}
                max={5.00}
                step={0.05}
                value={cpc}
                onChange={e => handleSliderChange(setCpc, Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={cvrInputId} className="text-xs font-medium text-slate-300">Conversion Rate (CVR)</label>
                <span className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
                  {cvr.toFixed(1)}%
                </span>
              </div>
              <input
                id={cvrInputId}
                type="range"
                min={0.5}
                max={10.0}
                step={0.1}
                value={cvr}
                onChange={e => handleSliderChange(setCvr, Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Average Order Value / Lead Value */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={aovInputId} className="text-xs font-medium text-slate-300">Avg Order / Customer Value</label>
                <span className="font-mono text-sm font-bold text-rose-400 tabular-nums">
                  ${aov.toLocaleString()}
                </span>
              </div>
              <input
                id={aovInputId}
                type="range"
                min={20}
                max={1500}
                step={10}
                value={aov}
                onChange={e => handleSliderChange(setAov, Number(e.target.value))}
                className="w-full accent-rose-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Optimization Toggle */}
            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">Apply +40% Optimization Lift</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Richd Gerik Benchmark
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Data-driven Google Ads negative matching + high-intent Meta retargeting
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={applyAkpBoost}
                  onChange={e => {
                    arcadeSound.playCoin();
                    setApplyAkpBoost(e.target.checked);
                  }}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right: Real-Time Results Telemetry */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Key Figures Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Projected Revenue */}
            <div className="col-span-2 md:col-span-1 bg-[#121320] border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden">
              <div className="text-xs font-mono text-amber-400 mb-1 flex items-center justify-between">
                <span>EST. REVENUE</span>
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white font-mono tabular-nums">
                ${optimizedRevenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Net Margin: <span className="text-emerald-400 font-semibold font-mono">${netProfit > 0 ? `+${netProfit.toLocaleString()}` : netProfit.toLocaleString()}</span>
              </div>
            </div>

            {/* Target ROAS */}
            <div className="bg-[#121320] border border-cyan-500/30 rounded-2xl p-5 relative overflow-hidden">
              <div className="text-xs font-mono text-cyan-400 mb-1 flex items-center justify-between">
                <span>BLENDED ROAS</span>
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-cyan-300 font-mono tabular-nums">
                {optimizedRoas}x
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Baseline: <span className="text-slate-300 font-mono">{baselineRoas}x</span>
              </div>
            </div>

            {/* Conversions */}
            <div className="bg-[#121320] border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden">
              <div className="text-xs font-mono text-emerald-400 mb-1 flex items-center justify-between">
                <span>CONVERSIONS</span>
                <Target className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-300 font-mono tabular-nums">
                {optimizedConversions}
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                CAC: <span className="text-slate-300 font-mono">${optimizedCac}/sale</span>
              </div>
            </div>
          </div>

          {/* Comparative Benchmark Bar */}
          <div className="bg-[#121320] border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>Projected Revenue Comparison (Monthly)</span>
            </h3>

            <div className="space-y-4">
              {/* Baseline */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                  <span>Standard Agency / Industry Average</span>
                  <span className="text-slate-300">${baselineRevenue.toLocaleString()} ({baselineRoas}x)</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, (baselineRevenue / (optimizedRevenue || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Optimized */}
              <div>
                <div className="flex justify-between text-xs text-amber-300 mb-1 font-mono font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>With Aung Khant's Targeted Strategy</span>
                  </span>
                  <span>${optimizedRevenue.toLocaleString()} ({optimizedRoas}x)</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* Tactical Deliverables Checklist */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GA4 Custom Funnel & Enhanced E-commerce Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Negative Keyword Scrubbing & CPC Bidding Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>High-Converting UGC Creative Storyboards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Shopify & WordPress SEO Architecture Overhaul</span>
              </div>
            </div>
          </div>

          {/* Action Callout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-transparent border border-slate-800 rounded-2xl">
            <div>
              <h4 className="text-sm font-semibold text-white">Ready to scale your digital marketing results?</h4>
              <p className="text-xs text-slate-400 mt-0.5">Let's audit your current Google Ads and Meta campaigns for quick-win optimizations.</p>
            </div>
            <button
              onClick={() => {
                arcadeSound.playJump();
                StorageService.incrementTelemetry('contactClicks');
                onContactClick();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <span>Audit My Campaigns</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
