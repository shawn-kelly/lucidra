import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Badge,
  Alert,
  AlertIcon,
  Progress,
  useColorModeValue,
  Divider,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  NumberInput,
  NumberInputField,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';

interface MissionData {
  companyName: string;
  industry: string;
  targetAudience: string;
  problemSolving: string;
  uniqueValue: string;
  impact: string;
  values: string[];
  tone: 'professional' | 'inspirational' | 'innovative' | 'customer-focused';
  length: 'concise' | 'standard' | 'detailed';
}

interface GeneratedMission {
  id: string;
  text: string;
  tone: string;
  structure: string;
  strengths: string[];
  improvements: string[];
  score: number;
}

const MissionStatementGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [missionData, setMissionData] = useState<MissionData>({
    companyName: '',
    industry: '',
    targetAudience: '',
    problemSolving: '',
    uniqueValue: '',
    impact: '',
    values: [],
    tone: 'professional',
    length: 'standard'
  });
  const [generatedMissions, setGeneratedMissions] = useState<GeneratedMission[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMission, setSelectedMission] = useState<GeneratedMission | null>(null);
  const [customizations, setCustomizations] = useState<string>('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Predefined values for quick selection
  const commonValues = [
    'Innovation', 'Integrity', 'Excellence', 'Customer Focus', 'Collaboration',
    'Sustainability', 'Transparency', 'Quality', 'Respect', 'Accountability',
    'Creativity', 'Growth', 'Trust', 'Diversity', 'Community'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Manufacturing', 'Consulting', 'Non-profit', 'Real Estate', 'Energy',
    'Media', 'Food & Beverage', 'Transportation', 'Construction', 'Other'
  ];

  const handleInputChange = (field: keyof MissionData, value: any) => {
    setMissionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleValueToggle = (value: string) => {
    setMissionData(prev => ({
      ...prev,
      values: prev.values.includes(value)
        ? prev.values.filter(v => v !== value)
        : [...prev.values, value]
    }));
  };

  const generateMissions = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const missions: GeneratedMission[] = [
      {
        id: '1',
        text: `At ${missionData.companyName}, we ${missionData.problemSolving.toLowerCase()} for ${missionData.targetAudience} through ${missionData.uniqueValue.toLowerCase()}, creating ${missionData.impact.toLowerCase()} while upholding our core values of ${missionData.values.join(', ').toLowerCase()}.`,
        tone: 'Comprehensive & Values-Driven',
        structure: 'Problem → Solution → Impact → Values',
        strengths: ['Clear value proposition', 'Strong emotional connection', 'Values integration'],
        improvements: ['Could be more concise', 'Consider specific metrics'],
        score: 87
      },
      {
        id: '2',
        text: `${missionData.companyName} empowers ${missionData.targetAudience} by ${missionData.uniqueValue.toLowerCase()}, transforming how they ${missionData.problemSolving.toLowerCase()} and delivering ${missionData.impact.toLowerCase()}.`,
        tone: 'Action-Oriented & Empowering',
        structure: 'Empowerment → Method → Transformation → Impact',
        strengths: ['Action-focused language', 'Clear transformation story', 'Customer-centric'],
        improvements: ['Add values reference', 'Specify unique differentiator'],
        score: 82
      },
      {
        id: '3',
        text: `We exist to ${missionData.problemSolving.toLowerCase()} for ${missionData.targetAudience}, leveraging ${missionData.uniqueValue.toLowerCase()} to create ${missionData.impact.toLowerCase()} that matters.`,
        tone: 'Purpose-Driven & Simple',
        structure: 'Purpose → Target → Method → Impact',
        strengths: ['Clear purpose statement', 'Simple and memorable', 'Impact-focused'],
        improvements: ['Include company name', 'Add emotional element'],
        score: 79
      }
    ];

    setGeneratedMissions(missions);
    setIsGenerating(false);
    setCurrentStep(5);
  };

  const refineMission = (mission: GeneratedMission) => {
    setSelectedMission(mission);
    onOpen();
  };

  const renderStep1 = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="teal.500">
        Let's start with the basics about your organization
      </Text>
      
      <FormControl isRequired>
        <FormLabel>Company/Organization Name</FormLabel>
        <Input
          placeholder="Enter your organization name"
          value={missionData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          size="lg"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Industry</FormLabel>
        <Select
          placeholder="Select your industry"
          value={missionData.industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          size="lg"
        >
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Target Audience</FormLabel>
        <Input
          placeholder="Who do you serve? (e.g., small businesses, students, families)"
          value={missionData.targetAudience}
          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          size="lg"
        />
      </FormControl>
    </VStack>
  );

  const renderStep2 = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="teal.500">
        What problem do you solve?
      </Text>
      
      <FormControl isRequired>
        <FormLabel>Core Problem You Address</FormLabel>
        <Textarea
          placeholder="Describe the main problem or challenge your organization addresses..."
          value={missionData.problemSolving}
          onChange={(e) => handleInputChange('problemSolving', e.target.value)}
          rows={4}
        />
        <Text fontSize="sm" color="gray.500" mt={2}>
          💡 Tip: Focus on the customer's pain point, not your solution
        </Text>
      </FormControl>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Great problem statements:</Text>
          <Text fontSize="sm">• "Small businesses struggle with complex financial management"</Text>
          <Text fontSize="sm">• "Students lack access to personalized learning experiences"</Text>
          <Text fontSize="sm">• "Families find it difficult to plan healthy meals efficiently"</Text>
        </VStack>
      </Alert>
    </VStack>
  );

  const renderStep3 = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="teal.500">
        What makes you unique?
      </Text>
      
      <FormControl isRequired>
        <FormLabel>Your Unique Value Proposition</FormLabel>
        <Textarea
          placeholder="What makes your approach different and better than alternatives?"
          value={missionData.uniqueValue}
          onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
          rows={4}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Impact You Create</FormLabel>
        <Textarea
          placeholder="What positive change or outcome do you create for your audience?"
          value={missionData.impact}
          onChange={(e) => handleInputChange('impact', e.target.value)}
          rows={3}
        />
      </FormControl>

      <Alert status="success">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Strong unique value examples:</Text>
          <Text fontSize="sm">• "AI-powered personalization at scale"</Text>
          <Text fontSize="sm">• "Community-driven support network"</Text>
          <Text fontSize="sm">• "Gamified learning experiences"</Text>
        </VStack>
      </Alert>
    </VStack>
  );

  const renderStep4 = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="teal.500">
        Your values and mission style
      </Text>
      
      <FormControl>
        <FormLabel>Core Values (Select up to 5)</FormLabel>
        <Grid templateColumns="repeat(3, 1fr)" gap={3}>
          {commonValues.map(value => (
            <Checkbox
              key={value}
              isChecked={missionData.values.includes(value)}
              onChange={() => handleValueToggle(value)}
              isDisabled={!missionData.values.includes(value) && missionData.values.length >= 5}
            >
              <Text fontSize="sm">{value}</Text>
            </Checkbox>
          ))}
        </Grid>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Selected: {missionData.values.length}/5
        </Text>
      </FormControl>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <FormControl>
          <FormLabel>Mission Tone</FormLabel>
          <RadioGroup
            value={missionData.tone}
            onChange={(value) => handleInputChange('tone', value)}
          >
            <Stack>
              <Radio value="professional">Professional & Authoritative</Radio>
              <Radio value="inspirational">Inspirational & Motivating</Radio>
              <Radio value="innovative">Innovative & Forward-thinking</Radio>
              <Radio value="customer-focused">Customer-focused & Warm</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Mission Length</FormLabel>
          <RadioGroup
            value={missionData.length}
            onChange={(value) => handleInputChange('length', value)}
          >
            <Stack>
              <Radio value="concise">Concise (1-2 sentences)</Radio>
              <Radio value="standard">Standard (2-3 sentences)</Radio>
              <Radio value="detailed">Detailed (3-4 sentences)</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Grid>
    </VStack>
  );

  const renderStep5 = () => (
    <VStack spacing={6} align="stretch">
      {isGenerating ? (
        <VStack spacing={4}>
          <Text fontSize="lg" fontWeight="semibold">
            Generating your mission statements...
          </Text>
          <Progress value={100} isIndeterminate colorScheme="teal" w="100%" />
          <Text fontSize="sm" color="gray.500">
            Analyzing your inputs and creating personalized options
          </Text>
        </VStack>
      ) : generatedMissions.length > 0 ? (
        <VStack spacing={6} align="stretch">
          <Text fontSize="lg" fontWeight="semibold" color="teal.500">
            Your Generated Mission Statements
          </Text>
          
          {generatedMissions.map((mission, index) => (
            <Card key={mission.id} bg={cardBg} border="1px" borderColor={borderColor}>
              <CardHeader pb={2}>
                <HStack justify="space-between">
                  <HStack>
                    <Badge colorScheme="teal" variant="subtle">
                      Option {index + 1}
                    </Badge>
                    <Badge colorScheme="blue" variant="outline">
                      Score: {mission.score}/100
                    </Badge>
                  </HStack>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => refineMission(mission)}
                  >
                    Refine
                  </Button>
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <VStack align="stretch" spacing={4}>
                  <Box p={4} bg="gray.50" borderRadius="md" border="1px" borderColor="gray.200">
                    <Text fontSize="md" fontWeight="medium" lineHeight="tall">
                      "{mission.text}"
                    </Text>
                  </Box>
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>
                        Tone & Structure
                      </Text>
                      <Text fontSize="sm">{mission.tone}</Text>
                      <Text fontSize="xs" color="gray.500">{mission.structure}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>
                        Strengths
                      </Text>
                      {mission.strengths.map((strength, i) => (
                        <Text key={i} fontSize="xs" color="green.600">
                          ✓ {strength}
                        </Text>
                      ))}
                    </Box>
                  </Grid>
                </VStack>
              </CardBody>
            </Card>
          ))}
          
          <Alert status="success">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">Next Steps:</Text>
              <Text fontSize="sm">• Test these with your team and stakeholders</Text>
              <Text fontSize="sm">• Use the "Refine" button to customize further</Text>
              <Text fontSize="sm">• Consider how each aligns with your strategic goals</Text>
            </VStack>
          </Alert>
        </VStack>
      ) : null}
    </VStack>
  );

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(missionData.companyName && missionData.industry && missionData.targetAudience);
      case 2:
        return !!missionData.problemSolving;
      case 3:
        return !!(missionData.uniqueValue && missionData.impact);
      case 4:
        return missionData.values.length > 0;
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(currentStep);

  return (
    <Box maxW="4xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" color="teal.500" mb={2}>
            🎯 Mission Statement Generator
          </Text>
          <Text fontSize="lg" color="gray.600">
            Create compelling mission statements with AI-powered guidance
          </Text>
        </Box>

        {/* Progress */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" fontWeight="medium">
              Step {currentStep} of {totalSteps}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {Math.round(progress)}% complete
            </Text>
          </HStack>
          <Progress value={progress} colorScheme="teal" borderRadius="md" />
        </Box>

        {/* Content */}
        <Card bg={cardBg} border="1px" borderColor={borderColor} shadow="lg">
          <CardBody p={8}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </CardBody>
        </Card>

        {/* Navigation */}
        <HStack justify="space-between">
          <Button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            isDisabled={currentStep === 1}
            variant="outline"
          >
            ← Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              isDisabled={!canProceed}
              colorScheme="teal"
            >
              Next →
            </Button>
          ) : currentStep === 4 ? (
            <Button
              onClick={generateMissions}
              isDisabled={!canProceed}
              colorScheme="teal"
              isLoading={isGenerating}
            >
              Generate Missions ✨
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(1)}
              colorScheme="blue"
              variant="outline"
            >
              Start Over
            </Button>
          )}
        </HStack>
      </VStack>

      {/* Refinement Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Refine Mission Statement</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedMission && (
              <VStack spacing={4} align="stretch">
                <Box p={4} bg="gray.50" borderRadius="md">
                  <Text fontWeight="medium">Current Version:</Text>
                  <Text mt={2}>"{selectedMission.text}"</Text>
                </Box>
                
                <FormControl>
                  <FormLabel>Customization Requests</FormLabel>
                  <Textarea
                    placeholder="What changes would you like? (e.g., make it shorter, emphasize innovation, add emotional appeal)"
                    value={customizations}
                    onChange={(e) => setCustomizations(e.target.value)}
                    rows={3}
                  />
                </FormControl>
                
                <HStack>
                  <Button colorScheme="teal" flex={1}>
                    Apply Changes
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MissionStatementGenerator;