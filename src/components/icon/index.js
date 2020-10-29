
import React from 'react'
import './index.css'

const Icon = ({width, name, clickFunc, center, margin }) => <div 
    onClick={clickFunc} 
    className={'ui-ico '+ name} 
    style={{
        width: (width+'px') || '32px',
        height: (width+'px') || '32px',
        backgroundSize: (width+'px') || '32px',
        top: center ? -width/2+'px': 0,
        left: center ? -width/2+'px': 0,
        margin: margin ? margin : 0
    }}/>

export default Icon;