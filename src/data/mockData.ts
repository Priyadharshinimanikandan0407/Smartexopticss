import { MaterialItem, SimulationState, AlertItem, NetworkNode, NetworkLink } from '../types';

export const INITIAL_NODES: NetworkNode[] = [
  { id: 'hub', name: 'Central Smart City Control Centre', category: 'control', x: 50, y: 50, status: 'nominal', powerDbm: -12.4, attenuationDb: 1.8 },
  { id: 'traffic-1', name: 'Metro Junction Traffic Signals (Node-A)', category: 'traffic', x: 20, y: 25, status: 'nominal', powerDbm: -13.1, attenuationDb: 2.1 },
  { id: 'cctv-1', name: 'Boulevard HD CCTV Surveillance (Node-B)', category: 'cctv', x: 80, y: 22, status: 'nominal', powerDbm: -12.9, attenuationDb: 2.0 },
  { id: 'lighting-1', name: 'Smart Streetlight Grid Sector 4 (Node-C)', category: 'lighting', x: 82, y: 75, status: 'nominal', powerDbm: -13.5, attenuationDb: 2.4 },
  { id: 'sensor-1', name: 'Air Quality & Flood Hydrology (Node-D)', category: 'sensor', x: 22, y: 78, status: 'nominal', powerDbm: -12.8, attenuationDb: 1.9 },
  { id: 'hospital-1', name: 'City Hospital Emergency Telemetry (Node-E)', category: 'datacenter', x: 50, y: 88, status: 'nominal', powerDbm: -12.6, attenuationDb: 1.85 },
];

export const INITIAL_LINKS: NetworkLink[] = [
  { id: 'L1', source: 'hub', target: 'traffic-1', lengthKm: 4.2, status: 'nominal', attenuationRate: 0.22 },
  { id: 'L2', source: 'hub', target: 'cctv-1', lengthKm: 6.1, status: 'nominal', attenuationRate: 0.21 },
  { id: 'L3', source: 'hub', target: 'lighting-1', lengthKm: 5.5, status: 'nominal', attenuationRate: 0.23 },
  { id: 'L4', source: 'hub', target: 'sensor-1', lengthKm: 3.8, status: 'nominal', attenuationRate: 0.20 },
  { id: 'L5', source: 'hub', target: 'hospital-1', lengthKm: 8.4, status: 'nominal', attenuationRate: 0.22 },
];

export const SIMULATION_PRESETS: Record<string, Partial<SimulationState>> = {
  normal: {
    condition: 'normal',
    opticalPowerDbm: -12.4,
    attenuationDb: 2.1,
    delayMs: 0.42,
    totalLinks: 24,
    suspectedFaults: 0,
    healthPercent: 99.4,
    snrDb: 34.2,
    ber: '1.0 × 10⁻¹⁰',
    status: 'Normal',
    mlClassification: 'Nominal Signal Transmission',
    mlConfidence: 98.6,
    mlFeatureVector: {
      meanPowerDbm: -12.4,
      variance: 0.08,
      gradientDbmPerSec: 0.02,
      kurtosis: 2.94,
      fresnelReflectivity: -52.4
    }
  },
  bending: {
    condition: 'bending',
    opticalPowerDbm: -21.8,
    attenuationDb: 8.6,
    delayMs: 0.54,
    totalLinks: 24,
    suspectedFaults: 1,
    healthPercent: 78.2,
    snrDb: 21.4,
    ber: '3.8 × 10⁻⁶',
    status: 'Warning',
    mlClassification: 'Macrobending / Tight Microbend Loss Detected',
    mlConfidence: 94.1,
    mlFeatureVector: {
      meanPowerDbm: -21.8,
      variance: 0.85,
      gradientDbmPerSec: -1.42,
      kurtosis: 4.81,
      fresnelReflectivity: -48.1
    }
  },
  connector: {
    condition: 'connector',
    opticalPowerDbm: -27.5,
    attenuationDb: 14.2,
    delayMs: 0.68,
    totalLinks: 24,
    suspectedFaults: 2,
    healthPercent: 61.5,
    snrDb: 14.8,
    ber: '8.4 × 10⁻⁴',
    status: 'Warning',
    mlClassification: 'Connector Misalignment / Fresnel Air-Gap Fault',
    mlConfidence: 92.7,
    mlFeatureVector: {
      meanPowerDbm: -27.5,
      variance: 2.14,
      gradientDbmPerSec: -2.85,
      kurtosis: 6.22,
      fresnelReflectivity: -14.2 // high back-reflection at connector interface
    }
  },
  severeloss: {
    condition: 'severeloss',
    opticalPowerDbm: -48.2,
    attenuationDb: 35.8,
    delayMs: 1.82,
    totalLinks: 24,
    suspectedFaults: 3,
    healthPercent: 32.0,
    snrDb: 4.1,
    ber: '4.6 × 10⁻¹',
    status: 'Fault Detected',
    mlClassification: 'Severe Signal Loss / Possible Physical Fibre Cut',
    mlConfidence: 99.1,
    mlFeatureVector: {
      meanPowerDbm: -48.2,
      variance: 6.90,
      gradientDbmPerSec: -18.7,
      kurtosis: 9.85,
      fresnelReflectivity: -9.8 // extreme reflection or Rayleigh blackout
    }
  }
};

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-1042',
    timestamp: '14:28:11',
    linkId: 'L2 (Boulevard Link)',
    sourceNode: 'Central Control Hub',
    targetNode: 'Boulevard HD CCTV (Node-B)',
    suspectedFault: 'Macrobending Induced Attenuation',
    severity: 'medium',
    powerDbm: -21.8,
    status: 'Classified',
    actionRecommended: 'Inspect conduit bend radius at manhole junction MH-04'
  },
  {
    id: 'ALT-1039',
    timestamp: '13:50:04',
    linkId: 'L3 (Lighting Link)',
    sourceNode: 'Central Control Hub',
    targetNode: 'Streetlight Grid (Node-C)',
    suspectedFault: 'Connector Ferrule Dust / Air Gap',
    severity: 'low',
    powerDbm: -19.4,
    status: 'Investigating',
    actionRecommended: 'Perform fiber endface dry-wipe cleaning on patch panel port 8'
  },
  {
    id: 'ALT-1015',
    timestamp: '11:15:30',
    linkId: 'L1 (Traffic Link)',
    sourceNode: 'Central Control Hub',
    targetNode: 'Metro Junction (Node-A)',
    suspectedFault: 'Nominal Operating Parameters',
    severity: 'nominal',
    powerDbm: -12.4,
    status: 'Resolved',
    actionRecommended: 'No maintenance action required'
  }
];

export const MATERIALS_DATA: MaterialItem[] = [
  // Hardware
  {
    id: 'mat-1',
    name: 'Single-Mode Optical Fibre Spool (Corning SMF-28e+)',
    category: 'Physical Hardware',
    role: 'Acts as the physical light wave guiding transmission medium using total internal reflection (core diameter 9µm, cladding 125µm).',
    specifications: 'Operating wavelengths 1310nm / 1550nm; attenuation ≤0.20 dB/km at 1550nm; numerical aperture 0.14.',
    status: 'Required',
    badgeColor: 'border-cyan-500/30 text-cyan-400'
  },
  {
    id: 'mat-2',
    name: 'Optical Laser Diode Transmitter Module',
    category: 'Physical Hardware',
    role: 'Converts electrical binary data into high-speed modulated coherent light pulses injected into the fibre core.',
    specifications: '1310/1550nm DFB laser, optical launch power 0 dBm to +3 dBm, LC/PC optical connector interface.',
    status: 'Required',
    badgeColor: 'border-cyan-500/30 text-cyan-400'
  },
  {
    id: 'mat-3',
    name: 'High-Speed InGaAs PIN Photodetector Receiver',
    category: 'Physical Hardware',
    role: 'Converts incident optical photons into proportional electrical current (photocurrent) for signal processing.',
    specifications: 'Responsivity 0.9 A/W at 1550nm, bandwidth 2.5 GHz, high sensitivity with transimpedance amplifier (TIA).',
    status: 'Required',
    badgeColor: 'border-cyan-500/30 text-cyan-400'
  },
  {
    id: 'mat-4',
    name: 'Optical Power Monitoring Sensor Unit (OPM)',
    category: 'Physical Hardware',
    role: 'Continuously measures optical power level in dBm and optical loss in dB to detect signal attenuation trends.',
    specifications: 'Calibrated range -70 dBm to +10 dBm, 0.01 dB measurement resolution, USB/Serial interface to host.',
    status: 'Required',
    badgeColor: 'border-cyan-500/30 text-cyan-400'
  },
  {
    id: 'mat-5',
    name: 'Data Acquisition (DAQ) & Conditioning Board',
    category: 'Physical Hardware',
    role: 'Samples analog voltage signals from photodetector/OPM and converts them into time-series digital arrays for ML inference.',
    specifications: '16-bit multichannel ADC, 1 MS/s sampling rate, SPI/I2C/UART bus to embedded microcomputer.',
    status: 'Required',
    badgeColor: 'border-cyan-500/30 text-cyan-400'
  },
  {
    id: 'mat-6',
    name: 'Embedded Host / Edge Processing Computer',
    category: 'Physical Hardware',
    role: 'Executes the signal preprocessing algorithms and runs the trained AI/ML fault classification pipeline.',
    specifications: 'Linux/RTOS capable system (e.g. Raspberry Pi 5 / Jetson Nano / Lab PC workstation), 8GB RAM, Gigabit Ethernet.',
    status: 'Required',
    badgeColor: 'border-cyan-500/30 text-cyan-400'
  },
  // Software
  {
    id: 'mat-7',
    name: 'AI/ML Fault Classification Engine (Python Scikit-Learn/PyTorch)',
    category: 'Software & Tools',
    role: 'Extracts time-frequency statistical features (mean, variance, skewness, gradient) and classifies fault signatures.',
    specifications: 'Random Forest / SVM / 1D-CNN classifier trained on optical attenuation & reflection datasets; sub-10ms inference.',
    status: 'Required',
    badgeColor: 'border-purple-500/30 text-purple-400'
  },
  {
    id: 'mat-8',
    name: 'SMARTEX Telemetry Web Application & Monitoring Suite',
    category: 'Software & Tools',
    role: 'Provides real-time interactive visualization, alert notifications, topological routing maps, and 3D simulation.',
    specifications: 'React, TypeScript, Three.js 3D engine, Tailwind CSS, Lucide telecommunications iconography.',
    status: 'Required',
    badgeColor: 'border-purple-500/30 text-purple-400'
  },
  {
    id: 'mat-9',
    name: 'Signal Preprocessing & Wavelet Denoising Toolkit',
    category: 'Software & Tools',
    role: 'Filters Rayleigh backscatter noise and amplifier thermal noise from raw sensor telemetry before inference.',
    specifications: 'Discrete Wavelet Transform (DWT - Daubechies db4), moving average filters, SNR estimation module.',
    status: 'Required',
    badgeColor: 'border-purple-500/30 text-purple-400'
  },
  // Optional / Proposed
  {
    id: 'mat-10',
    name: 'Optical Time-Domain Reflectometer (OTDR)',
    category: 'Optional & Industrial',
    role: 'Sends high-power laser probe pulses to physically pinpoint the exact distance (in meters) of fibre breaks and splices.',
    specifications: 'Dynamic range 36 dB, event dead zone 0.8m, pulse width 3ns to 20µs, industrial diagnostic standard.',
    status: 'Proposed',
    badgeColor: 'border-emerald-500/30 text-emerald-400'
  },
  {
    id: 'mat-11',
    name: 'Variable Optical Attenuator (VOA)',
    category: 'Optional & Industrial',
    role: 'Allows controlled injection of artificial optical loss in the lab testbed to benchmark ML model accuracy across attenuation scales.',
    specifications: 'Attenuation range 0 to 60 dB, step resolution 0.05 dB, return loss >55 dB.',
    status: 'Optional',
    badgeColor: 'border-slate-500/30 text-slate-400'
  },
  {
    id: 'mat-12',
    name: 'Precision Fibre Fusion Splicer & Cleaver',
    category: 'Optional & Industrial',
    role: 'Permanently joins glass optical fibre cores with electric arc welding to minimize insertion loss (<0.02 dB).',
    specifications: 'Core alignment 3-axis motor system, 6-second splice time, heating sleeve shrinkage chamber.',
    status: 'Optional',
    badgeColor: 'border-slate-500/30 text-slate-400'
  }
];

export const SMART_CITY_SERVICES = [
  {
    id: 'traffic',
    title: 'Smart Traffic Management',
    subtitle: 'Adaptive signals & intersections',
    summary: 'Monitors the high-bandwidth optical backhaul feeding real-time intersection controllers and adaptive AI signal timers.',
    example: 'A 4-way arterial corridor relying on 100 Mbps telemetry feeds from inductive loops and radar counters to minimize commuter wait time.',
    fibreFault: 'Microbending in underground road conduits due to heavy vehicle vibrations or asphalt repaving tension.',
    solution: 'Detects gradual 3-5 dB attenuation before the link drops, scheduling scheduled junction maintenance before signals default to safety flashing modes.'
  },
  {
    id: 'cctv',
    title: 'Public Safety & Surveillance',
    subtitle: '4K CCTV feeds & incident dispatch',
    summary: 'Ensures uninterrupted gigabit links carrying low-latency video streams from urban security cameras to police command.',
    example: 'City-wide network of 1,200 ultra-HD PTZ cameras feeding automated license plate recognition (ANPR) and pedestrian density safety models.',
    fibreFault: 'Connector ferrule contamination or loose mating sleeve at outdoor distribution cabinet boxes.',
    solution: 'Recognizes Fresnel back-reflection spikes unique to connector gaps, distinguishing dirty plugs from physical cable cuts.'
  },
  {
    id: 'lighting',
    title: 'Smart Street Lighting',
    subtitle: 'Municipal energy efficiency grid',
    summary: 'Oversees optical control cables synchronizing thousands of dimmable LED luminaires and ambient luminosity sensors.',
    example: 'Centralized midnight dimming schedule adjusting lighting output based on real-time pedestrian presence radar.',
    fibreFault: 'Thermal cycling strain causing micro-stress on aerial drop cables suspended between utility poles.',
    solution: 'Identifies diurnal attenuation fluctuations and flags structural clamp adjustments before physical glass fatigue occurs.'
  },
  {
    id: 'environmental',
    title: 'Environmental & Hydrology Monitoring',
    subtitle: 'Air quality, weather & drainage sensors',
    summary: 'Guarantees reliable data transmission from particulate sensors, storm runoff gauges, and meteorological stations.',
    example: 'Early warning flash-flood telemetry sensors along municipal riverbanks and low-lying underpasses.',
    fibreFault: 'Water ingress into damaged splice trays causing localized refractive index variations and localized attenuation.',
    solution: 'Detects characteristic progressive optical loss profiles associated with moisture ingress, triggering proactive waterproofing.'
  },
  {
    id: 'emergency',
    title: 'Emergency Communication',
    subtitle: 'Fire, paramedic & disaster networks',
    summary: 'Guarantees mission-critical failover connectivity for 911 dispatch centres, hospitals, and disaster coordination units.',
    example: 'Redundant primary fibre ring linking regional trauma centers, municipal fire hubs, and emergency broadcast towers.',
    fibreFault: 'Catastrophic cable cut caused by uncoordinated civil backhoe excavation during road work.',
    solution: 'Instantly classifies a complete signal blackout within 10 milliseconds, triggering automatic optical protection switching (APS) to backup ring.'
  },
  {
    id: 'utilities',
    title: 'Smart Utilities & Grid SCADA',
    subtitle: 'Power substations & smart water distribution',
    summary: 'Protects optical supervisory control and data acquisition (SCADA) telemetry between electrical substations and water reservoirs.',
    example: 'Substation automation bus (IEC 61850 GOOSE messaging) requiring deterministic sub-4ms optical delivery.',
    fibreFault: 'Electromagnetic interference on adjacent hybrid cables or mechanical pinch at distribution transformer entries.',
    solution: 'Provides continuous signal-to-noise ratio (SNR) verification, ensuring mission-critical protection relays never suffer packet loss.'
  }
];

export const APPLICATIONS_DATA = [
  {
    id: 'app-telecom',
    title: 'Telecommunications & Broadband Networks',
    role: 'FTTH (Fiber to the Home), Metro Core & Undersea Cables',
    challenge: 'Massive user traffic, complex optical routing, expensive field technician dispatches for untargeted fault searches.',
    solution: 'Continuous automated monitoring detects early link degradation, reducing Mean Time to Repair (MTTR) by up to 60% without taking live traffic offline.'
  },
  {
    id: 'app-smartcities',
    title: 'Smart Cities Infrastructure',
    role: 'Unified Municipal Fibre Backbone',
    challenge: 'Heterogeneous edge devices (traffic lights, cameras, sensors) distributed across miles of underground and aerial utility conduits.',
    solution: 'Centralized control room interface correlates telemetry across civic sectors, diagnosing whether an outage is a node failure or a physical cable cut.'
  },
  {
    id: 'app-datacenters',
    title: 'Data Centres & Cloud Computing',
    role: 'Inter-datacenter High-density Optical Fabrics',
    challenge: 'Terabit-per-second links where even milliseconds of packet drop or micro-attenuation trigger massive multi-tenant failover penalties.',
    solution: 'Machine learning tracks minute BER and eye-diagram degradation to proactively migrate VM traffic before an optical transceiver fails.'
  },
  {
    id: 'app-industrial',
    title: 'Industrial Automation (Industry 4.0)',
    role: 'Harsh Environment Factory Automation',
    challenge: 'Heavy electromagnetic interference (EMI), robotic arm repetitive flexion, high ambient heat, chemical exposure.',
    solution: 'Optical fibre is immune to EMI, and AI monitoring continuously inspects cyclic mechanical stress on moving robotic gantry fibres.'
  },
  {
    id: 'app-healthcare',
    title: 'Healthcare & Telemedicine Systems',
    role: 'Hospital Campuses & Remote Telesurgery',
    challenge: 'Zero-tolerance for latency jitter or packet loss during high-definition endoscopic video streams and remote surgical robotics.',
    solution: 'Predictive health scoring guarantees that primary and backup optical circuits meet strict biomedical latency criteria at all times.'
  },
  {
    id: 'app-railway',
    title: 'Railway Signalling & High-Speed Transit',
    role: 'Trackside Interlocking & Pantograph Monitoring',
    challenge: 'Vibrations from passing trains, extreme temperature spans across track beds, lightning strikes on trackside towers.',
    solution: 'Differentiates train-induced temporary transient vibrations from permanent structural ballast ground shifts causing fibre kinks.'
  },
  {
    id: 'app-defence',
    title: 'Defence & Strategic Communications',
    role: 'Tactical Command Posts & Perimeter Security',
    challenge: 'Risk of physical optical tapping (cladding bending to leak photons), physical sabotage, covert tampering.',
    solution: 'AI models detect sub-0.1 dB power drops and acoustic signature perturbations characteristic of malicious physical wiretapping attempts.'
  },
  {
    id: 'app-labs',
    title: 'Educational & Research Laboratories',
    role: 'Photonics, Quantum Optics & Computational Physics',
    challenge: 'Student experimentation, varied optical components, necessity of transparent verification of semiconductor physics principles.',
    solution: 'Provides an educational testbed to study Snell’s law, modal dispersion, Fresnel equations, and statistical machine learning in action.'
  }
];

export const BENEFITS_COMPARISON = [
  {
    metric: 'Monitoring Approach',
    traditional: 'Periodic scheduled OTDR sweeps or reactive technician truck roll after customer outage call.',
    aiml: 'Continuous 24/7 telemetry monitoring of optical power, attenuation rate, and waveform dynamics.',
    advantage: 'Real-Time Visibility'
  },
  {
    metric: 'Fault Pattern Identification',
    traditional: 'Manual threshold alerts (e.g. trigger alarm if power drops below -25 dBm), cannot identify root cause.',
    aiml: 'Multi-parameter machine learning recognizes specific fault signatures (macrobend vs dirty ferrule vs cable severance).',
    advantage: 'Root-Cause Classification'
  },
  {
    metric: 'Alert Generation & Latency',
    traditional: 'Delayed by minutes or hours until user reports service interruption; false positives frequent on transients.',
    aiml: 'Instant sub-second classification with calculated confidence score and automated severity escalation.',
    advantage: 'Sub-Second Detection'
  },
  {
    metric: 'Predictive Maintenance Potential',
    traditional: 'Zero predictive capability. Physical failures are resolved only after full link disruption occurs.',
    aiml: 'Identifies progressive degradation trends weeks before service disruption, enabling scheduled maintenance.',
    advantage: 'Proactive Prevention'
  },
  {
    metric: 'Network Scalability',
    traditional: 'Requires specialized manual OTDR hardware on every physical segment, very costly to scale city-wide.',
    aiml: 'Software-driven classification running on edge telemetry nodes, effortlessly scaling to thousands of civic endpoints.',
    advantage: 'Cost-Effective Scaling'
  }
];
