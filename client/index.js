import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { createRoot, creatRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);
