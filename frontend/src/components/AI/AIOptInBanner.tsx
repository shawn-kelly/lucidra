import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Box,
  Icon
} from '@chakra-ui/react';
import { FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';

interface AIOptInBannerProps {
  onOptIn: () => void;
  loading?: boolean;
  plan?: 'free' | 'basic' | 'premium';
}

export const AIOptInBanner: React.FC<AIOptInBannerProps> = ({
  onOptIn,
  loading = false,
  plan = 'free'
}) => {
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('blue.200', 'blue.600');

  const getPlanBenefits = () => {
    switch (plan) {
      case 'free':
        return {
          title: 'Enable AI Analysis',
          description: 'Get AI-powered insights for your business scenarios',
          tokens: '1,000 tokens',
          calls: '5 AI calls',
          features: [
            'Claude AI-powered analysis',
            'Strategic recommendations',
            'Risk assessment'
          ]
        };
      case 'basic':
        return {
          title: 'Enable AI Analysis',
          description: 'Unlock advanced AI features for better business planning',
          tokens: '10,000 tokens',
          calls: '50 AI calls',
          features: [
            'Advanced scenario analysis',
            'Detailed strategic insights',
            'Priority support'
          ]
        };
      case 'premium':
        return {
          title: 'Enable AI Analysis',
          description: 'Access unlimited AI capabilities for enterprise planning',
          tokens: '100,000 tokens',
          calls: '500 AI calls',
          features: [
            'Unlimited AI analysis',
            'Custom AI models',
            'White-label options'
          ]
        };
      default:
        return {
          title: 'Enable AI Analysis',
          description: 'Get AI-powered insights for your business scenarios',
          tokens: '1,000 tokens',
          calls: '5 AI calls',
          features: []
        };
    }
  };

  const benefits = getPlanBenefits();

  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="auto"
      p={6}
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
    >
      <AlertIcon boxSize="40px" mr={0} mb={4} />
      
      <VStack spacing={4} align="center">
        <Box>
          <AlertTitle fontSize="lg" mb={2}>
            {benefits.title}
          </AlertTitle>
          <AlertDescription fontSize="md" maxWidth="500px">
            {benefits.description}
          </AlertDescription>
        </Box>

        <HStack spacing={8} justify="center" flexWrap="wrap">
          <VStack>
            <Icon as={FiZap} boxSize={6} color="blue.500" />
            <Text fontSize="sm" fontWeight="medium">
              {benefits.tokens}
            </Text>
            <Text fontSize="xs" color="gray.600">
              per session
            </Text>
          </VStack>
          <VStack>
            <Icon as={FiTrendingUp} boxSize={6} color="green.500" />
            <Text fontSize="sm" fontWeight="medium">
              {benefits.calls}
            </Text>
            <Text fontSize="xs" color="gray.600">
              API calls
            </Text>
          </VStack>
          <VStack>
            <Icon as={FiShield} boxSize={6} color="purple.500" />
            <Text fontSize="sm" fontWeight="medium">
              Secure
            </Text>
            <Text fontSize="xs" color="gray.600">
              & Private
            </Text>
          </VStack>
        </HStack>

        {benefits.features.length > 0 && (
          <VStack spacing={1}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              What you get:
            </Text>
            {benefits.features.map((feature, index) => (
              <Text key={index} fontSize="xs" color="gray.600">
                • {feature}
              </Text>
            ))}
          </VStack>
        )}

        <Button
          colorScheme="blue"
          size="lg"
          onClick={onOptIn}
          isLoading={loading}
          loadingText="Enabling AI..."
          leftIcon={<Icon as={FiZap} />}
        >
          Enable AI Analysis
        </Button>

        <Text fontSize="xs" color="gray.500" maxWidth="400px">
          By enabling AI analysis, you agree to our terms of service and privacy policy.
          Your data is processed securely and never shared with third parties.
        </Text>
      </VStack>
    </Alert>
  );
};