import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the path based on your structure
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'animate.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


