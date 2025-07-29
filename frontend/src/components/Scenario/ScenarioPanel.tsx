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
            <VStack align="stretch" spacing={4} mb={6}>
              <HStack justify="space-between" align="center">
                <Heading size="md">Strategic Scenario Analysis</Heading>
                <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                  AI-Powered Intelligence
                </Badge>
              </HStack>
              <Text fontSize="sm" color="gray.600" lineHeight="1.5">
                Transform complex business challenges into actionable strategic insights through 
                Lucidra's modular framework and AI-powered analysis.
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Badge colorScheme="blue" variant="outline" fontSize="xs">
                  Strategic Planning
                </Badge>
                <Badge colorScheme="green" variant="outline" fontSize="xs">
                  Risk Assessment
                </Badge>
                <Badge colorScheme="purple" variant="outline" fontSize="xs">
                  Opportunity Mapping
                </Badge>
                <Badge colorScheme="orange" variant="outline" fontSize="xs">
                  Decision Support
                </Badge>
              </HStack>
            </VStack>
            
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
              <VStack align="stretch" spacing={2}>
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Strategic Scenario Input
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Describe your organizational challenge with context, stakeholders, and strategic objectives
                </Text>
              </VStack>
              <Textarea
                value={scenario}
                onChange={e => setScenario(e.target.value)}
                placeholder="Example: We're facing increased competition from tech-enabled disruptors in our traditional market. Our customers are demanding digital solutions while our infrastructure remains largely analog. Key stakeholders include our board, legacy customers, and new customer segments. Strategic objectives include market share retention, digital transformation, and sustainable growth..."
                minH="150px"
                resize="vertical"
                borderColor="gray.300"
                _focus={{
                  borderColor: "teal.400",
                  boxShadow: "0 0 0 1px #4FD1C7"
                }}
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
              position="relative"
              overflow="hidden"
            >
              {/* Strategic clarity gradient overlay */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                height="4px"
                bgGradient="linear(to-r, #1FE0C4, #6C75F8)"
                opacity="0.8"
              />
              
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between" mb={2}>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">
                      Strategic Analysis
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Organizational challenge transformed into actionable insights
                    </Text>
                  </VStack>
                  <VStack align="end" spacing={1}>
                    <Badge colorScheme={usedAI ? 'green' : 'blue'} variant="subtle">
                      {usedAI ? 'AI-Powered' : 'Coaching Framework'}
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {usedAI ? 'Advanced Intelligence' : 'Strategic Logic'}
                    </Text>
                  </VStack>
                </HStack>
                
                <Box 
                  p={4} 
                  bg="white" 
                  borderRadius="md" 
                  border="1px" 
                  borderColor="gray.100"
                  shadow="sm"
                >
                  <Text whiteSpace="pre-wrap" lineHeight="1.7" color="gray.700">
                    {analysis}
                  </Text>
                </Box>
                
                {!usedAI && (
                  <Alert status="info" variant="left-accent" borderRadius="md">
                    <AlertIcon />
                    <Box>
                      <Text fontSize="sm" fontWeight="medium">
                        Strategic Coaching Active
                      </Text>
                      <Text fontSize="xs" color="gray.600" mt={1}>
                        {usage?.userOptedIn 
                          ? 'AI quota exceeded - fallback coaching provides structured strategic guidance' 
                          : 'Enable AI for advanced strategic intelligence and personalized insights'}
                      </Text>
                    </Box>
                  </Alert>
                )}
                
                {usedAI && (
                  <HStack spacing={2} justify="center" opacity="0.7">
                    <Text fontSize="xs" color="gray.500">
                      Powered by Lucidra Strategic Intelligence
                    </Text>
                    <Box w="4px" h="4px" bg="teal.400" borderRadius="full" />
                    <Text fontSize="xs" color="gray.500">
                      AI-Enhanced Analysis
                    </Text>
                  </HStack>
                )}
              </VStack>
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
