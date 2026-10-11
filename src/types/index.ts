export type PageId = 
  | 'overview' 
  | 'dashboard' 
  | 'model3d' 
  | 'materials' 
  | 'smartcities' 
  | 'applications' 
  | 'benefits' 
  | 'about';

export type FaultCondition = 'normal' | 'bending' | 'connector' | 'severeloss';

export type AlertSeverity = 'nominal' | 'low' | 'medium' | 'high' | 'critical';

export interface AlertItem {
  id: string;
  timestamp: string;
  linkId: string;
  sourceNode: string;
  targetNode: string;
  suspectedFault: string;
  severity: AlertSeverity;
  powerDbm: number;
  status: 'Investigating' | 'Classified' | 'Resolved' | 'Normal';
  actionRecommended: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  category: 'control' | 'traffic' | 'cctv' | 'lighting' | 'sensor' | 'datacenter';
  x: number;
  y: number;
  status: 'nominal' | 'warning' | 'fault';
  powerDbm: number;
  attenuationDb: number;
}

export interface NetworkLink {
  id: string;
  source: string;
  target: string;
  lengthKm: number;
  status: 'nominal' | 'warning' | 'fault';
  attenuationRate: number; // dB/km
}

export interface SimulationState {
  condition: FaultCondition;
  opticalPowerDbm: number;
  attenuationDb: number;
  delayMs: number;
  totalLinks: number;
  suspectedFaults: number;
  healthPercent: number;
  snrDb: number;
  ber: string; // e.g. "1.2 x 10^-9"
  status: 'Normal' | 'Warning' | 'Fault Detected';
  mlClassification: string;
  mlConfidence: number;
  mlFeatureVector: {
    meanPowerDbm: number;
    variance: number;
    gradientDbmPerSec: number;
    kurtosis: number;
    fresnelReflectivity: number;
  };
  recentAlerts: AlertItem[];
  links: NetworkLink[];
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'Physical Hardware' | 'Software & Tools' | 'Optional & Industrial';
  role: string;
  specifications: string;
  status: 'Required' | 'Optional' | 'Proposed';
  badgeColor: string;
}
