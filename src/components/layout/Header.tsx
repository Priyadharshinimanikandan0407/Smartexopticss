import React from 'react';
import { PageId, SimulationState, FaultCondition } from '../../types';
import { 
  Menu, 
  RotateCcw, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  Flame,
  ShieldCheck,
  Share2
} from 'lucide-react';

interface HeaderProps {
  activePage: PageId;
  onOpenMobileNav: () => void;
  simulationState: SimulationState;
  onSetCondition: (condition: FaultCondition) => void;
  onRunFaultDetection: () => void;
  onResetSimulation: () => void;
  onShareOrExport: () => void;
}

const PAGE_TITLES: Record<PageId, { title: string; subtitle: string }> = {
  overview: { title: 'Project Overview', subtitle: 'Intelligent Optical Network Monitoring & Architecture' },
  dashboard: { title: 'Network Telemetry Dashboard', subtitle: 'Live Optical Power, Attenuation & AI Diagnostics' },
  model3d: { title: 'Interactive 3D Project Model', subtitle: 'End-to-End Photonic Transmission & Fault Visualizer' },
  materials: { title: 'Materials & Equipment', subtitle: 'Physical Hardware, Software Tools & Prototype Setup' },
  smartcities: { title: 'Smart City Urban Grid', subtitle: 'Civic Telecommunications Infrastructure Protection' },
  applications: { title: 'Industrial Applications', subtitle: 'High-Bandwidth Environments & Fibre Reliability' },
  benefits: { title: 'System Benefits & Comparison', subtitle: 'Traditional Testing vs AI/ML Assisted Monitoring' },
  about: { title: 'About Academic Project', subtitle: 'SRM IST B.Tech CSE-AIML Exhibition Documentation' },
};

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onOpenMobileNav,
  simulationState,
  onSetCondition,
  onRunFaultDetection,
  onResetSimulation,
  onShareOrExport,
}) => {
  const currentMeta = PAGE_TITLES[activePage] || PAGE_TITLES.overview;

  const getStatusBadge = () => {
    switch (simulationState.condition) {
      case 'normal':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Normal Link (Nominal)</span>
          </div>
        );
      case 'bending':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Bending Loss (-21.8 dBm)</span>
          </div>
        );
      case 'connector':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
            <span>Connector Fault (-27.5 dBm)</span>
          </div>
        );
      case 'severeloss':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Severe Loss / Cable Cut</span>
          </div>
        );
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#060e1b]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="p-2 rounded-lg bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60 lg:hidden"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-cyan-400">SMARTEX</span>
              <span>/</span>
              <span className="text-slate-300 font-medium">{currentMeta.title}</span>
            </div>
            <h1 className="text-base lg:text-lg font-bold text-white tracking-tight truncate max-w-[280px] sm:max-w-md lg:max-w-none">
              {currentMeta.title}
            </h1>
          </div>
        </div>

        {/* Right: Telemetry Controls & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status badge */}
          <div className="hidden sm:flex items-center">
            {getStatusBadge()}
          </div>

          {/* Quick Simulation Trigger */}
          <button
            onClick={onRunFaultDetection}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-900/30 transition-all active:scale-95 whitespace-nowrap"
            title="Execute AI/ML fault classification pipeline on current sensor telemetry"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span className="hidden md:inline">Run Fault Detection</span>
            <span className="md:hidden">Run AI</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onResetSimulation}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all active:scale-95 whitespace-nowrap"
            title="Reset telemetry and restore nominal baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Baseline</span>
          </button>

          {/* Academic Report / Specs Modal button */}
          <button
            onClick={onShareOrExport}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 text-xs font-medium border border-slate-700 hover:border-cyan-500/40 transition-all"
            title="View Project Abstract & Summary"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
