import React, { useState } from 'react';
import { MATERIALS_DATA } from '../../data/mockData';
import { MaterialItem } from '../../types';
import labBenchImage from '../../assets/images/optical_lab_testbed_1791726763990.jpg';
import { 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
  Zap
} from 'lucide-react';

export const MaterialsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Physical Hardware' | 'Software & Tools' | 'Optional & Industrial'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = MATERIALS_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner & Lab Workbench Photo */}
      <section className="rounded-2xl bg-[#081224] border border-slate-800 p-6 md:p-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Project Engineering Bill of Materials (BOM)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Materials, Transceivers &amp; Computational Setup
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              To construct a functional optical telemetry bench, physical optoelectronic components are paired with digital signal acquisition and machine learning classifiers. The hardware architecture separates primary prototype instruments from proposed industrial utility equipment.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
              <span className="text-cyan-400 font-semibold block">Component Classification Notice:</span>
              <p className="text-slate-400 leading-relaxed">
                Items are strictly designated as <strong className="text-white">Required</strong> (essential for basic physical transmission and classification), <strong className="text-white">Optional</strong> (lab benchmarking accessories), or <strong className="text-white">Proposed</strong> (future metropolitan-scale deployment standards).
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-xl group relative">
              <img
                src={labBenchImage}
                alt="Modern optical laboratory testbed setup"
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs">
                  <span className="text-white font-semibold block">Optoelectronic Lab Testbed</span>
                  <span className="text-slate-400 font-mono text-[11px]">Corning SMF-28e Spool &amp; DFB Laser Source</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Prototype Setup: Step-by-Step Connection Schematic */}
      <section className="rounded-2xl bg-gradient-to-br from-[#081224] to-[#0a162d] border border-cyan-900/40 p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Basic Prototype Setup</h3>
          <p className="text-xs sm:text-sm text-slate-400">Step-by-step physical interconnect and data pipeline</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 font-bold text-xs border border-cyan-800">
              01
            </div>
            <h4 className="text-sm font-bold text-white">Transmitter Launch</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect the 1550nm semiconductor laser diode or LED source to a clean DC regulated power supply. Inject continuous wave or modulated square-pulse optical power into the patch cord.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 font-bold text-xs border border-cyan-800">
              02
            </div>
            <h4 className="text-sm font-bold text-white">Optical Fibre Interconnect</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Couple the optical transmitter into the Single-Mode Fibre spool via FC/PC or LC connectors. Introduce experimental macrobending jigs (mandrels) to simulate controlled curvature stress.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 font-bold text-xs border border-cyan-800">
              03
            </div>
            <h4 className="text-sm font-bold text-white">Receiver &amp; DAQ Acquisition</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Terminate the fibre into the InGaAs PIN photodiode. Connect the analog voltage output through an operational amplifier into a 16-bit multichannel ADC microcontroller or DAQ card.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 font-bold text-xs border border-cyan-800">
              04
            </div>
            <h4 className="text-sm font-bold text-white">Edge AI Processing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stream digitised sensor arrays into the embedded processing computer over USB/UART. Run wavelet denoising filters and evaluate the trained classifier model to report real-time status.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Component Gallery */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            {(['All', 'Physical Hardware', 'Software & Tools', 'Optional & Industrial'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-[#081224] border border-slate-800 hover:border-slate-700 p-5 space-y-3 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.badgeColor}`}>
                    {item.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.role}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Engineering Specifications</span>
                <p className="text-[11px] font-mono text-cyan-400/90 leading-tight">{item.specifications}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
