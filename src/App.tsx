import React, { useState } from 'react';
import { PageId, SimulationState, FaultCondition, AlertItem } from './types';
import { SIMULATION_PRESETS, INITIAL_ALERTS, INITIAL_LINKS } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewPage } from './components/pages/OverviewPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { Model3DPage } from './components/pages/Model3DPage';
import { MaterialsPage } from './components/pages/MaterialsPage';
import { SmartCitiesPage } from './components/pages/SmartCitiesPage';
import { ApplicationsPage } from './components/pages/ApplicationsPage';
import { BenefitsPage } from './components/pages/BenefitsPage';
import { AboutPage } from './components/pages/AboutPage';
import { CheckCircle2, AlertTriangle, Flame, Info, X } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'info' | 'success' | 'warning' } | null>(null);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  // Initialize unified simulation state
  const [simulationState, setSimulationState] = useState<SimulationState>({
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
      fresnelReflectivity: -52.4,
    },
    recentAlerts: INITIAL_ALERTS,
    links: INITIAL_LINKS,
  });

  const showToast = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 3500);
  };

  const handleSetCondition = (condition: FaultCondition) => {
    const preset = SIMULATION_PRESETS[condition];
    if (!preset) return;

    let updatedAlerts = [...simulationState.recentAlerts];
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (condition === 'bending') {
      const newAlert: AlertItem = {
        id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp,
        linkId: 'L2 (Boulevard Link)',
        sourceNode: 'Central Control Hub',
        targetNode: 'Boulevard HD CCTV (Node-B)',
        suspectedFault: 'Macrobending Induced Attenuation',
        severity: 'medium',
        powerDbm: -21.8,
        status: 'Classified',
        actionRecommended: 'Inspect conduit bend radius at manhole junction MH-04',
      };
      updatedAlerts = [newAlert, ...updatedAlerts.slice(0, 5)];
      showToast('Simulated Condition: Bending Loss applied (-21.8 dBm)', 'warning');
    } else if (condition === 'connector') {
      const newAlert: AlertItem = {
        id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp,
        linkId: 'L3 (Lighting Link)',
        sourceNode: 'Central Control Hub',
        targetNode: 'Streetlight Grid (Node-C)',
        suspectedFault: 'Connector Ferrule Dust / Air Gap',
        severity: 'medium',
        powerDbm: -27.5,
        status: 'Classified',
        actionRecommended: 'Clean fiber endface on distribution patch panel',
      };
      updatedAlerts = [newAlert, ...updatedAlerts.slice(0, 5)];
      showToast('Simulated Condition: Connector Gap Fault applied (-27.5 dBm)', 'warning');
    } else if (condition === 'severeloss') {
      const newAlert: AlertItem = {
        id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp,
        linkId: 'L1 (Traffic Link)',
        sourceNode: 'Central Control Hub',
        targetNode: 'Metro Junction (Node-A)',
        suspectedFault: 'Severe Signal Loss / Cable Cut',
        severity: 'critical',
        powerDbm: -48.2,
        status: 'Investigating',
        actionRecommended: 'Dispatch field splicer unit to inspect civil trench line',
      };
      updatedAlerts = [newAlert, ...updatedAlerts.slice(0, 5)];
      showToast('Simulated Condition: Severe Loss / Possible Cable Cut (-48.2 dBm)', 'warning');
    } else {
      showToast('Restored Nominal Transmission parameters (-12.4 dBm)', 'success');
    }

    setSimulationState((prev) => ({
      ...prev,
      ...preset,
      condition,
      recentAlerts: updatedAlerts,
    }));
  };

  const handleRunFaultDetection = () => {
    const classification = simulationState.mlClassification;
    const confidence = simulationState.mlConfidence;
    showToast(`AI/ML Inference: ${classification} (${confidence}% confidence)`, 'info');
  };

  const handleResetSimulation = () => {
    handleSetCondition('normal');
    showToast('Telemetry and network baseline successfully reset.', 'success');
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'overview':
        return <OverviewPage onNavigate={(p) => setActivePage(p)} />;
      case 'dashboard':
        return (
          <DashboardPage
            state={simulationState}
            onSetCondition={handleSetCondition}
            onRunFaultDetection={handleRunFaultDetection}
            onResetSimulation={handleResetSimulation}
          />
        );
      case 'model3d':
        return (
          <Model3DPage
            currentCondition={simulationState.condition}
            onSetCondition={handleSetCondition}
          />
        );
      case 'materials':
        return <MaterialsPage />;
      case 'smartcities':
        return <SmartCitiesPage />;
      case 'applications':
        return <ApplicationsPage />;
      case 'benefits':
        return <BenefitsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <OverviewPage onNavigate={(p) => setActivePage(p)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onSelectPage={(p) => setActivePage(p)}
        isOpenMobile={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <Header
          activePage={activePage}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          simulationState={simulationState}
          onSetCondition={handleSetCondition}
          onRunFaultDetection={handleRunFaultDetection}
          onResetSimulation={handleResetSimulation}
          onShareOrExport={() => setShowShareModal(true)}
        />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Toast Notification Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-cyan-500/50 text-white text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          {toastMessage.type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0" />}
          <span className="font-medium">{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-slate-400 hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Exhibition Info Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#081224] border border-cyan-800/60 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Project Information &amp; Metadata</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-white">Title:</strong> Optical Fibre Communication with AI/ML-Based Fault Detection</p>
              <p><strong className="text-white">Platform Name:</strong> SMARTEX</p>
              <p><strong className="text-white">Institution:</strong> SRM Institute of Science and Technology, Tiruchirappalli</p>
              <p><strong className="text-white">Course:</strong> Semiconductor Physics and Computational Methods</p>
              <p><strong className="text-white">Degree:</strong> B.Tech CSE – Artificial Intelligence and Machine Learning</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
