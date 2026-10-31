import React, { useState } from 'react';
import { ProjectItem } from '../types/portfolio';
import { arcadeSound } from '../utils/audio';
import { TrendingUp, ArrowUpRight, Sparkles, MapPin, Layers } from 'lucide-react';

interface ExperienceBentoGridProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const ExperienceBentoGrid: React.FC<ExperienceBentoGridProps> = ({ projects, onSelectProject }) => {
  const [filter, setFilter] = useState<'all' | 'performance' | 'social_ugc' | 'ecommerce'>('all');

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section id="experience" className="py-16 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-amber-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>SELECTED MARKETING CAMPAIGNS & TRACK RECORD</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
            Proven Performance Across Global Markets
          </h2>
        </div>

        {/* Filter Tabs (Interactive filter controls allowed as buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => { arcadeSound.playSelect(); setFilter('all'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === 'all'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Case Studies
          </button>
          <button
            onClick={() => { arcadeSound.playSelect(); setFilter('performance'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === 'performance'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Google & Meta Ads
          </button>
          <button
            onClick={() => { arcadeSound.playSelect(); setFilter('social_ugc'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === 'social_ugc'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Influencer & UGC
          </button>
          <button
            onClick={() => { arcadeSound.playSelect(); setFilter('ecommerce'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === 'ecommerce'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Shopify E-Commerce
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => {
          const isFeatured = idx === 0 || idx === 1;
          return (
            <div
              key={project.id}
              onClick={() => {
                arcadeSound.playCoin();
                onSelectProject(project);
              }}
              className={`group relative bg-[#111320] border border-slate-800 hover:border-amber-400/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20 flex flex-col ${
                isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
              }`}
            >
              {/* Media Container */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={project.company}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111320] via-black/40 to-transparent" />

                {/* Hero Metric Sticker */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{project.heroMetric}</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-slate-300 group-hover:text-amber-400 group-hover:bg-black/90 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                    <span className="text-white font-medium">{project.countryFlag} {project.company}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.period}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                    {project.role}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed font-body">
                    {project.description}
                  </p>
                </div>

                {/* Skills used */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {project.skillsUsed.slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/60"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skillsUsed.length > 4 && (
                    <span className="text-[11px] font-mono text-slate-500 px-1 py-0.5">
                      +{project.skillsUsed.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
