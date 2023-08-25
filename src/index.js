import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './themes/light.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const darkModeEnabled = false

root.render(
  <React.StrictMode>
      <head>
          <link rel="stylesheet" href={`/themes/${darkModeEnabled ? 'dark' : 'light'}.css`}/>
      </head>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
