import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import V2 from './v2/v2.jsx';
import Weather from './weather/Weather.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/v2" element={<V2 />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  </StrictMode>,
);