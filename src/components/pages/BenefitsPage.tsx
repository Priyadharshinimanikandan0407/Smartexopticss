import React from 'react';
import { BENEFITS_COMPARISON } from '../../data/mockData';
import { 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  Zap, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Scale
} from 'lucide-react';

const BENEFIT_CARDS = [
  {
    title: 'Early Identification of Abnormal Signals',
    desc: 'Detects micro-attenuations and high-frequency jitter before catastrophic link drop occurs.',
    icon: Zap,
    metric: '< 10 ms Detection'
  },
  {
    title: 'Reduced Troubleshooting Time (MTTR)',
    desc: 'Pinpoints specific physical mechanisms (bending vs dirty ferrule) without blind dispatches.',
    icon: Clock,
    metric: '60% Faster MTTR'
  },
  {
    title: 'Improved Network Reliability',
    desc: 'Enables autonomous optical protection switching (APS) to redundant fibre rings ahead of failure.',
    icon: ShieldCheck,
    metric: '99.999% Uptime Goal'
  },
  {
    title: 'Reduced Manual Monitoring Effort',
    desc: 'Eliminates repetitive manual OTDR truck sweeps with automated 24/7 edge classification.',
    icon: Search,
    metric: 'Automated 24/7 Logging'
  },
  {
    title: 'Support for Predictive Maintenance',
    desc: 'Analyzes long-term power gradient degradation to schedule repairs during planned maintenance windows.',
    icon: TrendingUp,
    metric: 'Proactive Scheduling'
  },
  {
    title: 'Faster Fault Root-Cause Investigation',
    desc: 'Distinguishes between connector Fresnel reflections and Rayleigh backscatter dropouts.',
    icon: CheckCircle2,
    metric: 'Feature Signature Match'
  },
  {
    title: 'Improved Visibility of Network Status',
    desc: 'Centralizes multi-span municipal topologies into a unified telecommunications dashboard.',
    icon: Scale,
    metric: 'Holistic Spatial NOC'
  },
  {
    title: 'Potential Reduction in Maintenance Costs',
    desc: 'Cuts emergency overtime truck dispatches and avoids SLA failure penalties from enterprise tenants.',
    icon: DollarSign,
    metric: 'Significant OPEX Savings'
  }
];

export const BenefitsPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Hero Header */}
      <section className="rounded-2xl bg-[#081224] border border-slate-800 p-6 md:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>Comparative Value &amp; Engineering Efficacy</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Benefits &amp; Performance Evaluation
        </h2>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Transitioning from reactive fault repairs to intelligent machine-learning-assisted telemetry dramatically enhances optical link resilience across mission-critical telecommunications networks.
        </p>
      </section>

      {/* 8 Benefits Cards Grid */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">Key Architectural Advantages</h3>
          <p className="text-xs text-slate-400">Measurable improvements across network operations and maintenance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFIT_CARDS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#081224] border border-slate-800 hover:border-cyan-500/40 p-5 space-y-3 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-cyan-950/70 text-cyan-400 border border-cyan-800/40">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                      {b.metric}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{b.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparative Matrix: Traditional vs AI/ML-Assisted Monitoring */}
      <section className="rounded-2xl bg-[#081224] border border-slate-800 p-6 md:p-8 space-y-5">
        <div>
          <h3 className="text-lg font-bold text-white">Traditional Monitoring vs. AI/ML-Assisted Monitoring</h3>
          <p className="text-xs text-slate-400">Detailed technological comparison across five key operational criteria</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-1/4">Evaluation Dimension</th>
                <th className="py-3 px-4 w-5/12 text-slate-400">Traditional Conventional Monitoring</th>
                <th className="py-3 px-4 w-5/12 text-cyan-300">SMARTEX AI/ML-Assisted System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {BENEFITS_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-850/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div>{row.metric}</div>
                    <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">{row.advantage}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 leading-relaxed">
                    {row.traditional}
                  </td>
                  <td className="py-3.5 px-4 text-slate-200 leading-relaxed bg-cyan-950/10 font-medium">
                    {row.aiml}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Rigor & Scientific Disclaimer */}
      <section className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
          <Info className="w-4 h-4 shrink-0" />
          <span>Engineering Assessment &amp; Validation Rigor Notice</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          AI/ML-based classification does not replace optical physics or dedicated reflectometry testing (OTDR). In practical engineering systems, machine learning operates as a continuous first-line anomaly filter. The accuracy of ML predictions depends heavily on feature selection quality, training dataset diversity, ADC signal-to-noise ratio, and regular temperature calibration.
        </p>
      </section>
    </div>
  );
};
