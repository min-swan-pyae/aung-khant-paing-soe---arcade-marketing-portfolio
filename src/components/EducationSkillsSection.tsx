import React from 'react';
import { Award, GraduationCap, Globe, CheckCircle, BarChart2 } from 'lucide-react';

export const EducationSkillsSection: React.FC = () => {
  const skillsList = [
    { name: 'Google Ads & Meta Ads Management', level: 95, detail: 'Search, Display, Video, Retargeting' },
    { name: 'Google Analytics 4 (GA4) & Tracking', level: 92, detail: 'Custom Events, E-commerce Funnels, GTM' },
    { name: 'Conversion Rate Optimization (CRO)', level: 88, detail: 'Landing Page A/B Testing, Heatmaps' },
    { name: 'SEO & SEM Content Strategy', level: 90, detail: 'Technical Audits, On-Page, WordPress CMS' },
    { name: 'KOL & Influencer Management', level: 92, detail: 'Creator Briefs, Contracting, Performance Tracking' },
    { name: 'UGC Content Creation & Video', level: 85, detail: 'Commercial Storyboards, On-Screen Talent' },
    { name: 'Shopify E-commerce Optimization', level: 86, detail: 'Store UI/UX, AOV Growth, Product Catalogs' },
  ];

  const education = [
    {
      institution: 'Lincoln University Malaysia',
      degree: 'Professional Executive Diploma in Digital Marketing',
      note: 'Advanced Performance Advertising, International Brand Strategy & ROI Analysis',
    },
    {
      institution: 'ATBC International College',
      degree: 'Professional Executive Diploma in Digital Marketing',
      note: 'Omnichannel Digital Communications, Social Media Strategy & Attribution',
    },
    {
      institution: 'Dagon University (Yangon, Myanmar)',
      degree: 'Bachelor of Science in Physics (B.Sc. Physics)',
      note: 'Analytical Modeling, Quantitative Problem Solving & Scientific Experimentation',
    },
  ];

  const certifications = [
    { name: 'Google Analytics Certification (GA4)', issuer: 'Google Digital Academy' },
    { name: 'British Council Cambridge English Exams', issuer: 'Starter, Mover, Flyer, KET, PET, IELTS' },
  ];

  return (
    <section id="skills" className="py-16 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Skills & Marketing Tech Stack (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" />
              <span>DIGITAL MARKETING CAPABILITIES</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
              Strategic & Technical Competencies
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Combining quantitative physics analytical rigor with creative commercial storytelling to systematically maximize ROAS across advertising platforms.
            </p>
          </div>

          <div className="space-y-4">
            {skillsList.map((skill, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#11121d] border border-slate-800">
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="font-semibold text-white">{skill.name}</span>
                  <span className="font-mono text-xs text-amber-400 font-bold">{skill.level}%</span>
                </div>
                <div className="text-xs text-slate-400 mb-2 font-mono">{skill.detail}</div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-rose-400 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="p-5 rounded-2xl bg-[#11121d] border border-slate-800">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Languages & Cross-Border Collaboration</span>
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-white font-bold">English</div>
                <div className="text-emerald-400 text-[11px] mt-0.5">Fluent / Professional</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-white font-bold">Burmese</div>
                <div className="text-emerald-400 text-[11px] mt-0.5">Native / Fluent</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-white font-bold">Japanese</div>
                <div className="text-amber-400 text-[11px] mt-0.5">Basic Conversational</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Education & Certifications (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-mono text-amber-400 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC FOUNDATION & DEGREES</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
              Education & Honors
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#11121d] border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="text-sm font-bold text-white mb-1">{edu.degree}</div>
                <div className="text-xs font-semibold text-amber-400 font-mono mb-2">{edu.institution}</div>
                <div className="text-xs text-slate-300 leading-relaxed">{edu.note}</div>
              </div>
            ))}
          </div>

          {/* Certifications Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Professional Certifications</span>
            </h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">{cert.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{cert.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
