import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import mckinseyTheme from './theme/mckinsey-theme';

function App() {
  return (
    <ChakraProvider theme={mckinseyTheme}>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#1f4e79', fontSize: '32px', marginBottom: '20px' }}>
          Lucidra - McKinsey Theme Test
        </h1>
        <p style={{ fontSize: '18px', color: '#333' }}>
          This is a simplified version to test if the McKinsey theme loads correctly.
        </p>
        <div style={{ 
          background: mckinseyTheme?.colors?.mckinsey?.primary?.[500] || '#1f4e79',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          McKinsey Primary Color Test
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;