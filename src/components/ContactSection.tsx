import React, { useState } from 'react';
import { StorageService } from '../utils/storage';
import { arcadeSound } from '../utils/audio';
import { Mail, Phone, MessageSquare, Linkedin, MapPin, Send, CheckCircle2, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('$5k - $15k/mo');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    StorageService.addMessage({ name, email, company, budget, message });
    arcadeSound.playCoin();
    setSubmitted(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    arcadeSound.playSelect();
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-16 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-xs font-mono text-amber-400 mb-2">
              READY FOR CHAMPIONSHIP ROI?
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
              Let's Connect & Scale
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Available for full-time senior digital marketing roles, performance advertising leadership, and strategic e-commerce consulting.
            </p>
          </div>

          <div className="space-y-3">
            {/* Email */}
            <div className="p-4 rounded-xl bg-[#11121d] border border-slate-800 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">DIRECT EMAIL</div>
                  <a href="mailto:aungkhantpaingsoe99@gmail.com" className="text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors">
                    aungkhantpaingsoe99@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('aungkhantpaingsoe99@gmail.com', 'email')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone & WhatsApp */}
            <div className="p-4 rounded-xl bg-[#11121d] border border-slate-800 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">PHONE & WHATSAPP</div>
                  <a href="tel:+66982328486" className="text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                    +66 (9) 823 284 86
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+66982328486', 'phone')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Copy Phone"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Line ID */}
            <div className="p-4 rounded-xl bg-[#11121d] border border-slate-800 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">LINE ID</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-mono">
                    aungkhant123
                  </div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('aungkhant123', 'line')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Copy Line ID"
              >
                {copiedField === 'line' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn */}
            <div className="p-4 rounded-xl bg-[#11121d] border border-slate-800 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">LINKEDIN PROFILE</div>
                  <a
                    href="https://linkedin.com/in/aungkhantpaingsoe"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    linkedin.com/in/aungkhantpaingsoe
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="p-4 rounded-xl bg-[#11121d] border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-400/10 text-rose-400 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">CURRENT BASE</div>
                <div className="text-xs text-slate-300 leading-relaxed mt-0.5">
                  Lumpini Ville Phatthankana, New Phetchaburi Phatthanakan 26 Alley, Suan Luang, Bangkok 10250, Thailand
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Working Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#11121d] border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-2">Send Direct Marketing Brief</h3>
          <p className="text-xs text-slate-400 mb-6">
            Share your campaign goals, monthly media spend, or role requirements for a detailed response within 24 hours.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium">Company or Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Nexus E-Commerce"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium">Monthly Ad Spend Range</label>
                  <select
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="$1k - $5k/mo">$1k – $5k / month</option>
                    <option value="$5k - $15k/mo">$5k – $15k / month</option>
                    <option value="$15k - $50k/mo">$15k – $50k / month</option>
                    <option value="$50k+/mo">$50,000+ / month (Enterprise)</option>
                    <option value="FullTimeHire">Full-Time / Executive Hire</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1.5 font-medium">Campaign Objectives & Scope *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline your target channels (Google Ads, Meta, TikTok, SEO), target markets, and current performance bottlenecks..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Marketing Brief</span>
              </button>
            </form>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Inquiry Transmitted Successfully!</h4>
              <p className="text-xs text-slate-300 max-w-md">
                Thank you, {name}. Your marketing brief has been logged into Aung Khant's priority inbox. Expect a response shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:text-white"
              >
                Send Another Note
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
