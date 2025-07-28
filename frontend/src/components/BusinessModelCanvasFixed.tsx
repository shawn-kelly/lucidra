import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Textarea,
  Badge,
  Progress,
  useColorModeValue,
  Icon,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FiSave, FiDownload, FiShare, FiEdit3 } from 'react-icons/fi';

interface CanvasSection {
  id: string;
  title: string;
  description: string;
  content: string[];
  color: string;
  icon: string;
}

const BusinessModelCanvasFixed: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  const [sections, setSections] = useState<CanvasSection[]>([
    {
      id: 'key-partners',
      title: 'Key Partners',
      description: 'Who are your key partners and suppliers?',
      content: [],
      color: 'blue',
      icon: '🤝'
    },
    {
      id: 'key-activities',
      title: 'Key Activities',
      description: 'What key activities does your value proposition require?',
      content: [],
      color: 'green',
      icon: '⚙️'
    },
    {
      id: 'key-resources',
      title: 'Key Resources',
      description: 'What key resources does your value proposition require?',
      content: [],
      color: 'purple',
      icon: '🏗️'
    },
    {
      id: 'value-propositions',
      title: 'Value Propositions',
      description: 'What value do we deliver to the customer?',
      content: [],
      color: 'red',
      icon: '💎'
    },
    {
      id: 'customer-relationships',
      title: 'Customer Relationships',
      description: 'What type of relationship does each customer segment expect?',
      content: [],
      color: 'orange',
      icon: '❤️'
    },
    {
      id: 'channels',
      title: 'Channels',
      description: 'Through which channels do we reach our customer segments?',
      content: [],
      color: 'yellow',
      icon: '📡'
    },
    {
      id: 'customer-segments',
      title: 'Customer Segments',
      description: 'For whom are we creating value?',
      content: [],
      color: 'teal',
      icon: '👥'
    },
    {
      id: 'cost-structure',
      title: 'Cost Structure',
      description: 'What are the most important costs inherent in our business model?',
      content: [],
      color: 'pink',
      icon: '💰'
    },
    {
      id: 'revenue-streams',
      title: 'Revenue Streams',
      description: 'For what value are our customers really willing to pay?',
      content: [],
      color: 'cyan',
      icon: '💵'
    }
  ]);

  const [newItems, setNewItems] = useState<{[key: string]: string}>({});

  const addItem = (sectionId: string) => {
    const item = newItems[sectionId]?.trim();
    if (item) {
      setSections(prev => prev.map(section => 
        section.id === sectionId 
          ? { ...section, content: [...section.content, item] }
          : section
      ));
      setNewItems(prev => ({ ...prev, [sectionId]: '' }));
    }
  };

  const removeItem = (sectionId: string, index: number) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, content: section.content.filter((_, i) => i !== index) }
        : section
    ));
  };

  const completion = Math.round((sections.filter(s => s.content.length > 0).length / sections.length) * 100);

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">🎯 Business Model Canvas</Text>
                  <Text color="gray.600">Design and visualize your business model</Text>
                </VStack>
                <HStack>
                  <Button leftIcon={<FiSave />} colorScheme="blue" size="sm">
                    Save Canvas
                  </Button>
                  <Button leftIcon={<FiDownload />} variant="outline" size="sm">
                    Export
                  </Button>
                  <Button leftIcon={<FiShare />} variant="outline" size="sm">
                    Share
                  </Button>
                </HStack>
              </HStack>
              
              <HStack>
                <Text fontSize="sm" fontWeight="medium">Completion:</Text>
                <Progress value={completion} size="sm" flex={1} colorScheme="blue" />
                <Text fontSize="sm" fontWeight="bold">{completion}%</Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Business Model Canvas Grid */}
        <Grid templateColumns="repeat(5, 1fr)" gap={4} minH="600px">
          {/* Key Partners */}
          <GridItem colSpan={1} rowSpan={2}>
            <CanvasCard section={sections[0]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>

          {/* Key Activities */}
          <GridItem colSpan={1}>
            <CanvasCard section={sections[1]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>

          {/* Value Propositions */}
          <GridItem colSpan={1} rowSpan={2}>
            <CanvasCard section={sections[3]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>

          {/* Customer Relationships */}
          <GridItem colSpan={1}>
            <CanvasCard section={sections[4]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>

          {/* Customer Segments */}
          <GridItem colSpan={1} rowSpan={2}>
            <CanvasCard section={sections[6]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>

          {/* Key Resources */}
          <GridItem colSpan={1}>
            <CanvasCard section={sections[2]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>

          {/* Channels */}
          <GridItem colSpan={1}>
            <CanvasCard section={sections[5]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>

          {/* Cost Structure */}
          <GridItem colSpan={2}>
            <CanvasCard section={sections[7]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>

          {/* Revenue Streams */}
          <GridItem colSpan={3}>
            <CanvasCard section={sections[8]} newItems={newItems} setNewItems={setNewItems} addItem={addItem} removeItem={removeItem} />
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

interface CanvasCardProps {
  section: CanvasSection;
  newItems: {[key: string]: string};
  setNewItems: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
  addItem: (sectionId: string) => void;
  removeItem: (sectionId: string, index: number) => void;
}

const CanvasCard: React.FC<CanvasCardProps> = ({ section, newItems, setNewItems, addItem, removeItem }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Card bg={cardBg} borderWidth="2px" borderColor={`${section.color}.200`} h="full">
      <CardHeader pb={2}>
        <VStack spacing={1} align="stretch">
          <HStack>
            <Text fontSize="lg">{section.icon}</Text>
            <Text fontSize="md" fontWeight="bold" flex={1}>{section.title}</Text>
            <Badge colorScheme={section.color} size="sm">{section.content.length}</Badge>
          </HStack>
          <Text fontSize="xs" color="gray.600">{section.description}</Text>
        </VStack>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack spacing={3} align="stretch" h="full">
          {/* Content Items */}
          <VStack spacing={2} align="stretch" flex={1}>
            {section.content.map((item, index) => (
              <HStack key={index} p={2} bg={`${section.color}.50`} borderRadius="md" borderWidth="1px" borderColor={`${section.color}.200`}>
                <Text fontSize="sm" flex={1}>{item}</Text>
                <IconButton
                  icon={<Text fontSize="xs">×</Text>}
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => removeItem(section.id, index)}
                  aria-label="Remove item"
                />
              </HStack>
            ))}
          </VStack>

          {/* Add New Item */}
          <VStack spacing={2}>
            <Textarea
              placeholder={`Add ${section.title.toLowerCase()}...`}
              size="sm"
              rows={2}
              value={newItems[section.id] || ''}
              onChange={(e) => setNewItems(prev => ({ ...prev, [section.id]: e.target.value }))}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  addItem(section.id);
                }
              }}
            />
            <Button
              size="sm"
              colorScheme={section.color}
              onClick={() => addItem(section.id)}
              isDisabled={!newItems[section.id]?.trim()}
              w="full"
            >
              Add Item
            </Button>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default BusinessModelCanvasFixed;