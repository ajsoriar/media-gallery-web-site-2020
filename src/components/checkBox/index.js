import React from 'react';
import './index.css';

const AndresCheckBox = ({ callback, checked, label }) => <div className="styledCheckBox">
    <input type="checkbox" checked={checked} onChange={callback} ></input>{label}
</div>

export default AndresCheckBox;