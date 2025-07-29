import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Select,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Badge,
  Card,
  CardBody,
  Alert,
  AlertIcon,
  useToast,
  Grid
} from '@chakra-ui/react';

interface VoiceProfile {
  name: string;
  displayName: string;
  gender: 'male' | 'female';
  accent: string;
  description: string;
  priority: number;
}

interface EnhancedVoiceSettings {
  enabled: boolean;
  selectedVoice: string;
  speed: number;
  volume: number;
  pitch: number;
  preferredAccent: 'american' | 'british' | 'australian' | 'canadian' | 'irish' | 'south_african' | 'indian' | 'any';
  preferredGender: 'male' | 'female' | 'any';
  preferredCountry: 'usa' | 'uk' | 'australia' | 'canada' | 'ireland' | 'south_africa' | 'india' | 'any';
}

const EnhancedVoiceSystem: React.FC = () => {
  const [voiceSettings, setVoiceSettings] = useState<EnhancedVoiceSettings>({
    enabled: true,
    selectedVoice: 'auto',
    speed: 1.0,
    volume: 0.8,
    pitch: 1.0,
    preferredAccent: 'any',
    preferredGender: 'any',
    preferredCountry: 'any'
  });
  
  const [availableVoices, setAvailableVoices] = useState<VoiceProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  // Enhanced voice detection and categorization
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) {
        setTimeout(loadVoices, 100);
        return;
      }

      const voiceProfiles: VoiceProfile[] = [];
      
      // Comprehensive voice patterns by country and accent
      const qualityVoicePatterns = [
        // Premium Professional Voices (Highest Quality)
        { pattern: /samantha|alex|victoria|daniel|karen|susan|fiona|moira/i, priority: 10, accent: 'American Premium', country: 'usa' },
        { pattern: /google.*us|microsoft.*david|cortana/i, priority: 10, accent: 'AI Assistant Premium', country: 'usa' },
        
        // Regional Premium Voices
        { pattern: /zira|hazel|mark|james.*uk|emily.*uk/i, priority: 9, accent: 'British Premium', country: 'uk' },
        { pattern: /catherine.*au|lee.*au|karen.*au/i, priority: 9, accent: 'Australian Premium', country: 'australia' },
        { pattern: /alex.*ca|amelie.*ca|chantal.*ca/i, priority: 9, accent: 'Canadian Premium', country: 'canada' },
        
        // Country-Specific High Quality
        { pattern: /en-us.*premium|en-us.*enhanced/i, priority: 8, accent: 'American Enhanced', country: 'usa' },
        { pattern: /en-gb.*premium|en-gb.*enhanced/i, priority: 8, accent: 'British Enhanced', country: 'uk' },
        { pattern: /en-au.*premium|en-au.*enhanced/i, priority: 8, accent: 'Australian Enhanced', country: 'australia' },
        { pattern: /en-ca.*premium|en-ca.*enhanced/i, priority: 8, accent: 'Canadian Enhanced', country: 'canada' },
        { pattern: /en-ie|irish.*english/i, priority: 7, accent: 'Irish English', country: 'ireland' },
        { pattern: /en-za|south.*african.*english/i, priority: 7, accent: 'South African English', country: 'south_africa' },
        { pattern: /en-in|indian.*english/i, priority: 7, accent: 'Indian English', country: 'india' },
        
        // Gender-Specific Quality Voices
        { pattern: /en-us.*female|en-us.*woman/i, priority: 7, accent: 'American Female', country: 'usa' },
        { pattern: /en-us.*male|en-us.*man/i, priority: 7, accent: 'American Male', country: 'usa' },
        { pattern: /en-gb.*female|en-gb.*woman/i, priority: 6, accent: 'British Female', country: 'uk' },
        { pattern: /en-gb.*male|en-gb.*man/i, priority: 6, accent: 'British Male', country: 'uk' },
        { pattern: /en-au.*female|en-au.*woman/i, priority: 6, accent: 'Australian Female', country: 'australia' },
        { pattern: /en-au.*male|en-au.*man/i, priority: 6, accent: 'Australian Male', country: 'australia' },
        
        // General Quality Fallbacks
        { pattern: /female|woman/i, priority: 4, accent: 'Clear Female', country: 'any' },
        { pattern: /male|man/i, priority: 4, accent: 'Clear Male', country: 'any' },
        { pattern: /en-us/i, priority: 5, accent: 'American Standard', country: 'usa' },
        { pattern: /en-gb/i, priority: 5, accent: 'British Standard', country: 'uk' },
        { pattern: /en-au/i, priority: 5, accent: 'Australian Standard', country: 'australia' },
        { pattern: /en-ca/i, priority: 5, accent: 'Canadian Standard', country: 'canada' },
        { pattern: /en/i, priority: 3, accent: 'English Standard', country: 'any' }
      ];

      voices.forEach(voice => {
        // Skip non-English voices for clarity
        if (!voice.lang.toLowerCase().startsWith('en')) return;
        
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        // Find the best matching pattern based on user preferences
        let bestPattern = qualityVoicePatterns.find(pattern => {
          const patternMatch = pattern.pattern.test(name) || pattern.pattern.test(lang);
          
          // Apply user preference filters
          let preferenceMatch = true;
          
          // Country preference filter
          if (voiceSettings.preferredCountry !== 'any') {
            preferenceMatch = preferenceMatch && (pattern.country === voiceSettings.preferredCountry || pattern.country === 'any');
          }
          
          // Accent preference filter
          if (voiceSettings.preferredAccent !== 'any') {
            const accentMatch = pattern.accent.toLowerCase().includes(voiceSettings.preferredAccent.replace('_', ' '));
            preferenceMatch = preferenceMatch && accentMatch;
          }
          
          return patternMatch && preferenceMatch;
        });
        
        // Fallback to any matching pattern if preferences are too restrictive
        if (!bestPattern) {
          bestPattern = qualityVoicePatterns.find(pattern => 
            pattern.pattern.test(name) || pattern.pattern.test(lang)
          );
        }
        
        if (!bestPattern) {
          bestPattern = { pattern: /.*/, priority: 1, accent: 'Standard', country: 'any' };
        }
        
        // Determine gender more accurately
        let gender: 'male' | 'female' = 'female';
        if (name.includes('male') || name.includes('man') || name.includes('david') || 
            name.includes('mark') || name.includes('alex') || name.includes('daniel') ||
            name.includes('james') || name.includes('lee') || name.includes('michael')) {
          gender = 'male';
        }
        
        // Filter by gender preference
        if (voiceSettings.preferredGender !== 'any' && voiceSettings.preferredGender !== gender) {
          return; // Skip this voice if it doesn't match gender preference
        }
        
        voiceProfiles.push({
          name: voice.name,
          displayName: voice.name.replace(/Microsoft|Google|Apple/, '').trim(),
          gender,
          accent: bestPattern.accent,
          description: `${bestPattern.accent} ${gender} voice - ${voice.lang}`,
          priority: bestPattern.priority
        });
      });

      // Sort by priority (highest first) and remove duplicates
      const sortedVoices = voiceProfiles
        .sort((a, b) => b.priority - a.priority)
        .filter((voice, index, array) => 
          array.findIndex(v => v.displayName === voice.displayName) === index
        )
        .slice(0, 12); // Limit to top 12 voices

      setAvailableVoices(sortedVoices);
      setIsLoading(false);

      // Auto-select the best available voice
      if (sortedVoices.length > 0 && voiceSettings.selectedVoice === 'auto') {
        const bestVoice = sortedVoices[0];
        setVoiceSettings(prev => ({ ...prev, selectedVoice: bestVoice.name }));
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [voiceSettings.selectedVoice, voiceSettings.preferredAccent, voiceSettings.preferredCountry, voiceSettings.preferredGender]);

  const playTestVoice = (text: string = "Hello! I'm your AI assistant. I'll help guide you through the Lucidra platform with clear, professional assistance.") => {
    if (!voiceSettings.enabled) {
      toast({
        title: 'Voice disabled',
        description: 'Please enable voice assistance first',
        status: 'warning',
        duration: 3000
      });
      return;
    }

    speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply settings
    utterance.rate = voiceSettings.speed;
    utterance.volume = voiceSettings.volume;
    utterance.pitch = voiceSettings.pitch;
    
    // Select the chosen voice
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name === voiceSettings.selectedVoice);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      // Fallback to best available voice
      const fallbackVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('google'))
      );
      if (fallbackVoice) utterance.voice = fallbackVoice;
    }

    utterance.onstart = () => {
      toast({
        title: 'Voice test started',
        status: 'info',
        duration: 2000
      });
    };

    utterance.onend = () => {
      toast({
        title: 'Voice test completed',
        status: 'success',
        duration: 2000
      });
    };

    utterance.onerror = (event) => {
      toast({
        title: 'Voice error',
        description: 'There was an issue with voice playback',
        status: 'error',
        duration: 3000
      });
    };

    speechSynthesis.speak(utterance);
  };

  const getVoiceQualityBadge = (priority: number) => {
    if (priority >= 9) return <Badge colorScheme="green" size="sm">Premium</Badge>;
    if (priority >= 7) return <Badge colorScheme="blue" size="sm">High Quality</Badge>;
    if (priority >= 5) return <Badge colorScheme="yellow" size="sm">Good</Badge>;
    return <Badge colorScheme="gray" size="sm">Standard</Badge>;
  };

  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <Text>Loading voice system...</Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1} w="full">
          <Text fontSize="sm" fontWeight="semibold">Enhanced Voice System</Text>
          <Text fontSize="xs">
            Professional AI assistance with natural human voices for clear communication
          </Text>
        </VStack>
      </Alert>

      <Card>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {/* Voice Preference Controls */}
            <Box p={4} bg="teal.50" borderRadius="md" borderWidth="1px" borderColor="teal.200">
              <Text fontSize="md" fontWeight="bold" mb={3} color="teal.700">🎯 Voice Preferences</Text>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Country</FormLabel>
                  <Select
                    size="sm"
                    value={voiceSettings.preferredCountry}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, preferredCountry: e.target.value as any }))}
                    bg="white"
                  >
                    <option value="any">🌍 Any Country</option>
                    <option value="usa">🇺🇸 United States</option>
                    <option value="uk">🇬🇧 United Kingdom</option>
                    <option value="australia">🇦🇺 Australia</option>
                    <option value="canada">🇨🇦 Canada</option>
                    <option value="ireland">🇮🇪 Ireland</option>
                    <option value="south_africa">🇿🇦 South Africa</option>
                    <option value="india">🇮🇳 India</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Accent</FormLabel>
                  <Select
                    size="sm"
                    value={voiceSettings.preferredAccent}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, preferredAccent: e.target.value as any }))}
                    bg="white"
                  >
                    <option value="any">🗣️ Any Accent</option>
                    <option value="american">🇺🇸 American</option>
                    <option value="british">🇬🇧 British</option>
                    <option value="australian">🇦🇺 Australian</option>
                    <option value="canadian">🇨🇦 Canadian</option>
                    <option value="irish">🇮🇪 Irish</option>
                    <option value="south_african">🇿🇦 South African</option>
                    <option value="indian">🇮🇳 Indian</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Gender</FormLabel>
                  <Select
                    size="sm"
                    value={voiceSettings.preferredGender}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, preferredGender: e.target.value as any }))}
                    bg="white"
                  >
                    <option value="any">👤 Any Gender</option>
                    <option value="female">👩 Female</option>
                    <option value="male">👨 Male</option>
                  </Select>
                </FormControl>
              </Grid>
            </Box>

            <FormControl>
              <FormLabel>Voice Selection</FormLabel>
              <Select
                value={voiceSettings.selectedVoice}
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, selectedVoice: e.target.value }))}
              >
                <option value="auto">🤖 Auto-Select Best Voice (Based on Preferences)</option>
                {availableVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.displayName} - {voice.accent} ({voice.gender})
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Professional Voice Quality Detection */}
            <Box p={4} bg="blue.50" borderRadius="md" borderWidth="1px" borderColor="blue.200">
              <Text fontSize="md" fontWeight="bold" mb={3} color="blue.700">🎖️ Professional Voice Quality Detection</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Badge colorScheme="green" size="sm">PREMIUM</Badge>
                    <Text fontSize="xs" color="gray.600">Samantha, Victoria, Alex, Daniel</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="blue" size="sm">HIGH QUALITY</Badge>
                    <Text fontSize="xs" color="gray.600">Regional Enhanced Voices</Text>
                  </HStack>
                </VStack>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Badge colorScheme="yellow" size="sm">GOOD</Badge>
                    <Text fontSize="xs" color="gray.600">Standard Regional Voices</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="gray" size="sm">STANDARD</Badge>
                    <Text fontSize="xs" color="gray.600">Basic System Voices</Text>
                  </HStack>
                </VStack>
              </Grid>
            </Box>

            {/* Voice Preview Cards */}
            <Box>
              <HStack justify="space-between" mb={3}>
                <Text fontSize="sm" fontWeight="semibold">🎵 Available Voices ({availableVoices.length} found):</Text>
                <Text fontSize="xs" color="teal.600">Filtered by your preferences</Text>
              </HStack>
              <VStack spacing={2} maxH="240px" overflowY="auto">
                {availableVoices.slice(0, 8).map((voice) => (
                  <Card 
                    key={voice.name} 
                    variant="outline" 
                    size="sm" 
                    w="full"
                    cursor="pointer"
                    bg={voice.name === voiceSettings.selectedVoice ? 'teal.50' : 'white'}
                    borderColor={voice.name === voiceSettings.selectedVoice ? 'teal.200' : 'gray.200'}
                    onClick={() => setVoiceSettings(prev => ({ ...prev, selectedVoice: voice.name }))}
                    _hover={{ shadow: 'md', borderColor: 'teal.300' }}
                    transition="all 0.2s"
                  >
                    <CardBody p={3}>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <HStack>
                            <Text fontSize="sm" fontWeight="semibold">{voice.displayName}</Text>
                            {voice.name === voiceSettings.selectedVoice && (
                              <Badge colorScheme="teal" size="xs">SELECTED</Badge>
                            )}
                          </HStack>
                          <Text fontSize="xs" color="gray.600">{voice.description}</Text>
                          <HStack spacing={1}>
                            <Text fontSize="xs" color="blue.600">Priority: {voice.priority}/10</Text>
                            <Text fontSize="xs" color="gray.500">•</Text>
                            <Text fontSize="xs" color="purple.600">{voice.gender.toUpperCase()}</Text>
                          </HStack>
                        </VStack>
                        <VStack spacing={1}>
                          {getVoiceQualityBadge(voice.priority)}
                          <Button 
                            size="xs" 
                            variant="solid"
                            colorScheme="teal"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVoiceSettings(prev => ({ ...prev, selectedVoice: voice.name }));
                              setTimeout(() => playTestVoice("Hello, this is a professional voice preview test."), 100);
                            }}
                          >
                            🎧 Test
                          </Button>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
              {availableVoices.length === 0 && (
                <Text fontSize="sm" color="orange.600" textAlign="center" p={4}>
                  No voices match your current preferences. Try selecting "Any" for broader options.
                </Text>
              )}
            </Box>

            <FormControl>
              <FormLabel>Speed: {voiceSettings.speed.toFixed(1)}x</FormLabel>
              <Slider
                value={voiceSettings.speed}
                onChange={(value) => setVoiceSettings(prev => ({ ...prev, speed: value }))}
                min={0.5}
                max={2.0}
                step={0.1}
                colorScheme="teal"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            <FormControl>
              <FormLabel>Volume: {Math.round(voiceSettings.volume * 100)}%</FormLabel>
              <Slider
                value={voiceSettings.volume}
                onChange={(value) => setVoiceSettings(prev => ({ ...prev, volume: value }))}
                min={0}
                max={1}
                step={0.1}
                colorScheme="teal"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            <FormControl>
              <FormLabel>Pitch: {voiceSettings.pitch.toFixed(1)}</FormLabel>
              <Slider
                value={voiceSettings.pitch}
                onChange={(value) => setVoiceSettings(prev => ({ ...prev, pitch: value }))}
                min={0.5}
                max={1.5}
                step={0.1}
                colorScheme="teal"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            <VStack spacing={3}>
              <HStack spacing={3} w="full">
                <Button
                  colorScheme="teal"
                  onClick={() => playTestVoice()}
                  flex="1"
                  size="lg"
                  leftIcon={<Text>🎧</Text>}
                >
                  Test Current Voice
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => playTestVoice("Welcome to Lucidra! I'll help you navigate through our comprehensive business intelligence platform. Let's start with the dashboard overview.")}
                  flex="1"
                  size="lg"
                  leftIcon={<Text>🎯</Text>}
                >
                  Test Welcome Message
                </Button>
              </HStack>
              
              <HStack spacing={2} w="full">
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="green"
                  onClick={() => playTestVoice("This is a professional American accent test for business presentations.")}
                  flex="1"
                >
                  🇺🇸 American Test
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => playTestVoice("This is a professional British accent test for business presentations.")}
                  flex="1"
                >
                  🇬🇧 British Test
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="purple"
                  onClick={() => playTestVoice("This is a professional Australian accent test for business presentations.")}
                  flex="1"
                >
                  🇦🇺 Australian Test
                </Button>
              </HStack>
              
              <Text fontSize="xs" color="teal.600" textAlign="center">
                ✨ Voice quality automatically optimized based on your preferences and system capabilities
              </Text>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default EnhancedVoiceSystem;