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
import { useAIManager } from '../../hooks/useAIManager';
import { TokenMeter } from '../AI/TokenMeter';
import { AIOptInBanner } from '../AI/AIOptInBanner';
import { UpgradeModal } from '../AI/UpgradeModal';

export function ScenarioPanel() {
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
  } = useAIManager();

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
    // In a real app, this would redirect to payment processing
    console.log(`Upgrading to ${plan} plan`);
    // You would integrate with Stripe, PayPal, etc. here
  };

  return (
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
      <GridItem>
        <VStack spacing={6} align="stretch">
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
                placeholder="Describe a strategic scenario (e.g., market disruption, competitor action, new technology adoption, organizational change)..."
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
                  {usedAI ? 'AI Generated' : 'Coaching Logic'}
                </Badge>
              </HStack>
              
              <Text whiteSpace="pre-wrap" lineHeight="1.6">
                {analysis}
              </Text>
              
              {!usedAI && (
                <Alert status="info" mt={4}>
                  <AlertIcon />
                  <Box>
                    <Text fontSize="sm">
                      This analysis was generated using our fallback coaching logic. 
                      {usage?.userOptedIn ? ' AI quota may be exceeded.' : ' Enable AI for more detailed insights.'}
                    </Text>
                  </Box>
                </Alert>
              )}
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

          {/* Quick Tips */}
          <Box 
            p={4} 
            bg={bgColor} 
            borderRadius="md"
            border="1px"
            borderColor={borderColor}
          >
            <Text fontSize="sm" fontWeight="semibold" mb={2}>
              💡 Quick Tips
            </Text>
            <VStack align="stretch" spacing={2}>
              <Text fontSize="xs" color="gray.600">
                • Be specific about your scenario context
              </Text>
              <Text fontSize="xs" color="gray.600">
                • Include relevant stakeholders and constraints
              </Text>
              <Text fontSize="xs" color="gray.600">
                • Consider both risks and opportunities
              </Text>
              <Text fontSize="xs" color="gray.600">
                • Think about short and long-term impacts
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
