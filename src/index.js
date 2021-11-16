import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { KandyKorner } from "./components/KandyKorner";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <KandyKorner />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
