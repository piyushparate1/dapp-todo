import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScratchPad from './components/ScratchPad';
import reportWebVitals from './reportWebVitals';
import AppMetadata from './components/AppMetadata';

ReactDOM.render(
  <React.StrictMode>
    {/* <ScratchPad /> */}
    <App />
    <AppMetadata />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();