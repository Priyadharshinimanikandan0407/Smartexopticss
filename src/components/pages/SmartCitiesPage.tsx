import React, { useState } from 'react';
import { SMART_CITY_SERVICES } from '../../data/mockData';
import smartCityImage from '../../assets/images/smart_city_fibre_grid_1791726749914.jpg';
import { 
  Building2, 
  TrafficCone, 
  Camera, 
  Lightbulb, 
  CloudRain, 
  PhoneCall, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface SmartCitiesPageProps {
  onSimulateLinkFault?: (serviceId: string) => void;
}

export const SmartCitiesPage: React.FC<SmartCitiesPageProps> = () => {
  const [selectedService, setSelectedService] = useState(SMART_CITY_SERVICES[0]);
  const [simulatedFaultNode, setSimulatedFaultNode] = useState<string | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'traffic': return TrafficCone;
      case 'cctv': return Camera;
      case 'lighting': return Lightbulb;
      case 'environmental': return CloudRain;
      case 'emergency': return PhoneCall;
      default: return Zap;
    }
  };

  const handleSimulateServiceFault = (id: string) => {
    setSimulatedFaultNode(simulatedFaultNode === id ? null : id);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Smart City Urban Grid Hero */}
      <section className="rounded-2xl bg-[#081224] border border-slate-800 p-6 md:p-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Municipal Telecommunications Infrastructure</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Optical Fibre Backbone in Smart Cities
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Modern smart cities rely on subterranean and aerial optical fibre cables to connect millions of sensors, traffic intersection cameras, emergency medical telemetry, and civic utilities back to the central municipal control room.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                Scope Boundary &amp; Architectural Disclaimer:
              </span>
              <p className="text-slate-400 leading-relaxed">
                This project focuses strictly on monitoring and diagnosing physical <strong className="text-white">optical communication link faults</strong> (attenuation, bends, cuts, connector degradation). It does not directly command or actuate traffic lights, surveillance cameras, or municipal electric switches.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl group relative">
              <img
                src={smartCityImage}
                alt="Futuristic smart city optical fibre network grid"
                className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs">
                  <span className="text-white font-bold block">Urban Subterranean Fibre Mesh</span>
                  <span className="text-cyan-400 font-mono text-[11px]">Connecting Civic Hubs to Central Control</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Network Map & Interactive Link Fault Simulator */}
      <section className="rounded-2xl bg-[#081224] border border-slate-800 p-6 md:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Metropolitan Optical Link Status Map</h3>
            <p className="text-xs text-slate-400">Click any urban service to simulate link stress and inspect AI fault response</p>
          </div>

          {simulatedFaultNode && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simulated Link Fault on: {simulatedFaultNode.toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Map SVG graphic */}
        <div className="relative w-full h-80 bg-[#060e1b] rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 900 360" className="w-full h-full">
            {/* Fibre Grid Lines */}
            {/* Control Hub Center at (450, 180) */}
            
            {/* Line to Traffic (200, 90) */}
            <line
              x1="450" y1="180" x2="200" y2="90"
              stroke={simulatedFaultNode === 'traffic' ? '#ef4444' : '#06b6d4'}
              strokeWidth={simulatedFaultNode === 'traffic' ? 4 : 2}
              strokeDasharray={simulatedFaultNode === 'traffic' ? '6 4' : 'none'}
            />
            {/* Line to CCTV (700, 80) */}
            <line
              x1="450" y1="180" x2="700" y2="80"
              stroke={simulatedFaultNode === 'cctv' ? '#ef4444' : '#06b6d4'}
              strokeWidth={simulatedFaultNode === 'cctv' ? 4 : 2}
            />
            {/* Line to Streetlights (750, 270) */}
            <line
              x1="450" y1="180" x2="750" y2="270"
              stroke={simulatedFaultNode === 'lighting' ? '#ef4444' : '#06b6d4'}
              strokeWidth={simulatedFaultNode === 'lighting' ? 4 : 2}
            />
            {/* Line to Environmental (220, 280) */}
            <line
              x1="450" y1="180" x2="220" y2="280"
              stroke={simulatedFaultNode === 'environmental' ? '#ef4444' : '#06b6d4'}
              strokeWidth={simulatedFaultNode === 'environmental' ? 4 : 2}
            />
            {/* Line to Emergency (450, 60) */}
            <line
              x1="450" y1="180" x2="450" y2="60"
              stroke={simulatedFaultNode === 'emergency' ? '#ef4444' : '#06b6d4'}
              strokeWidth={simulatedFaultNode === 'emergency' ? 4 : 2}
            />
            {/* Line to Utilities (450, 310) */}
            <line
              x1="450" y1="180" x2="450" y2="310"
              stroke={simulatedFaultNode === 'utilities' ? '#ef4444' : '#06b6d4'}
              strokeWidth={simulatedFaultNode === 'utilities' ? 4 : 2}
            />

            {/* Central City Control Center */}
            <g transform="translate(450, 180)" className="cursor-pointer">
              <circle r="36" fill="#081b33" stroke="#06b6d4" strokeWidth="2.5" />
              <circle r="14" fill="#06b6d4" opacity="0.9" />
              <text y="50" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Central Control Room</text>
              <text y="62" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">Civic NOC Core</text>
            </g>

            {/* Nodes */}
            <g transform="translate(200, 90)" className="cursor-pointer" onClick={() => handleSimulateServiceFault('traffic')}>
              <circle r="22" fill="#0b172a" stroke={simulatedFaultNode === 'traffic' ? '#ef4444' : '#38bdf8'} strokeWidth="2" />
              <text y="34" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Traffic Signals</text>
              <text y="46" textAnchor="middle" fill="#94a3b8" fontSize="8">4.2 km Link</text>
            </g>

            <g transform="translate(700, 80)" className="cursor-pointer" onClick={() => handleSimulateServiceFault('cctv')}>
              <circle r="22" fill="#0b172a" stroke={simulatedFaultNode === 'cctv' ? '#ef4444' : '#38bdf8'} strokeWidth="2" />
              <text y="34" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Public Safety CCTV</text>
              <text y="46" textAnchor="middle" fill="#94a3b8" fontSize="8">6.1 km Link</text>
            </g>

            <g transform="translate(750, 270)" className="cursor-pointer" onClick={() => handleSimulateServiceFault('lighting')}>
              <circle r="22" fill="#0b172a" stroke={simulatedFaultNode === 'lighting' ? '#ef4444' : '#38bdf8'} strokeWidth="2" />
              <text y="34" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Streetlight Grid</text>
              <text y="46" textAnchor="middle" fill="#94a3b8" fontSize="8">5.5 km Link</text>
            </g>

            <g transform="translate(220, 280)" className="cursor-pointer" onClick={() => handleSimulateServiceFault('environmental')}>
              <circle r="22" fill="#0b172a" stroke={simulatedFaultNode === 'environmental' ? '#ef4444' : '#38bdf8'} strokeWidth="2" />
              <text y="34" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Environmental Telemetry</text>
              <text y="46" textAnchor="middle" fill="#94a3b8" fontSize="8">3.8 km Link</text>
            </g>

            <g transform="translate(450, 60)" className="cursor-pointer" onClick={() => handleSimulateServiceFault('emergency')}>
              <circle r="22" fill="#0b172a" stroke={simulatedFaultNode === 'emergency' ? '#ef4444' : '#38bdf8'} strokeWidth="2" />
              <text y="34" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Emergency Dispatch</text>
              <text y="46" textAnchor="middle" fill="#94a3b8" fontSize="8">2.4 km Link</text>
            </g>

            <g transform="translate(450, 310)" className="cursor-pointer" onClick={() => handleSimulateServiceFault('utilities')}>
              <circle r="22" fill="#0b172a" stroke={simulatedFaultNode === 'utilities' ? '#ef4444' : '#38bdf8'} strokeWidth="2" />
              <text y="34" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Water &amp; Power SCADA</text>
              <text y="46" textAnchor="middle" fill="#94a3b8" fontSize="8">7.8 km Link</text>
            </g>
          </svg>

          {/* Quick interactive hint */}
          <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
            Click any node on the map to toggle simulated link stress
          </div>
        </div>
      </section>

      {/* 6 Interactive Service Cards */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">Smart City Telecom Service Registry</h3>
          <p className="text-xs text-slate-400">Click a card to inspect operational details, realistic physical risks and AI mitigation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SMART_CITY_SERVICES.map((serv) => {
            const Icon = getServiceIcon(serv.id);
            const isSelected = selectedService.id === serv.id;
            return (
              <div
                key={serv.id}
                onClick={() => setSelectedService(serv)}
                className={`p-5 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                    : 'bg-[#081224] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{serv.subtitle}</span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1.5">{serv.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{serv.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Service Detail Modal / Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#081224] to-[#0d1e3d] border border-cyan-800/50 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
                {React.createElement(getServiceIcon(selectedService.id), { className: 'w-5 h-5' })}
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{selectedService.title}</h4>
                <p className="text-xs text-cyan-400">{selectedService.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => handleSimulateServiceFault(selectedService.id)}
              className="px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all active:scale-95"
            >
              Simulate Link Anomaly
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Real-World Implementation</span>
              <p className="text-slate-200 leading-relaxed">{selectedService.example}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">Typical Optical Fibre Vulnerability</span>
              <p className="text-slate-200 leading-relaxed">{selectedService.fibreFault}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">AI/ML Monitoring Solution</span>
              <p className="text-slate-200 leading-relaxed">{selectedService.solution}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
