import React from 'react';
import { PageId } from '../../types';
import { 
  Radio, 
  Activity, 
  Box, 
  Cpu, 
  Building2, 
  Layers, 
  TrendingUp, 
  Info, 
  Zap,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: Radio, hint: 'Project Introduction' },
  { id: 'dashboard', label: 'Dashboard', icon: Activity, hint: 'Live Network Telemetry' },
  { id: 'model3d', label: '3D Project Model', icon: Box, hint: 'Interactive System Model' },
  { id: 'materials', label: 'Materials Used', icon: Cpu, hint: 'Hardware & Software Setup' },
  { id: 'smartcities', label: 'Smart Cities', icon: Building2, hint: 'Urban Infrastructure Grid' },
  { id: 'applications', label: 'Applications', icon: Layers, hint: 'Industrial Domains' },
  { id: 'benefits', label: 'Benefits', icon: TrendingUp, hint: 'Comparative Analysis' },
  { id: 'about', label: 'About Project', icon: Info, hint: 'Academic Specifications' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  isOpenMobile,
  onCloseMobile,
}) => {
  const handleNavClick = (id: PageId) => {
    onSelectPage(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#060e1b] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Lockup */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#060e1b] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-sans">SMARTEX</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50 text-cyan-300">AI-OFC</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Optical Fibre Fault Monitor</p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            System Modules
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/40 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div
                  className={`p-1.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{item.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.hint}</div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Academic Project Credits Box */}
        <div className="p-4 border-t border-slate-800/80 bg-[#081224]">
          <div className="flex items-start gap-2.5">
            <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-[11px] space-y-0.5">
              <p className="text-slate-200 font-semibold truncate">SRM IST, Tiruchirappalli</p>
              <p className="text-slate-400 text-[10px]">B.Tech CSE - AI & Machine Learning</p>
              <p className="text-cyan-400/90 text-[10px] font-mono">Semiconductor Physics Project</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
