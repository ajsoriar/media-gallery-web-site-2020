import React from 'react';
import './index.css';

const AndresCheckBox = ({ callback, checked, label }) => <div className="styledCheckBox">
    {label}<input type="checkbox" checked={checked} onChange={callback} ></input>
</div>

export default AndresCheckBox;