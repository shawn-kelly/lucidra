import React from 'react';
import { ChakraProvider, Box, Container, Heading, Text } from '@chakra-ui/react';
import { ScenarioPanelWrapper } from './components/Scenario/ScenarioPanelWrapper';

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.lg" py={8}>
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="2xl" mb={4} color="blue.600">
              Lucidra
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Future of Integrated Organizational Strategy
            </Text>
          </Box>
          
          <Box bg="white" p={8} borderRadius="lg" shadow="md">
            <ScenarioPanelWrapper />
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;