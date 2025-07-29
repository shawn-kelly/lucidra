import React from 'react';
import { ScenarioPanel } from './ScenarioPanel';
import { ScenarioPanelDemo } from './ScenarioPanelDemo';

// Check if we're in demo mode
const isDemoMode = () => {
  return process.env.REACT_APP_DEMO_MODE === 'true' || 
         process.env.REACT_APP_GITHUB_PAGES === 'true' ||
         (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
};

export const ScenarioPanelWrapper: React.FC = () => {
  if (isDemoMode()) {
    return <ScenarioPanelDemo />;
  }
  
  return <ScenarioPanel />;
};