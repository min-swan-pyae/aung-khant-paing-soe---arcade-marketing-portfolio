/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArcadeTrackCanvas } from './components/ArcadeTrackCanvas';
import { ExperienceBentoGrid } from './components/ExperienceBentoGrid';
import { RoiSimulator } from './components/RoiSimulator';
import { EducationSkillsSection } from './components/EducationSkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AdminModal } from './components/AdminModal';
import { ProjectItem } from './types/portfolio';
import { StorageService } from './utils/storage';
import { arcadeSound } from './utils/audio';

export default function App() {
  const [projects, setProjects] = useState<ProjectItem[]>(() => StorageService.getProjects());
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Live game telemetry
  const [currentScore, setCurrentScore] = useState(0);
  const [currentCoins, setCurrentCoins] = useState(0);
  const [currentMode, setCurrentMode] = useState<'kart' | 'fighter'>('kart');

  useEffect(() => {
    // Record page view on load
    StorageService.incrementTelemetry('pageViews');
  }, []);

  const handleScoreUpdate = (score: number, coins: number, mode: 'kart' | 'fighter') => {
    setCurrentScore(score);
    setCurrentCoins(coins);
    setCurrentMode(mode);
  };

  const handleProjectsUpdated = () => {
    setProjects(StorageService.getProjects());
  };

  const scrollToExperience = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col relative selection:bg-amber-400 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onContactClick={scrollToContact}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Banner with Retro Arcade Visuals & Proof Metrics */}
        <HeroSection
          onExploreProjects={scrollToExperience}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onContactClick={scrollToContact}
        />

        {/* 2D Interactive Arcade Track (Physics Engine, Scroll-Linked Runner, Kart/Fighter Hybrid) */}
        <ArcadeTrackCanvas
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onScoreEarned={handleScoreUpdate}
        />

        {/* Selected Projects Bento Grid (Richd Gerik, Tecno Mobile, Aurora Ring, etc.) */}
        <ExperienceBentoGrid
          projects={projects}
          onSelectProject={setSelectedProject}
        />

        {/* Interactive Campaign ROI & ROAS Simulator */}
        <RoiSimulator
          onContactClick={scrollToContact}
        />

        {/* Skills Matrix, Degrees & Certifications */}
        <EducationSkillsSection />

        {/* Direct Contact Channels & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentScore={currentScore}
        currentCoins={currentCoins}
        currentMode={currentMode}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onProjectsUpdated={handleProjectsUpdated}
      />
    </div>
  );
}
