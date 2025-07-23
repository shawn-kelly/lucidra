import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { SandboxDashboard } from './SandboxDashboard';
import { WorkflowBuilder } from './WorkflowBuilder';
import { PromptRoutingInterface } from './PromptRoutingInterface';

export type SandboxView = 'dashboard' | 'builder' | 'routing';

interface SandboxMainProps {
  initialView?: SandboxView;
}

export function SandboxMain({ initialView = 'dashboard' }: SandboxMainProps) {
  const [currentView, setCurrentView] = useState<SandboxView>(initialView);
  const [activeMission, setActiveMission] = useState<any>(null);

  const handleNavigateToBuilder = () => {
    setCurrentView('builder');
  };

  const handleNavigateToRouting = (mission: any) => {
    setActiveMission(mission);
    setCurrentView('routing');
  };

  const handleNavigateBack = () => {
    setCurrentView('dashboard');
    setActiveMission(null);
  };

  const handleMissionUpdate = (mission: any) => {
    setActiveMission(mission);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <SandboxDashboard
            onNavigateToBuilder={handleNavigateToBuilder}
          />
        );
      case 'builder':
        return (
          <WorkflowBuilder
            onNavigateBack={handleNavigateBack}
          />
        );
      case 'routing':
        return (
          <PromptRoutingInterface
            mission={activeMission}
            onUpdateMission={handleMissionUpdate}
          />
        );
      default:
        return (
          <SandboxDashboard
            onNavigateToBuilder={handleNavigateToBuilder}
          />
        );
    }
  };

  return (
    <Box>
      {renderCurrentView()}
    </Box>
  );
}