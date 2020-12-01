import React from 'react'
import ReactDOM from 'react-dom'
import 'loading-layer/dist/loading-layer.min.css'
import 'loading-layer'
import 'animation-stepper'
import 'ajsr-notify'
import 'ajsr-notify/dist/css/tmplt-default.css'
import './css/index.css'
import './css/nav.css'
import './css/fonts.css'
import './css/themes/dark.css'
import './css/themes/light.css'
import './css/themes/photography.css'
import App from './App'
import WelcomeScreen from './components/welcomeScreen'

ReactDOM.render(
    <React.StrictMode>
        <WelcomeScreen welcomeBackground={ WEB_CONFIG.welcomeScreen } />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
