import React from 'react';
import {
  Box,
  Progress,
  Text,
  VStack,
  HStack,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { AIUsage } from '../../hooks/useAIManager';

interface TokenMeterProps {
  usage: AIUsage;
  onUpgrade?: () => void;
  showUpgradeOption?: boolean;
}

export const TokenMeter: React.FC<TokenMeterProps> = ({ 
  usage, 
  onUpgrade, 
  showUpgradeOption = true 
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'red';
    if (percentage >= 70) return 'orange';
    if (percentage >= 50) return 'yellow';
    return 'green';
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'gray';
      case 'basic': return 'blue';
      case 'premium': return 'purple';
      default: return 'gray';
    }
  };

  const shouldShowUpgrade = () => {
    return showUpgradeOption && (
      usage.tokenUsagePercentage >= 80 || 
      usage.callUsagePercentage >= 80 ||
      !usage.isAiEnabled
    );
  };

  const getUpgradeMessage = () => {
    if (!usage.isAiEnabled) {
      return "AI analysis is currently disabled. Enable it to get AI-powered insights.";
    }
    if (usage.tokenUsagePercentage >= 90 || usage.callUsagePercentage >= 90) {
      return "You're running low on AI capacity. Consider upgrading for unlimited access.";
    }
    return "Get more AI capacity with our premium plans.";
  };

  return (
    <Box
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      p={4}
      shadow="sm"
    >
      <VStack align="stretch" spacing={4}>
        {/* Header */}
        <HStack justify="space-between" align="center">
          <Text fontSize="md" fontWeight="semibold">
            AI Usage
          </Text>
          <Badge colorScheme={getPlanBadgeColor(usage.plan)} variant="subtle">
            {usage.plan.toUpperCase()}
          </Badge>
        </HStack>

        {/* Token Usage */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.600">
              Tokens Used
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {usage.tokensUsed.toLocaleString()} / {usage.tokensLimit.toLocaleString()}
            </Text>
          </HStack>
          <Progress
            value={usage.tokenUsagePercentage}
            colorScheme={getProgressColor(usage.tokenUsagePercentage)}
            size="sm"
            borderRadius="full"
          />
          <Text fontSize="xs" color="gray.500" mt={1}>
            {usage.tokensRemaining.toLocaleString()} tokens remaining
          </Text>
        </Box>

        {/* API Calls Usage */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.600">
              API Calls Used
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {usage.callsUsed} / {usage.callsLimit}
            </Text>
          </HStack>
          <Progress
            value={usage.callUsagePercentage}
            colorScheme={getProgressColor(usage.callUsagePercentage)}
            size="sm"
            borderRadius="full"
          />
          <Text fontSize="xs" color="gray.500" mt={1}>
            {usage.callsRemaining} calls remaining
          </Text>
        </Box>

        {/* Status */}
        <HStack>
          <Text fontSize="sm" color="gray.600">
            Status:
          </Text>
          <Badge
            colorScheme={usage.isAiEnabled ? 'green' : 'red'}
            variant="subtle"
          >
            {usage.isAiEnabled ? 'Active' : 'Disabled'}
          </Badge>
        </HStack>

        {/* Upgrade Alert */}
        {shouldShowUpgrade() && (
          <Alert status="info" borderRadius="md" size="sm">
            <AlertIcon />
            <Box>
              <AlertTitle fontSize="sm">Upgrade Available</AlertTitle>
              <AlertDescription fontSize="xs">
                {getUpgradeMessage()}
              </AlertDescription>
              {onUpgrade && (
                <Button
                  size="xs"
                  colorScheme="blue"
                  variant="outline"
                  mt={2}
                  onClick={onUpgrade}
                >
                  Upgrade Now
                </Button>
              )}
            </Box>
          </Alert>
        )}

        {/* Session Info */}
        <Box pt={2} borderTop="1px" borderColor={borderColor}>
          <Text fontSize="xs" color="gray.500">
            Session: {usage.sessionId.slice(-8)}...
          </Text>
          <Text fontSize="xs" color="gray.500">
            Last used: {new Date(usage.lastUsedAt).toLocaleString()}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};