
import React from 'react'
import './index.css'

const Icon = ({width, name, clickFunc }) => <div onClick={clickFunc} className={'ui-ico '+ name} style={{
    width: (width+'px') || '32px',
    height: (width+'px') || '32px',
    backgroundSize: (width+'px') || '32px'
}}/>

export default Icon;