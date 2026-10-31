import React, { useEffect } from 'react';
import { ProjectItem } from '../types/portfolio';
import { arcadeSound } from '../utils/audio';
import { X, TrendingUp, CheckCircle2, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#10121e] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Banner with Scrim */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
          <img
            src={project.imageUrl}
            alt={project.company}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10121e] via-[#10121e]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => {
              arcadeSound.playSelect();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white transition-colors border border-white/10"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Metric Badge */}
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-amber-400 text-black font-arcade text-xs font-bold shadow-lg shadow-amber-400/30 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>{project.heroMetric}</span>
            </div>
            <span className="text-xs font-mono text-slate-300 drop-shadow">
              {project.metricLabel}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Metadata Row */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mb-2">
              <span className="text-white font-semibold">{project.countryFlag} {project.company}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.location}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{project.period}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {project.role}
            </h3>
          </div>

          {/* Executive Summary */}
          <div className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            {project.description}
          </div>

          {/* Deliverables & Bullet Points */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <span>CORE RESPONSIBILITIES & MEASURABLE OUTCOMES</span>
            </h4>
            <div className="space-y-2.5">
              {project.bulletPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Channels Used */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              PLATFORMS & SPECIALIZATIONS
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400 font-mono">
              {project.skillsUsed.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-8 border-t border-slate-800/80 bg-[#0d0e18] flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Aung Khant Paing Soe · Digital Marketing Specialist
          </span>
          <button
            onClick={() => {
              arcadeSound.playSelect();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
