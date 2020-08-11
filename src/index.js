import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './nav.css';
import './fonts.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <div id="gradient" className="gradient"></div>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);