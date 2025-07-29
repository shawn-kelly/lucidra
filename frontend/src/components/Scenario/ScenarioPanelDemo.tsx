import React, { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
  Heading,
  Text,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  Badge,
  useDisclosure,
  Grid,
  GridItem,
  useColorModeValue
} from '@chakra-ui/react';
import { useDemoAIManager } from '../../hooks/useDemoAIManager';
import { TokenMeter } from '../AI/TokenMeter';
import { AIOptInBanner } from '../AI/AIOptInBanner';
import { UpgradeModal } from '../AI/UpgradeModal';

export function ScenarioPanelDemo() {
  const [scenario, setScenario] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [usedAI, setUsedAI] = useState(false);
  
  const {
    usage,
    loading,
    error,
    canUseAI,
    aiStatus,
    optInToAI,
    optOutOfAI,
    analyzeScenario
  } = useDemoAIManager();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = async () => {
    if (!scenario.trim()) return;
    
    setAnalysis("");
    setUsedAI(false);
    
    const result = await analyzeScenario(scenario);
    if (result) {
      setAnalysis(result.ai_analysis);
      setUsedAI(result.usedAI);
    }
  };

  const handleOptIn = async () => {
    await optInToAI();
  };

  const handleOptOut = async () => {
    await optOutOfAI();
  };

  const handleUpgrade = (plan: 'basic' | 'premium') => {
    console.log(`Demo: Would upgrade to ${plan} plan`);
    alert(`Demo Mode: This would redirect to upgrade to ${plan.toUpperCase()} plan`);
  };

  return (
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
      <GridItem>
        <VStack spacing={6} align="stretch">
          {/* Demo Mode Banner */}
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontSize="sm" fontWeight="bold">
                🚀 Demo Mode - Live Preview
              </Text>
              <Text fontSize="xs">
                This is a demonstration of Lucidra's AI activation system. 
                No real API calls are made in this demo.
              </Text>
            </Box>
          </Alert>

          <Box>
            <Heading size="md" mb={4}>Business Scenario Analysis</Heading>
            
            {/* AI Status */}
            {usage && (
              <HStack mb={4} justify="space-between">
                <HStack>
                  <Text fontSize="sm" color="gray.600">AI Status:</Text>
                  <Badge colorScheme={canUseAI ? 'green' : 'red'} variant="subtle">
                    {aiStatus}
                  </Badge>
                </HStack>
                <HStack>
                  {usage.userOptedIn && (
                    <Button size="xs" variant="outline" onClick={handleOptOut}>
                      Disable AI
                    </Button>
                  )}
                </HStack>
              </HStack>
            )}

            {/* Opt-in Banner */}
            {usage && !usage.userOptedIn && (
              <Box mb={4}>
                <AIOptInBanner 
                  onOptIn={handleOptIn} 
                  loading={loading}
                  plan={usage.plan}
                />
              </Box>
            )}

            {/* Error Display */}
            {error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}

            {/* Scenario Input */}
            <VStack spacing={4} align="stretch">
              <Textarea
                value={scenario}
                onChange={e => setScenario(e.target.value)}
                placeholder="Try typing: 'market disruption', 'new technology adoption', or 'financial restructuring'..."
                minH="120px"
                resize="vertical"
              />
              
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">
                  {scenario.length}/1000 characters
                </Text>
                <Button
                  onClick={handleSubmit}
                  isLoading={loading}
                  loadingText="Analyzing..."
                  colorScheme="blue"
                  isDisabled={!scenario.trim() || loading}
                >
                  {canUseAI ? 'Analyze with AI' : 'Analyze Scenario'}
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Analysis Results */}
          {analysis && (
            <Box 
              p={6} 
              bg={bgColor} 
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
            >
              <HStack justify="space-between" mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Analysis Results
                </Text>
                <Badge colorScheme={usedAI ? 'green' : 'blue'} variant="subtle">
                  {usedAI ? 'Demo AI Generated' : 'Demo Coaching Logic'}
                </Badge>
              </HStack>
              
              <Text whiteSpace="pre-wrap" lineHeight="1.6">
                {analysis}
              </Text>
              
              <Alert status="success" mt={4}>
                <AlertIcon />
                <Box>
                  <Text fontSize="sm">
                    <strong>Demo Note:</strong> This analysis demonstrates the AI activation system. 
                    In production, this would connect to Claude AI or use intelligent fallback logic.
                  </Text>
                </Box>
              </Alert>
            </Box>
          )}
        </VStack>
      </GridItem>

      {/* Sidebar */}
      <GridItem>
        <VStack spacing={6} align="stretch">
          {/* Token Meter */}
          {usage && (
            <TokenMeter 
              usage={usage} 
              onUpgrade={onOpen}
              showUpgradeOption={true}
            />
          )}

          {/* Demo Instructions */}
          <Box 
            p={4} 
            bg="blue.50" 
            borderRadius="md"
            border="1px"
            borderColor="blue.200"
          >
            <Text fontSize="sm" fontWeight="semibold" mb={2}>
              🎮 Try the Demo
            </Text>
            <VStack align="stretch" spacing={2}>
              <Text fontSize="xs" color="gray.600">
                1. Click "Enable AI Analysis" to opt-in
              </Text>
              <Text fontSize="xs" color="gray.600">
                2. Type scenarios like "market disruption"
              </Text>
              <Text fontSize="xs" color="gray.600">
                3. Watch token usage update in real-time
              </Text>
              <Text fontSize="xs" color="gray.600">
                4. Test upgrade prompts and fallback logic
              </Text>
            </VStack>
          </Box>

          {/* Quick Tips */}
          <Box 
            p={4} 
            bg={bgColor} 
            borderRadius="md"
            border="1px"
            borderColor={borderColor}
          >
            <Text fontSize="sm" fontWeight="semibold" mb={2}>
              💡 Demo Features
            </Text>
            <VStack align="stretch" spacing={2}>
              <Text fontSize="xs" color="gray.600">
                • Real-time token usage tracking
              </Text>
              <Text fontSize="xs" color="gray.600">
                • Automatic fallback when limits exceeded
              </Text>
              <Text fontSize="xs" color="gray.600">
                • User-friendly opt-in/opt-out controls
              </Text>
              <Text fontSize="xs" color="gray.600">
                • Upgrade prompts and plan comparison
              </Text>
            </VStack>
          </Box>
        </VStack>
      </GridItem>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isOpen}
        onClose={onClose}
        currentPlan={usage?.plan || 'free'}
        onUpgrade={handleUpgrade}
      />
    </Grid>
  );
}