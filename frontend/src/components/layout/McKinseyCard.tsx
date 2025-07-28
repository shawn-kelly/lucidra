import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  HStack,
  VStack,
  Icon,
  Badge,
  Button,
  Progress,
  useColorModeValue,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiTrendingUp, FiArrowRight, FiClock, FiUsers } from 'react-icons/fi';

interface McKinseyCardProps {
  title: string;
  description?: string;
  icon?: IconType;
  status?: 'active' | 'beta' | 'coming-soon' | 'completed';
  progress?: number;
  category?: string;
  metrics?: {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }[];
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'insight';
  size?: 'sm' | 'md' | 'lg';
}

const McKinseyCard: React.FC<McKinseyCardProps> = ({
  title,
  description,
  icon,
  status = 'active',
  progress,
  category,
  metrics,
  actions,
  onClick,
  children,
  variant = 'default',
  size = 'md',
}) => {
  const cardBg = useColorModeValue('white', 'mckinsey.gray.800');
  const borderColor = useColorModeValue('mckinsey.gray.200', 'mckinsey.gray.600');
  const hoverBg = useColorModeValue('mckinsey.gray.50', 'mckinsey.gray.700');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'mckinsey.teal';
      case 'completed': return 'mckinsey.green';
      case 'beta': return 'mckinsey.orange';
      case 'coming-soon': return 'mckinsey.gray';
      default: return 'mckinsey.gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'beta': return 'Beta';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Unknown';
    }
  };

  const getCardVariant = () => {
    switch (variant) {
      case 'elevated': return 'mckinseyElevated';
      case 'outlined': return 'outline';
      case 'insight': return 'mckinsey';
      default: return 'mckinsey';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm': return { header: 4, body: 4 };
      case 'lg': return { header: 6, body: 6 };
      default: return { header: 5, body: 5 };
    }
  };

  const padding = getPadding();

  return (
    <Card
      variant={getCardVariant()}
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
      transition="all 0.2s ease"
      _hover={onClick ? {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(27, 54, 93, 0.12)',
        bg: hoverBg,
      } : {}}
      h="full"
    >
      <CardHeader pb={description || children ? 2 : padding.header}>
        <VStack spacing={3} align="stretch">
          {/* Header Row */}
          <HStack justify="space-between" align="start">
            <HStack spacing={3} flex={1}>
              {icon && (
                <Box
                  p={2}
                  bg="mckinsey.primary.50"
                  borderRadius="6px"
                  color="mckinsey.primary.500"
                >
                  <Icon as={icon} boxSize={size === 'lg' ? 6 : 5} />
                </Box>
              )}
              <VStack align="start" spacing={0} flex={1}>
                <Text
                  fontSize={size === 'lg' ? 'xl' : 'lg'}
                  fontWeight="700"
                  color="mckinsey.primary.500"
                  lineHeight="1.3"
                >
                  {title}
                </Text>
                {category && (
                  <Text fontSize="xs" color="mckinsey.gray.500" textTransform="uppercase" letterSpacing="0.5px">
                    {category}
                  </Text>
                )}
              </VStack>
            </HStack>
            
            <VStack spacing={2} align="end">
              <Badge colorScheme={getStatusColor(status)} variant="subtle" size="sm">
                {getStatusLabel(status)}
              </Badge>
              {progress !== undefined && (
                <HStack spacing={2} minW="80px">
                  <Progress
                    value={progress}
                    size="sm"
                    flex={1}
                    colorScheme={getStatusColor(status)}
                    borderRadius="full"
                  />
                  <Text fontSize="xs" color="mckinsey.gray.600" minW="30px">
                    {progress}%
                  </Text>
                </HStack>
              )}
            </VStack>
          </HStack>

          {/* Description */}
          {description && (
            <Text
              color="mckinsey.gray.600"
              fontSize={size === 'lg' ? 'md' : 'sm'}
              lineHeight="1.5"
            >
              {description}
            </Text>
          )}
        </VStack>
      </CardHeader>

      {/* Body Content */}
      {(children || metrics) && (
        <CardBody pt={0} pb={padding.body}>
          <VStack spacing={4} align="stretch">
            {children}
            
            {/* Metrics */}
            {metrics && metrics.length > 0 && (
              <Box>
                <Divider mb={3} />
                <VStack spacing={2} align="stretch">
                  {metrics.map((metric, index) => (
                    <HStack key={index} justify="space-between">
                      <Text fontSize="sm" color="mckinsey.gray.600">
                        {metric.label}
                      </Text>
                      <HStack spacing={1}>
                        <Text fontSize="sm" fontWeight="600" color="mckinsey.gray.700">
                          {metric.value}
                        </Text>
                        {metric.trend && (
                          <Icon
                            as={FiTrendingUp}
                            boxSize={3}
                            color={
                              metric.trend === 'up' 
                                ? 'mckinsey.green' 
                                : metric.trend === 'down' 
                                ? 'mckinsey.red' 
                                : 'mckinsey.gray.400'
                            }
                            transform={metric.trend === 'down' ? 'rotate(180deg)' : 'none'}
                          />
                        )}
                      </HStack>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </CardBody>
      )}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <Box p={padding.body} pt={0}>
          <Divider mb={3} />
          <Flex gap={2} flexWrap="wrap">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant === 'primary' ? 'mckinsey' : 'mckinseyOutline'}
                size="sm"
                onClick={action.onClick}
                rightIcon={<FiArrowRight />}
                flex={actions.length === 1 ? 1 : 'none'}
              >
                {action.label}
              </Button>
            ))}
          </Flex>
        </Box>
      )}
    </Card>
  );
};

export default McKinseyCard;