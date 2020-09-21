import React from 'react'
import ReactDOM from 'react-dom'
import 'loading-layer/dist/loading-layer.min.css'
import 'loading-layer'
import 'ajsr-notify'
import 'ajsr-notify/dist/css/tmplt-default.css'
import './css/index.css'
import './css/nav.css'
import './css/fonts.css'
import './css/themes/dark.css'
import './css/themes/light.css'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <div id="gradient" className="gradient"></div>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);