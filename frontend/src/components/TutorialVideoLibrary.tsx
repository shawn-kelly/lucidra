import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  IconButton,
  Tooltip,
  Divider,
  Image,
  AspectRatio,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Checkbox,
  CheckboxGroup,
  Stack
} from '@chakra-ui/react';
import { SearchIcon, PlayIcon, StarIcon, TimeIcon, ViewIcon } from '@chakra-ui/icons';

interface Video {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  rating: number;
  views: number;
  progress?: number;
  completed?: boolean;
  releaseDate: string;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  videos: string[];
  totalDuration: string;
  difficulty: string;
  progress: number;
  category: string;
}

const TutorialVideoLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categories = ['Strategy', 'Marketing', 'Operations', 'Leadership', 'Technology', 'Finance', 'HR'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const sampleVideos: Video[] = [
      {
        id: '1',
        title: 'Blue Ocean Strategy Fundamentals',
        category: 'Strategy',
        duration: '24:30',
        thumbnail: '/api/placeholder/320/180',
        description: 'Learn the core principles of Blue Ocean Strategy and how to create uncontested market spaces.',
        instructor: 'Dr. Sarah Mitchell',
        level: 'Beginner',
        tags: ['Strategy', 'Innovation', 'Market Creation'],
        rating: 4.8,
        views: 15420,
        progress: 67,
        releaseDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'Six Paths Analysis Deep Dive',
        category: 'Strategy',
        duration: '18:45',
        thumbnail: '/api/placeholder/320/180',
        description: 'Master the Six Paths framework to systematically look across industry boundaries.',
        instructor: 'Marcus Chen',
        level: 'Intermediate',
        tags: ['Analysis', 'Framework', 'Industry Research'],
        rating: 4.9,
        views: 12350,
        progress: 100,
        completed: true,
        releaseDate: '2024-01-22'
      },
      {
        id: '3',
        title: 'Strategic Marketing Automation',
        category: 'Marketing',
        duration: '32:15',
        thumbnail: '/api/placeholder/320/180',
        description: 'Build automated marketing campaigns that align with your Blue Ocean strategy.',
        instructor: 'Elena Rodriguez',
        level: 'Advanced',
        tags: ['Marketing', 'Automation', 'Campaign Management'],
        rating: 4.7,
        views: 9870,
        releaseDate: '2024-02-05'
      },
      {
        id: '4',
        title: 'Value Innovation Workshop',
        category: 'Strategy',
        duration: '45:20',
        thumbnail: '/api/placeholder/320/180',
        description: 'Interactive workshop on creating value innovation using the eliminate-reduce-raise-create grid.',
        instructor: 'Dr. James Kim',
        level: 'Intermediate',
        tags: ['Innovation', 'Value Creation', 'Workshop'],
        rating: 4.9,
        views: 18340,
        progress: 23,
        releaseDate: '2024-02-12'
      },
      {
        id: '5',
        title: 'HR Analytics & Performance',
        category: 'HR',
        duration: '28:10',
        thumbnail: '/api/placeholder/320/180',
        description: 'Use data analytics to optimize HR processes and improve employee performance.',
        instructor: 'Lisa Wang',
        level: 'Intermediate',
        tags: ['HR', 'Analytics', 'Performance Management'],
        rating: 4.6,
        views: 7650,
        releaseDate: '2024-02-18'
      },
      {
        id: '6',
        title: 'Process Improvement with Lean Six Sigma',
        category: 'Operations',
        duration: '35:45',
        thumbnail: '/api/placeholder/320/180',
        description: 'Apply Lean Six Sigma methodologies to streamline business processes.',
        instructor: 'David Thompson',
        level: 'Advanced',
        tags: ['Operations', 'Process Improvement', 'Efficiency'],
        rating: 4.8,
        views: 11230,
        releaseDate: '2024-02-25'
      }
    ];

    const sampleLearningPaths: LearningPath[] = [
      {
        id: '1',
        name: 'Blue Ocean Strategy Mastery',
        description: 'Complete journey from basics to advanced Blue Ocean Strategy implementation',
        videos: ['1', '2', '4'],
        totalDuration: '1h 28m',
        difficulty: 'Beginner to Advanced',
        progress: 63,
        category: 'Strategy'
      },
      {
        id: '2',
        name: 'Strategic Marketing Excellence',
        description: 'Master strategic marketing with automation and analytics',
        videos: ['3'],
        totalDuration: '32m',
        difficulty: 'Advanced',
        progress: 0,
        category: 'Marketing'
      },
      {
        id: '3',
        name: 'Operations & Process Optimization',
        description: 'Streamline operations using proven methodologies',
        videos: ['6'],
        totalDuration: '36m',
        difficulty: 'Advanced',
        progress: 0,
        category: 'Operations'
      }
    ];

    setVideos(sampleVideos);
    setLearningPaths(sampleLearningPaths);
    setFilteredVideos(sampleVideos);
  }, []);

  useEffect(() => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(video => selectedCategories.includes(video.category));
    }

    if (selectedLevels.length > 0) {
      filtered = filtered.filter(video => selectedLevels.includes(video.level));
    }

    setFilteredVideos(filtered);
  }, [searchTerm, selectedCategories, selectedLevels, videos]);

  const VideoLibrary = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">📚 Strategic Video Library</Text>
        <HStack>
          <Badge colorScheme="blue">{videos.length} Videos</Badge>
          <Badge colorScheme="green">{videos.filter(v => v.completed).length} Completed</Badge>
        </HStack>
      </HStack>

      {/* Search and Filters */}
      <Card>
        <CardBody>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search videos, topics, or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <Grid templateColumns="1fr 1fr" gap={4} w="full">
              <FormControl>
                <FormLabel fontSize="sm">Categories</FormLabel>
                <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
                  <Stack direction="row" wrap="wrap">
                    {categories.map(category => (
                      <Checkbox key={category} value={category} size="sm">
                        {category}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Difficulty Level</FormLabel>
                <CheckboxGroup value={selectedLevels} onChange={setSelectedLevels}>
                  <Stack direction="row" wrap="wrap">
                    {levels.map(level => (
                      <Checkbox key={level} value={level} size="sm">
                        {level}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormControl>
            </Grid>
          </VStack>
        </CardBody>
      </Card>

      {/* Video Grid */}
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {filteredVideos.map((video) => (
          <Card
            key={video.id}
            cursor="pointer"
            onClick={() => {
              setSelectedVideo(video);
              onOpen();
            }}
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <AspectRatio ratio={16 / 9}>
              <Box
                bg="gray.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <PlayIcon color="gray.500" boxSize={8} />
                {video.progress && (
                  <Progress
                    value={video.progress}
                    colorScheme="blue"
                    size="sm"
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    borderRadius={0}
                  />
                )}
              </Box>
            </AspectRatio>
            <CardBody>
              <VStack align="start" spacing={3}>
                <HStack justify="space-between" w="full">
                  <Badge colorScheme="purple" variant="subtle">{video.category}</Badge>
                  <Badge colorScheme={
                    video.level === 'Beginner' ? 'green' :
                    video.level === 'Intermediate' ? 'yellow' : 'red'
                  } variant="subtle">
                    {video.level}
                  </Badge>
                </HStack>

                <Text fontWeight="bold" fontSize="md" noOfLines={2}>
                  {video.title}
                </Text>

                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  {video.description}
                </Text>

                <HStack justify="space-between" w="full" fontSize="sm" color="gray.500">
                  <HStack>
                    <TimeIcon boxSize={3} />
                    <Text>{video.duration}</Text>
                  </HStack>
                  <HStack>
                    <StarIcon boxSize={3} />
                    <Text>{video.rating}</Text>
                  </HStack>
                  <HStack>
                    <ViewIcon boxSize={3} />
                    <Text>{video.views.toLocaleString()}</Text>
                  </HStack>
                </HStack>

                <Text fontSize="sm" color="gray.600">
                  By {video.instructor}
                </Text>

                <HStack wrap="wrap">
                  {video.tags.slice(0, 3).map((tag, idx) => (
                    <Tag key={idx} size="sm" variant="subtle" colorScheme="gray">
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                </HStack>

                {video.completed && (
                  <Badge colorScheme="green" variant="solid">✓ Completed</Badge>
                )}
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );

  const LearningPaths = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">🎯 Strategic Learning Paths</Text>
      
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Structured Learning Journey</Text>
          <Text fontSize="sm">
            Follow curated paths to master specific strategic frameworks and business skills
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={6}>
        {learningPaths.map((path) => (
          <Card key={path.id}>
            <CardHeader>
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" fontSize="lg">{path.name}</Text>
                <HStack>
                  <Badge colorScheme="blue">{path.videos.length} videos</Badge>
                  <Badge colorScheme="purple">{path.totalDuration}</Badge>
                  <Badge colorScheme="orange">{path.difficulty}</Badge>
                </HStack>
              </VStack>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={4}>
                <Text fontSize="sm" color="gray.600">
                  {path.description}
                </Text>

                <Box w="full">
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="semibold">Progress</Text>
                    <Text fontSize="sm">{path.progress}%</Text>
                  </HStack>
                  <Progress value={path.progress} colorScheme="blue" size="lg" />
                </Box>

                <Divider />

                <VStack align="start" spacing={2} w="full">
                  <Text fontSize="sm" fontWeight="semibold">Included Videos:</Text>
                  {path.videos.map((videoId) => {
                    const video = videos.find(v => v.id === videoId);
                    return video ? (
                      <HStack key={videoId} justify="space-between" w="full" p={2} bg="gray.50" borderRadius="md">
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="semibold">{video.title}</Text>
                          <Text fontSize="xs" color="gray.600">{video.duration}</Text>
                        </VStack>
                        {video.completed && (
                          <Badge colorScheme="green" size="sm">✓</Badge>
                        )}
                      </HStack>
                    ) : null;
                  })}
                </VStack>

                <Button colorScheme="blue" size="sm" w="full">
                  {path.progress === 0 ? 'Start Learning Path' : 'Continue Learning'}
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );

  const MyProgress = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">📈 My Learning Progress</Text>
      
      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        <Card>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {videos.filter(v => v.completed).length}
            </Text>
            <Text fontSize="sm" color="gray.600">Videos Completed</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {Math.round(videos.reduce((sum, v) => sum + (v.progress || 0), 0) / videos.length)}%
            </Text>
            <Text fontSize="sm" color="gray.600">Average Progress</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="purple.500">
              {learningPaths.filter(p => p.progress > 0).length}
            </Text>
            <Text fontSize="sm" color="gray.600">Paths Started</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="orange.500">
              {Math.floor(videos.reduce((sum, v) => {
                const [minutes, seconds] = v.duration.split(':').map(Number);
                return sum + minutes + (seconds / 60);
              }, 0))}h
            </Text>
            <Text fontSize="sm" color="gray.600">Total Content</Text>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Recently Watched</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={3}>
            {videos.filter(v => v.progress && v.progress < 100).slice(0, 5).map((video) => (
              <HStack key={video.id} justify="space-between" w="full" p={3} bg="gray.50" borderRadius="md">
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">{video.title}</Text>
                  <Text fontSize="xs" color="gray.600">By {video.instructor}</Text>
                </VStack>
                <VStack align="end" spacing={1}>
                  <Text fontSize="xs" color="gray.600">{video.progress}% complete</Text>
                  <Progress value={video.progress} colorScheme="blue" size="sm" w="60px" />
                </VStack>
              </HStack>
            ))}
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Learning Recommendations</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={3} align="start">
            <Alert status="success" variant="left-accent">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="semibold">🎯 Next Recommended</Text>
                <Text fontSize="sm">Complete "Value Innovation Workshop" to advance your Blue Ocean Strategy skills</Text>
              </VStack>
            </Alert>
            <Alert status="info" variant="left-accent">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="semibold">📚 Skill Gap</Text>
                <Text fontSize="sm">Consider watching HR Analytics content to complement your strategy knowledge</Text>
              </VStack>
            </Alert>
            <Alert status="warning" variant="left-accent">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="semibold">⏰ Recently Added</Text>
                <Text fontSize="sm">New advanced marketing automation content available in your queue</Text>
              </VStack>
            </Alert>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box>
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>📚 Library</Tab>
          <Tab>🎯 Learning Paths</Tab>
          <Tab>📈 My Progress</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VideoLibrary />
          </TabPanel>
          <TabPanel>
            <LearningPaths />
          </TabPanel>
          <TabPanel>
            <MyProgress />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Video Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Video Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedVideo && (
              <VStack spacing={4} align="start">
                <AspectRatio ratio={16 / 9} w="full">
                  <Box
                    bg="gray.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <PlayIcon color="gray.500" boxSize={16} />
                  </Box>
                </AspectRatio>

                <VStack align="start" spacing={3} w="full">
                  <Text fontSize="xl" fontWeight="bold">{selectedVideo.title}</Text>
                  
                  <HStack wrap="wrap">
                    <Badge colorScheme="purple">{selectedVideo.category}</Badge>
                    <Badge colorScheme={
                      selectedVideo.level === 'Beginner' ? 'green' :
                      selectedVideo.level === 'Intermediate' ? 'yellow' : 'red'
                    }>
                      {selectedVideo.level}
                    </Badge>
                    <Badge colorScheme="gray">{selectedVideo.duration}</Badge>
                  </HStack>

                  <Text color="gray.600">{selectedVideo.description}</Text>

                  <HStack justify="space-between" w="full">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">Instructor</Text>
                      <Text fontSize="sm" color="gray.600">{selectedVideo.instructor}</Text>
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">Rating</Text>
                      <HStack>
                        <StarIcon color="yellow.400" boxSize={4} />
                        <Text fontSize="sm">{selectedVideo.rating} ({selectedVideo.views.toLocaleString()} views)</Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  <Divider />

                  <Box w="full">
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Tags</Text>
                    <HStack wrap="wrap">
                      {selectedVideo.tags.map((tag, idx) => (
                        <Tag key={idx} size="sm" variant="subtle" colorScheme="blue">
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      ))}
                    </HStack>
                  </Box>

                  {selectedVideo.progress && (
                    <Box w="full">
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" fontWeight="semibold">Your Progress</Text>
                        <Text fontSize="sm">{selectedVideo.progress}%</Text>
                      </HStack>
                      <Progress value={selectedVideo.progress} colorScheme="blue" size="lg" />
                    </Box>
                  )}

                  <HStack w="full" justify="center" spacing={4}>
                    <Button colorScheme="blue" size="lg">
                      {selectedVideo.progress ? 'Continue Watching' : 'Start Video'}
                    </Button>
                    <Button variant="outline">Add to Playlist</Button>
                  </HStack>
                </VStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TutorialVideoLibrary;