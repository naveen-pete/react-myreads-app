import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';

const element = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(element, document.getElementById('root'));
