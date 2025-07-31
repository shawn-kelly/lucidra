import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Badge,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Divider,
  Tooltip,
  Progress,
  useColorModeValue
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronLeftIcon, ChevronRightIcon, SettingsIcon } from '@chakra-ui/icons';
import EnhancedVoiceSystem from './EnhancedVoiceSystem';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  view: string;
  description: string;
  tier: 'lite' | 'pro' | 'enterprise' | 'all';
  category: 'core' | 'strategy' | 'operations' | 'analytics' | 'admin';
}

interface AIGuideSettings {
  enabled: boolean;
  voice: 'male' | 'female';
  accent: 'american' | 'british' | 'australian' | 'canadian' | 'neutral';
  speed: number;
  volume: number;
  proactiveHelp: boolean;
}

interface MinimalistLayoutProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentTier: 'lite' | 'pro' | 'enterprise';
  children: React.ReactNode;
  companyName?: string;
  userName?: string;
  onLogout?: () => void;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  // Core Features
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '🏠',
    view: 'dashboard',
    description: 'Main overview and key metrics',
    tier: 'all',
    category: 'core'
  },
  {
    id: 'business-model',
    label: 'Business Model',
    icon: '🎯',
    view: 'business-model-canvas',
    description: 'Interactive business model canvas',
    tier: 'all',
    category: 'core'
  },
  
  // Strategy Frameworks
  {
    id: 'competitive-strategy',
    label: 'Competitive Strategy',
    icon: '⚔️',
    view: 'competitive-strategy',
    description: 'Porter\'s competitive analysis',
    tier: 'all',
    category: 'strategy'
  },
  {
    id: 'blue-ocean',
    label: 'Blue Ocean',
    icon: '🌊',
    view: 'blue-ocean-strategy',
    description: 'Value innovation framework',
    tier: 'pro',
    category: 'strategy'
  },
  {
    id: 'value-chain',
    label: 'Value Chain',
    icon: '🔗',
    view: 'value-chain',
    description: 'Porter\'s value chain analysis',
    tier: 'pro',
    category: 'strategy'
  },
  
  // Operations
  {
    id: 'process-management',
    label: 'Process Management',
    icon: '🔄',
    view: 'process-management',
    description: 'BPMN process design & optimization',
    tier: 'all',
    category: 'operations'
  },
  {
    id: 'project-management',
    label: 'Project Management',
    icon: '📊',
    view: 'project-management',
    description: 'Resource planning & execution',
    tier: 'all',
    category: 'operations'
  },
  {
    id: 'abc-costing',
    label: 'ABC Costing',
    icon: '💰',
    view: 'abc-costing',
    description: 'Activity-based cost analysis',
    tier: 'pro',
    category: 'operations'
  },
  
  // Analytics
  {
    id: 'market-intelligence',
    label: 'Market Intelligence',
    icon: '📡',
    view: 'market-intelligence',
    description: 'Real-time market signals',
    tier: 'all',
    category: 'analytics'
  },
  {
    id: 'financial-frameworks',
    label: 'Financial Analysis',
    icon: '📈',
    view: 'financial-frameworks',
    description: 'DuPont, NPV, IRR analysis',
    tier: 'pro',
    category: 'analytics'
  },
  {
    id: 'video-generator',
    label: 'AI Video',
    icon: '🎬',
    view: 'video-generator',
    description: 'AI-powered video creation',
    tier: 'all',
    category: 'analytics'
  },
  
  // Admin
  {
    id: 'company-admin',
    label: 'Company Admin',
    icon: '🏢',
    view: 'company-admin',
    description: 'User & permission management',
    tier: 'pro',
    category: 'admin'
  },
  {
    id: 'pricing',
    label: 'Pricing & Plans',
    icon: '💳',
    view: 'pricing',
    description: 'Subscription management',
    tier: 'all',
    category: 'admin'
  }
];

const MinimalistLayout: React.FC<MinimalistLayoutProps> = ({
  currentView,
  setCurrentView,
  currentTier,
  children,
  companyName = "Your Company",
  userName = "User",
  onLogout
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiGuideSettings, setAiGuideSettings] = useState<AIGuideSettings>({
    enabled: true,
    voice: 'female',
    accent: 'american',
    speed: 1.0,
    volume: 0.8,
    proactiveHelp: true
  });
  
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onOpen: onMobileMenuOpen, onClose: onMobileMenuClose } = useDisclosure();
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const activeColor = useColorModeValue('blue.500', 'blue.400');
  
  const sidebarWidth = sidebarCollapsed ? '60px' : '280px';
  
  const filteredNavItems = NAVIGATION_ITEMS.filter(item => 
    item.tier === 'all' || 
    item.tier === currentTier || 
    (currentTier === 'enterprise' && (item.tier === 'pro' || item.tier === 'lite'))
  );
  
  const categorizedItems = filteredNavItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);
  
  const categoryLabels = {
    core: 'Core Features',
    strategy: 'Strategy Frameworks',
    operations: 'Operations',
    analytics: 'Analytics & AI',
    admin: 'Administration'
  };
  
  const getCurrentItem = () => filteredNavItems.find(item => item.view === currentView);
  
  const playAIGuide = (text: string) => {
    if (!aiGuideSettings.enabled) return;
    
    // Web Speech API implementation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = aiGuideSettings.speed;
      utterance.volume = aiGuideSettings.volume;
      
      // Voice selection based on settings
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        // Gender preference
        const genderMatch = aiGuideSettings.voice === 'female' ? 
          name.includes('female') || name.includes('woman') || !name.includes('male') :
          name.includes('male') || name.includes('man');
        
        // Accent preference
        let accentMatch = true;
        switch (aiGuideSettings.accent) {
          case 'british':
            accentMatch = lang.includes('gb') || name.includes('british');
            break;
          case 'australian':
            accentMatch = lang.includes('au') || name.includes('australian');
            break;
          case 'canadian':
            accentMatch = lang.includes('ca') || name.includes('canadian');
            break;
          case 'american':
            accentMatch = lang.includes('us') || (!lang.includes('gb') && !lang.includes('au'));
            break;
        }
        
        return genderMatch && accentMatch;
      });
      
      if (preferredVoice) utterance.voice = preferredVoice;
      speechSynthesis.speak(utterance);
    }
  };
  
  const handleNavigation = (item: NavigationItem) => {
    setCurrentView(item.view);
    onMobileMenuClose();
    
    if (aiGuideSettings.enabled && aiGuideSettings.proactiveHelp) {
      playAIGuide(`Navigating to ${item.label}. ${item.description}`);
    }
  };
  
  const SidebarContent = ({ onItemClick }: { onItemClick?: (item: NavigationItem) => void }) => (
    <VStack spacing={0} align="stretch" h="full">
      {/* Header */}
      <Box p={4} borderBottom="1px" borderColor={borderColor}>
        <HStack justify="space-between">
          {!sidebarCollapsed && (
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
                {companyName}
              </Text>
              <Text fontSize="sm" color="gray.500" noOfLines={1}>
                {userName}
              </Text>
            </VStack>
          )}
          <IconButton
            aria-label="Toggle sidebar"
            icon={sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            size="sm"
            variant="ghost"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            display={{ base: 'none', md: 'flex' }}
          />
        </HStack>
      </Box>
      
      {/* Navigation */}
      <Box flex="1" overflowY="auto" p={2}>
        <VStack spacing={4} align="stretch">
          {Object.entries(categorizedItems).map(([category, items]) => (
            <Box key={category}>
              {!sidebarCollapsed && (
                <Text 
                  fontSize="xs" 
                  fontWeight="semibold" 
                  color="gray.500" 
                  mb={2} 
                  px={2}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </Text>
              )}
              <VStack spacing={1} align="stretch">
                {items.map((item) => (
                  <Tooltip 
                    key={item.id}
                    label={sidebarCollapsed ? `${item.label}: ${item.description}` : ''}
                    placement="right"
                    hasArrow
                  >
                    <Button
                      variant={currentView === item.view ? 'solid' : 'ghost'}
                      colorScheme={currentView === item.view ? 'blue' : 'gray'}
                      justifyContent="flex-start"
                      h="auto"
                      py={3}
                      px={3}
                      onClick={() => onItemClick ? onItemClick(item) : handleNavigation(item)}
                      leftIcon={<Text fontSize="lg">{item.icon}</Text>}
                      iconSpacing={sidebarCollapsed ? 0 : 3}
                    >
                      {!sidebarCollapsed && (
                        <VStack align="start" spacing={0} flex="1">
                          <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                            {item.label}
                          </Text>
                          {item.tier !== 'all' && (
                            <Badge size="sm" colorScheme="purple" variant="subtle">
                              {item.tier}
                            </Badge>
                          )}
                        </VStack>
                      )}
                    </Button>
                  </Tooltip>
                ))}
              </VStack>
              {!sidebarCollapsed && <Divider mt={3} />}
            </Box>
          ))}
        </VStack>
      </Box>
      
      {/* AI Guide Status */}
      {!sidebarCollapsed && (
        <Box p={4} borderTop="1px" borderColor={borderColor}>
          <Card size="sm" bg={aiGuideSettings.enabled ? 'green.50' : 'gray.50'}>
            <CardBody p={3}>
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" fontWeight="semibold">
                    AI Guide {aiGuideSettings.enabled ? 'Active' : 'Inactive'}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {aiGuideSettings.voice} • {aiGuideSettings.accent}
                  </Text>
                </VStack>
                <IconButton
                  aria-label="AI settings"
                  icon={<SettingsIcon />}
                  size="xs"
                  variant="ghost"
                  onClick={onSettingsOpen}
                />
              </HStack>
            </CardBody>
          </Card>
        </Box>
      )}
    </VStack>
  );
  
  return (
    <Box display="flex" h="100vh" bg={bgColor}>
      {/* Desktop Sidebar */}
      <Box
        w={sidebarWidth}
        bg={sidebarBg}
        borderRight="1px"
        borderColor={borderColor}
        transition="width 0.2s"
        display={{ base: 'none', md: 'block' }}
        position="relative"
        zIndex={1}
      >
        <SidebarContent />
      </Box>
      
      {/* Mobile Menu Button */}
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        onClick={onMobileMenuOpen}
        position="fixed"
        top={4}
        left={4}
        zIndex={1001}
        display={{ base: 'flex', md: 'none' }}
        bg={sidebarBg}
        shadow="md"
      />
      
      {/* Mobile Drawer */}
      <Drawer isOpen={isMobileMenuOpen} placement="left" onClose={onMobileMenuClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <SidebarContent onItemClick={handleNavigation} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
      {/* Main Content Area */}
      <Box flex="1" overflow="hidden" display="flex" flexDirection="column">
        {/* Top Bar */}
        <Box 
          bg={sidebarBg} 
          borderBottom="1px" 
          borderColor={borderColor} 
          px={6} 
          py={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack spacing={4}>
            <VStack align="start" spacing={0}>
              <Text fontSize="xl" fontWeight="bold">
                {getCurrentItem()?.icon} {getCurrentItem()?.label || 'Dashboard'}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {getCurrentItem()?.description || 'Welcome to your strategic intelligence platform'}
              </Text>
            </VStack>
          </HStack>
          
          <HStack spacing={3}>
            {/* AI Guide Toggle */}
            <HStack spacing={2}>
              <Text fontSize="sm">AI Guide</Text>
              <Switch
                isChecked={aiGuideSettings.enabled}
                onChange={(e) => setAiGuideSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                colorScheme="green"
                size="sm"
              />
            </HStack>
            
            {/* User Menu */}
            <Menu>
              <MenuButton as={Button} variant="ghost" p={1}>
                <Avatar size="sm" name={userName} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onSettingsOpen}>AI Guide Settings</MenuItem>
                <MenuItem onClick={() => setCurrentView('company-admin')}>Company Settings</MenuItem>
                <MenuItem onClick={() => setCurrentView('pricing')}>Billing & Plans</MenuItem>
                {onLogout && (
                  <>
                    <MenuDivider />
                    <MenuItem onClick={onLogout} color="red.500">
                      Sign Out
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </HStack>
        </Box>
        
        {/* Content Area */}
        <Box flex="1" overflow="auto" p={0}>
          {children}
        </Box>
      </Box>
      
      {/* Enhanced Voice System Modal */}
      <Drawer isOpen={isSettingsOpen} placement="right" onClose={onSettingsClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={6}>
            <VStack spacing={6} align="stretch">
              <Text fontSize="xl" fontWeight="bold">🎙️ Enhanced Voice System</Text>
              <Text fontSize="sm" color="gray.600">
                Professional AI assistance with clear human voices for optimal communication
              </Text>
              
              {/* Enhanced Voice System Component */}
              <EnhancedVoiceSystem />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MinimalistLayout;