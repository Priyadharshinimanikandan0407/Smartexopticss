import React, { useState } from 'react';
import { PageId } from '../../types';
import heroImage from '../../assets/images/optical_fibre_hero_1791726738124.jpg';
import { 
  Zap, 
  Activity, 
  Cpu, 
  Building2, 
  ArrowRight, 
  Box, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Sliders,
  ChevronRight
} from 'lucide-react';

interface OverviewPageProps {
  onNavigate: (page: PageId) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const [pulseSpeed, setPulseSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#091528] to-[#060e1b] border border-cyan-900/40 p-6 md:p-10 lg:p-12 shadow-2xl">
        {/* Background glow effects */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>B.Tech CSE-AIML Exhibition Prototype · SRM IST</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Optical Fibre Communication with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">AI/ML-Based</span> Fault Detection
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                Intelligent Optical Network Monitoring for Reliable Communication
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Optical fibres form the high-speed backbone of modern global telecom and smart-city data grids. By leveraging real-time sensor telemetry and machine learning pattern classification, SMARTEX detects and diagnoses microbends, connector degradation, and cable severances before service disruption cascades.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-900/40 hover:shadow-cyan-500/30 transition-all active:scale-95 group"
              >
                <Activity className="w-4 h-4" />
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('model3d')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/40 transition-all active:scale-95"
              >
                <Box className="w-4 h-4 text-cyan-400" />
                <span>View 3D Model</span>
              </button>
            </div>

            {/* Quick Specs Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Core</span>
                <span className="font-mono text-cyan-300 font-semibold text-sm">SMF-28e+ 9µm</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Inference Model</span>
                <span className="font-mono text-cyan-300 font-semibold text-sm">Multi-Class ML</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Detection Latency</span>
                <span className="font-mono text-cyan-300 font-semibold text-sm">&lt; 10 ms</span>
              </div>
            </div>
          </div>

          {/* Hero visual: Real generated macro photo with animated photon overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 group">
              <img
                src={heroImage}
                alt="Optical fibre cables transmitting laser pulses"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e1b] via-transparent to-transparent opacity-80" />
              
              {/* Animated Glowing Light Pulse Track overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md rounded-xl p-3.5 border border-cyan-500/40">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span className="flex items-center gap-1.5 font-semibold text-cyan-400">
                    <Zap className="w-3.5 h-3.5" /> Core Photon Propagation
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">λ = 1550 nm</span>
                </div>

                {/* Animated light pulses inside optical core waveguide */}
                <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-cyan-800/50">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/3 animate-signal-pulse"
                    style={{ animationDuration: pulseSpeed === 'fast' ? '1s' : pulseSpeed === 'slow' ? '4s' : '2s' }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-1/4 animate-signal-pulse"
                    style={{ animationDuration: pulseSpeed === 'fast' ? '1.4s' : pulseSpeed === 'slow' ? '4.8s' : '2.6s', animationDelay: '0.5s' }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-slate-400">
                  <span>Tx: Laser Diode (0 dBm)</span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setPulseSpeed('slow')} 
                      className={`px-1.5 py-0.5 rounded ${pulseSpeed === 'slow' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:text-white'}`}
                    >
                      Slow
                    </button>
                    <button 
                      onClick={() => setPulseSpeed('normal')} 
                      className={`px-1.5 py-0.5 rounded ${pulseSpeed === 'normal' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:text-white'}`}
                    >
                      Normal
                    </button>
                    <button 
                      onClick={() => setPulseSpeed('fast')} 
                      className={`px-1.5 py-0.5 rounded ${pulseSpeed === 'fast' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:text-white'}`}
                    >
                      Fast
                    </button>
                  </div>
                  <span>Rx: Photodetector</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Information Cards */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Core System Pillars</h2>
          <p className="text-xs sm:text-sm text-slate-400">Key competencies of the SMARTEX optical monitoring architecture</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="rounded-xl bg-[#081224] border border-slate-800 hover:border-cyan-500/40 p-5 transition-all hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center text-cyan-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">High-Speed Data Transmission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leverages dielectric silica optical waveguides with negligible electromagnetic interference and gigabit bandwidth capacity over extended urban distances.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-[#081224] border border-slate-800 hover:border-purple-500/40 p-5 transition-all hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-purple-950/70 border border-purple-800/50 flex items-center justify-center text-purple-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">AI-Powered Fault Detection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Employs statistical feature extraction and machine learning to distinguish normal fluctuations from macrobending, ferrule air-gaps, or physical cable cuts.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-[#081224] border border-slate-800 hover:border-blue-500/40 p-5 transition-all hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-blue-950/70 border border-blue-800/50 flex items-center justify-center text-blue-400 mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Real-Time Signal Monitoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Continuously logs received optical power (dBm), attenuation rate (dB/km), and bit error rates to build temporal trendlines for predictive maintenance.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl bg-[#081224] border border-slate-800 hover:border-emerald-500/40 p-5 transition-all hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-800/50 flex items-center justify-center text-emerald-400 mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">Smart-City Connectivity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Protects vital municipal backhauls connecting smart traffic lights, CCTV surveillance, emergency hospitals, and telemetry sensor stations.
            </p>
          </div>
        </div>
      </section>

      {/* Physics & Working Principle: How Light Signals Carry Information */}
      <section className="rounded-2xl bg-[#081224] border border-slate-800 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">How Light Carries Information Through an Optical Fibre</h2>
            <p className="text-xs sm:text-sm text-slate-400">Fundamental semiconductor physics & photonic waveguiding</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded bg-cyan-950/50 border border-cyan-800/40 self-start md:self-auto">
            Snell's Law & Total Internal Reflection
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-950 flex items-center justify-center text-xs border border-cyan-800">1</span>
              Laser Modulation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Digital binary data (1s and 0s) from the electronic processor modulates a semiconductor laser diode or LED. Photons are emitted at calibrated infrared wavelengths (typically 1310 nm or 1550 nm where glass absorption is minimal).
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-950 flex items-center justify-center text-xs border border-cyan-800">2</span>
              Total Internal Reflection (TIR)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The fibre core has a slightly higher refractive index (<span className="font-mono text-cyan-300">n₁ ≈ 1.468</span>) than the surrounding glass cladding (<span className="font-mono text-cyan-300">n₂ ≈ 1.462</span>). When light strikes the boundary at an angle greater than the critical angle (<span className="font-mono text-cyan-300">θ_c = arcsin(n₂/n₁)</span>), 100% of the light reflects internally without leaking.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-950 flex items-center justify-center text-xs border border-cyan-800">3</span>
              Photodetection & Sampling
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              At the remote receiver, an InGaAs PIN photodiode absorbs incident photons and generates a proportional photocurrent through the photoelectric effect. Transimpedance amplifiers restore clean digital voltage waveforms for DAQ acquisition.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Statement: Why Optical Networks Need AI Monitoring */}
      <section className="rounded-2xl bg-gradient-to-br from-[#120e20] to-[#081224] border border-purple-900/40 p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Operational Challenges in Physical Infrastructure</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">The Problem: Physical Vulnerabilities in Optical Links</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Unlike metallic copper cables, optical glass fibres are sensitive to physical geometry deformations and environmental stresses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-rose-400 font-bold text-sm">Physical Fibre Cuts</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Excavation backhoes, accidental construction severed conduits, or severe natural disasters cut cables, causing an instant 100% loss of optical power (-45 to -60 dBm).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold text-sm">Bending Loss (Macrobend)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tight bends below the minimum bend radius (typically &lt;30 mm) cause light ray angles to drop below the critical angle, radiating photons out into the buffer coating.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-orange-400 font-bold text-sm">Connector Damage & Dust</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Microscopic dust particles or ferrule endface air gaps introduce Fresnel reflection peaks and insertion losses of 2 to 15 dB, degrading the Bit Error Rate (BER).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-yellow-400 font-bold text-sm">Cumulative Attenuation</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Moisture ingress into splice enclosures, temperature extremes, and mechanical strain gradually degrade the transmission medium over time without clear point alarms.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-300">
            <strong className="text-white">The SMARTEX Solution: </strong>
            Instead of waiting for customer downtime complaints, continuous machine learning telemetry identifies anomaly signatures within milliseconds.
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shrink-0"
          >
            <span>Launch Simulation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
