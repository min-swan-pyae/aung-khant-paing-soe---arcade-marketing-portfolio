import React, { useState, useEffect } from 'react';
import { ProjectItem, AnalyticsTelemetry, ContactMessage } from '../types/portfolio';
import { StorageService, INITIAL_PROJECTS } from '../utils/storage';
import { arcadeSound } from '../utils/audio';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  BarChart, 
  Briefcase, 
  Mail, 
  Key, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw,
  Check,
  Eye,
  Activity
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectsUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onProjectsUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'messages' | 'security'>('analytics');
  
  // Data
  const [telemetry, setTelemetry] = useState<AnalyticsTelemetry>(() => StorageService.getTelemetry());
  const [projects, setProjects] = useState<ProjectItem[]>(() => StorageService.getProjects());
  const [messages, setMessages] = useState<ContactMessage[]>(() => StorageService.getMessages());
  
  // Editing project
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // New PIN
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTelemetry(StorageService.getTelemetry());
      setProjects(StorageService.getProjects());
      setMessages(StorageService.getMessages());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = StorageService.getAdminPin();
    if (pinInput === correctPin) {
      arcadeSound.playCoin();
      setIsAuthenticated(true);
      setPinError('');
    } else {
      arcadeSound.playAttack();
      setPinError('Incorrect PIN. Default is 1234');
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: ProjectItem[];
    if (isNewProject) {
      updatedList = [editingProject, ...projects];
    } else {
      updatedList = projects.map(p => (p.id === editingProject.id ? editingProject : p));
    }

    StorageService.saveProjects(updatedList);
    setProjects(updatedList);
    setEditingProject(null);
    setIsNewProject(false);
    arcadeSound.playCoin();
    onProjectsUpdated();
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedList = projects.filter(p => p.id !== id);
      StorageService.saveProjects(updatedList);
      setProjects(updatedList);
      arcadeSound.playSelect();
      onProjectsUpdated();
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all projects and telemetry to default initial data?')) {
      StorageService.resetAll();
      setProjects(INITIAL_PROJECTS);
      setTelemetry(StorageService.getTelemetry());
      setEditingProject(null);
      arcadeSound.playBoost();
      onProjectsUpdated();
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      StorageService.setAdminPin(newPin);
      setPinSuccess(true);
      setNewPin('');
      arcadeSound.playCoin();
      setTimeout(() => setPinSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0e101a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141726] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-arcade text-xs text-cyan-400">ADMIN CONTROL DECK</h3>
              <p className="text-[11px] text-slate-400">Marketing Analytics & Content Management</p>
            </div>
          </div>
          <button
            onClick={() => {
              arcadeSound.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-amber-400">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Protected Admin Access</h4>
            <p className="text-xs text-slate-400 max-w-sm mb-6">
              Enter your 4-digit security PIN to update case studies and monitor visitor statistics.
              <br /><span className="text-amber-400/80 font-mono text-[11px] mt-1 inline-block">Default PIN: 1234</span>
            </p>

            <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 w-full max-w-xs">
              <input
                type="password"
                maxLength={8}
                placeholder="••••"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                autoFocus
                className="w-full text-center tracking-[0.5em] text-2xl font-mono py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              {pinError && <p className="text-xs text-rose-400 font-mono">{pinError}</p>}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs tracking-wider transition-colors shadow-lg shadow-cyan-500/20"
              >
                UNLOCK DASHBOARD
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Sub-Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-[#0b0c14] px-6 gap-2">
              <button
                onClick={() => { arcadeSound.playSelect(); setActiveTab('analytics'); }}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'analytics'
                    ? 'border-cyan-400 text-cyan-300 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Visitor Analytics</span>
              </button>
              <button
                onClick={() => { arcadeSound.playSelect(); setActiveTab('projects'); }}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'projects'
                    ? 'border-cyan-400 text-cyan-300 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </button>
              <button
                onClick={() => { arcadeSound.playSelect(); setActiveTab('messages'); }}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'messages'
                    ? 'border-cyan-400 text-cyan-300 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Inquiries ({messages.length})</span>
              </button>
              <button
                onClick={() => { arcadeSound.playSelect(); setActiveTab('security'); }}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'security'
                    ? 'border-cyan-400 text-cyan-300 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>Security PIN</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* TAB 1: VISITOR ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400">PAGE IMPRESSIONS</div>
                      <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                        {telemetry.pageViews.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-1">Live tracking active</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400">ARCADE JUMPS</div>
                      <div className="text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
                        {telemetry.totalJumps.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Physics interactions</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400">ROI SIMULATIONS</div>
                      <div className="text-2xl font-bold font-mono text-cyan-400 mt-1 tabular-nums">
                        {telemetry.simulationsRun.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Budget recalculations</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400">LEAD CLICKS</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
                        {telemetry.contactClicks.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Direct engagement</div>
                    </div>
                  </div>

                  {/* Summary Details */}
                  <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <h4 className="text-sm font-semibold text-white mb-2">Audience Engagement Highlights</h4>
                    <ul className="text-xs text-slate-300 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>High engagement with the +40% ROI Richd Gerik case study and Google Ads metrics.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>Interactive physics runner and high-score submissions actively retain prospective hiring leads.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>SEO schema markup successfully embeds Person & ProfilePage for search engine discovery.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS MANAGEMENT */}
              {activeTab === 'projects' && (
                <div>
                  {!editingProject ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-semibold text-white">Live Portfolio Projects</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={handleResetDefaults}
                            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reset Defaults</span>
                          </button>
                          <button
                            onClick={() => {
                              arcadeSound.playCoin();
                              setIsNewProject(true);
                              setEditingProject({
                                id: 'proj_' + Date.now(),
                                company: 'NEW CLIENT / BRAND',
                                role: 'Digital Marketing Specialist',
                                period: '2025',
                                location: 'Bangkok, Thailand',
                                countryFlag: '🇹🇭',
                                category: 'performance',
                                heroMetric: '+50% ROAS',
                                metricLabel: 'High-Impact Performance',
                                description: 'Description of campaign strategy and marketing optimization deliverables.',
                                bulletPoints: [
                                  'Executed cross-channel campaign strategy driving revenue growth.',
                                  'Managed Google & Meta Ads budget allocation with deep analytics.'
                                ],
                                skillsUsed: ['Google Ads', 'GA4', 'Meta Ads'],
                                imageUrl: '/src/assets/images/project_richd_gerik_1792267383491.jpg',
                                featured: true
                              });
                            }}
                            className="px-3 py-1.5 text-xs bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add New Project</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {projects.map(proj => (
                          <div
                            key={proj.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white text-sm">{proj.company}</span>
                                <span className="text-xs text-slate-400">{proj.countryFlag} {proj.location}</span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                {proj.role} · {proj.period}
                              </div>
                              <div className="text-xs text-amber-400 font-mono mt-1 font-semibold">
                                {proj.heroMetric} – {proj.metricLabel}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  arcadeSound.playSelect();
                                  setIsNewProject(false);
                                  setEditingProject({ ...proj });
                                }}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                                title="Edit Project"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 transition-colors"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Project Editor Form */
                    <form onSubmit={handleSaveProject} className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                        <h4 className="text-sm font-semibold text-white">
                          {isNewProject ? 'Create New Project' : `Edit: ${editingProject.company}`}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Company Name</label>
                          <input
                            type="text"
                            value={editingProject.company}
                            onChange={e => setEditingProject({ ...editingProject, company: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Role Title</label>
                          <input
                            type="text"
                            value={editingProject.role}
                            onChange={e => setEditingProject({ ...editingProject, role: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Period (e.g. 2024–2025)</label>
                          <input
                            type="text"
                            value={editingProject.period}
                            onChange={e => setEditingProject({ ...editingProject, period: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Location & Flag</label>
                          <input
                            type="text"
                            value={editingProject.location}
                            onChange={e => setEditingProject({ ...editingProject, location: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Hero Metric (e.g. +40% ROI)</label>
                          <input
                            type="text"
                            value={editingProject.heroMetric}
                            onChange={e => setEditingProject({ ...editingProject, heroMetric: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-amber-400 font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 block mb-1">Metric Subtitle</label>
                          <input
                            type="text"
                            value={editingProject.metricLabel}
                            onChange={e => setEditingProject({ ...editingProject, metricLabel: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Executive Summary</label>
                        <textarea
                          rows={3}
                          value={editingProject.description}
                          onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">
                          Key Achievements (one per line)
                        </label>
                        <textarea
                          rows={4}
                          value={editingProject.bulletPoints.join('\n')}
                          onChange={e => setEditingProject({ 
                            ...editingProject, 
                            bulletPoints: e.target.value.split('\n').filter(Boolean) 
                          })}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg flex items-center gap-1.5"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Project</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 3: CONTACT INQUIRIES */}
              {activeTab === 'messages' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white mb-2">Visitor Messages & Leads</h4>
                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500 border border-slate-800 rounded-xl">
                      No inquiries received yet. Visitor submissions through the contact form appear here.
                    </div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-semibold text-white text-sm">{msg.name}</span>
                            <span className="text-slate-400 ml-2 font-mono">({msg.email})</span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {new Date(msg.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        {msg.company && (
                          <div className="text-slate-400 mb-1">Company: {msg.company}</div>
                        )}
                        <p className="text-slate-200 mt-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                          {msg.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 4: SECURITY SETTINGS */}
              {activeTab === 'security' && (
                <div className="max-w-md space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Change Admin Passcode</h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Update the PIN code required to open this dashboard.
                    </p>
                    <form onSubmit={handleChangePin} className="space-y-3">
                      <input
                        type="password"
                        placeholder="New 4-digit PIN"
                        maxLength={8}
                        value={newPin}
                        onChange={e => setNewPin(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                        required
                      />
                      {pinSuccess && (
                        <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                          <Check className="w-3.5 h-3.5" />
                          <span>PIN updated successfully!</span>
                        </div>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg"
                      >
                        Update Security PIN
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
