import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Badge,
  List,
  ListItem,
  ListIcon,
  Switch,
  Alert,
  AlertIcon,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckIcon, StarIcon } from '@chakra-ui/icons';

/**
 * PricingTiers - E-commerce ready subscription tiers with payment options
 * 
 * Features:
 * - Monthly/Annual billing toggle
 * - Multiple payment methods
 * - Professional pricing display
 * - Feature comparison
 * - Call-to-action buttons
 */

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  color: string;
  features: string[];
  limitations: string[];
  popular?: boolean;
  cta: string;
  maxUsers: number;
  maxProjects: number;
  support: string;
}

interface PricingTiersProps {
  onSelectTier: (tier: PricingTier, billing: 'monthly' | 'annual') => void;
  currentTier?: string;
  className?: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'lite',
    name: 'Lucidra Lite',
    description: 'Perfect for solo entrepreneurs and small startups',
    monthlyPrice: 29,
    annualPrice: 290, // 2 months free
    color: 'teal',
    features: [
      'Business Model Canvas',
      'Market Intelligence Dashboard',
      'Basic Strategy Frameworks (2)',
      'Startup Stage Selector',
      'Goal Tracking & Gamification',
      'Basic Analytics',
      'Email Support',
      'Mobile App Access'
    ],
    limitations: [
      'Limited to 1 user',
      'Maximum 3 projects',
      'Basic strategy frameworks only',
      'Standard support response time'
    ],
    cta: 'Start Free Trial',
    maxUsers: 1,
    maxProjects: 3,
    support: 'Email Support'
  },
  {
    id: 'pro',
    name: 'Lucidra Pro',
    description: 'For growing teams and strategic consultants',
    monthlyPrice: 99,
    annualPrice: 990, // 2 months free
    color: 'purple',
    features: [
      'All Lite Features',
      'Advanced Strategy Frameworks (6)',
      'Data Pulse Intelligence',
      'Orchestration Sandbox',
      'Team Collaboration Tools',
      'Advanced Analytics & Reporting',
      'API Access',
      'Priority Support',
      'Custom Integrations',
      'Export & Sharing Tools'
    ],
    limitations: [
      'Up to 10 users',
      'Maximum 25 projects',
      'Advanced features included'
    ],
    popular: true,
    cta: 'Start Pro Trial',
    maxUsers: 10,
    maxProjects: 25,
    support: 'Priority Support'
  },
  {
    id: 'enterprise',
    name: 'Lucidra Enterprise',
    description: 'For large organizations and enterprise clients',
    monthlyPrice: 299,
    annualPrice: 2990, // 2 months free
    color: 'blue',
    features: [
      'All Pro Features',
      'Unlimited Users',
      'Unlimited Projects',
      'Custom Strategy Frameworks',
      'White-label Solution',
      'Advanced Security & Compliance',
      'Dedicated Account Manager',
      'Custom Training & Onboarding',
      'SLA Guarantees',
      'On-premise Deployment Option'
    ],
    limitations: [
      'Unlimited users and projects',
      'Full feature access',
      'Premium support included'
    ],
    cta: 'Contact Sales',
    maxUsers: 999,
    maxProjects: 999,
    support: 'Dedicated Support'
  }
];

const PricingTiers: React.FC<PricingTiersProps> = ({ 
  onSelectTier, 
  currentTier,
  className = '' 
}) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string | null>(currentTier || null);

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier.id);
    onSelectTier(tier, isAnnual ? 'annual' : 'monthly');
  };

  const getPrice = (tier: PricingTier) => {
    return isAnnual ? tier.annualPrice : tier.monthlyPrice;
  };

  const getSavings = (tier: PricingTier) => {
    if (!isAnnual) return 0;
    return (tier.monthlyPrice * 12) - tier.annualPrice;
  };

  return (
    <Box className={className} maxW="7xl" mx="auto">
      {/* Header */}
      <VStack spacing={6} textAlign="center" mb={12}>
        <Text fontSize="4xl" fontWeight="bold">
          Choose Your Lucidra Plan
        </Text>
        <Text fontSize="xl" color="gray.600" maxW="2xl">
          Transform your strategic planning with our comprehensive intelligence platform
        </Text>
        
        {/* Billing Toggle */}
        <HStack spacing={4} p={2} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="lg">
          <Text fontSize="sm" color={!isAnnual ? 'gray.900' : 'gray.500'}>
            Monthly
          </Text>
          <Switch
            isChecked={isAnnual}
            onChange={(e) => setIsAnnual(e.target.checked)}
            size="lg"
            colorScheme="purple"
          />
          <Text fontSize="sm" color={isAnnual ? 'gray.900' : 'gray.500'}>
            Annual
          </Text>
          <Badge colorScheme="green" ml={2}>
            Save up to 17%
          </Badge>
        </HStack>
      </VStack>

      {/* Pricing Cards */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} mb={12}>
        {PRICING_TIERS.map((tier) => (
          <GridItem key={tier.id}>
            <Card
              bg={cardBg}
              border="2px"
              borderColor={selectedTier === tier.id ? `${tier.color}.500` : borderColor}
              position="relative"
              h="full"
              _hover={{ shadow: 'xl', borderColor: `${tier.color}.300` }}
              transition="all 0.2s"
            >
              {/* Popular Badge */}
              {tier.popular && (
                <Box
                  position="absolute"
                  top="-12px"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="purple.500"
                  color="white"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  <StarIcon mr={1} /> Most Popular
                </Box>
              )}

              <CardHeader textAlign="center" pb={4}>
                <Badge colorScheme={tier.color} fontSize="md" p={2} mb={3}>
                  {tier.name}
                </Badge>
                <Text fontSize="lg" color="gray.600" mb={4}>
                  {tier.description}
                </Text>
                
                {/* Pricing */}
                <VStack spacing={1}>
                  <HStack align="baseline" justify="center">
                    <Text fontSize="4xl" fontWeight="bold">
                      ${getPrice(tier)}
                    </Text>
                    <Text fontSize="lg" color="gray.500">
                      /{isAnnual ? 'year' : 'month'}
                    </Text>
                  </HStack>
                  
                  {isAnnual && getSavings(tier) > 0 && (
                    <Text fontSize="sm" color="green.500">
                      Save ${getSavings(tier)}/year
                    </Text>
                  )}
                  
                  {!isAnnual && (
                    <Text fontSize="sm" color="gray.500">
                      or ${tier.annualPrice}/year
                    </Text>
                  )}
                </VStack>
              </CardHeader>

              <CardBody pt={0}>
                <VStack spacing={4} align="stretch">
                  {/* Call to Action */}
                  <Button
                    colorScheme={tier.color}
                    size="lg"
                    onClick={() => handleSelectTier(tier)}
                    isDisabled={selectedTier === tier.id}
                    variant={selectedTier === tier.id ? "solid" : "outline"}
                  >
                    {selectedTier === tier.id ? 'Current Plan' : tier.cta}
                  </Button>

                  <Divider />

                  {/* Features */}
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={3}>
                      Everything included:
                    </Text>
                    <List spacing={2}>
                      {tier.features.map((feature, index) => (
                        <ListItem key={index} fontSize="sm">
                          <ListIcon as={CheckIcon} color="green.500" />
                          {feature}
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Divider />

                  {/* Plan Details */}
                  <VStack spacing={2} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Users:</Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {tier.maxUsers === 999 ? 'Unlimited' : `Up to ${tier.maxUsers}`}
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Projects:</Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {tier.maxProjects === 999 ? 'Unlimited' : `Up to ${tier.maxProjects}`}
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Support:</Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {tier.support}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>

      {/* Additional Information */}
      <VStack spacing={6} textAlign="center">
        <Alert status="info" maxW="4xl" mx="auto">
          <AlertIcon />
          <Box>
            <Text fontSize="sm">
              <strong>30-day money-back guarantee</strong> • All plans include free SSL, 99.9% uptime SLA, and GDPR compliance
            </Text>
          </Box>
        </Alert>

        <Text fontSize="sm" color="gray.500">
          Need a custom solution? <Button variant="link" colorScheme="purple">Contact our sales team</Button> for enterprise pricing and features.
        </Text>
      </VStack>
    </Box>
  );
};

export default PricingTiers;