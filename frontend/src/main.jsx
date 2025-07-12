import React, { StrictMode } from 'react'; // Corrected: Import React
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Corrected: Import BrowserRouter
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);