import React, { useState } from 'react';
import { APPLICATIONS_DATA } from '../../data/mockData';
import { 
  Radio, 
  Building2, 
  Server, 
  Factory, 
  HeartPulse, 
  Train, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const ApplicationsPage: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState(APPLICATIONS_DATA[0]);

  const getAppIcon = (id: string) => {
    switch (id) {
      case 'app-telecom': return Radio;
      case 'app-smartcities': return Building2;
      case 'app-datacenters': return Server;
      case 'app-industrial': return Factory;
      case 'app-healthcare': return HeartPulse;
      case 'app-railway': return Train;
      case 'app-defence': return ShieldCheck;
      default: return GraduationCap;
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="rounded-2xl bg-[#081224] border border-slate-800 p-6 md:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Cross-Industry Optical Reliability</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Industrial &amp; Strategic Applications
        </h2>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          From undersea transoceanic telecommunications cables to vibration-heavy railway tracks and mission-critical hospital surgical networks, automated AI/ML optical fault classification delivers predictive reliability across diverse high-consequence industries.
        </p>
      </section>

      {/* 8 Application Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {APPLICATIONS_DATA.map((app) => {
          const Icon = getAppIcon(app.id);
          const isSelected = selectedApp.id === app.id;

          return (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className={`p-5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/80 to-[#081224] border-cyan-500/70 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : 'bg-[#081224] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400/80">Sector</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{app.title}</h3>
                  <span className="text-[11px] text-cyan-400 block font-medium mb-2">{app.role}</span>
                </div>

                <div className="space-y-1.5 pt-1 text-xs">
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                    <strong className="text-slate-300">Challenge: </strong>{app.challenge}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold mt-4">
                <span>View Solution</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Detailed Selected Application Deep Dive Card */}
      <section className="rounded-2xl bg-gradient-to-br from-[#081224] to-[#0a1832] border border-cyan-800/40 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
            {React.createElement(getAppIcon(selectedApp.id), { className: 'w-6 h-6' })}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{selectedApp.title}</h3>
            <span className="text-xs text-cyan-400">{selectedApp.role}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Physical Operating Environment &amp; Vulnerabilities
            </span>
            <p className="text-slate-300 leading-relaxed text-sm">
              {selectedApp.challenge}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
              AI/ML-Assisted Fault Detection Benefit
            </span>
            <p className="text-slate-300 leading-relaxed text-sm">
              {selectedApp.solution}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
