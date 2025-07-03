import React, { useState } from 'react';
import { Box, Button, Textarea, Heading, Text, Spinner } from '@chakra-ui/react';

export function ScenarioPanel() {
  const [scenario, setScenario] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setAnalysis("");
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/scenario/suggest`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ scenario })
    });
    const data = await resp.json();
    setAnalysis(data.ai_analysis);
    setLoading(false);
  }

  return (
    <Box>
      <Heading size="md" mb={2}>Suggest a New Scenario</Heading>
      <Textarea
        value={scenario}
        onChange={e => setScenario(e.target.value)}
        placeholder="Describe a strategic scenario (e.g. market disruption, competitor action)..."
        mb={2}
      />
      <Button onClick={handleSubmit} isLoading={loading} colorScheme="blue" mb={2}>Analyze with AI</Button>
      {analysis && (
        <Box mt={4} p={4} bg="gray.50" borderRadius="md">
          <Text fontWeight="bold">AI Analysis:</Text>
          <Text>{analysis}</Text>
        </Box>
      )}
    </Box>
  );
}
