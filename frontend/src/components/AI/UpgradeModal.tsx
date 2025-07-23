import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Badge,
  Icon,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { FiCheck, FiZap, FiStar, FiTrendingUp } from 'react-icons/fi';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: 'free' | 'basic' | 'premium';
  onUpgrade: (plan: 'basic' | 'premium') => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  onUpgrade
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      icon: FiZap,
      color: 'gray',
      tokens: '1,000',
      calls: '5',
      features: [
        'Basic AI analysis',
        'Scenario planning',
        'Email support',
        'Community access'
      ],
      limitations: [
        'Limited API calls',
        'Basic insights only',
        'Standard processing'
      ]
    },
    {
      name: 'Basic',
      price: '$29',
      period: 'per month',
      icon: FiTrendingUp,
      color: 'blue',
      tokens: '10,000',
      calls: '50',
      features: [
        'Advanced AI analysis',
        'Detailed strategic insights',
        'Priority email support',
        'Advanced reporting',
        'Export capabilities',
        'Team collaboration (up to 5 users)'
      ],
      limitations: [],
      popular: true
    },
    {
      name: 'Premium',
      price: '$99',
      period: 'per month',
      icon: FiStar,
      color: 'purple',
      tokens: '100,000',
      calls: '500',
      features: [
        'Unlimited AI analysis',
        'Custom AI models',
        'White-label options',
        'Dedicated account manager',
        'Phone support',
        'Advanced integrations',
        'Unlimited team members',
        'Custom training'
      ],
      limitations: []
    }
  ];

  const handleUpgrade = (planName: string) => {
    if (planName === 'Basic') {
      onUpgrade('basic');
    } else if (planName === 'Premium') {
      onUpgrade('premium');
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} maxW="900px">
        <ModalHeader>
          <Text fontSize="2xl" fontWeight="bold">
            Upgrade Your Plan
          </Text>
          <Text fontSize="md" color="gray.600" fontWeight="normal">
            Choose the plan that best fits your business needs
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <HStack spacing={6} align="stretch" justify="center">
            {plans.map((plan) => (
              <Box
                key={plan.name}
                flex="1"
                p={6}
                border="2px"
                borderColor={plan.name.toLowerCase() === currentPlan ? `${plan.color}.500` : borderColor}
                borderRadius="lg"
                position="relative"
                bg={plan.name.toLowerCase() === currentPlan ? `${plan.color}.50` : 'transparent'}
              >
                {plan.popular && (
                  <Badge
                    position="absolute"
                    top="-10px"
                    left="50%"
                    transform="translateX(-50%)"
                    colorScheme="blue"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    Most Popular
                  </Badge>
                )}
                
                {plan.name.toLowerCase() === currentPlan && (
                  <Badge
                    position="absolute"
                    top="-10px"
                    right="10px"
                    colorScheme="green"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    Current Plan
                  </Badge>
                )}

                <VStack spacing={4} align="stretch" height="100%">
                  <VStack spacing={2}>
                    <Icon as={plan.icon} boxSize={8} color={`${plan.color}.500`} />
                    <Text fontSize="xl" fontWeight="bold">
                      {plan.name}
                    </Text>
                    <HStack>
                      <Text fontSize="3xl" fontWeight="bold">
                        {plan.price}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {plan.period}
                      </Text>
                    </HStack>
                  </VStack>

                  <VStack spacing={2}>
                    <HStack justify="space-between" w="100%">
                      <Text fontSize="sm" color="gray.600">Tokens per session:</Text>
                      <Text fontSize="sm" fontWeight="medium">{plan.tokens}</Text>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text fontSize="sm" color="gray.600">API calls:</Text>
                      <Text fontSize="sm" fontWeight="medium">{plan.calls}</Text>
                    </HStack>
                  </VStack>

                  <Divider />

                  <VStack spacing={2} align="stretch" flex="1">
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Features:
                    </Text>
                    {plan.features.map((feature, index) => (
                      <HStack key={index} spacing={2}>
                        <Icon as={FiCheck} color="green.500" boxSize={4} />
                        <Text fontSize="sm">{feature}</Text>
                      </HStack>
                    ))}
                  </VStack>

                  <Box mt="auto">
                    <Button
                      colorScheme={plan.color}
                      size="lg"
                      width="100%"
                      onClick={() => handleUpgrade(plan.name)}
                      isDisabled={plan.name.toLowerCase() === currentPlan}
                    >
                      {plan.name.toLowerCase() === currentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    </Button>
                  </Box>
                </VStack>
              </Box>
            ))}
          </HStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4}>
            <Text fontSize="sm" color="gray.600">
              All plans include 30-day money-back guarantee
            </Text>
            <Button variant="ghost" onClick={onClose}>
              Maybe Later
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};