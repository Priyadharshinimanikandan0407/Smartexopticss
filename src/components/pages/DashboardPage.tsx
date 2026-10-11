import React, { useState, useEffect, useRef } from 'react';
import { SimulationState, FaultCondition, AlertItem } from '../../types';
import { 
  Activity, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Clock, 
  TrendingDown, 
  Cpu, 
  RotateCcw, 
  Play, 
  Sliders, 
  Share2, 
  Search,
  Filter,
  Info,
  Server,
  Layers,
  Sparkles
} from 'lucide-react';

interface DashboardPageProps {
  state: SimulationState;
  onSetCondition: (condition: FaultCondition) => void;
  onRunFaultDetection: () => void;
  onResetSimulation: () => void;
  onSelectNode?: (nodeId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  state,
  onSetCondition,
  onRunFaultDetection,
  onResetSimulation,
}) => {
  const [selectedNode, setSelectedNode] = useState<string>('hub');
  const [alertFilter, setAlertFilter] = useState<'all' | 'critical' | 'warning' | 'normal'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live Oscilloscope Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Dark background with faint grid
      ctx.fillStyle = '#060e1b';
      ctx.fillRect(0, 0, width, height);

      // Oscilloscope grid lines
      ctx.strokeStyle = 'rgba(14, 116, 144, 0.15)';
      ctx.lineWidth = 1;
      const gridSpacing = 30;

      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Center Baseline
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Signal wave parameters based on condition
      let amplitude = 40;
      let noiseLevel = 2;
      let waveColor = '#06b6d4'; // cyan
      let glowColor = 'rgba(6, 182, 212, 0.6)';

      if (state.condition === 'bending') {
        amplitude = 22;
        noiseLevel = 5;
        waveColor = '#f59e0b'; // amber
        glowColor = 'rgba(245, 158, 11, 0.6)';
      } else if (state.condition === 'connector') {
        amplitude = 15;
        noiseLevel = 12; // jagged jitter
        waveColor = '#f97316'; // orange
        glowColor = 'rgba(249, 115, 22, 0.6)';
      } else if (state.condition === 'severeloss') {
        amplitude = 3; // flatline
        noiseLevel = 4;
        waveColor = '#ef4444'; // red
        glowColor = 'rgba(239, 68, 68, 0.6)';
      }

      // Draw waveform
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = glowColor;

      ctx.beginPath();
      const centerY = height / 2;

      for (let x = 0; x < width; x++) {
        const timeFactor = (x + offset) * 0.05;
        // Pseudo PRBS digital optical data stream representation
        const bit1 = Math.sin(timeFactor);
        const bit2 = Math.sin(timeFactor * 2.3);
        const bit3 = Math.cos(timeFactor * 0.7);
        const noise = (Math.random() - 0.5) * noiseLevel;

        const rawWave = (bit1 + bit2 * 0.5 + bit3 * 0.3) * (amplitude / 1.8);
        const y = centerY - rawWave + noise;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw sweeping scanner line
      const scanX = (offset * 3) % width;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, height);
      ctx.stroke();

      offset += 1.8;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [state.condition]);

  const handleRunDetectionWithAnimation = () => {
    setIsClassifying(true);
    setTimeout(() => {
      setIsClassifying(false);
      onRunFaultDetection();
    }, 400);
  };

  const getStatusColor = () => {
    switch (state.condition) {
      case 'normal':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'bending':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      case 'connector':
        return 'text-orange-400 bg-orange-950/60 border-orange-500/40';
      case 'severeloss':
        return 'text-rose-400 bg-rose-950/60 border-rose-500/40';
    }
  };

  const filteredAlerts = state.recentAlerts.filter((alert) => {
    const matchesQuery = 
      alert.linkId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.suspectedFault.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.targetNode.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (alertFilter === 'critical') return alert.severity === 'high' || alert.severity === 'critical';
    if (alertFilter === 'warning') return alert.severity === 'medium' || alert.severity === 'low';
    if (alertFilter === 'normal') return alert.severity === 'nominal';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Simulation Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">
            <strong className="text-cyan-300 font-semibold">Demo / Simulated Data Mode: </strong>
            Readings reflect an interactive testbed modeling realistic SMF-28e optical link physics. Modular architecture allows direct drop-in integration of real DAQ hardware and trained PyTorch/ONNX ML models.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-slate-400">
          <span>Engine: Scikit-RF &amp; Wavelet-v2</span>
        </div>
      </div>

      {/* Control Simulation Selector Bar */}
      <div className="p-4 rounded-xl bg-[#081224] border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Inject Simulated Optical Channel Condition
            </span>
            <p className="text-xs text-slate-300">
              Select a physical fault scenario to observe immediate changes across telemetry, waveform and AI diagnostics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunDetectionWithAnimation}
              disabled={isClassifying}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-950 transition-all active:scale-95 disabled:opacity-50"
            >
              <Cpu className={`w-3.5 h-3.5 ${isClassifying ? 'animate-spin' : ''}`} />
              <span>{isClassifying ? 'Classifying Features...' : 'Run Fault Detection'}</span>
            </button>

            <button
              onClick={onResetSimulation}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 4 State Simulation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <button
            onClick={() => onSetCondition('normal')}
            className={`p-3 rounded-lg border text-left transition-all ${
              state.condition === 'normal'
                ? 'bg-emerald-950/70 border-emerald-500/70 text-emerald-300 shadow-sm shadow-emerald-950'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>1. Normal State</span>
              {state.condition === 'normal' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <div className="text-[11px] opacity-80">-12.4 dBm · 2.1 dB loss</div>
          </button>

          <button
            onClick={() => onSetCondition('bending')}
            className={`p-3 rounded-lg border text-left transition-all ${
              state.condition === 'bending'
                ? 'bg-amber-950/70 border-amber-500/70 text-amber-300 shadow-sm shadow-amber-950'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>2. Bending Loss</span>
              {state.condition === 'bending' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
            </div>
            <div className="text-[11px] opacity-80">-21.8 dBm · 8.6 dB loss</div>
          </button>

          <button
            onClick={() => onSetCondition('connector')}
            className={`p-3 rounded-lg border text-left transition-all ${
              state.condition === 'connector'
                ? 'bg-orange-950/70 border-orange-500/70 text-orange-300 shadow-sm shadow-orange-950'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>3. Connector Fault</span>
              {state.condition === 'connector' && <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />}
            </div>
            <div className="text-[11px] opacity-80">-27.5 dBm · 14.2 dB loss</div>
          </button>

          <button
            onClick={() => onSetCondition('severeloss')}
            className={`p-3 rounded-lg border text-left transition-all ${
              state.condition === 'severeloss'
                ? 'bg-rose-950/70 border-rose-500/70 text-rose-300 shadow-sm shadow-rose-950'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>4. Severe Loss</span>
              {state.condition === 'severeloss' && <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />}
            </div>
            <div className="text-[11px] opacity-80">-48.2 dBm · Fibre Cut</div>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Metric 1: Network Status */}
        <div className="p-3.5 rounded-xl bg-[#081224] border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] text-slate-400 font-medium">Network Status</span>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className={`text-sm font-bold px-2 py-0.5 rounded border ${getStatusColor()}`}>
              {state.status}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block pt-0.5">Global Link State</span>
        </div>

        {/* Metric 2: Optical Power */}
        <div className="p-3.5 rounded-xl bg-[#081224] border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Received Power</span>
          <div className="text-xl font-mono font-bold text-white tabular-nums">
            {state.opticalPowerDbm.toFixed(1)} <span className="text-xs font-normal text-slate-400">dBm</span>
          </div>
          <span className="text-[10px] text-slate-400 block">Baseline: -12.4 dBm</span>
        </div>

        {/* Metric 3: Signal Attenuation */}
        <div className="p-3.5 rounded-xl bg-[#081224] border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Attenuation</span>
          <div className="text-xl font-mono font-bold text-cyan-300 tabular-nums">
            {state.attenuationDb.toFixed(1)} <span className="text-xs font-normal text-slate-400">dB</span>
          </div>
          <span className="text-[10px] text-slate-400 block">Accumulated loss</span>
        </div>

        {/* Metric 4: Transmission Delay */}
        <div className="p-3.5 rounded-xl bg-[#081224] border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Transmission Delay</span>
          <div className="text-xl font-mono font-bold text-slate-200 tabular-nums">
            {state.delayMs.toFixed(2)} <span className="text-xs font-normal text-slate-400">ms</span>
          </div>
          <span className="text-[10px] text-slate-400 block">One-way propagation</span>
        </div>

        {/* Metric 5: Monitored Links */}
        <div className="p-3.5 rounded-xl bg-[#081224] border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Monitored Links</span>
          <div className="text-xl font-mono font-bold text-white tabular-nums">
            {state.totalLinks} <span className="text-xs font-normal text-slate-400">active</span>
          </div>
          <span className="text-[10px] text-slate-400 block">Single-mode spans</span>
        </div>

        {/* Metric 6: Suspected Faults */}
        <div className="p-3.5 rounded-xl bg-[#081224] border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Suspected Faults</span>
          <div className={`text-xl font-mono font-bold tabular-nums ${state.suspectedFaults > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {state.suspectedFaults} <span className="text-xs font-normal text-slate-400">spans</span>
          </div>
          <span className="text-[10px] text-slate-400 block">Identified by ML</span>
        </div>

        {/* Metric 7: Network Health % */}
        <div className="p-3.5 rounded-xl bg-[#081224] border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Network Health</span>
          <div className="text-xl font-mono font-bold text-cyan-300 tabular-nums">
            {state.healthPercent.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400 block">Composite score</span>
        </div>
      </div>

      {/* Waveform Oscilloscope & AI Diagnostic Feature Vector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live Signal Waveform Canvas (7 cols) */}
        <div className="lg:col-span-7 rounded-xl bg-[#081224] border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Live Signal Waveform &amp; Photodetector Oscilloscope</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Sampling: 100 kS/s</span>
              <span>·</span>
              <span className="text-cyan-400">λ 1550nm</span>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative w-full h-56 rounded-lg overflow-hidden border border-slate-800 bg-[#060e1b]">
            <canvas
              ref={canvasRef}
              width={640}
              height={224}
              className="w-full h-full block"
            />
            {/* Overlay Telemetry HUD */}
            <div className="absolute top-2 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-700/60 font-mono text-[11px] text-slate-300 space-x-3">
              <span>Power: <strong className="text-cyan-400">{state.opticalPowerDbm.toFixed(1)} dBm</strong></span>
              <span>SNR: <strong className="text-cyan-400">{state.snrDb.toFixed(1)} dB</strong></span>
              <span>BER: <strong className="text-cyan-400">{state.ber}</strong></span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Time-Domain Representation (Digital Pulse Train Stream)</span>
            <span className="font-mono text-[11px]">Horizontal: 50 µs/div | Vertical: 5 dB/div</span>
          </div>
        </div>

        {/* Right: AI Model Diagnostic Inference Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-[#081224] border border-slate-800 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">AI/ML Classification Result</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/70 border border-purple-800/40 text-purple-300">
              Confidence {state.mlConfidence}%
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Identified Physical Class</span>
            <div className="text-sm font-bold text-cyan-300">
              {state.mlClassification}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracted statistical moments correlate with {state.condition === 'normal' ? 'nominal optical waveguide parameters.' : state.condition === 'bending' ? 'geometric bending curvature surpassing critical angle θ_c.' : state.condition === 'connector' ? 'connector ferrule air gap causing high return loss.' : 'catastrophic physical rupture in optical glass core.'}
            </p>
          </div>

          {/* Feature Vector Table */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 block">Extracted Machine Learning Feature Vector:</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 text-[10px] block">Mean Power (μ)</span>
                <span className="text-white font-bold">{state.mlFeatureVector.meanPowerDbm.toFixed(1)} dBm</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 text-[10px] block">Variance (σ²)</span>
                <span className="text-white font-bold">{state.mlFeatureVector.variance.toFixed(2)}</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 text-[10px] block">Gradient (dPower/dt)</span>
                <span className="text-white font-bold">{state.mlFeatureVector.gradientDbmPerSec.toFixed(2)} dB/s</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400 text-[10px] block">Reflectivity Peak</span>
                <span className="text-white font-bold">{state.mlFeatureVector.fresnelReflectivity.toFixed(1)} dB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Trend Chart & Fault Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Historical Signal Line Chart (8 cols) */}
        <div className="lg:col-span-8 rounded-xl bg-[#081224] border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Historical Received Power Trend (Past 24 Hours)</h3>
              <p className="text-xs text-slate-400">Continuous optical telemetry logging across urban distribution spans</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Interval: 1 hr</span>
          </div>

          {/* SVG Line Chart */}
          <div className="h-44 w-full">
            <svg viewBox="0 0 700 160" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="40" y1="20" x2="680" y2="20" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="40" y1="60" x2="680" y2="60" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="40" y1="100" x2="680" y2="100" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="40" y1="140" x2="680" y2="140" stroke="#1e293b" />

              {/* Y Axis labels */}
              <text x="32" y="24" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">-10 dBm</text>
              <text x="32" y="64" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">-20 dBm</text>
              <text x="32" y="104" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">-30 dBm</text>
              <text x="32" y="144" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">-50 dBm</text>

              {/* Data area and path */}
              <path
                d={
                  state.condition === 'normal'
                    ? "M 40 28 Q 120 27 200 30 T 360 28 T 520 29 T 680 30 L 680 140 L 40 140 Z"
                    : state.condition === 'bending'
                    ? "M 40 28 Q 120 27 200 30 T 360 28 T 480 40 T 600 70 L 680 72 L 680 140 L 40 140 Z"
                    : state.condition === 'connector'
                    ? "M 40 28 Q 120 27 200 30 T 360 32 T 500 55 T 600 95 L 680 98 L 680 140 L 40 140 Z"
                    : "M 40 28 Q 120 27 200 30 T 360 30 T 520 35 T 580 135 L 680 138 L 680 140 L 40 140 Z"
                }
                fill="url(#chartGradient)"
              />
              <path
                d={
                  state.condition === 'normal'
                    ? "M 40 28 Q 120 27 200 30 T 360 28 T 520 29 T 680 30"
                    : state.condition === 'bending'
                    ? "M 40 28 Q 120 27 200 30 T 360 28 T 480 40 T 600 70 L 680 72"
                    : state.condition === 'connector'
                    ? "M 40 28 Q 120 27 200 30 T 360 32 T 500 55 T 600 95 L 680 98"
                    : "M 40 28 Q 120 27 200 30 T 360 30 T 520 35 T 580 135 L 680 138"
                }
                fill="none"
                stroke={state.condition === 'normal' ? '#06b6d4' : state.condition === 'bending' ? '#f59e0b' : state.condition === 'connector' ? '#f97316' : '#ef4444'}
                strokeWidth="2.5"
              />

              {/* Latest marker dot */}
              <circle
                cx="680"
                cy={state.condition === 'normal' ? 30 : state.condition === 'bending' ? 72 : state.condition === 'connector' ? 98 : 138}
                r="4.5"
                fill="#ffffff"
                stroke="#06b6d4"
                strokeWidth="2"
              />

              {/* X Axis Time markers */}
              <text x="40" y="155" fill="#64748b" fontSize="10">00:00</text>
              <text x="200" y="155" fill="#64748b" fontSize="10">06:00</text>
              <text x="360" y="155" fill="#64748b" fontSize="10">12:00</text>
              <text x="520" y="155" fill="#64748b" fontSize="10">18:00</text>
              <text x="680" y="155" fill="#64748b" fontSize="10" textAnchor="end">Now (T₀)</text>
            </svg>
          </div>
        </div>

        {/* Fault Distribution Breakdown Chart (4 cols) */}
        <div className="lg:col-span-4 rounded-xl bg-[#081224] border border-slate-800 p-4 space-y-3">
          <div>
            <h3 className="text-sm font-bold text-white">Fault Distribution Proportions</h3>
            <p className="text-xs text-slate-400">Classified incidents across all network nodes</p>
          </div>

          <div className="space-y-2.5 pt-1">
            {/* Bar 1: Normal Transmission */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Nominal Links</span>
                <span className="font-mono text-emerald-400 font-semibold">{state.condition === 'normal' ? '92%' : state.condition === 'bending' ? '68%' : '44%'}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: state.condition === 'normal' ? '92%' : state.condition === 'bending' ? '68%' : '44%' }} 
                />
              </div>
            </div>

            {/* Bar 2: Macrobending / Microbending */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Bending Loss</span>
                <span className="font-mono text-amber-400 font-semibold">{state.condition === 'bending' ? '24%' : '5%'}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                  style={{ width: state.condition === 'bending' ? '24%' : '5%' }} 
                />
              </div>
            </div>

            {/* Bar 3: Connector Air Gap */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Connector Degradation</span>
                <span className="font-mono text-orange-400 font-semibold">{state.condition === 'connector' ? '28%' : '2%'}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all duration-500" 
                  style={{ width: state.condition === 'connector' ? '28%' : '2%' }} 
                />
              </div>
            </div>

            {/* Bar 4: Severe Attenuation / Fibre Cut */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Severe Loss / Cuts</span>
                <span className="font-mono text-rose-400 font-semibold">{state.condition === 'severeloss' ? '38%' : '1%'}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-500" 
                  style={{ width: state.condition === 'severeloss' ? '38%' : '1%' }} 
                />
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800 text-[11px] text-slate-400">
            Model validation: Synthetic dataset trained with 10,000 perturbed optical feature instances.
          </div>
        </div>
      </div>

      {/* Network Topology Panel */}
      <div className="rounded-xl bg-[#081224] border border-slate-800 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white">Smart City Optical Network Topology</h3>
            <p className="text-xs text-slate-400">Interactive central control hub with fibre links connecting civic edge nodes</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Nominal</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Warning</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Fault</span>
          </div>
        </div>

        {/* Interactive SVG Network Graph */}
        <div className="relative w-full h-64 bg-[#060e1b] rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 800 320" className="w-full h-full">
            {/* Fibre Links connecting central hub to edge devices */}
            {/* Hub to Node-A Traffic */}
            <line
              x1="400" y1="160" x2="160" y2="80"
              stroke={state.condition === 'severeloss' ? '#ef4444' : '#06b6d4'}
              strokeWidth={state.condition === 'severeloss' ? 3 : 2}
              strokeDasharray={state.condition === 'severeloss' ? '6 4' : 'none'}
            />
            {/* Hub to Node-B CCTV */}
            <line
              x1="400" y1="160" x2="640" y2="70"
              stroke={state.condition === 'bending' ? '#f59e0b' : state.condition === 'severeloss' ? '#ef4444' : '#06b6d4'}
              strokeWidth="2.5"
            />
            {/* Hub to Node-C Lighting */}
            <line
              x1="400" y1="160" x2="660" y2="240"
              stroke={state.condition === 'connector' ? '#f97316' : '#06b6d4'}
              strokeWidth="2.5"
            />
            {/* Hub to Node-D Sensors */}
            <line
              x1="400" y1="160" x2="180" y2="250"
              stroke="#06b6d4"
              strokeWidth="2"
            />
            {/* Hub to Node-E Hospital */}
            <line
              x1="400" y1="160" x2="400" y2="280"
              stroke="#06b6d4"
              strokeWidth="2"
            />

            {/* Central Control Hub Node */}
            <g transform="translate(400, 160)" className="cursor-pointer" onClick={() => setSelectedNode('hub')}>
              <circle r="28" fill="#0c2340" stroke="#06b6d4" strokeWidth="2.5" />
              <circle r="12" fill="#06b6d4" opacity="0.8" />
              <text y="42" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Central Control Hub</text>
              <text y="54" textAnchor="middle" fill="#06b6d4" fontSize="9" fontFamily="monospace">Core Master Node</text>
            </g>

            {/* Node-A: Traffic */}
            <g transform="translate(160, 80)" className="cursor-pointer" onClick={() => setSelectedNode('traffic')}>
              <circle r="20" fill="#081224" stroke={state.condition === 'severeloss' ? '#ef4444' : '#38bdf8'} strokeWidth="2" />
              <text y="32" textAnchor="middle" fill="#e2e8f0" fontSize="10">Node-A: Traffic Signals</text>
              <text y="44" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">Span: 4.2 km</text>
            </g>

            {/* Node-B: CCTV */}
            <g transform="translate(640, 70)" className="cursor-pointer" onClick={() => setSelectedNode('cctv')}>
              <circle r="20" fill="#081224" stroke={state.condition === 'bending' ? '#f59e0b' : '#38bdf8'} strokeWidth="2" />
              <text y="32" textAnchor="middle" fill="#e2e8f0" fontSize="10">Node-B: HD CCTV Hub</text>
              <text y="44" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">Span: 6.1 km</text>
            </g>

            {/* Node-C: Lighting */}
            <g transform="translate(660, 240)" className="cursor-pointer" onClick={() => setSelectedNode('lighting')}>
              <circle r="20" fill="#081224" stroke={state.condition === 'connector' ? '#f97316' : '#38bdf8'} strokeWidth="2" />
              <text y="32" textAnchor="middle" fill="#e2e8f0" fontSize="10">Node-C: Streetlight Grid</text>
              <text y="44" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">Span: 5.5 km</text>
            </g>

            {/* Node-D: Sensors */}
            <g transform="translate(180, 250)" className="cursor-pointer" onClick={() => setSelectedNode('sensor')}>
              <circle r="20" fill="#081224" stroke="#38bdf8" strokeWidth="2" />
              <text y="32" textAnchor="middle" fill="#e2e8f0" fontSize="10">Node-D: Flood Sensors</text>
              <text y="44" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">Span: 3.8 km</text>
            </g>

            {/* Node-E: Hospital */}
            <g transform="translate(400, 280)" className="cursor-pointer" onClick={() => setSelectedNode('hospital')}>
              <circle r="20" fill="#081224" stroke="#38bdf8" strokeWidth="2" />
              <text y="32" textAnchor="middle" fill="#e2e8f0" fontSize="10">Node-E: City Hospital</text>
              <text y="44" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">Span: 8.4 km</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="rounded-xl bg-[#081224] border border-slate-800 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white">Recent Optical Network Alerts</h3>
            <p className="text-xs text-slate-400">Chronological telemetry events and machine learning classifications</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setAlertFilter('all')}
                className={`px-2 py-1 rounded font-medium ${alertFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setAlertFilter('critical')}
                className={`px-2 py-1 rounded font-medium ${alertFilter === 'critical' ? 'bg-rose-950 text-rose-300' : 'text-slate-400 hover:text-white'}`}
              >
                Critical
              </button>
              <button
                onClick={() => setAlertFilter('warning')}
                className={`px-2 py-1 rounded font-medium ${alertFilter === 'warning' ? 'bg-amber-950 text-amber-300' : 'text-slate-400 hover:text-white'}`}
              >
                Warning
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Link ID</th>
                <th className="py-2.5 px-3">Endpoint Target</th>
                <th className="py-2.5 px-3">Suspected Fault Signature</th>
                <th className="py-2.5 px-3 text-right">Power Level</th>
                <th className="py-2.5 px-3 text-center">Severity</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-500 font-sans">
                    No matching alert events recorded in current filter.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 text-slate-300 whitespace-nowrap">{alert.timestamp}</td>
                    <td className="py-3 px-3 text-cyan-400 font-semibold">{alert.linkId}</td>
                    <td className="py-3 px-3 text-slate-300 font-sans">{alert.targetNode}</td>
                    <td className="py-3 px-3 text-white font-sans font-medium">{alert.suspectedFault}</td>
                    <td className="py-3 px-3 text-right text-slate-300 tabular-nums">{alert.powerDbm.toFixed(1)} dBm</td>
                    <td className="py-3 px-3 text-center font-sans">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        alert.severity === 'critical' || alert.severity === 'high'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
                          : alert.severity === 'medium' || alert.severity === 'low'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-300">
                      <span className="text-slate-400">{alert.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
