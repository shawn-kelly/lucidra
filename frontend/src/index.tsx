import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// McKinsey Deploy Test - Force Update
console.log('🎨 McKinsey Theme Deploy Test - Tue Jul 29 18:56:19 -04 2025');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
