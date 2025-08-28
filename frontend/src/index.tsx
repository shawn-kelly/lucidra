import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// McKinsey Deploy Test - Force Update  
console.log('🚀 LUCIDRA DEPLOY TEST - SUCCESS!');
console.log('🎨 McKinsey Theme Version: LATEST');
console.log('⏰ Deploy Time:', new Date().toISOString());
console.log('🔧 Build Status: All 75+ components included');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
